/* ==========================================================================
   RHEUMACARE — footer.js
   Injects the shared footer into any element with id="footer".
   ========================================================================== */

(function () {
  "use strict";

  var FOOTER_TEMPLATE = `
  <footer class="rc-footer">
    <div class="rc-container">
      <div class="row gy-5">
        <div class="col-lg-4 col-md-6">
          <a class="rc-footer-brand" href="index.html">
            <img src="assets/img/logo.svg" alt="RheumaCare logo" width="40" height="40">
            <span>Rheuma<em>Care</em></span>
          </a>
          <p class="rc-footer-about">
            A dedicated rheumatology &amp; autoimmune care center helping people move,
            live and feel better — through expert diagnosis, modern treatment and
            genuinely compassionate support.
          </p>
          <div class="rc-social">
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><i class="fa-brands fa-facebook-f"></i></a>
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
            <a href="https://x.com/" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><i class="fa-brands fa-x-twitter"></i></a>
            <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><i class="fa-brands fa-youtube"></i></a>
          </div>
        </div>

        <div class="col-lg-2 col-md-6 col-6">
          <h5 class="rc-footer-title">Explore</h5>
          <ul class="rc-footer-links">
            <li><a href="index.html">Home 1</a></li>
            <li><a href="home-2.html">Home 2</a></li>
            <li><a href="about.html">About Us</a></li>
            <li><a href="conditions-treated.html">Conditions</a></li>
            <li><a href="doctors.html">Doctors</a></li>
            <li><a href="services.html">Services</a></li>
            <li><a href="pricing.html">Pricing</a></li>
            <li><a href="blog.html">Blog</a></li>
            <li><a href="contact.html">Contact</a></li>
          </ul>
        </div>

        <div class="col-lg-3 col-md-6 col-6">
          <h5 class="rc-footer-title">Care &amp; Services</h5>
          <ul class="rc-footer-links">
            <li><a href="conditions-treated.html?search=Rheumatoid+Arthritis#conditions-directory">Rheumatoid Arthritis</a></li>
            <li><a href="conditions-treated.html?search=Lupus#conditions-directory">Lupus &amp; Autoimmune</a></li>
            <li><a href="conditions-treated.html?search=Osteoarthritis#conditions-directory">Osteoarthritis</a></li>
            <li><a href="conditions-treated.html?search=Gout#conditions-directory">Gout &amp; Crystal Disease</a></li>
            <li><a href="conditions-treated.html?search=Osteoporosis#conditions-directory">Osteoporosis</a></li>
            <li><a href="services.html">Infusion Therapy Day Suites</a></li>
          </ul>
        </div>

        <div class="col-lg-3 col-md-6">
          <h5 class="rc-footer-title">Visit Us</h5>
          <ul class="rc-footer-contact">
            <li><i class="fa-solid fa-location-dot"></i><span>120 Wellness Avenue, Suite 300<br>Boston, MA 02116</span></li>
            <li><i class="fa-solid fa-phone"></i><a href="tel:+18005550142">+1 (800) 555-0142</a></li>
            <li><i class="fa-solid fa-envelope"></i><a href="mailto:care@rheumacare.example">care@rheumacare.example</a></li>
            <li><i class="fa-regular fa-clock"></i><span>Mon–Fri 8:00–18:00 · Sat 9:00–13:00</span></li>
          </ul>
          <a class="btn rc-btn w-100 mt-2" href="contact.html"><i class="fa-regular fa-calendar-check"></i> Book Appointment</a>
        </div>
      </div>

      <div class="rc-footer-bottom">
        <p>&copy; <span data-year>2026</span> RheumaCare Center. All rights reserved.</p>
        <ul>
          <li><button type="button" class="rc-link-btn" data-bs-toggle="modal" data-bs-target="#rcModalPrivacy">Privacy Policy</button></li>
          <li><button type="button" class="rc-link-btn" data-bs-toggle="modal" data-bs-target="#rcModalTerms">Terms of Service</button></li>
          <li><button type="button" class="rc-link-btn" data-bs-toggle="modal" data-bs-target="#rcModalAccess">Accessibility</button></li>
        </ul>
      </div>
    </div>
  </footer>
  <button id="back-top" class="rc-back-top" type="button" aria-label="Back to top">
    <i class="fa-solid fa-arrow-up"></i>
  </button>
  `;

  /* -------------------------------------------------------------- Modals --
     Legal popups opened from the footer bottom links. */
  var MODALS_TEMPLATE = `
  <div class="modal fade rc-modal" id="rcModalPrivacy" tabindex="-1" aria-labelledby="rcModalPrivacyLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="rcModalPrivacyLabel"><i class="fa-solid fa-shield-halved me-2"></i>Privacy Policy</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p class="rc-modal-updated">Last updated: January 2026</p>
          <p>RheumaCare Center ("we", "us") is committed to protecting the privacy of our patients and website visitors. This policy explains what information we collect and how we use it.</p>
          <h6>Information we collect</h6>
          <p>We collect information you provide directly, such as your name, contact details and appointment requests, as well as technical data needed to operate this website securely.</p>
          <h6>How we use your information</h6>
          <ul>
            <li>To respond to appointment requests and enquiries</li>
            <li>To provide and coordinate your clinical care</li>
            <li>To send service updates you have opted into</li>
            <li>To meet legal and regulatory obligations</li>
          </ul>
          <h6>Sharing &amp; security</h6>
          <p>We never sell your personal information. Data is shared only with care providers involved in your treatment or where required by law, and is protected with appropriate technical and organisational safeguards.</p>
          <h6>Your rights</h6>
          <p>You may request access to, correction of, or deletion of your personal information at any time by contacting <a href="mailto:care@rheumacare.example">care@rheumacare.example</a>.</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="rc-btn" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>

  <div class="modal fade rc-modal" id="rcModalTerms" tabindex="-1" aria-labelledby="rcModalTermsLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="rcModalTermsLabel"><i class="fa-solid fa-file-contract me-2"></i>Terms of Service</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p class="rc-modal-updated">Last updated: January 2026</p>
          <p>By accessing and using this website you agree to the following terms. If you do not agree, please discontinue use of the site.</p>
          <h6>Use of the website</h6>
          <p>This website is provided for general information about our services. It does not constitute medical advice and should not be used as a substitute for a consultation with a qualified clinician.</p>
          <h6>Appointments &amp; enquiries</h6>
          <p>Submitting an appointment request does not confirm a booking. Our care coordinators will contact you to confirm a suitable time.</p>
          <h6>Intellectual property</h6>
          <p>All content, branding and design on this site are the property of RheumaCare Center and may not be reproduced without written permission.</p>
          <h6>Limitation of liability</h6>
          <p>We take care to keep information accurate but make no warranties as to its completeness. We are not liable for any loss arising from reliance on website content.</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="rc-btn" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>

  <div class="modal fade rc-modal" id="rcModalAccess" tabindex="-1" aria-labelledby="rcModalAccessLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="rcModalAccessLabel"><i class="fa-solid fa-universal-access me-2"></i>Accessibility</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p class="rc-modal-updated">Last updated: January 2026</p>
          <p>RheumaCare Center is committed to ensuring digital accessibility for people of all abilities. We continually improve the experience for everyone.</p>
          <h6>Our commitment</h6>
          <ul>
            <li>We aim to meet WCAG 2.1 Level AA standards</li>
            <li>We provide clear contrast in both light and dark modes</li>
            <li>We support keyboard navigation and screen readers</li>
            <li>We support right-to-left languages such as Arabic and Hebrew</li>
          </ul>
          <h6>Feedback</h6>
          <p>If you encounter an accessibility barrier, please contact us at <a href="mailto:care@rheumacare.example">care@rheumacare.example</a> or call <a href="tel:+18005550142">+1 (800) 555-0142</a> and we will work with you to provide the information you need.</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="rc-btn" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
  `;

  document.addEventListener("DOMContentLoaded", function () {
    var mount = document.getElementById("footer");
    if (mount) mount.innerHTML = FOOTER_TEMPLATE + MODALS_TEMPLATE;
  });
})();
