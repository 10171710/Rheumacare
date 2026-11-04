/* ==========================================================================
   RHEUMACARE — main.js
   --------------------------------------------------------------------------
   Shared front-end behaviour:
     - Dark / light theme toggle (persisted, respects system preference)
     - RTL / LTR direction toggle (swaps Bootstrap RTL stylesheet)
     - Animated stat counters
     - Scroll reveal animations
     - Back-to-top button
     - Simple appointment form feedback
   ========================================================================== */

(function () {
  "use strict";

  var THEME_KEY = "rc-theme";
  var DIR_KEY = "rc-dir";

  /* ------------------------------------------------------------ Theme ---- */
  function applyTheme(theme) {
    document.documentElement.setAttribute("data-bs-theme", theme);
    try { localStorage.setItem(THEME_KEY, theme); } catch (e) {}
  }

  function initTheme() {
    var saved = null;
    try { saved = localStorage.getItem(THEME_KEY); } catch (e) {}
    if (!saved) {
      saved = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    applyTheme(saved);
  }

  /* -------------------------------------------------------- Direction ---- */
  var BS_LTR = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css";
  var BS_RTL = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.rtl.min.css";

  function applyDir(dir) {
    document.documentElement.setAttribute("dir", dir);
    var label = document.getElementById("dir-label");
    if (label) label.textContent = dir === "rtl" ? "LTR" : "RTL";
    var sheet = document.getElementById("bootstrap-css");
    if (sheet) sheet.setAttribute("href", dir === "rtl" ? BS_RTL : BS_LTR);
    try { localStorage.setItem(DIR_KEY, dir); } catch (e) {}
  }

  function initDir() {
    var saved = "ltr";
    try { saved = localStorage.getItem(DIR_KEY) || "ltr"; } catch (e) {}
    applyDir(saved);
  }

  /* -------------------------------------------------- Nav toggles -------- */
  /* The navbar (and its toggle buttons) is injected by navbar.js after this
     file loads, so we use event delegation on document instead of binding
     directly to the buttons. */
  function initNavToggles() {
    document.addEventListener("click", function (e) {
      var target = e.target;
      if (!(target instanceof Element)) return;

      if (target.closest("#theme-toggle")) {
        var nextTheme = document.documentElement.getAttribute("data-bs-theme") === "dark" ? "light" : "dark";
        applyTheme(nextTheme);
        return;
      }
      if (target.closest("#dir-toggle")) {
        var nextDir = document.documentElement.getAttribute("dir") === "rtl" ? "ltr" : "rtl";
        applyDir(nextDir);
      }
    });

    /* Re-sync the direction label once the navbar markup exists. */
    document.addEventListener("rc:nav-ready", function () {
      applyDir(document.documentElement.getAttribute("dir") || "ltr");
    });
  }

  /* ---------------------------------------------------------- Counters --- */
  function initCounters() {
    var counters = document.querySelectorAll("[data-count]");
    if (!counters.length) return;
    var run = function (el) {
      var target = parseFloat(el.getAttribute("data-count"));
      var suffix = el.getAttribute("data-suffix") || "";
      var decimals = (el.getAttribute("data-count").split(".")[1] || "").length;
      var start = null, dur = 1600;
      function step(ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = (target * eased).toFixed(decimals) + suffix;
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    };
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { run(en.target); io.unobserve(en.target); }
      });
    }, { threshold: 0.4 });
    counters.forEach(function (c) { io.observe(c); });
  }

  /* ---------------------------------------------------- Scroll reveal ---- */
  function initReveal() {
    var els = document.querySelectorAll("[data-reveal]");
    if (!els.length) return;
    if (!("IntersectionObserver" in window)) {
      els.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ------------------------------------------------------ Back to top ---- */
  function initBackTop() {
    var btn = document.getElementById("back-top");
    if (!btn) return;
    window.addEventListener("scroll", function () {
      btn.classList.toggle("is-on", window.scrollY > 500);
    }, { passive: true });
    btn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ------------------------------------------------- Appointment form --- */
  function initForms() {
    /* Keep the phone field to digits only, max 10. */
    document.querySelectorAll('input[type="tel"]').forEach(function (input) {
      input.addEventListener("input", function () {
        input.value = input.value.replace(/\D/g, "").slice(0, 10);
      });
    });

    /* Don't allow past dates in any preferred-date picker. */
    var d = new Date();
    var iso = d.getFullYear() + "-" +
      String(d.getMonth() + 1).padStart(2, "0") + "-" +
      String(d.getDate()).padStart(2, "0");
    document.querySelectorAll('input[type="date"]').forEach(function (input) {
      if (!input.min) input.min = iso;
    });

    document.querySelectorAll("form[data-appointment]").forEach(function (form) {
      var nameInput = form.querySelector('input[name="name"]');
      if (nameInput) {
        var checkName = function () {
          var val = (nameInput.value || "").trim();
          var letters = val.match(/[\p{L}]/gu) || val.match(/[A-Za-zÀ-ÿ]/g) || [];
          if (!val) {
            nameInput.setCustomValidity("Full name is mandatory.");
          } else if (letters.length < 2) {
            nameInput.setCustomValidity("Please enter at least 2 letters for your full name.");
          } else {
            nameInput.setCustomValidity("");
          }
        };
        nameInput.addEventListener("input", function () {
          if (nameInput.checkValidity()) {
            nameInput.setCustomValidity("");
          }
          checkName();
        });
      }

      form.addEventListener("submit", function (e) {
        e.preventDefault();
        if (nameInput) {
          var val = (nameInput.value || "").trim();
          var letters = val.match(/[\p{L}]/gu) || val.match(/[A-Za-zÀ-ÿ]/g) || [];
          if (!val) {
            nameInput.setCustomValidity("Full name is mandatory.");
          } else if (letters.length < 2) {
            nameInput.setCustomValidity("Please enter at least 2 letters for your full name.");
          } else {
            nameInput.setCustomValidity("");
          }
        }
        if (!form.checkValidity()) {
          form.reportValidity();
          return;
        }
        var note = form.querySelector("[data-form-note]");
        if (note) {
          note.classList.remove("d-none");
          note.textContent = "Thank you! Your request has been received — our care team will contact you within one business day.";
        }
        form.reset();
        if (nameInput) nameInput.setCustomValidity("");
      });
    });
  }

  /* -------------------------------------------------------------- Year --- */
  function initYear() {
    document.querySelectorAll("[data-year]").forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initTheme();
    initDir();
    initNavToggles();
    initCounters();
    initReveal();
    initBackTop();
    initForms();
    initYear();
  });
})();
