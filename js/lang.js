/* Florida Mobile Health — Language Switcher */

function setLang(lang) {
  localStorage.setItem('fmh-lang', lang);

  // Show/hide language elements using class toggle
  document.querySelectorAll('.lang-en').forEach(function(el) {
    el.classList.toggle('lang-hidden', lang !== 'en');
  });
  document.querySelectorAll('.lang-es').forEach(function(el) {
    el.classList.toggle('lang-hidden', lang !== 'es');
  });

  // Update nav toggle button
  var btn = document.getElementById('lang-toggle-btn');
  if (btn) btn.textContent = lang === 'en' ? 'Español' : 'English';

  // Update homepage selector buttons
  var btnEn = document.getElementById('btn-en');
  var btnEs = document.getElementById('btn-es');
  if (btnEn && btnEs) {
    if (lang === 'en') {
      btnEn.style.background = 'var(--terra-500)'; btnEn.style.color = '#fff';
      btnEs.style.background = '#fff'; btnEs.style.color = 'var(--terra-500)';
    } else {
      btnEs.style.background = 'var(--terra-500)'; btnEs.style.color = '#fff';
      btnEn.style.background = '#fff'; btnEn.style.color = 'var(--terra-500)';
    }
  }

  // Update page title
  var titleEn = document.body.getAttribute('data-title-en');
  var titleEs = document.body.getAttribute('data-title-es');
  if (titleEn && titleEs) {
    document.title = lang === 'en' ? titleEn : titleEs;
  }

  document.documentElement.lang = lang;
}

function toggleLang() {
  var current = localStorage.getItem('fmh-lang') || 'en';
  setLang(current === 'en' ? 'es' : 'en');
}

document.addEventListener('DOMContentLoaded', function() {
  var saved = localStorage.getItem('fmh-lang') || 'en';
  setLang(saved);
});
