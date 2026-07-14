# Direct Upload Legacy Note

This website package is now configured for Cloudflare Workers Static Assets with GitHub integration.

Direct Upload is not the recommended production path for this package. Use the root-level `README.md` and `CLOUDFLARE_START_OVER_GUIDE.md` instead.

Recommended deployment path:

```text
GitHub repo -> Jason's Cloudflare account -> Workers Git integration -> Workers Static Assets
```

Recommended build settings:

```text
Build command: npm run build
Deploy command: npm run deploy
Root directory: blank
Production branch: main
```
