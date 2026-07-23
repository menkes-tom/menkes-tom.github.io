/* ============================================
   Tom Menkes — Maker CV
   Interactions & Animations
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Navbar scroll effect ─────────────── */
  const nav = document.getElementById('nav');
  const handleScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  /* ── Mobile nav toggle ────────────────── */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('open');
      navLinks.classList.toggle('open');
    });

    // Close on link click
    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target)) {
        navToggle.classList.remove('open');
        navLinks.classList.remove('open');
      }
    });
  }

  /* ── Active nav highlighting ──────────── */
  const sections = document.querySelectorAll('.section, .hero');
  const navLinkEls = document.querySelectorAll('.nav-link');

  const observerNav = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinkEls.forEach(link => {
          link.classList.toggle('active',
            link.getAttribute('href') === `#${id}`
          );
        });
      }
    });
  }, {
    rootMargin: '-30% 0px -65% 0px',
    threshold: 0
  });

  sections.forEach(section => observerNav.observe(section));

  /* ── Scroll-triggered animations ──────── */
  const animElements = document.querySelectorAll('.animate-on-scroll');

  const observerAnim = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observerAnim.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.1
  });

  animElements.forEach(el => observerAnim.observe(el));

  /* ── Smooth anchor scrolling (fallback) ─ */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});
