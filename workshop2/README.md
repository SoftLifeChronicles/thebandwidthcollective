# workshop2 — From Clues to Capacity™ recurring workshop pages

Reusable landing page + thank-you pages for The Bandwidth Collective™ recurring
**From Clues to Capacity™** live workshop. Built as a clean-room rebuild: plain
HTML/CSS/JS, no build process, no dependencies, ready for static publishing.

## File structure

```
workshop2/
├── index.html                    ← the landing page
├── styles.css                    ← shared brand styling (all pages)
├── workshop-config.js            ← ⭐ THE ONLY FILE YOU EDIT
├── workshop.js                   ← fills dates/links everywhere (don't edit)
├── private-session.html          ← invitation-only alternate date (send by private link)
├── thank-you-full-experience-41vbtf81.html
├── thank-you-system-book-1liz7zpn.html
├── thank-you-book-x57j2fdr.html
└── README.md
```

## ⭐ For each new workshop, edit `workshop-config.js` — nothing else

Only **two values** change per workshop:

### 1. The workshop date & start time

Enter the date/time in **US Central Time**, ISO format `YYYY-MM-DDTHH:MM:00`.
Daylight saving, Portugal time, and Thailand time are computed automatically.

```js
// Example: Saturday August 1, 2026 at 9:00 AM Central
workshopDateTime: "2026-08-01T09:00:00",
```

### 2. The Zoom registration URL

```js
// Example
zoomRegistrationUrl: "https://us06web.zoom.us/meeting/register/XXXXXXXX",
```

That's it. These two values automatically drive, on **every** page:

- the calendar date and day of the week
- US Central, Portugal, and Thailand times
- the live countdown timer
- every "Register Free" button (label **and** link)
- the browser page title

> ⚠️ **Never edit dates or Zoom links directly in the HTML files.** There are
> none there — every date/link is injected from `workshop-config.js`. Editing
> HTML for a date change is how duplicated, out-of-sync dates happen.

## Stable Stripe links (rarely change)

Also in `workshop-config.js`, under `stripeLinks`. Set once, keep across workshops:

```js
stripeLinks: {
  fullExperience: "REPLACE_WITH_FULL_EXPERIENCE_STRIPE_LINK",
  systemBook:     "REPLACE_WITH_SYSTEM_BOOK_STRIPE_LINK",
  book:           "REPLACE_WITH_BOOK_STRIPE_LINK"
}
```

## Stripe → thank-you page redirect mapping

In each Stripe payment link's settings, set the **after-payment confirmation
redirect** to the matching page (replace the domain with your live domain):

| Stripe offer                  | Redirect URL to enter in Stripe                                        |
|-------------------------------|------------------------------------------------------------------------|
| The Full Experience ($250)    | `https://thebandwidthcollective.com/workshop2/thank-you-full-experience-41vbtf81.html` |
| The System + The Book ($116.99) | `https://thebandwidthcollective.com/workshop2/thank-you-system-book-1liz7zpn.html` |
| The Book ($19.99)             | `https://thebandwidthcollective.com/workshop2/thank-you-book-x57j2fdr.html` |

The landing page never sends visitors to a thank-you page — only Stripe does,
after a successful payment. The random suffixes are deliberate: these pages ARE
the product delivery, so their URLs must not be guessable. Never link them from
any public page, and if a URL leaks, rename the file (new suffix), update Stripe,
and redeploy.

## Local testing

Open `index.html` directly in a browser (double-click), or from this folder run:

```bash
python -m http.server 8000
```

then visit `http://localhost:8000/`. Check the landing page and all three
thank-you pages; confirm the date, times, and countdown match the config.

## Publishing

The folder is fully static. Deploy it as-is with the rest of the site
(GitHub → Netlify). The pages will be live at `/workshop2/`. No build step,
environment variables, or redirects are required.

## Known limitation (JavaScript disabled)

Dates and registration links are injected by JavaScript. With JS disabled, the
page shows neutral fallback text ("Date at registration") and a notice with a
contact email instead of live dates. All narrative content remains readable.
