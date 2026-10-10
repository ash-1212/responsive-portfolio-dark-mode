/* =============================================
   TASK 3 + 4 — MAIN JAVASCRIPT
   Theme Toggle | Navbar | Hamburger |
   Scroll Animations | Portfolio Filter |
   Skill Bars | Form | Back to Top | Active Nav
============================================= */

// ── 1. THEME TOGGLE (Task 4 – Dark/Light + localStorage)
const html          = document.documentElement;
const themeToggle   = document.getElementById('themeToggle');

// Check system preference as fallback
const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const savedTheme = localStorage.getItem('theme') || (systemDark ? 'dark' : 'light');

// Apply saved/system theme on load
html.setAttribute('data-theme', savedTheme);

themeToggle?.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next    = current === 'light' ? 'dark' : 'light';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

// Listen for system theme changes (if user hasn't manually set one)
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
  if (!localStorage.getItem('theme')) {
    html.setAttribute('data-theme', e.matches ? 'dark' : 'light');
  }
});

// ── 2. AOS INIT
AOS.init({ duration: 700, once: true, offset: 50 });

// ── 3. NAVBAR SCROLL EFFECT
const mainNav = document.getElementById('mainNav');

window.addEventListener('scroll', () => {
  mainNav?.classList.toggle('scrolled', window.scrollY > 60);
  handleBackToTop();
  highlightActiveNav();
});

// ── 4. HAMBURGER MENU
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-link');

hamburger?.addEventListener('click', toggleMenu);

function toggleMenu() {
  const isOpen = hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
  mobileMenu.setAttribute('aria-hidden', !isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
}

// Close mobile menu on link click
mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', false);
    mobileMenu.setAttribute('aria-hidden', true);
    document.body.style.overflow = '';
  });
});

// Close on Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && hamburger?.classList.contains('open')) toggleMenu();
});

// ── 5. ACTIVE NAV HIGHLIGHT ON SCROLL
const sections  = document.querySelectorAll('section[id]');
const navItems  = document.querySelectorAll('.nav-link-item');

function highlightActiveNav() {
  let current = '';
  sections.forEach(sec => {
    const top    = sec.offsetTop - 100;
    const bottom = top + sec.offsetHeight;
    if (window.scrollY >= top && window.scrollY < bottom) {
      current = sec.getAttribute('id');
    }
  });

  navItems.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

// ── 6. SKILL BARS ANIMATION (triggers when section is visible)
const skillBars = document.querySelectorAll('.skill-bar-fill');

const skillObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animated');
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

skillBars.forEach(bar => skillObserver.observe(bar));

// ── 7. PORTFOLIO FILTER
const filterBtns    = document.querySelectorAll('.pf-btn');
const portfolioCards = document.querySelectorAll('.portfolio-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', function () {
    filterBtns.forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-selected', 'false');
    });
    this.classList.add('active');
    this.setAttribute('aria-selected', 'true');

    const filter = this.dataset.filter;

    portfolioCards.forEach(card => {
      const cat = card.dataset.category;
      const show = filter === 'all' || cat === filter;
      card.classList.toggle('hidden', !show);
      // Animate in
      if (show) {
        card.style.animation = 'none';
        card.offsetHeight; // reflow
        card.style.animation = 'fadeInUp 0.4s ease forwards';
      }
    });
  });
});

// ── 8. CONTACT FORM (fake submit with validation)
const contactForm   = document.getElementById('contactForm');
const formSuccess   = document.getElementById('formSuccess');

contactForm?.addEventListener('submit', function (e) {
  e.preventDefault();

  const name    = document.getElementById('contactName').value.trim();
  const email   = document.getElementById('contactEmail').value.trim();
  const subject = document.getElementById('contactSubject').value.trim();
  const message = document.getElementById('contactMessage').value.trim();

  if (!name || !email || !subject || !message) {
    alert('Please fill in all fields.');
    return;
  }

  // Email format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert('Please enter a valid email address.');
    return;
  }

  // Simulate sending
  const submitBtn = contactForm.querySelector('button[type="submit"]');
  submitBtn.textContent = 'Sending...';
  submitBtn.disabled = true;

  setTimeout(() => {
    formSuccess.classList.remove('d-none');
    contactForm.reset();
    submitBtn.innerHTML = 'Send Message <i class="bi bi-send"></i>';
    submitBtn.disabled = false;
    setTimeout(() => formSuccess.classList.add('d-none'), 5000);
  }, 1200);
});

// ── 9. BACK TO TOP
const backToTopBtn = document.getElementById('backToTop');

function handleBackToTop() {
  backToTopBtn?.classList.toggle('visible', window.scrollY > 400);
}

backToTopBtn?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ── 10. FOOTER YEAR
document.getElementById('footerYear').textContent = new Date().getFullYear();

// ── 11. SMOOTH SCROLL for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});