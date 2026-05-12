# Decap CMS Setup

This repository uses Decap CMS at `/admin` with content stored as MDX files under `content/**`. The public site behaves like a small self-hosted Notion/Obsidian publish system: metadata links generate graph edges, backlinks, related content, and weekly timelines.

## Collections

The CMS config defines these file-backed collections:

- `notes`
- `weekly_logs`
- `papers`
- `blogs`
- `resources`

Notes are intentionally unified. Use the `category`, `tags`, and `concepts` fields for research notes, deep learning notes, mathematics notes, course notes, programming notes, systems notes, book notes, and experiment notes.

## GitHub Backend

Update `public/admin/config.yml` before deploying:

```yaml
backend:
  name: github
  repo: Oshadha345/FYP1
  branch: main
  base_url: https://fyp-1-ten.vercel.app
  auth_endpoint: api/auth
```

Use the branch that Vercel deploys from.

## OAuth

Decap's GitHub backend requires an OAuth service between the browser and GitHub. This project includes the OAuth routes at:

```text
/api/auth
/api/callback
```

Create a GitHub OAuth app with:

```text
Homepage URL:
https://fyp-1-ten.vercel.app

Authorization callback URL:
https://fyp-1-ten.vercel.app/api/callback
```

Then set these Vercel environment variables:

```text
OAUTH_CLIENT_ID=<GitHub OAuth Client ID>
OAUTH_CLIENT_SECRET=<GitHub OAuth Client Secret>
```

For local authoring, run the Decap local backend and keep `local_backend: true`.

## Vercel Notes

On Vercel, `/admin` is served from `public/admin/index.html`. The CMS commits MDX files back to GitHub, then Vercel rebuilds from the pushed commit.

Required environment values for the built-in OAuth routes:

```bash
OAUTH_CLIENT_ID=...
OAUTH_CLIENT_SECRET=...
```

## Media and PDFs

Uploaded files are configured to land in `content/assets/uploads`. Example content references PDFs, cover images, and video embeds through frontmatter. If the app needs browser-served media URLs, add a build-time copy step or a Next route that exposes approved files from `content/assets/uploads`.

## Linking Model

Use these frontmatter fields to connect pages:

- `links`
- `related`
- `notes`
- `papers`
- `experiments`
- `datasets`
- `concepts`

References can be a bare slug such as `uncertainty-calibration` or a route-like value such as `papers/calibration-modern-neural-networks`.
