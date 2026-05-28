/* Florida Mobile Health — Layout JS (nav, footer, interactions) */

const NAV_HTML = `
<nav class="nav" id="main-nav">
  <div class="nav-inner">
    <a href="/index.html" class="nav-logo">
      <span class="nav-logo-main">FLORIDA MOBILE HEALTH</span>
      <span class="nav-logo-sub lang-en">Virtual Care</span><span class="nav-logo-sub lang-es lang-hidden">Salud Virtual</span>
    </a>
    <div class="nav-links">
      <a href="/about.html" class="lang-en">About</a><a href="/about.html" class="lang-es lang-hidden">Nosotros</a>
      <a href="/services.html" class="lang-en">Services</a><a href="/services.html" class="lang-es lang-hidden">Servicios</a>
      <div class="nav-dropdown">
        <span class="nav-dropdown-trigger lang-en">Programs &#9662;</span>
        <span class="nav-dropdown-trigger lang-es lang-hidden">Programas &#9662;</span>
        <div class="nav-dropdown-menu">
          <a href="/programs.html" class="lang-en">All care programs</a><a href="/programs.html" class="lang-es lang-hidden">Todos los programas</a>
          <a href="/metabolic-health.html" class="lang-en" style="color:var(--terra-500);font-weight:600">DietexpertNP Rx™</a><a href="/metabolic-health.html" class="lang-es lang-hidden" style="color:var(--terra-500);font-weight:600">DietexpertNP Rx™</a>
          <a href="/menopause-diabetes.html" class="lang-en" style="color:#8a2040;font-weight:600">MenopauseRx&#8482;</a><a href="/menopause-diabetes.html" class="lang-es lang-hidden" style="color:#8a2040;font-weight:600">MenopauseRx&#8482;</a>
          <a href="/community.html" class="lang-en" style="color:var(--olive-500)">Community programs</a><a href="/community.html" class="lang-es lang-hidden" style="color:var(--olive-500)">Programas comunitarios</a>
          <a href="/shop.html" class="lang-en">Videos &amp; education</a><a href="/shop.html" class="lang-es lang-hidden">Videos y educacion</a>
          <a href="/local-visits.html" class="lang-en">Local in-person visits</a><a href="/local-visits.html" class="lang-es lang-hidden">Visitas en persona locales</a>
          <a href="/resources.html" class="lang-en" style="color:var(--olive-500)">Free health guides</a><a href="/resources.html" class="lang-es lang-hidden" style="color:var(--olive-500)">Guías gratuitas de salud</a>
        </div>
      </div>
      <a href="/pricing.html" class="lang-en">Pricing</a><a href="/pricing.html" class="lang-es lang-hidden">Precios</a>
      <button id="lang-toggle-btn" onclick="toggleLang()" class="lang-toggle-btn">Espanol</button>
      <a href="/book.html" class="nav-cta lang-en">Book a visit</a>
      <a href="/book.html" class="nav-cta lang-es lang-hidden">Agendar cita</a>
    </div>
    <button class="nav-toggle" id="nav-toggle" aria-label="Menu">
      <span></span><span></span><span></span>
    </button>
  </div>
  <div class="nav-mobile" id="nav-mobile">
    <a href="/index.html" class="lang-en">Home</a><a href="/index.html" class="lang-es lang-hidden">Inicio</a>
    <a href="/about.html" class="lang-en">About</a><a href="/about.html" class="lang-es lang-hidden">Nosotros</a>
    <a href="/services.html" class="lang-en">Services</a><a href="/services.html" class="lang-es lang-hidden">Servicios</a>
    <a href="/programs.html" class="lang-en">Care programs</a><a href="/programs.html" class="lang-es lang-hidden">Programas de salud</a>
    <a href="/metabolic-health.html" class="lang-en" style="color:var(--terra-500);font-weight:600;padding-left:28px">&#8212; DietexpertNP Rx™</a><a href="/metabolic-health.html" class="lang-es lang-hidden" style="color:var(--terra-500);font-weight:600;padding-left:28px">&#8212; DietexpertNP Rx™</a>
    <a href="/menopause-diabetes.html" class="lang-en" style="color:#8a2040;font-weight:600;padding-left:28px">&#8212; MenopauseRx&#8482;</a><a href="/menopause-diabetes.html" class="lang-es lang-hidden" style="color:#8a2040;font-weight:600;padding-left:28px">&#8212; MenopauseRx&#8482;</a>
    <a href="/community.html" class="lang-en" style="color:var(--olive-500);padding-left:28px">&#8212; Community programs</a><a href="/community.html" class="lang-es lang-hidden" style="color:var(--olive-500);padding-left:28px">&#8212; Programas comunitarios</a>
    <a href="/local-visits.html" class="lang-en">Local in-person visits (SW Florida)</a><a href="/local-visits.html" class="lang-es lang-hidden">Visitas en persona (Suroeste FL)</a>
    <a href="/shop.html" class="lang-en">Videos</a><a href="/shop.html" class="lang-es lang-hidden">Videos</a>
        <a href="/resources.html" class="lang-en">Free health guides</a><a href="/resources.html" class="lang-es lang-hidden">Guías gratuitas</a>
    <a href="/resources.html" class="lang-en">Free health guides</a><a href="/resources.html" class="lang-es lang-hidden">Guías gratuitas de salud</a>
    <a href="/pricing.html" class="lang-en">Pricing</a><a href="/pricing.html" class="lang-es lang-hidden">Precios</a>
    <a href="/for-practices.html" class="lang-en">For Practices</a><a href="/for-practices.html" class="lang-es lang-hidden">Para Consultorios</a>
    <a href="/partners.html" class="lang-en">Partners</a><a href="/partners.html" class="lang-es lang-hidden">Socios</a>
    <a href="/contact.html" class="lang-en">Contact</a><a href="/contact.html" class="lang-es lang-hidden">Contacto</a>
    <a href="/book.html" style="color:#6b2518;font-weight:600" class="lang-en">&#9654; Book a visit</a><a href="/book.html" style="color:#6b2518;font-weight:600" class="lang-es lang-hidden">&#9654; Agendar cita</a>
  </div>
</nav>
`;

