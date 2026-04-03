"use strict";

// Nav border on scroll
(function () {
  const nav = document.getElementById("site-nav");
  if (!nav) return;
  window.addEventListener("scroll", () => {
    nav.style.borderBottomColor = window.scrollY > 10 ? "#27272a" : "transparent";
  }, { passive: true });
})();

// Active nav — precise getBoundingClientRect scroll spy
(function () {
  const links = document.querySelectorAll(".nav-link");
  const path  = window.location.pathname;

  const setActive = (section) => {
    links.forEach((l) => l.classList.toggle("active", l.dataset.section === section));
  };

  // Non-home pages — match by path
  if (path.startsWith("/blog")) { setActive("blog"); return; }
  if (path !== "/" && path !== "/index.html") { setActive("home"); return; }

  const sectionIds = ["contact", "blog-preview", "skills", "experience", "about", "home"];

  const onScroll = () => {
    // Walk sections from bottom to top — first one whose top is above
    // the middle of the viewport wins
    const mid = window.innerHeight / 2;
    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      if (rect.top <= mid) {
        const navId = id === "blog-preview" ? "blog" : id;
        setActive(navId);
        return;
      }
    }
    setActive("home");
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll(); // run on load
})();

// Mobile nav
(function () {
  const toggle = document.getElementById("nav-toggle");
  const menu   = document.getElementById("mobile-menu");
  const nav    = document.getElementById("site-nav");
  if (!toggle || !menu) return;

  toggle.addEventListener("click", () => {
    const open = menu.classList.toggle("hidden") === false;
    toggle.setAttribute("aria-expanded", String(open));
  });

  menu.querySelectorAll(".nav-link").forEach((l) => {
    l.addEventListener("click", () => {
      menu.classList.add("hidden");
      toggle.setAttribute("aria-expanded", "false");
    });
  });

  document.addEventListener("click", (e) => {
    if (nav && !nav.contains(e.target)) {
      menu.classList.add("hidden");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
})();

// Scroll reveal
(function () {
  const targets = document.querySelectorAll(".reveal");
  if (!targets.length) return;

  if (!("IntersectionObserver" in window)) {
    targets.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  targets.forEach((el) => {
    const parent = el.parentElement;
    if (!parent) return;
    const siblings = [...parent.children].filter((c) => c.classList.contains("reveal"));
    el.style.setProperty("--reveal-delay", `${siblings.indexOf(el) * 80}ms`);
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          if (e.target.classList.contains("reveal-group")) {
            e.target.querySelectorAll(".reveal").forEach((child) =>
              child.classList.add("is-visible")
            );
          }
          observer.unobserve(e.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
  );

  targets.forEach((el) => observer.observe(el));
})();

// Skill bars — animate when scrolled into view
(function () {
  const cards = document.querySelectorAll(".skill-card");
  if (!cards.length || !("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.querySelectorAll(".bar-fill").forEach((b) => b.classList.add("bar-running"));
          observer.unobserve(e.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  cards.forEach((card) => observer.observe(card));
})();

// Contact form — Netlify AJAX
(function () {
  const form    = document.getElementById("contact-form");
  if (!form) return;
  const btn     = document.getElementById("submit-btn");
  const btnText = btn?.querySelector(".btn-text");
  const btnSend = btn?.querySelector(".btn-sending");
  const success = document.getElementById("form-success");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (btnText) btnText.classList.add("hidden");
    if (btnSend) btnSend.classList.remove("hidden");
    if (btn) btn.disabled = true;

    try {
      const res = await fetch(form.action || "/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(new FormData(form)).toString(),
      });
      if (res.ok) {
        form.classList.add("hidden");
        if (success) success.classList.remove("hidden");
      } else throw new Error(String(res.status));
    } catch {
      if (btnText) btnText.classList.remove("hidden");
      if (btnSend) btnSend.classList.add("hidden");
      if (btn) btn.disabled = false;
      alert("Something went wrong — please try again or email me directly.");
    }
  });
})();
