/* ============================================
   main.js - GTK4 Adwaita Academic Theme
   ============================================ */

(function () {
  'use strict';

  // --- Theme Toggle ---
  const THEME_KEY = 'theme-preference';

  function getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function getStoredTheme() {
    return localStorage.getItem(THEME_KEY);
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    updateThemeIcon(theme);
  }

  function updateThemeIcon(theme) {
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;
    const sunIcon = `<svg viewBox="0 0 24 24"><path d="M12 7a5 5 0 100 10 5 5 0 000-10zm0-3a1 1 0 01-1-1V1a1 1 0 112 0v2a1 1 0 01-1 1zm0 18a1 1 0 01-1-1v-2a1 1 0 112 0v2a1 1 0 01-1 1zm9-9h-2a1 1 0 110-2h2a1 1 0 110 2zM6 13H4a1 1 0 110-2h2a1 1 0 110 2zm12.36-6.95a1 1 0 01-.71-.29l-1.41-1.41a1 1 0 111.41-1.41l1.41 1.41a1 1 0 01-.7 1.7zm-14.14 14.14a1 1 0 01-.71-.29l-1.41-1.41a1 1 0 111.41-1.42l1.41 1.42a1 1 0 01-.7 1.7zm14.14 0a1 1 0 01-.7-1.7l1.41-1.42a1 1 0 111.41 1.42l-1.41 1.41a1 1 0 01-.71.29zM4.93 6.05a1 1 0 01-.7-1.7l1.41-1.41a1 1 0 111.41 1.41L5.64 5.76a1 1 0 01-.71.29z"/></svg>`;
    const moonIcon = `<svg viewBox="0 0 24 24"><path d="M21.64 13a1 1 0 00-1.05-.14 8.05 8.05 0 01-3.37.73A8.15 8.15 0 019.08 5.49a8.59 8.59 0 01.25-2 1 1 0 00-.67-1.13 1 1 0 00-1.16.41 10 10 0 1013.86 11.33 1 1 0 00.28-1.1z"/></svg>`;
    btn.innerHTML = theme === 'dark' ? sunIcon : moonIcon;
  }

  function initTheme() {
    const stored = getStoredTheme();
    applyTheme(stored || getSystemTheme());

    const btn = document.getElementById('theme-toggle');
    if (btn) {
      btn.addEventListener('click', function () {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        localStorage.setItem(THEME_KEY, next);
        applyTheme(next);
      });
    }

    // Listen to system changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
      if (!getStoredTheme()) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  }

  // --- Scroll Animations (IntersectionObserver) ---
  function initScrollAnimations() {
    const animElements = document.querySelectorAll('.anim-fade-up, .anim-fade-left, .anim-fade-right, .anim-scale-in');
    if (!animElements.length) return;

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    animElements.forEach(function (el) {
      observer.observe(el);
    });
  }

  // --- HeaderBar scroll effect ---
  function initHeaderbarScroll() {
    const headerbar = document.querySelector('.headerbar');
    if (!headerbar) return;

    let ticking = false;
    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(function () {
          if (window.scrollY > 10) {
            headerbar.classList.add('scrolled');
          } else {
            headerbar.classList.remove('scrolled');
          }
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  // --- Mobile Menu ---
  function initMobileMenu() {
    const toggle = document.getElementById('menu-toggle');
    const mobileNav = document.getElementById('mobile-nav');
    if (!toggle || !mobileNav) return;

    toggle.addEventListener('click', function () {
      toggle.classList.toggle('active');
      mobileNav.classList.toggle('open');
      document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
    });

    // Close on link click
    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        toggle.classList.remove('active');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // --- Smooth Scroll for anchor links ---
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        var href = this.getAttribute('href');
        if (href === '#') return;
        var target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          var offset = 60; // headerbar height + margin
          var y = target.getBoundingClientRect().top + window.pageYOffset - offset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      });
    });
  }

  // --- Active nav highlight ---
  function initNavHighlight() {
    const sections = document.querySelectorAll('.section[id]');
    const navLinks = document.querySelectorAll('.headerbar-nav a[href^="#"]');
    if (!sections.length || !navLinks.length) return;

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var id = entry.target.getAttribute('id');
            navLinks.forEach(function (link) {
              link.classList.toggle('active', link.getAttribute('href') === '#' + id);
            });
          }
        });
      },
      { threshold: 0.2, rootMargin: '-60px 0px -50% 0px' }
    );

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  // --- Init ---
  document.addEventListener('DOMContentLoaded', function () {
    initTheme();
    initScrollAnimations();
    initHeaderbarScroll();
    initMobileMenu();
    initSmoothScroll();
    initNavHighlight();
  });

  // Apply theme immediately to prevent flash
  (function () {
    var stored = localStorage.getItem(THEME_KEY);
    if (stored) {
      document.documentElement.setAttribute('data-theme', stored);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  })();
})();
