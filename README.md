# IBM Bob Developer Day Canada — Event Website

Webpage built for IBM Bob Developer Day (June 15 2026, Markham & June 25, 2026 Ottawa). Built with plain HTML/CSS/JS on GitHub Pages with an Airtable backend for registrations and a client-side certificate generation system.


##  What to Update for Your Event

### 1. Event Details
Search the codebase for these placeholders and replace with your event's info:

- Event name, date, location   -    `index.html`  , hero section and `<title>` tag 
- Tracks (names, descriptions)  -     `index.html` , tracks section 
- Speaker / session content      -     `index.html` , schedule/agenda section 
- Footer text                     -     `index.html` , footer 

### 2. Airtable (Registration Backend)

The registration form submits to Airtable. You'll need your own Airtable base.

**Steps:**
1. Create a new Airtable base with these fields:
   - `Name` (Single line text)
   - `Email` (Email)
   - `Company` (Single line text)
   - `Track 1` (Single line text or dropdown)
   - `Track 2` (Single line text or dropdown)
2. Create an Airtable Personal Access Token with `data.records:write` scope on your base
3. In the registration form JS, replace:
   - `BASE_ID` → your Airtable Base ID (format: `appXXXXXXXXXXXXXX`)
   - `TABLE_NAME` → your table name
   - `AIRTABLE_TOKEN` → your Personal Access Token

> ! Do not commit your Airtable token to a public repo. Use a environment variable or a serverless proxy if this is sensitive.

### 3. QR Codes (Certificate System)

Each track has a unique QR code that links to the certificate page with a `?track=` URL parameter.

**Certificate URL format:**
```
https://yourdomain.com/certificate.html?track=A
```

**To generate new QR codes for your tracks:**
- Use any QR generator (e.g. qr-code-generator.com)
- Set the URL to `https://yourdomain.com/certificate.html?track=A` (replace `A` with B, C, D, etc.)

### 4. Certificate Design

The certificate is rendered client-side using HTML5 Canvas in `certificate.html`.

Key layout values to be aware of if you change the certificate background image:

| Element | Canvas Y position |
  Attendee name | Y ≈ 770 |
  Track name | Y ≈ 1050 |

If you swap the background image, adjust these Y values to match your new layout. The track label is pulled automatically from the `?track=` URL parameter and mapped to a full track name in the JS config object at the top of `certificate.html`.

---

## Certificate System — How It Works

1. Attendee scans the QR code at their session
2. QR code opens `certificate.html?track=A` (track letter in URL)
3. Attendee types their name into the input field
4. JavaScript renders their name + track onto a Canvas with the certificate background image
5. They click **Download** — a PNG is saved to their device, entirely client-side (no server needed)

---

##  Tech Stack

- **Hosting:** GitHub Pages (free, no backend)
- **Registrations:** Airtable (via REST API from the browser)
- **Certificates:** HTML5 Canvas (fully client-side)
- **Design:** IBM Carbon design system aesthetics (custom CSS, no Carbon dependency)
- **Domain:** GitHub Pages CNAME redirecting to https://ibmbobdevday.com

---

##  Questions?
Reach out to [heena.chauhan@ibm.com](mailto:heena.chauhan@ibm.com) with questions.
