/* ============================================================
   workshop.js — The Bandwidth Collective™
   Reads WORKSHOP_CONFIG (workshop-config.js) and populates every
   date, time, link, and title on the page automatically. Also
   powers the countdown, scroll-reveal, and sticky register bar.

   DO NOT put workshop dates or URLs in this file.
   Edit workshop-config.js instead.
   ============================================================ */

(function () {
  "use strict";

  var TZ_CENTRAL  = "America/Chicago";
  var TZ_PORTUGAL = "Europe/Lisbon";
  var TZ_THAILAND = "Asia/Bangkok";

  /* ── Convert the config's Central-time ISO string to an exact
        instant, handling daylight saving automatically. ── */

  function tzOffsetMs(utcMs, timeZone) {
    var parts = {};
    new Intl.DateTimeFormat("en-US", {
      timeZone: timeZone,
      year: "numeric", month: "2-digit", day: "2-digit",
      hour: "2-digit", minute: "2-digit", second: "2-digit",
      hour12: false
    }).formatToParts(new Date(utcMs)).forEach(function (p) {
      parts[p.type] = p.value;
    });
    var wallAsUtc = Date.UTC(
      +parts.year, +parts.month - 1, +parts.day,
      parts.hour === "24" ? 0 : +parts.hour, +parts.minute, +parts.second
    );
    return wallAsUtc - utcMs;
  }

  function centralToInstant(isoLocal) {
    var n = isoLocal.split(/[-T:]/).map(Number);
    var wall = Date.UTC(n[0], n[1] - 1, n[2], n[3] || 0, n[4] || 0, n[5] || 0);
    var utc = wall;
    /* two passes to settle on the correct offset near DST edges */
    for (var i = 0; i < 2; i++) {
      utc = wall - tzOffsetMs(utc, TZ_CENTRAL);
    }
    return new Date(utc);
  }

  /* ── 1. Dates, times, titles, and links from the config ── */

  if (typeof WORKSHOP_CONFIG !== "undefined") {
    /* A page can opt into an alternate session (e.g. the private
       second date) via <body data-workshop-source="privateSession">.
       Everything else falls back to the main settings. */
    var sourceKey = document.body.getAttribute("data-workshop-source");
    var override = (sourceKey && WORKSHOP_CONFIG[sourceKey]) || null;
    var dateISO = (override && override.workshopDateTime) || WORKSHOP_CONFIG.workshopDateTime;
    var zoomUrl = (override && override.zoomRegistrationUrl) || WORKSHOP_CONFIG.zoomRegistrationUrl;

    var when = centralToInstant(dateISO);

    if (!isNaN(when.getTime())) {

      var fmt = function (options, timeZone) {
        options.timeZone = timeZone || TZ_CENTRAL;
        return new Intl.DateTimeFormat("en-US", options).format(when);
      };

      var derived = {
        /* "Saturday" */
        "workshop-weekday": fmt({ weekday: "long" }),
        /* "August 1, 2026" */
        "workshop-date-long": fmt({ month: "long", day: "numeric", year: "numeric" }),
        /* "August 1" — CTA button labels */
        "workshop-date-short": fmt({ month: "long", day: "numeric" }),
        /* "9:00 AM CDT" */
        "workshop-time-central": fmt({ hour: "numeric", minute: "2-digit", timeZoneName: "short" }),
        /* "3:00 PM" */
        "workshop-time-portugal": fmt({ hour: "numeric", minute: "2-digit" }, TZ_PORTUGAL),
        /* "9:00 PM" */
        "workshop-time-thailand": fmt({ hour: "numeric", minute: "2-digit" }, TZ_THAILAND),
        /* "Saturday, August 1, 2026" */
        "workshop-date-full": fmt({ weekday: "long", month: "long", day: "numeric", year: "numeric" })
      };

      Object.keys(derived).forEach(function (key) {
        var nodes = document.querySelectorAll("[data-" + key + "]");
        for (var i = 0; i < nodes.length; i++) {
          nodes[i].textContent = derived[key];
        }
      });

      /* Page title (template lives on <body data-title-template>) */
      var template = document.body.getAttribute("data-title-template");
      if (template) {
        document.title = template.replace("{date}", derived["workshop-date-short"]);
      }

      /* Countdown — hidden until populated; hides itself once live */
      var countdown = document.querySelector("[data-countdown]");
      if (countdown) {
        var dEl = countdown.querySelector("[data-count-days]");
        var hEl = countdown.querySelector("[data-count-hours]");
        var mEl = countdown.querySelector("[data-count-mins]");
        var tick = function () {
          var left = when.getTime() - Date.now();
          if (left <= 0) {
            countdown.hidden = true;
            return;
          }
          var mins = Math.floor(left / 60000);
          if (dEl) dEl.textContent = String(Math.floor(mins / 1440));
          if (hEl) hEl.textContent = String(Math.floor((mins % 1440) / 60));
          if (mEl) mEl.textContent = String(mins % 60);
          countdown.hidden = false;
          setTimeout(tick, 30000);
        };
        tick();
      }
    }

    /* Zoom registration links — single source: config */
    var zoomLinks = document.querySelectorAll("a[data-zoom-link]");
    for (var z = 0; z < zoomLinks.length; z++) {
      zoomLinks[z].setAttribute("href", zoomUrl);
    }

    /* Stripe links — stable settings in config */
    var stripeLinks = document.querySelectorAll("a[data-stripe]");
    for (var s = 0; s < stripeLinks.length; s++) {
      var key = stripeLinks[s].getAttribute("data-stripe");
      if (WORKSHOP_CONFIG.stripeLinks && WORKSHOP_CONFIG.stripeLinks[key]) {
        stripeLinks[s].setAttribute("href", WORKSHOP_CONFIG.stripeLinks[key]);
      }
    }

    /* Product delivery buttons (thank-you pages) — a button only
       appears once its config URL is real; while any button in a
       downloads section is unconfigured, the fallback note shows. */
    var productBtns = document.querySelectorAll("a[data-product]");
    for (var p = 0; p < productBtns.length; p++) {
      var pk = productBtns[p].getAttribute("data-product");
      var pUrl = WORKSHOP_CONFIG.productLinks && WORKSHOP_CONFIG.productLinks[pk];
      if (pUrl && pUrl.indexOf("REPLACE_WITH") !== 0) {
        productBtns[p].setAttribute("href", pUrl);
        productBtns[p].hidden = false;
        var row = productBtns[p].closest ? productBtns[p].closest("[data-dl-item]") : null;
        if (row) row.hidden = false;
      }
    }
    var dlSections = document.querySelectorAll("[data-downloads]");
    for (var d = 0; d < dlSections.length; d++) {
      var visible = dlSections[d].querySelectorAll("a[data-product]:not([hidden])").length;
      var total = dlSections[d].querySelectorAll("a[data-product]").length;
      if (visible > 0) dlSections[d].hidden = false;
      if (visible === total) {
        var fb = dlSections[d].querySelector("[data-downloads-fallback]");
        if (fb) fb.hidden = true;
      }
    }
  }

  /* ── 2. Scroll-reveal (respects prefers-reduced-motion) ── */

  var reduceMotion = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length) {
    if (reduceMotion || !("IntersectionObserver" in window)) {
      for (var r = 0; r < revealEls.length; r++) revealEls[r].classList.add("in");
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });
      for (var v = 0; v < revealEls.length; v++) io.observe(revealEls[v]);
    }
  }

  /* ── 3. Sticky register bar (appears after the hero) ── */

  var bar = document.querySelector("[data-sticky-bar]");
  var hero = document.querySelector(".hero");
  if (bar && hero && "IntersectionObserver" in window) {
    bar.hidden = false;
    var barIo = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        bar.classList.toggle("show", !entry.isIntersecting);
      });
    }, { threshold: 0 });
    barIo.observe(hero);
  }

})();
