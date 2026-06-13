/* ===========================
   BANGALORE EXIT PARTY 2026
   script.js
=========================== */

// ===========================
// DATE & COUNTDOWN
// ===========================
function getTomorrowDate() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  d.setHours(19, 0, 0, 0); // 7:00 PM tomorrow
  return d;
}

function formatDate(d) {
  return d.toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function updateCountdown() {
  const target = getTomorrowDate();
  const now = new Date();
  const diff = target - now;

  if (diff <= 0) {
    document.getElementById('cd-hours').textContent = '00';
    document.getElementById('cd-mins').textContent = '00';
    document.getElementById('cd-secs').textContent = '00';
    return;
  }

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const mins  = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const secs  = Math.floor((diff % (1000 * 60)) / 1000);

  const pad = (n) => String(n).padStart(2, '0');
  document.getElementById('cd-hours').textContent = pad(hours);
  document.getElementById('cd-mins').textContent  = pad(mins);
  document.getElementById('cd-secs').textContent  = pad(secs);
}

function initDateAndCountdown() {
  const tomorrow = getTomorrowDate();
  const formatted = formatDate(tomorrow);
  const el1 = document.getElementById('event-date');
  const el2 = document.getElementById('info-date');
  if (el1) el1.textContent = formatted;
  if (el2) el2.textContent = formatted;

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
function launchConfetti(targetEl) {
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
// FILE UPLOAD HANDLER
// ===========================
function handleFileUpload(input) {
  const zone = document.getElementById('upload-zone');
  const label = document.getElementById('upload-label');

  if (input.files && input.files[0]) {
    const file = input.files[0];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (file.size > maxSize) {
      document.getElementById('err-screenshot').textContent = 'File too large. Max 5MB.';
      input.value = '';
      zone.classList.remove('uploaded');
      label.textContent = 'Click to upload your payment screenshot';
      return;
    }

    zone.classList.add('uploaded');
    label.innerHTML = `✅ ${file.name}`;
    document.getElementById('err-screenshot').textContent = '';
  }
}

// ===========================
// FORM VALIDATION
// ===========================
function validateForm() {
  let valid = true;

  const clear = (id) => (document.getElementById(id).textContent = '');
  const setErr = (fieldId, errId, msg) => {
    const field = document.getElementById(fieldId);
    document.getElementById(errId).textContent = msg;
    field.classList.add('invalid');
    valid = false;
  };
  const setOk = (fieldId) => {
    document.getElementById(fieldId).classList.remove('invalid');
  };

  // Clear all errors
  ['err-name','err-email','err-mobile','err-address','err-amount','err-txn','err-screenshot']
    .forEach(clear);

  // Name
  const name = document.getElementById('fullname').value.trim();
  if (!name || name.length < 2) {
    setErr('fullname', 'err-name', 'Please enter your full name.');
  } else { setOk('fullname'); }

  // Email
  const email = document.getElementById('email').value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    setErr('email', 'err-email', 'Please enter a valid email address.');
  } else { setOk('email'); }

  // Mobile
  const mobile = document.getElementById('mobile').value.trim().replace(/\s+/g, '');
  const mobileRegex = /^(\+91)?[6-9]\d{9}$/;
  if (!mobileRegex.test(mobile)) {
    setErr('mobile', 'err-mobile', 'Enter a valid 10-digit Indian mobile number.');
  } else { setOk('mobile'); }

  // Address
  const address = document.getElementById('address').value.trim();
  if (!address || address.length < 3) {
    setErr('address', 'err-address', 'Please enter your address or area.');
  } else { setOk('address'); }

  // Amount
  const amount = parseFloat(document.getElementById('amount').value);
  if (isNaN(amount) || amount < 25) {
    setErr('amount', 'err-amount', 'Minimum amount is ₹25. Please enter a valid amount.');
  } else { setOk('amount'); }

  // Transaction ID
  const txn = document.getElementById('txn').value.trim();
  if (!txn || txn.length < 6) {
    setErr('txn', 'err-txn', 'Enter a valid UPI transaction ID.');
  } else { setOk('txn'); }

  // Screenshot
  const screenshot = document.getElementById('screenshot');
  if (!screenshot.files || !screenshot.files[0]) {
    document.getElementById('err-screenshot').textContent = 'Please upload your payment screenshot.';
    valid = false;
  }

  return valid;
}

// ===========================
// SUBMIT FORM
// ===========================
function submitForm() {
  if (!validateForm()) {
    // Scroll to first error
    const firstErr = document.querySelector('.err:not(:empty)');
    if (firstErr) {
      firstErr.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    return;
  }

  // Show loading state
  const btn = document.querySelector('.submit-btn');
  const originalText = btn.innerHTML;
  btn.innerHTML = '<span>Submitting...</span><div class="btn-glow"></div>';
  btn.disabled = true;
  btn.style.opacity = '0.7';

  setTimeout(() => {
    btn.innerHTML = originalText;
    btn.disabled = false;
    btn.style.opacity = '1';
    showSuccessPopup();
    launchConfetti();
    resetForm();
  }, 1800);
}

// ===========================
// RESET FORM
// ===========================
function resetForm() {
  ['fullname','email','mobile','address','amount','txn'].forEach((id) => {
    const el = document.getElementById(id);
    el.value = '';
    el.classList.remove('invalid');
  });
  document.getElementById('screenshot').value = '';
  document.getElementById('upload-zone').classList.remove('uploaded');
  document.getElementById('upload-label').textContent = 'Click to upload your payment screenshot';
  ['err-name','err-email','err-mobile','err-address','err-amount','err-txn','err-screenshot']
    .forEach((id) => (document.getElementById(id).textContent = ''));
}

// ===========================
// POPUP
// ===========================
function showSuccessPopup() {
  const popup = document.getElementById('success-popup');
  popup.classList.add('active');
  document.body.style.overflow = 'hidden';

  // Mini confetti inside popup
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

// Close popup on overlay click
document.addEventListener('click', (e) => {
  const popup = document.getElementById('success-popup');
  if (e.target === popup) {
    closePopup();
  }
});

// Escape key closes popup
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
// SMOOTH SCROLL TO REGISTER
// ===========================
function scrollToRegister() {
  const target = document.getElementById('register');
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// ===========================
// DRAG & DROP ON UPLOAD ZONE
// ===========================
function initDragDrop() {
  const zone = document.getElementById('upload-zone');
  if (!zone) return;

  ['dragenter', 'dragover'].forEach((ev) => {
    zone.addEventListener(ev, (e) => {
      e.preventDefault();
      zone.style.borderColor = 'var(--purple)';
      zone.style.background = 'rgba(168, 85, 247, 0.12)';
    });
  });

  ['dragleave', 'drop'].forEach((ev) => {
    zone.addEventListener(ev, (e) => {
      e.preventDefault();
      zone.style.borderColor = '';
      zone.style.background = '';
    });
  });

  zone.addEventListener('drop', (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const input = document.getElementById('screenshot');
      const dt = new DataTransfer();
      dt.items.add(files[0]);
      input.files = dt.files;
      handleFileUpload(input);
    }
  });
}

// ===========================
// SPARKLE ON HOVER (Glow)
// ===========================
function initHoverSparkles() {
  const buttons = document.querySelectorAll('.cta-btn, .submit-btn, .copy-btn, .nav-cta');
  buttons.forEach((btn) => {
    btn.addEventListener('mouseenter', () => {
      btn.style.filter = 'brightness(1.1)';
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.filter = '';
    });
  });
}

// ===========================
// ANIMATED COUNTER
// ===========================
function animateCounter(el, end, duration = 2000) {
  let start = 0;
  const step = end / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= end) {
      el.textContent = end;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(start);
    }
  }, 16);
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
  // Close drawer on resize to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) closeMobileNav();
  });
}

// ===========================
// GLOW CURSOR TRAIL
// ===========================
function initCursorTrail() {
  if (window.matchMedia('(pointer: coarse)').matches) return; // skip on touch
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
// SMOOTH ACTIVE NAV LINKS
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
  initDragDrop();
  initHoverSparkles();
  initMobileNav();
  initCursorTrail();
  initActiveSections();

  // Trigger reveal for hero items on load
  setTimeout(() => {
    document.querySelectorAll('.hero .reveal').forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), i * 120);
    });
  }, 100);
});