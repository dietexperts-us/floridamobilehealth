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
          <a href="https://www.facebook.com/56789241306672" target="_blank" rel="noopener" style="color:#f0cfc4;font-size:13px;display:flex;align-items:center;gap:5px;text-decoration:none">
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
