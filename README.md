# Hacker's House Golf Club Website v1.1

Static pre-opening website for Hacker's House Golf Club, prepared for deployment through Cloudflare Workers Git integration using Workers Static Assets.

## Project Status

- Website version: v1.1 Brand Polish Pass
- Folder: Marketing / Website
- Deployment target: Cloudflare Workers Static Assets with GitHub integration
- Public pricing: intentionally withheld pending final owner approval
- Launch positioning: coming soon to Lake Norman / Denver / Westport near NC 16 and NC 73

## V1.1 Updates

- Replaced the public-facing hero copy with a more polished, hospitality-first version.
- Removed the visible technical mail-to fallback note from the website.
- Replaced internal-facing phrases such as "Details Pending" and "base plan" with customer-facing launch-interest language.
- Updated CTA hierarchy to prioritize Founding Member list capture and corporate/private event interest.
- Replaced simple emoji/symbol icons with clean monoline SVG icons.
- Replaced the prototype location graphic with the approved Local Market Map from the Business Plan.
- Added transparent logo assets so the logo sits cleanly on the site background instead of appearing as an inserted image block.
- Updated favicon/app icon assets using the approved HH broken-club icon artwork.

## Repository Structure

```text
HHGC_Cloudflare_Workers_Static_v1.1/
├── README.md
├── CLOUDFLARE_START_OVER_GUIDE.md
├── package.json
├── wrangler.jsonc
├── public/
│   ├── index.html
│   ├── 404.html
│   ├── styles.css
│   ├── script.js
│   ├── robots.txt
│   ├── sitemap.xml
│   ├── site.webmanifest
│   ├── _headers
│   ├── _redirects
│   └── assets/
└── docs/
    ├── WEBSITE_LAUNCH_CHECKLIST.md
    └── README_DEPLOY_TO_CLOUDFLARE_DIRECT_UPLOAD_LEGACY.md
```

## Cloudflare Workers Git Integration Settings

Use these settings when connecting the GitHub repository to Cloudflare Workers Builds:

| Setting | Value |
|---|---|
| Production branch | `main` |
| Build command | `npm run build` |
| Deploy command | `npm run deploy` |
| Root directory | Leave blank / repository root |

The repository root must contain `public/`, `wrangler.jsonc`, and `package.json` directly.

## Local Preview

Because this is a static site, you can preview it by opening `public/index.html` in a browser.

For a local server preview:

```bash
cd public
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Production Notes

Before public launch:

- Confirm official domain routing from Jason's Cloudflare account.
- Connect the lead form to a production endpoint, CRM, Google Form, or email automation platform.
- Keep rates, included bay time, league pricing, and event packages hidden until final approval.
- Add the final address only after site selection and lease approval.
- Add approved photography or renderings when available.
