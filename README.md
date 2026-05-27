# Florida Mobile Health Website

Complete bilingual (Spanish/English) website for floridamobilehealth.com.

## File Structure

```
fmh/
├── index.html          Home page
├── services.html       All clinical services
├── programs.html       Care programs + Stripe checkout
├── pricing.html        All pricing — visits, programs, videos, messaging
├── shop.html           Video shop with filter + Stripe
├── book.html           Book a visit — session type selector + Stripe
├── for-practices.html  B2B — FL local contracts + virtual telehealth
├── contact.html        Contact page
├── css/
│   └── main.css        All styles — brand colors, components, responsive
├── js/
│   ├── layout.js       Shared nav + footer (injected into every page)
│   └── main.js         Interactions — tabs, filters, Stripe, Calendly
└── images/             Add your images here
```

---

## STEP 1 — Set up GitHub repo

1. Go to https://github.com/new
2. Name: `florida-mobile-health`
3. Set to **Public** (required for free Hostinger GitHub deploy)
4. Do NOT check "Add README" — leave it empty
5. Click **Create repository**

---

## STEP 2 — Push this code to GitHub

Open Terminal (Mac) or Command Prompt (Windows) in this folder:

```bash
git init
git add .
git commit -m "Initial site build"
git branch -M main
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/florida-mobile-health.git
git push -u origin main
```

Replace `YOUR_GITHUB_USERNAME` with your actual GitHub username.

---

## STEP 3 — Connect GitHub to Hostinger

1. Log into Hostinger dashboard
2. Go to your hosting plan → **Websites**
3. Click **Deploy Your Node.js Web App** (the screen you already saw)
4. Click **Connect with GitHub**
5. Authorize Hostinger to access your GitHub
6. Select repo: `florida-mobile-health`
7. Branch: `main`
8. Build command: *(leave empty — this is a static HTML site)*
9. Start command: *(leave empty)*
10. Click **Deploy**

> This site is plain HTML/CSS/JS — no build step needed. Hostinger serves the files directly.

---

## STEP 4 — Point your domain

In Hostinger DNS settings, make sure `floridamobilehealth.com` points to your hosting plan. This is usually already done if you registered the domain with Hostinger.

---

## STEP 5 — Connect Stripe (payments)

You need a free Stripe account at stripe.com.

### For each paid item, create a Payment Link in Stripe:

| Item | Amount | Type |
|---|---|---|
| New patient visit (60 min) | $200 | One-time |
| Follow-up (30 min) | $120 | One-time |
| Follow-up brief (15 min) | $75 | One-time |
| Diabetes/GLP-1 consult | $200 | One-time |
| Hormone consult | $200 | One-time |
| Nutrition consult | $150 | One-time |
| Senior concierge | $200 | One-time |
| Diabetes Reset Program | $499 | One-time |
| GLP-1 Starter Program | $349 | One-time |
| Annual Health Pack | $599 | One-time |
| Family Program | $999 | One-time |
| Messaging Basic | $49 | Monthly recurring |
| Messaging Plus | $89 | Monthly recurring |
| Messaging Family | $149 | Monthly recurring |
| Video: Ozempic guide | $19 | One-time |
| Video: Menopause | $29 | One-time |
| Video: HRT | $29 | One-time |
| Video: Nutrition | $19 | One-time |
| Diabetes video series | $49 | One-time |
| Hormones video series | $59 | One-time |
| Full library annual | $99 | One-time |

### After creating each Stripe Payment Link:

Copy the URL (looks like `https://buy.stripe.com/xxxxxxxx`) and paste it into the matching `data-stripe="#"` attribute in the HTML files.

Example — in `book.html`, find:
```html
data-stripe="#"
```
Replace `#` with your Stripe link URL.

---

## STEP 6 — Connect Calendly (booking)

1. Create a free account at calendly.com
2. Set up your availability and event types
3. Copy your Calendly URL (e.g. `https://calendly.com/your-name`)
4. In `book.html`, find the `pay-and-book` button and update the redirect after payment to open your Calendly URL

---

## STEP 7 — Add your videos

Videos are currently placeholders. To add real videos:

**Option A (YouTube — free):**
1. Upload your video to YouTube
2. Copy the video ID from the URL (e.g., `https://youtube.com/watch?v=ABCD1234` → ID is `ABCD1234`)
3. In `shop.html`, replace `REPLACE_VIDEO_ID` with the actual ID

**Option B (Vimeo — more control):**
Same process but with Vimeo embed URLs.

---

## STEP 8 — Add your photo

Replace the `ML` initials circle in the About section with your actual photo:

In `index.html` and `services.html`, find:
```html
<div class="avatar">ML</div>
```

Replace with:
```html
<img src="/images/michele.jpg" alt="Michele Li Causi FNP-BC" style="width:72px;height:72px;border-radius:50%;object-fit:cover">
```

Add your photo as `images/michele.jpg`.

---

## STEP 9 — Google Business Profile (critical for local SEO)

Go to https://business.google.com and create/claim your listing.
- Business name: Florida Mobile Health
- Category: Nurse Practitioner
- Service area: All of Florida (+ AZ, NM, CO, UT for telehealth)
- Add your phone, website, hours
- Request reviews from existing patients

This is the single highest-impact SEO action you can take.

---

## Future updates

To update the site after it's live:
1. Edit the HTML files on your computer
2. Run: `git add . && git commit -m "Update" && git push`
3. Hostinger auto-deploys the new version

---

## Support

- Phone: 352-399-8874
- Email: info@floridamobilehealth.com
