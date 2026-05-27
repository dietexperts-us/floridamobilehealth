/* Florida Mobile Health — Layout JS (nav, footer, interactions) */

const NAV_HTML = `
<nav class="nav" id="main-nav">
  <div class="nav-inner">
    <a href="/index.html" class="nav-logo">
      <span class="nav-logo-main">FLORIDA MOBILE HEALTH</span>
      <span class="nav-logo-sub">Salud Virtual · Virtual Care</span>
    </a>
    <div class="nav-links">
      <a href="/about.html">Nosotros</a>
      <a href="/services.html">Servicios</a>
      <a href="/programs.html">Programas</a>
      <a href="/shop.html">Videos</a>
      <a href="/pricing.html">Precios</a>
      <a href="/for-practices.html">Para Consultorios</a>
      <button id="lang-toggle-btn" onclick="toggleLang()" class="lang-toggle-btn">Español</button>
      <a href="/book.html" class="nav-cta lang-en">Book a visit</a>
      <a href="/book.html" class="nav-cta lang-es" style="display:none">Agendar cita</a>
    </div>
    <button class="nav-toggle" id="nav-toggle" aria-label="Menu">
      <span></span><span></span><span></span>
    </button>
  </div>
  <div class="nav-mobile" id="nav-mobile">
    <a href="/index.html" class="lang-en">Home</a><a href="/index.html" class="lang-es" style="display:none">Inicio</a>
    <a href="/about.html">Nosotros · About us</a>
    <a href="/services.html" class="lang-en">Services</a><a href="/services.html" class="lang-es" style="display:none">Servicios</a>
    <a href="/programs.html" class="lang-en">Care Programs</a><a href="/programs.html" class="lang-es" style="display:none">Programas</a>
    <a href="/shop.html">Videos</a>
    <a href="/pricing.html" class="lang-en">Pricing</a><a href="/pricing.html" class="lang-es" style="display:none">Precios</a>
    <a href="/for-practices.html" class="lang-en">For Practices</a><a href="/for-practices.html" class="lang-es" style="display:none">Para Consultorios</a>
    <a href="/book.html" style="color:#6b2518;font-weight:600" class="lang-en">▶ Book a visit</a><a href="/book.html" style="color:#6b2518;font-weight:600" class="lang-es" style="display:none">▶ Agendar cita</a>
    <a href="/contact.html" class="lang-en">Contact</a><a href="/contact.html" class="lang-es" style="display:none">Contacto</a>
  </div>
</nav>`;

