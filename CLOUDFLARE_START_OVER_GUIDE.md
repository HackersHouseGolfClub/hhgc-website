# Hacker's House Golf Club Website v1.1 - Cloudflare Start-Over Guide

This package is configured for the Cloudflare Workers Git integration flow using Workers Static Assets.

## Required Cloudflare Settings

- Build command: `npm run build`
- Deploy command: `npm run deploy`
- Root directory: leave blank / repository root
- Production branch: `main`

## Required GitHub Repo Root

The repository root must show these files/folders directly:

```text
public/
wrangler.jsonc
package.json
README.md
CLOUDFLARE_START_OVER_GUIDE.md
```

Do not upload the folder that contains these files. Upload the contents of this folder into the repository root.

## Recommended Account Setup

Because the domain is managed in Jason's Cloudflare account, deploy this Worker from Jason's Cloudflare account, not from a separate personal Cloudflare account.

## Custom Domain Setup After Deployment

After the Worker deploys successfully, attach:

```text
hackershousegolf.com
www.hackershousegolf.com
```

from the Worker settings under Domains & Routes.