const FOOTER_HTML = `
<footer class="footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-col">
        <p class="footer-headline">Florida Mobile Health</p>
        <p class="lang-en">Personalized virtual care for your whole family.</p><p class="lang-es lang-hidden" >Atención virtual personalizada para toda la familia.</p>
        <p style="margin-top:10px;color:#c4a090">352-399-8874</p>
        <p><a href="mailto:info@floridamobilehealth.com">info@floridamobilehealth.com</a></p>
        <p style="margin-top:10px;color:#f0cfc4;font-weight:600" class="lang-en">Spanish spoken</p><p style="margin-top:10px;color:#f0cfc4;font-weight:600" class="lang-es lang-hidden" >Se habla español</p>
        <div style="display:flex;gap:14px;margin-top:12px">
          <a href="https://www.facebook.com/profile.php?id=56789241306672" target="_blank" rel="noopener" style="color:#f0cfc4;font-size:13px;display:flex;align-items:center;gap:5px;text-decoration:none">
            <i class="ti ti-brand-facebook" style="font-size:20px"></i> Facebook
          </a>
          <a href="https://www.linkedin.com/in/michelesilano" target="_blank" rel="noopener" style="color:#f0cfc4;font-size:13px;display:flex;align-items:center;gap:5px;text-decoration:none;margin-top:8px">
            <i class="ti ti-brand-linkedin" style="font-size:20px"></i> LinkedIn
          </a>
        </div>
      </div>
      <div class="footer-col">
        <h4 class="lang-en">Services</h4><h4 class="lang-es lang-hidden" >Servicios</h4>
        <a href="/services.html#diabetes">Diabetes & GLP-1</a>
        <a href="/services.html#primary" class="lang-en">Primary care</a><a href="/services.html#primary" class="lang-es lang-hidden" >Atención primaria</a>
        <a href="/services.html#hormones" class="lang-en">Hormones</a><a href="/services.html#hormones" class="lang-es lang-hidden" >Hormonas</a>
        <a href="/services.html#memory" class="lang-en">Memory health</a><a href="/services.html#memory" class="lang-es lang-hidden" >Salud de la memoria</a>
        <a href="/services.html#nutrition" class="lang-en">Nutrition & wellness</a><a href="/services.html#nutrition" class="lang-es lang-hidden" >Nutrición & bienestar</a>
        <a href="/services.html#seniors" class="lang-en">Senior concierge</a><a href="/services.html#seniors" class="lang-es lang-hidden" >Concierge mayores</a>
      </div>
      <div class="footer-col">
        <h4 class="lang-en">Access</h4><h4 class="lang-es lang-hidden" >Acceso</h4>
        <a href="/programs.html" class="lang-en">Care programs</a><a href="/programs.html" class="lang-es lang-hidden" >Programas de salud</a>
        <a href="/shop.html" class="lang-en">Educational videos</a><a href="/shop.html" class="lang-es lang-hidden" >Videos educativos</a>
        <a href="/book.html" class="lang-en">Book a virtual visit</a><a href="/book.html" class="lang-es lang-hidden" >Agendar cita virtual</a>
        <a href="/messaging.html" class="lang-en">Direct messaging</a><a href="/messaging.html" class="lang-es lang-hidden" >Mensajes directos</a>
        <a href="/pricing.html" class="lang-en">View pricing</a><a href="/pricing.html" class="lang-es lang-hidden" >Ver precios</a>
        <a href="/blog.html" class="lang-en">Health blog</a><a href="/blog.html" class="lang-es lang-hidden" >Blog de salud</a>
      </div>
      <div class="footer-col">
        <h4 class="lang-en">Virtual coverage</h4><h4 class="lang-es lang-hidden" >Cobertura virtual</h4>
        <p style="color:#c4a090">Florida</p>
        <p>Arizona</p>
        <p>Nuevo México</p>
        <p>Colorado</p>
        <p>Utah</p>
        <p style="margin-top:10px"><a href="/for-practices.html" class="lang-en">For practices →</a><a href="/for-practices.html" class="lang-es lang-hidden" >Para consultorios →</a></p>
        <div style="margin-top:16px">
          <p style="font-size:10px;color:#8a6050;margin-bottom:8px" class="lang-en">Scan to visit on mobile</p>
          <p style="font-size:10px;color:#8a6050;margin-bottom:8px" class="lang-es lang-hidden" >Escanee para visitar</p>
          <img src="/images/qr-code.png" alt="Florida Mobile Health QR Code" style="width:80px;height:80px;border-radius:6px;opacity:.85">
        </div>
      </div>
    </div>
    <div style="border-top:0.5px solid #5a2818;padding:14px 0;margin-bottom:8px">
      <p style="font-size:11px;color:#c4a090;line-height:1.8;">
        All services provided by Michele Li Causi, FNP-BC, RD, CDCES. Licensed for autonomous practice in Florida and licensed in Arizona, Nevada, Colorado, New Mexico, and Utah. Services are delivered within the FNP-BC scope of practice applicable in each licensed state. Florida Mobile Health does not prescribe controlled substances (Schedule II–V) or testosterone. All GLP-1 prescribing (Ozempic, Mounjaro, Wegovy, and related medications) is conducted within the context of a comprehensive primary care evaluation and ongoing care management — not as a standalone prescription service. Weight management, metabolic health, and diabetes management are primary care concerns within this provider's scope. Service availability, specific offerings, and collaboration arrangements may vary by state — not all services are available in all licensed states. Virtual services comply with the telehealth laws of the state where the patient is physically located at the time of service. Out-of-state and out-of-licensure patients cannot be served. This website is for informational purposes only and does not constitute medical advice, diagnosis, or treatment. Individual results vary. For medical emergencies, call 911 or go to your nearest emergency room.
      </p>
    </div>
    <div class="footer-bottom">
      <p class="lang-en">© 2026 Florida Mobile Health, PLLC · All rights reserved · DietexpertNP Rx™ is a trademark of Florida Mobile Health, PLLC</p><p class="lang-es lang-hidden" >© 2026 Florida Mobile Health, PLLC · Todos los derechos reservados · DietexpertNP Rx™ es marca registrada de Florida Mobile Health, PLLC</p>
      <div style="display:flex;gap:16px">
        <a href="/disclosures.html">Disclosures</a>
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
  // Dropdown click toggle
  document.querySelectorAll('.nav-dropdown-trigger').forEach(function(trigger) {
    trigger.addEventListener('click', function(e) {
      e.stopPropagation();
      var dropdown = trigger.closest('.nav-dropdown');
      var isOpen = dropdown.classList.contains('open');
      document.querySelectorAll('.nav-dropdown').forEach(function(d) { d.classList.remove('open'); });
      if (!isOpen) dropdown.classList.add('open');
    });
  });
  document.addEventListener('click', function() {
    document.querySelectorAll('.nav-dropdown').forEach(function(d) { d.classList.remove('open'); });
  });

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
