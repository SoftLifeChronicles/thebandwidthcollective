/* ============================================================
   WORKSHOP CONFIGURATION — The Bandwidth Collective™
   From Clues to Capacity™ (recurring live workshop)

   THIS IS THE ONLY FILE YOU EDIT FOR EACH NEW WORKSHOP.

   For every new workshop, update exactly TWO values:
     1. workshopDateTime  — the date + start time (US Central Time)
     2. zoomRegistrationUrl — the Zoom registration link

   Every date, day-of-week, timezone conversion, CTA button label,
   and page title across the whole site is generated automatically
   from these values. Never edit dates directly in the HTML.
   ============================================================ */

var WORKSHOP_CONFIG = {

  /* ── 1. WORKSHOP DATE & START TIME ────────────────────────
     ISO format: "YYYY-MM-DDTHH:MM:00"
     Enter the time in US CENTRAL TIME (America/Chicago).
     Do NOT add a timezone offset — daylight saving is handled
     automatically.

     Example: a workshop on Saturday August 1, 2026 at 9:00 AM
     Central would be:  "2026-08-01T09:00:00"
  */
  workshopDateTime: "2026-08-01T09:00:00",

  /* ── 2. ZOOM REGISTRATION URL ─────────────────────────────
     The free-registration link for the CURRENT workshop.
     This single value populates every "Register Free" button
     on the landing page and all three thank-you pages.
  */
  zoomRegistrationUrl: "https://us06web.zoom.us/j/86128271167?pwd=mbUh4Rv3SFQqEIM1SqRun9R4wplQgo.1",

  /* ── PRIVATE SESSION (private-session.html only) ──────────
     The invitation-only second date, for people who can't make
     the main workshop. Sent by private link; not linked from
     the main page. Same two-value update rule applies here.
     After August 1, move these values up to the main settings
     above and update this block with the next private date.
  */
  privateSession: {
    workshopDateTime: "2026-08-15T09:00:00",
    zoomRegistrationUrl: "https://us06web.zoom.us/j/81732972924?pwd=VCZrZS3IHhGJHdJZ6maveMateb5bxu.1"
  },

  /* ── STABLE SETTINGS (rarely change) ──────────────────────
     Stripe payment links for the three paid entry points.
     These stay the same from workshop to workshop.
  */
  stripeLinks: {
    fullExperience: "https://buy.stripe.com/5kQdRbaZBbI69hneav5Ne0c",
    systemBook:     "https://buy.stripe.com/5kQbJ37Np9zYbpv0jF5Ne0h",
    book:           "https://buy.stripe.com/dRm00l9VxdQe8dj3vR5Ne0e"
  }

};
