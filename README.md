# The Bandwidth Collective™ — website

Unified site for The Bandwidth Collective™. One brand, two doors — **For Individuals** and **For Organizations** — powered by the Bandwidth Tax™ framework.

## Pages
- `index.html` — homepage: hero, two doors, the 7-minute explainer (YouTube, click-to-play with branded poster), the Bandwidth Tax™ definition + four systems, the interactive "live reading" diagnostic, why-organizations, nonprofit callout, in-the-news (LinkedIn), research/Field Notes, The Bandwidth Note™ newsletter signup, the book, testimonials, email capture, footer.
- `research.html` — the Bandwidth Tax™ Field Notes (11-part evidence series).
- `faq.html` — frequently asked questions.
- `privacy.html` — plain-language privacy notice.
- `thank-you.html` — post-signup page delivering the free Chapter 1 download.
- `newsletter/` — The Bandwidth Note™ issues (PDF), named by topic.
- `youtube-thumbnail.jpg` / `.png` — branded poster for the explainer video.

## How it connects (link map & flows)
The homepage is one page with a shared spine; every CTA routes by intent, so you can tell *why* someone acted by *where* they land.

**Narrative spine (top to bottom):** hero (name the problem) → two doors (self-select) → 7-min explainer (video) → define the Bandwidth Tax™ + four systems → interactive live reading (feel it compound; learn that rest doesn't restore it, reallocation does) → why organizations → nonprofit callout → in the news → research → newsletter → book → testimonials → email capture → footer.

**For Individuals (B2C):**
- `Diagnose My Overwhelm` → Stan store, paid *From Clues to Capacity™* system → `…/p/the-bandwidth-reallocation-toolkit`
- `Read Chapter 1 — free` → Stan store free chapter → `…/p/free-chapter-1-of-overwhelm-leaves-clues`
- `Get the book →` → `overwhelm-leaves-clues-ebook.netlify.app/buy.html`
- `Subscribe to The Bandwidth Note™` → Netlify form **`newsletter`**
- Email capture (`Send my starting point`) → Netlify form **`start`** → redirects to `thank-you.html` → free Chapter 1 PDF download

**For Organizations (B2B):**
- `Request a Leadership Briefing`, `Let's Discuss How to Better Support Your Staff`, `Request a Staff Support Webinar` → Google Calendar booking → `calendar.app.google/UPkDCc2MFJ8vLJGb6`
- `In the news this week` → LinkedIn post (swap URL each week)

**Shared / education:**
- Explainer video → YouTube `njq3aYLHG1w`, click-to-play with `youtube-thumbnail.jpg` as the poster (no autoplay)
- Interactive diagnostic → self-contained JS; teaches capacity-capping (the % you can't operate from until you reallocate)
- `View all 11 Field Notes →` → `research.html`
- Footer: Contact → `mailto:samone@thebandwidthcollective.com`; FAQ → `faq.html`; Privacy → `privacy.html`; nav links scroll to on-page sections
- Soft Life Abroad™ → sister brand cross-link in the footer (text only for now; add its URL to link it)

**Why the routing splits this way:** pilots/briefings go to Calendar (bookings = enterprise intent), purchases/chapter go to Stan (orders = individual intent), and the newsletter has its own form — so the three lead types never mix and each shows up in its own place.

## Stack
Static HTML/CSS + a little vanilla JS (interactive diagnostic, click-to-play video). No build step. Fonts via Google Fonts (Playfair Display + Montserrat). Two Netlify Forms: `start` (email capture → thank-you → chapter) and `newsletter` (weekly note signup).

## Deploy (Netlify)
Connected to this repo for continuous deployment. **Publish directory = repo root** (files live at the top level). No build command. Netlify form detection is enabled.

## Brand notes
- Palette: ivory `#F4EEE1` · ink `#16130F` · gold `#C9A449` / `#B8862C`. Differentiate the two doors by copy + imagery only — never palette or type.
- Trademarks of Soft Life Chronicles LLC. "The Bandwidth Collective™" and "From Clues to Capacity™" pending formal clearance before heavy public reliance.
- Soft Life Abroad™ is a separate sister brand (light cross-link only).
- Old domains (softlifechronicles.com, softlifestrategy.io) are retired; old repos kept ~90 days as an HTML fallback.
