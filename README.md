# Hacker's House Golf Club Website v2.0

Interactive pre-launch website for Hacker's House Golf Club, prepared for Cloudflare Workers Static Assets with Git integration.

## Release Status

- Website version: **v2.0 — Immersive Charcoal Experience**
- Project folder: Marketing / Website
- Deployment method: Cloudflare Workers Builds with Git integration
- Public pricing: intentionally withheld pending owner approval and financial validation
- Lead generation: intentionally inactive until the production intake and response system is tested
- Market positioning: Denver / Westport and western Lake Norman near NC 16 and NC 73

## V1.2 Improvements

- Rebuilt the hero around the approved tagline: **Serious Golf. Questionable Swings.**
- Added an interactive simulator preview with Practice, League, and Event modes.
- Added a detailed interactive experience selector for practice, social play, leagues, and events.
- Replaced the six static membership cards with an interactive membership-path explorer.
- Added stronger event, hospitality, and location detail without publishing concrete pricing.
- Added a customer-facing FAQ with accessible accordion behavior.
- Added scroll reveal, active navigation, scroll progress, map pulse, and subtle card-tilt interactions.
- Added reduced-motion support and keyboard navigation for interactive sections.
- Removed the unfinished lead form and mail-to fallback.
- Added an honest “Founding List opens soon” section describing what will be available after lead intake is ready.
- Added a basic privacy page, canonical URL, structured data, improved metadata, and updated sitemap.

## V2.0 Experience Pass

- Reframed the site around a modern charcoal-first visual system while retaining approved cream, forest, and gold brand colors.
- Added a custom HH cursor for fine-pointer devices with a standard-cursor fallback on touch and reduced-motion devices.
- Added a scroll-driven Impact Lab with a dimensional club face, animated ball flight, and example impact data.
- Increased use of the approved HH broken-club icon as a subtle environmental motif.
- Preserved all pre-launch confidentiality gates and intentionally withheld claims.

## Repository Structure

```text
HHGC_Website_v1.2_REPO_ROOT/
├── README.md
├── CHANGELOG_v1.2.md
├── GITHUB_DEPLOYMENT_GUIDE.md
├── package.json
├── wrangler.jsonc
├── public/
│   ├── index.html
│   ├── privacy.html
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
    └── WEBSITE_LAUNCH_CHECKLIST.md
```

## Cloudflare Git Integration Settings

| Setting | Value |
|---|---|
| Production branch | `main` |
| Build command | `npm run build` |
| Deploy command | `npm run deploy` |
| Root directory | Leave blank / repository root |

The provided deployment log confirms this repository pattern is working: Cloudflare clones the repository, installs Wrangler, runs the no-op static build, reads assets from `public/`, and deploys through `npx wrangler deploy`.

## Local Preview

```bash
cd public
python3 -m http.server 8000
```

Open `http://localhost:8000`.

## Public Launch Gate

Before actively promoting the website:

1. Review all customer-facing claims with Daniel, Sam, and Jason.
2. Confirm `hackershousegolf.com` is the canonical hostname and redirect `www` to the root domain.
3. Test desktop, tablet, and mobile rendering.
4. Keep rates, exact address, simulator brand, opening date, and House Key terms unpublished until approved.
5. Connect lead generation only after submissions, confirmation messages, owner notifications, and backup storage are tested end to end.


## v1.2.2
- Integrated HH broken-club PNG mockup as immersive background and page art across the hero, memberships, events, location, FAQ, and updates sections.
- Preserved responsive layout for desktop, tablet, and mobile.
- Continued use of background layering rather than pasted standalone images.
