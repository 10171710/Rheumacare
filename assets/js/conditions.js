/* ==========================================================================
   RHEUMACARE — conditions.js
   --------------------------------------------------------------------------
   Interactive client-side functionality for conditions-treated.html:
     - Real-time search filter with symptom keywords
     - Category pill filtering (Inflammatory, Autoimmune, Degenerative, Crystal)
     - Interactive symptom navigator ("Where does it hurt?")
     - Pre-fill condition name into appointment modal
   Pure client-side JavaScript. Zero backend dependencies.
   ========================================================================== */

(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    var searchInput = document.getElementById("condSearchInput");
    var clearBtn = document.getElementById("condSearchClear");
    var countBadge = document.getElementById("condCountBadge");
    var filterBtns = document.querySelectorAll(".cond-filter-btn");
    var cards = document.querySelectorAll(".cond-card-item");
    var emptyState = document.getElementById("condEmptyState");
    var activeCategory = "all";

    function filterConditions() {
      var query = (searchInput ? searchInput.value : "").trim().toLowerCase();
      var visibleCount = 0;

      if (clearBtn) {
        clearBtn.style.display = query.length > 0 ? "block" : "none";
      }

      cards.forEach(function (col) {
        var card = col.querySelector(".cond-card");
        if (!card) return;

        var cat = card.getAttribute("data-category") || "";
        var title = (card.getAttribute("data-name") || "").toLowerCase();
        var keywords = (card.getAttribute("data-keywords") || "").toLowerCase();
        var bodyText = card.textContent.toLowerCase();

        var matchesCategory = activeCategory === "all" || cat === activeCategory;
        var matchesQuery = !query || title.includes(query) || keywords.includes(query) || bodyText.includes(query);

        if (matchesCategory && matchesQuery) {
          col.classList.remove("d-none");
          visibleCount++;
        } else {
          col.classList.add("d-none");
        }
      });

      if (countBadge) {
        countBadge.textContent = visibleCount + " condition" + (visibleCount === 1 ? "" : "s");
      }

      if (emptyState) {
        emptyState.style.display = visibleCount === 0 ? "block" : "none";
      }
    }

    // Category button click
    filterBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        filterBtns.forEach(function (b) { b.classList.remove("active"); });
        btn.classList.add("active");
        activeCategory = btn.getAttribute("data-filter") || "all";
        filterConditions();
      });
    });

    // Real-time search input
    if (searchInput) {
      searchInput.addEventListener("input", filterConditions);
    }

    // Clear search
    if (clearBtn) {
      clearBtn.addEventListener("click", function () {
        searchInput.value = "";
        filterConditions();
        searchInput.focus();
      });
    }

    function scrollToDirectory() {
      var targetSection = document.getElementById("conditions-directory");
      if (targetSection) {
        var navOffset = 90;
        var elementPosition = targetSection.getBoundingClientRect().top;
        var offsetPosition = elementPosition + window.pageYOffset - navOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    }

    // Quick filter from Symptom Navigator links
    document.addEventListener("click", function (e) {
      var target = e.target;
      if (!(target instanceof Element)) return;

      var trigger = target.closest("[data-book-condition]");
      if (trigger) {
        var condName = trigger.getAttribute("data-book-condition");
        var select = document.getElementById("cond-select");
        if (select && condName) {
          var found = false;
          for (var i = 0; i < select.options.length; i++) {
            if (select.options[i].value.toLowerCase().includes(condName.toLowerCase()) ||
                condName.toLowerCase().includes(select.options[i].value.toLowerCase())) {
              select.selectedIndex = i;
              found = true;
              break;
            }
          }
          if (!found) {
            var msg = document.getElementById("m-cond-msg");
            if (msg && !msg.value) {
              msg.value = "Consultation requested for: " + condName;
            }
          }
        }
      }

      var quickLink = target.closest("[data-quick-filter]");
      if (quickLink) {
        e.preventDefault();
        var condFilter = quickLink.getAttribute("data-quick-filter") || "";
        if (searchInput) {
          searchInput.value = condFilter;
          activeCategory = "all";
          filterBtns.forEach(function (b) {
            b.classList.toggle("active", b.getAttribute("data-filter") === "all");
          });
          filterConditions();
          scrollToDirectory();
        }
      }
    });

    // Handle incoming URL parameters (e.g. ?search=Lupus or ?category=autoimmune)
    function applyUrlFilters() {
      var params = new URLSearchParams(window.location.search);
      var searchQuery = params.get("search") || params.get("q") || params.get("condition");
      var categoryParam = params.get("category") || params.get("cat") || params.get("filter");
      var hash = (window.location.hash || "").replace("#", "").trim();

      var shouldScroll = false;

      if (categoryParam) {
        var catLower = categoryParam.toLowerCase();
        var matchedBtn = null;
        filterBtns.forEach(function (btn) {
          if ((btn.getAttribute("data-filter") || "").toLowerCase() === catLower) {
            matchedBtn = btn;
          }
        });

        if (matchedBtn) {
          filterBtns.forEach(function (b) { b.classList.remove("active"); });
          matchedBtn.classList.add("active");
          activeCategory = catLower;
          shouldScroll = true;
        } else if (!searchQuery) {
          searchQuery = categoryParam;
        }
      }

      if (searchQuery && searchInput) {
        searchInput.value = searchQuery;
        shouldScroll = true;
      }

      filterConditions();

      if (shouldScroll || hash === "conditions-directory") {
        setTimeout(scrollToDirectory, 200);
      }
    }

    // Initial filter run supporting incoming queries from other pages
    applyUrlFilters();
    window.addEventListener("popstate", applyUrlFilters);
  });
})();
