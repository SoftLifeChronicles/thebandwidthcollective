// Netlify automatically runs this function whenever a form is submitted
// (the special "submission-created" trigger). It emails the registrant
// their Zoom link + calendar, and notifies Samone of the new signup.
//
// SETUP (one-time):
//   1. Create a free account at https://resend.com
//   2. Add & verify the domain thebandwidthcollective.com (Resend gives you DNS records to paste into Netlify DNS)
//   3. Create an API key in Resend
//   4. In Netlify: Site settings -> Environment variables -> add  RESEND_API_KEY = <your key>
//   5. Redeploy. Done.

const RESEND_API = "https://api.resend.com/emails";
const FROM = "The Bandwidth Collective <samone@thebandwidthcollective.com>";
const NOTIFY_TO = "samone@thebandwidthcollective.com";

const ZOOM = "https://us06web.zoom.us/j/83325512257?pwd=wxS9R0QEn5pvWzO7cVg2K1IxPAXmIm.1";
const GCAL = "https://calendar.google.com/calendar/render?action=TEMPLATE"
  + "&text=" + encodeURIComponent("From Clues to Capacity - Live Workshop")
  + "&dates=20260718T140000Z/20260718T160000Z"
  + "&details=" + encodeURIComponent("Your live From Clues to Capacity workshop.\nZoom: " + ZOOM)
  + "&location=" + encodeURIComponent("Zoom");

async function sendEmail(to, subject, html) {
  const key = process.env.RESEND_API_KEY;
  if (!key) { console.error("Missing RESEND_API_KEY env var"); return; }
  const res = await fetch(RESEND_API, {
    method: "POST",
    headers: { Authorization: "Bearer " + key, "Content-Type": "application/json" },
    body: JSON.stringify({ from: FROM, to: [to], reply_to: NOTIFY_TO, subject, html })
  });
  if (!res.ok) console.error("Resend error", res.status, await res.text());
}

function attendeeHtml(name) {
  const hi = name ? ("Hi " + name + ",") : "Welcome to the Collective,";
  return `
  <div style="font-family:Arial,Helvetica,sans-serif;color:#16130F;max-width:560px;margin:0 auto;">
    <p style="letter-spacing:.12em;text-transform:uppercase;color:#B8862C;font-size:12px;font-weight:700;">Welcome to the Collective</p>
    <h1 style="font-size:24px;margin:6px 0 14px;">You're in. Your seat is saved.</h1>
    <p>${hi}</p>
    <p>You're registered for the live <strong>From Clues to Capacity&#8482;</strong> workshop. It's not burnout &mdash; it's a Bandwidth Tax&#8482;, and we'll help you read the clues and reallocate your capacity.</p>
    <p style="background:#F4EEE1;border-radius:8px;padding:16px 18px;">
      <strong>&#128197; Saturday, July 18, 2026</strong><br>
      9:00&ndash;11:00 AM CST &middot; 3:00&ndash;5:00 PM Portugal &middot; 9:00&ndash;11:00 PM Thailand
    </p>
    <p style="margin:22px 0;">
      <a href="${ZOOM}" style="background:#B8862C;color:#fff;text-decoration:none;font-weight:700;padding:14px 26px;border-radius:4px;display:inline-block;">Join on Zoom (July 18) &rarr;</a>
    </p>
    <p><a href="${GCAL}" style="color:#B8862C;font-weight:700;">+ Add to Google Calendar</a> so it's waiting for you.</p>
    <p style="margin-top:24px;">See you there. Here in The Collective, we read the clues, name the strain, and reallocate capacity with clarity.</p>
    <p>&mdash; Samone</p>
    <hr style="border:none;border-top:1px solid #e5ddc9;margin:24px 0;">
    <p style="font-size:12px;color:#8a8272;">The Bandwidth Collective&#8482; &middot; Diagnose. Stabilize. Reallocate.</p>
  </div>`;
}

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body || "{}");
    const payload = body.payload || {};
    const formName = payload.form_name || (payload.data && payload.data["form-name"]);

    // Only act on the workshop free-registration form
    if (formName !== "workshop-register") {
      return { statusCode: 200, body: "ignored (" + formName + ")" };
    }

    const data = payload.data || {};
    const email = (data.email || "").trim();
    const name = (data.name || "").trim();
    if (!email) return { statusCode: 200, body: "no email" };

    // 1) Email the registrant their Zoom link + calendar
    await sendEmail(email, "You're in — your Zoom link for From Clues to Capacity™ (July 18)", attendeeHtml(name));

    // 2) Notify Samone of the new signup
    await sendEmail(
      NOTIFY_TO,
      "New workshop registration: " + (name || "(no name)") + " <" + email + ">",
      "<p><strong>" + (name || "Someone") + "</strong> just registered for the July 18 workshop.</p><p>Email: " + email + "</p>"
    );

    return { statusCode: 200, body: "sent" };
  } catch (e) {
    console.error("submission-created error", e);
    return { statusCode: 200, body: "error" };
  }
};
