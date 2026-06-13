/* ===========================
   BANGALORE EXIT PARTY 2026
   script.js
=========================== */

// ===========================
// COUNTDOWN TO TONIGHT 12:00 AM (MIDNIGHT)
// ===========================
function getMidnightDate() {
  // Tonight 13 June 2026, 12:00 AM (midnight = end of day)
  return new Date('2026-06-13T23:59:59+05:30');
}

function updateCountdown() {
  const target = getMidnightDate();
  const now = new Date();
  const diff = target - now;

  if (diff <= 0) {
    document.getElementById('cd-hours').textContent = '00';
    document.getElementById('cd-mins').textContent = '00';
    document.getElementById('cd-secs').textContent = '00';
    return;
  }

  const totalHours = Math.floor(diff / (1000 * 60 * 60));
  const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const secs = Math.floor((diff % (1000 * 60)) / 1000);

  const pad = (n) => String(n).padStart(2, '0');
  document.getElementById('cd-hours').textContent = pad(totalHours);
  document.getElementById('cd-mins').textContent  = pad(mins);
  document.getElementById('cd-secs').textContent  = pad(secs);
}

function initDateAndCountdown() {
  updateCountdown();
  setInterval(updateCountdown, 1000);
}

// ===========================
// NAVBAR SCROLL
// ===========================
function initNavbar() {
  const nav = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });
}

// ===========================
// SCROLL REVEAL
// ===========================
function initScrollReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, i * 80);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
}

// ===========================
// PARTICLES
// ===========================
function createParticles() {
  const container = document.getElementById('particles-container');
  const colors = ['#a855f7', '#ec4899', '#22d3ee', '#fbbf24', '#f472b6'];
  const count = 50;

  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 4 + 1;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const left = Math.random() * 100;
    const duration = Math.random() * 15 + 10;
    const delay = Math.random() * 15;

    p.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      left: ${left}%;
      animation-duration: ${duration}s;
      animation-delay: ${delay}s;
      box-shadow: 0 0 ${size * 3}px ${color};
    `;

    container.appendChild(p);
  }
}

// ===========================
// BALLOONS
// ===========================
function createBalloons() {
  const container = document.getElementById('balloons');
  const colors = [
    'rgba(168,85,247,0.7)',
    'rgba(236,72,153,0.7)',
    'rgba(34,211,238,0.6)',
    'rgba(251,191,36,0.7)',
    'rgba(244,114,182,0.7)',
  ];

  for (let i = 0; i < 12; i++) {
    const b = document.createElement('div');
    b.className = 'balloon';
    const color = colors[i % colors.length];
    const left = 5 + Math.random() * 90;
    const duration = 12 + Math.random() * 14;
    const delay = Math.random() * 20;
    const size = 30 + Math.random() * 22;

    b.style.cssText = `
      background: ${color};
      left: ${left}%;
      width: ${size}px;
      height: ${size * 1.3}px;
      animation-duration: ${duration}s;
      animation-delay: ${delay}s;
      box-shadow: inset -4px -4px 8px rgba(0,0,0,0.2), 0 0 12px ${color};
    `;

    container.appendChild(b);
  }
}

// ===========================
// CONFETTI BURST
// ===========================
function launchConfetti() {
  const container = document.getElementById('confetti-container');
  const colors = ['#a855f7', '#ec4899', '#22d3ee', '#fbbf24', '#f472b6', '#ffffff', '#4ade80'];
  const count = 120;
  const shapes = ['rect', 'circle'];

  container.innerHTML = '';

  for (let i = 0; i < count; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    const color = colors[Math.floor(Math.random() * colors.length)];
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    const left = Math.random() * 100;
    const duration = 2 + Math.random() * 2.5;
    const delay = Math.random() * 1.2;
    const size = 6 + Math.random() * 10;
    const rotate = Math.random() * 360;

    piece.style.cssText = `
      left: ${left}%;
      background: ${color};
      width: ${size}px;
      height: ${size * (shape === 'circle' ? 1 : 1.7)}px;
      border-radius: ${shape === 'circle' ? '50%' : '2px'};
      animation-duration: ${duration}s;
      animation-delay: ${delay}s;
      transform: rotate(${rotate}deg);
    `;

    container.appendChild(piece);
  }

  setTimeout(() => {
    container.innerHTML = '';
  }, 5000);
}

// ===========================
// COPY UPI
// ===========================
function copyUPI() {
  const upiId = document.getElementById('upi-id').textContent;
  navigator.clipboard.writeText(upiId).then(() => {
    const btn = document.getElementById('copy-text');
    btn.textContent = '✓ Copied!';
    setTimeout(() => (btn.textContent = 'Copy'), 2000);
  }).catch(() => {
    const ta = document.createElement('textarea');
    ta.value = upiId;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    const btn = document.getElementById('copy-text');
    btn.textContent = '✓ Copied!';
    setTimeout(() => (btn.textContent = 'Copy'), 2000);
  });
}

// ===========================
// POPUP
// ===========================
function showSuccessPopup() {
  const popup = document.getElementById('success-popup');
  popup.classList.add('active');
  document.body.style.overflow = 'hidden';

  const inner = document.getElementById('popup-confetti');
  inner.innerHTML = '';
  const colors = ['#a855f7','#ec4899','#22d3ee','#fbbf24'];
  for (let i = 0; i < 30; i++) {
    const dot = document.createElement('div');
    const color = colors[i % colors.length];
    const size = 4 + Math.random() * 6;
    dot.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      background: ${color};
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation: confettiFall ${2 + Math.random() * 2}s linear forwards;
      animation-delay: ${Math.random() * 1}s;
    `;
    inner.appendChild(dot);
  }
}

