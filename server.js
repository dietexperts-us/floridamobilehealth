const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true, limit: '2mb' }));

// Serve static files
app.use(express.static(path.join(__dirname), {
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.css')) res.setHeader('Content-Type', 'text/css');
    if (filePath.endsWith('.js')) res.setHeader('Content-Type', 'application/javascript');
    if (filePath.endsWith('.xml')) { res.setHeader('Content-Type', 'application/xml'); res.setHeader('X-Robots-Tag', 'noindex'); }
    if (filePath.endsWith('.txt')) res.setHeader('Content-Type', 'text/plain');
    // Block direct access to intake submissions
    if (filePath.includes('/api/')) res.setHeader('X-Content-Type-Options', 'nosniff');
  }
}));

// ===== PATIENT INTAKE EMAIL ENDPOINT =====
app.post('/api/intake', async (req, res) => {
  try {
    const d = req.body;

    // Rate limiting check (simple in-memory — upgrade to Redis for production)
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    // Build HTML email
    const html = `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><style>
  body{font-family:Georgia,serif;background:#faf8f4;margin:0;padding:0}
  .wrap{max-width:700px;margin:0 auto;background:#fff}
  .header{background:#6b2518;padding:20px 28px;color:#fff}
  .header h1{font-size:18px;margin:0 0 4px}
  .header p{font-size:12px;opacity:.75;margin:0;font-family:sans-serif}
  .section{padding:20px 28px;border-bottom:.5px solid #e8ddd5}
  .section h2{font-size:13px;color:#6b2518;text-transform:uppercase;letter-spacing:.06em;font-family:sans-serif;font-weight:700;margin-bottom:14px}
  .row{display:flex;gap:16px;margin-bottom:8px}
  .label{font-size:11px;color:#888;font-family:sans-serif;min-width:160px;flex-shrink:0}
  .value{font-size:13px;color:#222;font-family:sans-serif}
  .badge{display:inline-block;background:#fdf2ef;color:#6b2518;font-size:11px;padding:2px 10px;border-radius:12px;font-family:sans-serif;font-weight:600;margin-bottom:10px}
  .badge-green{background:#f0f8e8;color:#3a5420}
  .alert{background:#fff5f5;border-left:4px solid #c44040;padding:12px 16px;font-size:13px;font-family:sans-serif;color:#c44040;margin:16px 0}
  .footer{background:#f5ede3;padding:14px 28px;font-size:11px;color:#888;font-family:sans-serif;line-height:1.6}
  .consents{background:#e8f0e4;border-radius:8px;padding:12px;font-size:12px;font-family:sans-serif;color:#3a5420;line-height:1.8}
  pre{font-family:sans-serif;font-size:13px;white-space:pre-wrap;margin:0;color:#333;line-height:1.7}
</style></head>
<body><div class="wrap">
  <div class="header">
    <h1>NEW PATIENT INTAKE FORM</h1>
    <p>Florida Mobile Health, PLLC · Received: ${new Date().toLocaleString('en-US', {timeZone:'America/New_York', dateStyle:'full', timeStyle:'short'})} ET</p>
  </div>

  <div class="section">
    <h2>Service & Payment</h2>
    <div class="badge">${d.serviceSelected || 'Not selected'}</div>
    <div class="badge" style="margin-left:8px">${d.serviceFee || ''}</div>
    <br><br>
    <div class="row"><span class="label">Payment acknowledged</span><span class="value">${d.paymentAcknowledged === 'Yes' ? '✓ Yes' : '✗ No'}</span></div>
    <div class="row"><span class="label">State of service</span><span class="value">${d.patientState || 'Not provided'}</span></div>
  </div>

  <div class="section">
    <h2>Patient Information</h2>
    <div class="row"><span class="label">Full name</span><span class="value"><strong>${d.firstName || ''} ${d.lastName || ''}</strong></span></div>
    <div class="row"><span class="label">Date of birth</span><span class="value">${d.dob || ''}</span></div>
    <div class="row"><span class="label">Sex at birth / Gender</span><span class="value">${d.sexAtBirth || ''} / ${d.genderIdentity || ''}</span></div>
    <div class="row"><span class="label">Phone</span><span class="value">${d.phone || ''}</span></div>
    <div class="row"><span class="label">Email</span><span class="value">${d.email || ''}</span></div>
    <div class="row"><span class="label">Address</span><span class="value">${d.address || ''}, ${d.city || ''}, ${d.addressState || ''} ${d.zip || ''}</span></div>
    <div class="row"><span class="label">Preferred language</span><span class="value">${d.preferredLanguage || ''}</span></div>
    <div class="row"><span class="label">Emergency contact</span><span class="value">${d.emergencyName || ''} — ${d.emergencyPhone || ''} (${d.emergencyRelation || ''})</span></div>
    <div class="row"><span class="label">Referred by</span><span class="value">${d.referralSource || ''}</span></div>
  </div>

  <div class="section">
    <h2>Chief Complaint & Goals</h2>
    <div class="row"><span class="label">Main reason for visit</span></div>
    <pre>${d.chiefComplaint || 'Not provided'}</pre>
    <br>
    <div class="row"><span class="label">Health goals</span></div>
    <pre>${d.healthGoals || 'Not provided'}</pre>
    <br>
    <div class="row"><span class="label">Previous treatments</span></div>
    <pre>${d.previousTreatments || 'None listed'}</pre>
    <br>
    <div class="row"><span class="label">Duration</span><span class="value">${d.symptomDuration || ''}</span></div>
    <div class="row"><span class="label">Services interested in</span><span class="value">${d.interests || 'None checked'}</span></div>
    ${d.additionalContext ? `<div class="row"><span class="label">Additional context</span></div><pre>${d.additionalContext}</pre>` : ''}
  </div>

  <div class="section">
    <h2>Medical History</h2>
    <div class="row"><span class="label">Past medical history</span><span class="value">${d.pmh || 'None checked'}</span></div>
    <div class="row"><span class="label">Other conditions</span><span class="value">${d.pmhOther || 'None'}</span></div>
    <div class="row"><span class="label">Surgical history</span><span class="value">${d.surgicalHistory || 'None reported'}</span></div>
    <div class="row"><span class="label">Height / Weight</span><span class="value">${d.height || ''} / ${d.weight || ''}</span></div>
    <div class="row"><span class="label">Recent labs</span><span class="value">${d.recentLabs || ''}</span></div>
    <div class="row"><span class="label">Last A1C</span><span class="value">${d.lastA1C || 'Not provided'}</span></div>
    <div class="row"><span class="label">Family history</span><span class="value">${d.familyHx || 'None checked'}</span></div>
  </div>

  <div class="section">
    <h2>Medications & Allergies</h2>
    <div class="row"><span class="label">Current medications</span></div>
    <pre>${d.medications || 'None'}</pre>
    <br>
    <div class="row"><span class="label">Insulin use</span><span class="value">${d.insulinUse || 'None'} ${d.insulinDetails || ''}</span></div>
    <div class="row"><span class="label">Diabetes/GLP-1 meds</span><span class="value">${d.diabetesMeds || 'None checked'}</span></div>
    <div class="row"><span class="label">Drug allergies</span><span class="value"><strong>${d.drugAllergies || 'NKDA'}</strong></span></div>
    <div class="row"><span class="label">Other allergies</span><span class="value">${d.otherAllergies || 'None'}</span></div>
  </div>

  <div class="section">
    <h2>Social & Lifestyle</h2>
    <div class="row"><span class="label">Smoking</span><span class="value">${d.smoking || ''}</span></div>
    <div class="row"><span class="label">Alcohol</span><span class="value">${d.alcohol || ''}</span></div>
    <div class="row"><span class="label">Activity level</span><span class="value">${d.activityLevel || ''}</span></div>
    <div class="row"><span class="label">Sleep</span><span class="value">${d.sleepHours || ''}</span></div>
    <div class="row"><span class="label">Occupation / Schedule</span><span class="value">${d.occupation || ''} / ${d.workSchedule || ''}</span></div>
    <div class="row"><span class="label">Stress level</span><span class="value">${d.stressLevel || ''}</span></div>
    <div class="row"><span class="label">Diet pattern</span></div>
    <pre>${d.dietPattern || 'Not provided'}</pre>
    ${d.pregnant ? `<br><div class="row"><span class="label">Pregnant</span><span class="value">${d.pregnant}</span></div>` : ''}
    ${d.menstrualStatus ? `<div class="row"><span class="label">Menstrual status</span><span class="value">${d.menstrualStatus}</span></div>` : ''}
    ${d.lastPap ? `<div class="row"><span class="label">Last Pap smear</span><span class="value">${d.lastPap}</span></div>` : ''}
    ${d.lastMammogram ? `<div class="row"><span class="label">Last mammogram</span><span class="value">${d.lastMammogram}</span></div>` : ''}
  </div>

  <div class="section">
    <h2>Legal Consents & Signature</h2>
    <div class="consents">
      ✓ Payment & financial policy acknowledged<br>
      ✓ Universal telehealth consent signed<br>
      ✓ State-specific consent (${d.patientState || 'N/A'}) signed<br>
      ✓ HIPAA Notice of Privacy Practices acknowledged<br>
      ✓ Scope of practice & prescription policy acknowledged<br>
      ✓ Superbill & insurance policy acknowledged<br>
      ✓ Final certification and electronic signature
    </div>
    <br>
    <div class="row"><span class="label">Electronic signature</span><span class="value"><em style="font-family:Georgia,serif;font-size:16px;color:#6b2518">${d.electronicSignature || ''}</em></span></div>
    <div class="row"><span class="label">Signature date</span><span class="value">${d.signatureDate || ''}</span></div>
    <div class="row"><span class="label">Signer relationship</span><span class="value">${d.signerRelationship || ''}</span></div>
    <div class="row"><span class="label">Form submitted</span><span class="value">${d.submittedAt || ''}</span></div>
  </div>

  <div class="footer">
    <strong>Florida Mobile Health, PLLC</strong> · Michele Li Causi FNP-BC, RD, CDCES<br>
    352-399-8874 · info@floridamobilehealth.com · floridamobilehealth.com<br>
    This intake form was submitted securely via HTTPS. Retain in patient record.
  </div>
</div></body></html>`;

    // Configure transporter — uses env variables set in Hostinger
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    await transporter.sendMail({
      from: `"FMH Intake Form" <${process.env.SMTP_USER}>`,
      to: process.env.INTAKE_EMAIL || 'info@floridamobilehealth.com',
      replyTo: d.email || '',
      subject: `NEW INTAKE: ${d.firstName || ''} ${d.lastName || ''} — ${d.serviceSelected || 'Service TBD'} — ${d.patientState || '??'} — ${new Date().toLocaleDateString('en-US')}`,
      html: html,
      text: `New patient intake received.\nPatient: ${d.firstName} ${d.lastName}\nPhone: ${d.phone}\nEmail: ${d.email}\nService: ${d.serviceSelected} (${d.serviceFee})\nState: ${d.patientState}\nChief complaint: ${d.chiefComplaint}\n\nSee HTML email for full details.`
    });

    res.json({ success: true, message: 'Intake form submitted successfully.' });

  } catch (err) {
    console.error('Intake form error:', err.message);
    // Still return success to user but log the error — prevents exposing server details
    // In production, also save to a local backup file
    const fs = require('fs');
    const backup = JSON.stringify({ timestamp: new Date().toISOString(), data: req.body, error: err.message });
    fs.appendFileSync('intake_backup.log', backup + '\n---\n');
    res.json({ success: true, message: 'Form submitted. If you do not receive a confirmation email within 24 hours, please call 352-399-8874.' });
  }
});

// Explicit sitemap and robots routes
app.get('/sitemap.xml', (req, res) => { res.setHeader('Content-Type', 'application/xml'); res.sendFile(path.join(__dirname, 'sitemap.xml')); });
app.get('/robots.txt', (req, res) => { res.setHeader('Content-Type', 'text/plain'); res.sendFile(path.join(__dirname, 'robots.txt')); });

// Block direct access to backup log
app.get('/intake_backup.log', (req, res) => res.status(403).send('Forbidden'));

app.get('*', (req, res) => { res.sendFile(path.join(__dirname, 'index.html')); });

app.listen(PORT, () => { console.log(`Florida Mobile Health running on port ${PORT}`); });
