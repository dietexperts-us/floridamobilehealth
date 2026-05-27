/* Florida Mobile Health — Language Switcher */

function setLang(lang) {
  localStorage.setItem('fmh-lang', lang);
  document.querySelectorAll('.lang-en').forEach(function(el) {
    el.style.display = lang === 'en' ? '' : 'none';
  });
  document.querySelectorAll('.lang-es').forEach(function(el) {
    el.style.display = lang === 'es' ? '' : 'none';
  });
  var btn = document.getElementById('lang-toggle-btn');
  if (btn) btn.textContent = lang === 'en' ? 'Español' : 'English';
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
