/* Florida Mobile Health — Main JS */

document.addEventListener('DOMContentLoaded', function () {

  /* ── TRACK SELECTOR (For Practices page) ── */
  document.querySelectorAll('.track-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const target = btn.dataset.track;
      document.querySelectorAll('.track-btn').forEach(function (b) {
        b.classList.remove('active-fl', 'active-vt');
      });
      document.querySelectorAll('.track-pane').forEach(function (p) {
        p.classList.remove('active');
      });
      btn.classList.add('active-' + target);
      const pane = document.getElementById('pane-' + target);
      if (pane) pane.classList.add('active');
    });
  });

  /* ── VIDEO SHOP FILTER ── */
  document.querySelectorAll('.filter-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.filter-btn').forEach(function (b) {
        b.classList.remove('active');
      });
      btn.classList.add('active');
      const cat = btn.dataset.cat;
      document.querySelectorAll('.video-card[data-cat]').forEach(function (card) {
        if (cat === 'all' || card.dataset.cat === cat) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* ── STRIPE CHECKOUT (replace URLs with your Stripe Payment Links) ── */
  document.querySelectorAll('[data-stripe]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const link = btn.dataset.stripe;
      if (link && link !== '#') {
        window.location.href = link;
      } else {
        alert('Pago / Payment coming soon. Call 352-399-8874 to book.');
      }
    });
  });

  /* ── CALENDLY EMBED ── */
  document.querySelectorAll('[data-calendly]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const url = btn.dataset.calendly;
      if (url && url !== '#' && window.Calendly) {
        window.Calendly.initPopupWidget({ url: url });
      } else if (url && url !== '#') {
        window.open(url, '_blank');
      } else {
        window.open('https://calendly.com/floridamobilehealth', '_blank');
      }
    });
  });

  /* ── SMOOTH SCROLL ── */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      const id = a.getAttribute('href').slice(1);
      const el = document.getElementById(id);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ── BOOK PAGE — VISIT TYPE SELECTOR ── */
  const visitBtns = document.querySelectorAll('.visit-type-btn');
  const bookingTotal = document.getElementById('booking-total');
  const bookingType = document.getElementById('booking-type-name');
  if (visitBtns.length) {
    visitBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        visitBtns.forEach(function (b) { b.classList.remove('selected'); });
        btn.classList.add('selected');
        if (bookingTotal) bookingTotal.textContent = btn.dataset.price;
        if (bookingType) bookingType.textContent = btn.dataset.name;
      });
    });
  }

  /* ── MESSAGING PLAN SELECTOR ── */
  document.querySelectorAll('.msg-plan-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const plan = btn.dataset.plan;
      const price = btn.dataset.price;
      const link = btn.dataset.stripe;
      if (link && link !== '#') {
        window.location.href = link;
      } else {
        alert('Plan "' + plan + '" ($' + price + '/mo) — call 352-399-8874 to subscribe.');
      }
    });
  });

});
