/**
 * Florida Mobile Health — Exit Intent Email Capture Popup
 * Drop this file in /js/email-popup.js
 * Add <script src="/js/email-popup.js"></script> before </body> in every page
 */
(function(){
  // Don't show if already subscribed or dismissed in last 7 days
  const dismissed = localStorage.getItem('fmh_popup_dismissed');
  if(dismissed && Date.now() - parseInt(dismissed) < 7 * 24 * 60 * 60 * 1000) return;
  if(localStorage.getItem('fmh_subscribed')) return;

  let triggered = false;

  // Detect language
  const isES = document.documentElement.lang === 'es' ||
    document.body.classList.contains('lang-es-active');

  const copy = {
    en: {
      headline: 'Before you go — grab the free guide',
      sub: '5 Signs Your Metabolism Is Broken — the warning signs most doctors miss, written by an FNP + RD + Diabetes Specialist.',
      placeholder: 'your@email.com',
      btn: 'Send me the free guide →',
      no: 'No thanks',
      success: "✓ Check your inbox! The guide is on its way.",
      badge: 'FREE · Instant Download'
    },
    es: {
      headline: 'Antes de salir — llévese la guía gratis',
      sub: '5 Señales de que Su Metabolismo Está Roto — las señales de advertencia que muchos médicos pasan por alto.',
      placeholder: 'su@correo.com',
      btn: 'Enviarme la guía gratis →',
      no: 'No, gracias',
      success: "✓ ¡Revise su bandeja! La guía está en camino.",
      badge: 'GRATIS · Descarga Instantánea'
    }
  };

  const t = isES ? copy.es : copy.en;

  function buildPopup(){
    const overlay = document.createElement('div');
    overlay.id = 'fmh-popup-overlay';
    overlay.style.cssText = `
      position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:9999;
      display:flex;align-items:center;justify-content:center;padding:16px;
      opacity:0;transition:opacity .3s;
    `;

    overlay.innerHTML = `
      <div style="
        background:#fff;border-radius:16px;max-width:480px;width:100%;
        padding:32px 28px;position:relative;box-shadow:0 20px 60px rgba(0,0,0,.25);
        transform:translateY(20px);transition:transform .3s;
      " id="fmh-popup-box">
        <button id="fmh-popup-close" style="
          position:absolute;top:14px;right:16px;background:none;border:none;
          font-size:22px;color:#aaa;cursor:pointer;line-height:1;
        ">✕</button>
        <div style="text-align:center;margin-bottom:20px">
          <span style="
            background:#fef3c7;color:#92400e;font-size:11px;font-weight:600;
            padding:4px 12px;border-radius:20px;letter-spacing:.06em;text-transform:uppercase;
          ">${t.badge}</span>
        </div>
        <h2 style="font-size:22px;font-family:Georgia,serif;color:#3d1a0f;margin-bottom:10px;text-align:center;line-height:1.3">
          ${t.headline}
        </h2>
        <p style="font-size:13px;color:#6b5040;line-height:1.7;text-align:center;margin-bottom:20px">
          ${t.sub}
        </p>
        <div id="fmh-popup-form">
          <input type="email" id="fmh-popup-email" placeholder="${t.placeholder}" style="
            width:100%;border:1.5px solid #e0c8b0;border-radius:8px;padding:12px 14px;
            font-size:14px;margin-bottom:10px;box-sizing:border-box;outline:none;
          ">
          <button id="fmh-popup-submit" style="
            width:100%;background:#8b2e12;color:#fff;border:none;border-radius:8px;
            padding:13px;font-size:14px;font-weight:600;cursor:pointer;
          ">${t.btn}</button>
        </div>
        <div id="fmh-popup-success" style="display:none;text-align:center;padding:16px 0">
          <p style="font-size:16px;color:#2d6a2d;font-weight:600">${t.success}</p>
        </div>
        <p style="text-align:center;margin-top:12px">
          <button id="fmh-popup-no" style="
            background:none;border:none;color:#bbb;font-size:12px;cursor:pointer;
          ">${t.no}</button>
        </p>
        <p style="text-align:center;font-size:11px;color:#c4a090;margin-top:8px">
          By submitting, you agree to receive occasional health emails from Florida Mobile Health. Unsubscribe anytime.
        </p>
      </div>
    `;

    document.body.appendChild(overlay);

    // Animate in
    requestAnimationFrame(()=>{
      overlay.style.opacity = '1';
      document.getElementById('fmh-popup-box').style.transform = 'translateY(0)';
    });

    function closePopup(){
      overlay.style.opacity = '0';
      setTimeout(()=>overlay.remove(), 300);
      localStorage.setItem('fmh_popup_dismissed', Date.now().toString());
    }

    document.getElementById('fmh-popup-close').onclick = closePopup;
    document.getElementById('fmh-popup-no').onclick = closePopup;
    overlay.onclick = function(e){ if(e.target === overlay) closePopup(); };

    document.getElementById('fmh-popup-submit').onclick = function(){
      const email = document.getElementById('fmh-popup-email').value;
      if(!email || !email.includes('@')){
        document.getElementById('fmh-popup-email').style.borderColor = '#e53e3e';
        return;
      }
      // Submit to Formspree — replace with your form ID
      fetch('https://formspree.io/f/REPLACE_WITH_FORM_ID', {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({email: email, source: 'exit-popup', page: window.location.pathname})
      }).catch(()=>{}); // Silent fail — don't block UX

      document.getElementById('fmh-popup-form').style.display = 'none';
      document.getElementById('fmh-popup-success').style.display = 'block';
      localStorage.setItem('fmh_subscribed','1');
      setTimeout(closePopup, 3000);
    };
  }

  // Trigger: exit intent on desktop (mouse leaves viewport upward)
  document.addEventListener('mouseleave', function(e){
    if(e.clientY <= 0 && !triggered){
      triggered = true;
      buildPopup();
    }
  });

  // Trigger: on mobile, scroll 60% of page then pause 8 seconds
  if('ontouchstart' in window){
    let scrollTimer;
    window.addEventListener('scroll', function(){
      const scrollPct = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      if(scrollPct > 0.6 && !triggered){
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(function(){
          if(!triggered){ triggered = true; buildPopup(); }
        }, 8000);
      }
    }, {passive:true});
  }

})();
