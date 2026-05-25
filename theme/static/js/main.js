'use strict';

// Nav border on scroll
(function () {
  const nav = document.getElementById('site-nav');
  if (!nav) return;

  const threshold =
    parseInt(
      getComputedStyle(document.documentElement).getPropertyValue(
        '--scroll-threshold',
      ),
      10,
    ) || 10;

  window.addEventListener(
    'scroll',
    () => {
      nav.style.borderBottomColor =
        window.scrollY > threshold ? '#18181b' : 'transparent';
    },
    { passive: true },
  );
})();

// Active nav — precise getBoundingClientRect scroll spy
(function () {
  const links = document.querySelectorAll('.nav-link');
  const path = window.location.pathname;

  const setActive = (section) => {
    links.forEach((l) =>
      l.classList.toggle('active', l.dataset.section === section),
    );
  };

  if (path.startsWith('/blog')) {
    setActive('blog');
    return;
  }

  if (path !== '/' && path !== '/index.html') {
    setActive('home');
    return;
  }

  const sectionIds = [
    'contact',
    'blog-preview',
    'other-endeavours',
    'projects',
    'beyond',
    'skills',
    'experience',
    'about',
    'home',
  ];

  const onScroll = () => {
    const mid = window.innerHeight / 2;
    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      if (rect.top <= mid) {
        let navId = id;
        if (id === 'blog-preview') navId = 'blog';
        if (id === 'beyond') navId = 'skills';
        setActive(navId);
        return;
      }
    }
    setActive('home');
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  requestAnimationFrame(onScroll);
})();

// Mobile nav
(function () {
  const toggle = document.getElementById('nav-toggle');
  const menu = document.getElementById('mobile-menu');
  const nav = document.getElementById('site-nav');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const open = menu.classList.toggle('hidden') === false;
    toggle.setAttribute('aria-expanded', String(open));
  });

  menu.querySelectorAll('.nav-link').forEach((l) => {
    l.addEventListener('click', () => {
      menu.classList.add('hidden');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('click', (e) => {
    if (nav && !nav.contains(e.target)) {
      menu.classList.add('hidden');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !menu.classList.contains('hidden')) {
      menu.classList.add('hidden');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.focus();
    }
  });
})();

// Scroll reveal
(function () {
  const targets = document.querySelectorAll('.reveal');
  if (!targets.length) return;

  if (!('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  targets.forEach((el) => {
    const parent = el.parentElement;
    if (!parent) return;
    const siblings = [...parent.children].filter((c) =>
      c.classList.contains('reveal'),
    );
    el.style.setProperty('--reveal-delay', `${siblings.indexOf(el) * 80}ms`);
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          observer.unobserve(e.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
  );

  targets.forEach((el) => observer.observe(el));
})();

// Contact form
(function () {
  const form = document.getElementById('contact-form');
  if (!form) return;
  const btn = document.getElementById('submit-btn');
  const btnText = btn?.querySelector('.btn-text');
  const btnSend = btn?.querySelector('.btn-sending');
  const success = document.getElementById('form-success');
  const errorMsg = document.getElementById('form-error');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nameEl = document.getElementById('name');
    const emailEl = document.getElementById('email');
    const messageEl = document.getElementById('message');

    if (
      !nameEl.value.trim() ||
      !emailEl.value.trim() ||
      !messageEl.value.trim()
    ) {
      if (errorMsg) {
        errorMsg.textContent = 'Please fill in all fields before submitting.';
        errorMsg.classList.remove('hidden');
      }
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailEl.value.trim())) {
      if (errorMsg) {
        errorMsg.textContent = 'Please enter a valid email address.';
        errorMsg.classList.remove('hidden');
      }
      return;
    }

    if (btnText) btnText.classList.add('hidden');
    if (btnSend) btnSend.classList.remove('hidden');
    if (btn) btn.disabled = true;
    if (errorMsg) errorMsg.classList.add('hidden');

    try {
      const res = await fetch(form.action || '/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(new FormData(form)).toString(),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        form.reset();
        if (btnText) btnText.classList.remove('hidden');
        if (btnSend) btnSend.classList.add('hidden');
        if (btn) btn.disabled = false;
        if (success) success.classList.remove('hidden');
        setTimeout(() => {
          if (success) success.classList.add('hidden');
        }, 5000);
      } else throw new Error(String(res.status));
    } catch {
      if (btnText) btnText.classList.remove('hidden');
      if (btnSend) btnSend.classList.add('hidden');
      if (btn) btn.disabled = false;
      if (errorMsg) {
        errorMsg.textContent =
          'Something went wrong — please try again or email me directly.';
        errorMsg.classList.remove('hidden');
      }
    }
  });
})();

// Experience card "See more" toggle
window.toggleHighlights = function (btn) {
  const expanded = btn.dataset.expanded === 'true';
  const cardBody = btn.closest('.exp-card-body');
  if (!cardBody) return;

  cardBody.querySelectorAll('.exp-bullet').forEach((el, i) => {
    if (i >= 3) el.classList.toggle('hidden', expanded);
  });

  btn.dataset.expanded = String(!expanded);
  btn.textContent = !expanded ? 'See less ↑' : 'See more ↓';
};