const FOOTER_HTML = `
<footer class="footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-col">
        <p class="footer-headline">Florida Mobile Health</p>
        <p>Atención virtual personalizada para toda la familia.</p>
        <p style="margin-top:10px;color:#c4a090">352-399-8874</p>
        <p><a href="mailto:info@floridamobilehealth.com">info@floridamobilehealth.com</a></p>
        <p style="margin-top:10px;color:#f0cfc4;font-weight:600">Se habla español</p>
        <div style="display:flex;gap:14px;margin-top:12px">
          <a href="https://www.facebook.com/profile.php?id=56789241306672" target="_blank" rel="noopener" style="color:#f0cfc4;font-size:13px;display:flex;align-items:center;gap:5px;text-decoration:none">
            <i class="ti ti-brand-facebook" style="font-size:20px"></i> Facebook
          </a>
        </div>
      </div>
      <div class="footer-col">
        <h4>Servicios</h4>
        <a href="/services.html#diabetes">Diabetes & GLP-1</a>
        <a href="/services.html#primary">Atención primaria</a>
        <a href="/services.html#hormones">Hormonas</a>
        <a href="/services.html#memory">Salud de la memoria</a>
        <a href="/services.html#nutrition">Nutrición & bienestar</a>
        <a href="/services.html#seniors">Concierge mayores</a>
      </div>
      <div class="footer-col">
        <h4>Acceso</h4>
        <a href="/programs.html">Programas de salud</a>
        <a href="/shop.html">Videos educativos</a>
        <a href="/book.html">Agendar cita virtual</a>
        <a href="/messaging.html">Mensajes directos</a>
        <a href="/pricing.html">Ver precios</a>
        <a href="/blog.html">Blog de salud</a>
      </div>
      <div class="footer-col">
        <h4>Cobertura virtual</h4>
        <p style="color:#c4a090">Florida</p>
        <p>Arizona</p>
        <p>Nuevo México</p>
        <p>Colorado</p>
        <p>Utah</p>
        <p style="margin-top:10px"><a href="/for-practices.html">Para consultorios →</a></p>
      </div>
    </div>
    <div style="border-top:0.5px solid #5a2818;padding:20px 0;margin-bottom:8px">
      <p style="font-size:11px;color:#8a6050;font-weight:600;margin-bottom:8px;font-family:sans-serif">Licensing & Scope of Practice Disclosures</p>
      <p style="font-size:10px;color:#6a3828;line-height:1.8;margin-bottom:8px">
        <strong style="color:#8a6050">Florida:</strong> Michele Li Causi, FNP-BC practices under Florida Autonomous Advanced Practice Registered Nurse status pursuant to Section 464.0123, Florida Statutes. Autonomous practice license issued by the Florida Board of Nursing.
      </p>
      <p style="font-size:10px;color:#6a3828;line-height:1.8;margin-bottom:8px">
        <strong style="color:#8a6050">Arizona · Nevada · Colorado · New Mexico · Utah:</strong> Full Practice Authority states. Michele Li Causi, FNP-BC is licensed and authorized to practice independently, diagnose, treat, and prescribe in accordance with each state's Nurse Practice Act and within her certified specialty as a Family Nurse Practitioner.
      </p>
      <p style="font-size:10px;color:#6a3828;line-height:1.8;margin-bottom:8px">
        <strong style="color:#8a6050">Controlled Substances:</strong> Florida Mobile Health does not prescribe controlled substances (Schedule II–V medications including opioids, benzodiazepines, stimulants, or sleep medications).
      </p>
      <p style="font-size:10px;color:#6a3828;line-height:1.8;margin-bottom:8px">
        <strong style="color:#8a6050">Mental Health:</strong> Mental health support, pharmacogenomic testing, and antidepressant medication management are provided within the FNP scope of practice. Florida Mobile Health does not provide psychiatric diagnoses or initiate psychiatric medication for conditions outside the FNP scope. Patients requiring psychiatric diagnosis or specialized psychiatric care will be referred to a licensed psychiatrist or mental health professional.
      </p>
      <p style="font-size:10px;color:#6a3828;line-height:1.8;margin-bottom:8px">
        <strong style="color:#8a6050">Telehealth:</strong> Virtual services are provided in compliance with the telehealth laws and regulations of the state where the patient is physically located at the time of the visit. Patients must be located in a state where Michele Li Causi holds an active license.
      </p>
      <p style="font-size:10px;color:#6a3828;line-height:1.8;">
        <strong style="color:#8a6050">General:</strong> This website does not constitute medical advice and does not establish a patient-provider relationship. For medical emergencies, call 911 or go to the nearest emergency room. All services provided by Michele Li Causi, FNP-BC, RD, CDCES, operating as Florida Mobile Health, PLLC.
      </p>
    </div>
    <div class="footer-bottom">
      <p>© 2025 Florida Mobile Health, PLLC · Todos los derechos reservados</p>
      <div style="display:flex;gap:16px">
        <a href="/privacy.html">Privacidad</a>
        <a href="/terms.html">Términos</a>
        <p>HIPAA Compliant</p>
      </div>
    </div>
  </div>
</footer>`;

// lang.js loaded separately
document.addEventListener('DOMContentLoaded', function () {
  document.body.insertAdjacentHTML('afterbegin', NAV_HTML);
  document.body.insertAdjacentHTML('beforeend', FOOTER_HTML);

  const toggle = document.getElementById('nav-toggle');
  const mobile = document.getElementById('nav-mobile');
  if (toggle && mobile) {
    toggle.addEventListener('click', function () {
      mobile.classList.toggle('open');
    });
  }

  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(function (a) {
    const href = a.getAttribute('href').replace('/', '');
    if (href === path || (path === '' && href === 'index.html')) {
      a.style.color = '#6b2518';
      a.style.fontWeight = '600';
    }
  });

  document.querySelectorAll('.nav-mobile a').forEach(function (a) {
    a.addEventListener('click', function () {
      if (mobile) mobile.classList.remove('open');
    });
  });
});
