# HHGC Website v1.1 - GitHub Deployment Guide

This repository is configured for Cloudflare Workers Git integration with static assets.

## Step 1 - Upload to GitHub

Upload the contents of this folder to the root of the GitHub repository. The repository root should show:

```text
public/
wrangler.jsonc
package.json
README.md
CLOUDFLARE_START_OVER_GUIDE.md
```

## Step 2 - Connect from Jason's Cloudflare Account

Because `hackershousegolf.com` is managed in Jason's Cloudflare account, create/connect the Worker from that account.

## Step 3 - Cloudflare Build Settings

Use:

```text
Build command: npm run build
Deploy command: npm run deploy
Root directory: blank
Production branch: main
```

## Step 4 - Add Custom Domains

After deployment, add:

```text
hackershousegolf.com
www.hackershousegolf.com
```

from Worker Settings > Domains & Routes.

## Step 5 - Verify

Confirm desktop, mobile, form behavior, favicon, logo transparency, map display, and HTTPS loading.