function closePopup() {
  const popup = document.getElementById('success-popup');
  popup.classList.remove('active');
  document.body.style.overflow = '';
}

document.addEventListener('click', (e) => {
  const popup = document.getElementById('success-popup');
  if (e.target === popup) closePopup();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closePopup();
});

// ===========================
// FAQ TOGGLE
// ===========================
function toggleFaq(el) {
  const isOpen = el.classList.contains('open');
  document.querySelectorAll('.faq-item.open').forEach((item) => {
    item.classList.remove('open');
  });
  if (!isOpen) {
    el.classList.add('open');
  }
}

// ===========================
// MOBILE NAV TOGGLE
// ===========================
function toggleMobileNav() {
  const hamburger = document.getElementById('hamburger');
  const drawer = document.getElementById('mobile-drawer');
  const isOpen = drawer.classList.contains('open');
  if (isOpen) {
    closeMobileNav();
  } else {
    hamburger.classList.add('open');
    drawer.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeMobileNav() {
  const hamburger = document.getElementById('hamburger');
  const drawer = document.getElementById('mobile-drawer');
  hamburger.classList.remove('open');
  drawer.classList.remove('open');
  document.body.style.overflow = '';
}

function initMobileNav() {
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) closeMobileNav();
  });
}

// ===========================
// HOVER SPARKLES
// ===========================
function initHoverSparkles() {
  const buttons = document.querySelectorAll('.cta-btn, .submit-btn, .copy-btn, .nav-cta');
  buttons.forEach((btn) => {
    btn.addEventListener('mouseenter', () => { btn.style.filter = 'brightness(1.1)'; });
    btn.addEventListener('mouseleave', () => { btn.style.filter = ''; });
  });
}

// ===========================
// GLOW CURSOR TRAIL
// ===========================
function initCursorTrail() {
  if (window.matchMedia('(pointer: coarse)').matches) return;
  document.addEventListener('mousemove', (e) => {
    const trail = document.createElement('div');
    trail.style.cssText = `
      position: fixed;
      left: ${e.clientX - 4}px;
      top: ${e.clientY - 4}px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: rgba(168, 85, 247, 0.5);
      pointer-events: none;
      z-index: 9997;
      transition: opacity 0.5s ease;
      box-shadow: 0 0 8px rgba(168, 85, 247, 0.6);
    `;
    document.body.appendChild(trail);
    setTimeout(() => {
      trail.style.opacity = '0';
      setTimeout(() => trail.remove(), 500);
    }, 50);
  });
}

// ===========================
// ACTIVE NAV LINKS
// ===========================
function initActiveSections() {
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-links a');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          links.forEach((link) => {
            link.style.color = '';
            if (link.getAttribute('href') === `#${entry.target.id}`) {
              link.style.color = 'var(--purple)';
            }
          });
        }
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach((s) => observer.observe(s));
}

// ===========================
// INIT ALL
// ===========================
document.addEventListener('DOMContentLoaded', () => {
  initDateAndCountdown();
  initNavbar();
  createParticles();
  createBalloons();
  initScrollReveal();
  initHoverSparkles();
  initMobileNav();
  initCursorTrail();
  initActiveSections();

  setTimeout(() => {
    document.querySelectorAll('.hero .reveal').forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), i * 120);
    });
  }, 100);
});