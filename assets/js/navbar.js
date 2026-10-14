/* ==========================================================================
   RHEUMACARE — Rheumatology & Autoimmune Care Center
   --------------------------------------------------------------------------
   navbar.js
   Injects the shared public navigation bar into any element with id="navbar".
   Menu structure:
     - Home (dropdown): Home 1 — General, Home 2 — Clinic Focus
     - About (no dropdown)
     - Conditions Treated (no dropdown)
     - Doctors (no dropdown)
     - Services (no dropdown)
     - Pricing (no dropdown)
     - Blog (no dropdown)
     - Contact (no dropdown)
   Includes: brand, dark/light toggle, RTL/LTR toggle, Call Now + Book CTA.
   Load AFTER main.js at the end of <body>.
   ========================================================================== */

(function () {
  "use strict";

  var LOGO = "assets/img/logo.svg";

  var NAV_TEMPLATE = `
  <header class="rc-header fixed-top" id="rcHeader">
    <nav class="navbar navbar-expand-xl rc-navbar" aria-label="Main Navigation">
      <div class="rc-container">
        <a class="navbar-brand order-1" href="index.html" aria-label="RheumaCare home">
          <img src="${LOGO}" alt="RheumaCare logo" width="40" height="40">
          <span class="brand-text">Rheuma<em>Care</em></span>
        </a>

        <div class="collapse navbar-collapse order-4 order-xl-2" id="rcMainNav">
          <ul class="navbar-nav mx-auto mb-3 mb-xl-0">
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                aria-expanded="false" data-nav="home">Home</a>
              <ul class="dropdown-menu rc-dropdown">
                <li><a class="dropdown-item" href="index.html" data-nav="home-1">
                  <span class="di-title">Home 1</span>
                  <span class="di-sub">General Services Landing</span>
                </a></li>
                <li><a class="dropdown-item" href="home-2.html" data-nav="home-2">
                  <span class="di-title">Home 2</span>
                  <span class="di-sub">Clinic-Focus Landing</span>
                </a></li>
              </ul>
            </li>
            <li class="nav-item"><a class="nav-link" href="about.html" data-nav="about">About</a></li>
            <li class="nav-item"><a class="nav-link" href="conditions-treated.html" data-nav="conditions">Conditions</a></li>
            <li class="nav-item"><a class="nav-link" href="doctors.html" data-nav="doctors">Doctors</a></li>
            <li class="nav-item"><a class="nav-link" href="services.html" data-nav="services">Services</a></li>
            <li class="nav-item"><a class="nav-link" href="pricing.html" data-nav="pricing">Pricing</a></li>
            <li class="nav-item"><a class="nav-link" href="blog.html" data-nav="blog">Blog</a></li>
            <li class="nav-item"><a class="nav-link" href="contact.html" data-nav="contact">Contact</a></li>
            <li class="nav-item d-xl-none mt-3">
              <a class="btn rc-btn w-100" href="contact.html">Book Appointment</a>
            </li>
          </ul>
        </div>

        <div class="rc-nav-actions order-2 order-xl-3">
          <button class="rc-icon-btn" type="button" id="theme-toggle" title="Toggle dark / light mode" aria-label="Toggle theme">
            <span class="icon-sun"><i class="fa-solid fa-sun"></i></span>
            <span class="icon-moon"><i class="fa-solid fa-moon"></i></span>
          </button>
          <button class="rc-icon-btn d-none d-sm-inline-grid" type="button" id="dir-toggle"
            title="Toggle RTL / LTR layout" aria-label="Toggle direction">
            <span id="dir-label">RTL</span>
          </button>
          <a class="btn rc-btn d-none d-md-inline-flex" href="tel:+18005550142">
            <i class="fa-solid fa-phone"></i> Call Now
          </a>
          <a class="btn rc-btn d-none d-lg-inline-flex" href="contact.html">
            <i class="fa-regular fa-calendar-check"></i> Book Appointment
          </a>
        </div>

        <button class="navbar-toggler rc-toggler order-3 order-xl-4" type="button" data-bs-toggle="collapse"
          data-bs-target="#rcMainNav" aria-controls="rcMainNav" aria-expanded="false" aria-label="Toggle navigation">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            stroke-width="2.2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
        </button>
      </div>
    </nav>
  </header>
  `;

  function render() {
    var mount = document.getElementById("navbar");
    if (mount) mount.innerHTML = NAV_TEMPLATE;
    document.dispatchEvent(new Event("rc:nav-ready"));
  }

  function markActive() {
    var page = document.body.getAttribute("data-page") || "";
    if (!page) return;
    document.querySelectorAll('.rc-navbar [data-nav="' + page + '"]').forEach(function (el) {
      el.classList.add("active");
      if (el.classList.contains("dropdown-item")) {
        var toggle = document.querySelector('.rc-navbar .dropdown-toggle[data-nav="home"]');
        if (toggle) toggle.classList.add("active");
      }
    });
  }

  function initDropdownHover() {
    if (window.matchMedia("(min-width: 1200px)").matches) {
      document.querySelectorAll(".rc-navbar .nav-item.dropdown").forEach(function (item) {
        var menu = item.querySelector(".dropdown-menu");
        var timer = null;
        item.addEventListener("mouseenter", function () {
          clearTimeout(timer);
          menu.classList.add("show");
        });
        item.addEventListener("mouseleave", function () {
          clearTimeout(timer);
          timer = setTimeout(function () { menu.classList.remove("show"); }, 180);
        });
      });
    }
  }

  function onScroll() {
    var header = document.querySelector(".rc-header");
    var nav = document.querySelector(".rc-navbar");
    var isScrolled = window.scrollY > 24;
    if (header) {
      if (isScrolled) header.classList.add("rc-scrolled");
      else header.classList.remove("rc-scrolled");
    }
    if (nav) {
      if (isScrolled) nav.classList.add("rc-scrolled");
      else nav.classList.remove("rc-scrolled");
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    render();
    markActive();
    initDropdownHover();
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  });
})();
