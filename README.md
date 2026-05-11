# Anantha Sai K — Portfolio Site

Single-page sidebar SPA personal portfolio. Mirrors the v3 resume across four navigable sections (About, Experience, Skills, Education) with a persistent PDF download.

**Stack**: single `index.html` + Tailwind via CDN + vanilla JS. No build step, no framework. Designed using the `ui-ux-pro-max` skill (palette + typography + motion).

## Run locally

The site works as a plain HTML page, but hash routing is more reliable behind a tiny local server:

```bash
cd "$(dirname "$0")"   # if not already in the folder
python3 -m http.server 8000
# Open http://localhost:8000
```

Or just double-click `index.html` to open in your browser.

## Files

| File | Purpose |
|---|---|
| `index.html` | Markup + Tailwind config + theme tokens (monochrome + #2563EB accent) |
| `script.js` | Hash routing, section swap, theme toggle, keyboard shortcuts (1–4) |
| `public/Anantha_Sai_Resume_CSM_2026.pdf` | The downloadable resume PDF |
| `vercel.json` | Vercel config — clean URLs + force `Content-Disposition: attachment` on the PDF |
| `README.md` | This file |

## Update content

All resume content lives inline in `index.html` (the four `<section>` blocks). When you update the source resume in `../Anantha_Sai_Resume_v3.md`:

1. Re-export the PDF and replace `public/Anantha_Sai_Resume_CSM_2026.pdf`.
2. Edit the inline section markup in `index.html` to match.
3. Commit + push — Vercel auto-deploys.

## Deploy to Vercel

This repo is set up to push to the personal GitHub account (`ananth-on-git`), with Vercel auto-deploying on push.

### One-time setup

```bash
# Switch gh CLI to personal account
gh auth switch -u ananth-on-git

# From inside this folder
git init
git config user.name "Anantha Sai"
git config user.email "ananthasai1510@gmail.com"

git add .
git commit -m "Initial portfolio site"

# Create the repo on personal GitHub + push
gh repo create anantha-sai-portfolio --public --source=. --push
```

### Connect to Vercel

1. Sign in at [vercel.com](https://vercel.com) with the same GitHub account.
2. Click **Add New… → Project**.
3. Import `anantha-sai-portfolio` from the repo list.
4. Leave all settings as defaults (Vercel auto-detects static sites). Click **Deploy**.
5. After ~30s the site is live at `anantha-sai-portfolio.vercel.app` (or your project's auto-name).

### Subsequent pushes

```bash
git add .
git commit -m "<message>"
git push
```

Vercel deploys on every push to `main`.

### Custom domain (optional, $10–15/yr)

- Buy a domain (Namecheap / Cloudflare / Porkbun).
- In Vercel → Project → Settings → Domains → Add your domain.
- Follow the DNS instructions Vercel shows (usually a CNAME or A record).

## Design rationale

Picks made via the `ui-ux-pro-max` skill (`python3 search.py "personal portfolio resume professional minimal editorial" --design-system`):

- **Pattern**: Sidebar SPA (resume-mirror requested by Anantha — adapted from the skill's Portfolio Grid).
- **Style**: Motion-Driven (subtle hover lifts, section-swap fades, fade-up entrances). Respects `prefers-reduced-motion`.
- **Palette**: Monochrome neutral (`#FAFAFA` bg, `#09090B` fg, `#18181B` primary) + single blue accent (`#2563EB`). Anti-SaaS-brochure, signals thoughtful operator.
- **Typography**: Archivo (display) + Space Grotesk (body) + JetBrains Mono (numbers in Impact tiles, dates).
- **Accessibility**: 4.5:1+ contrast both modes, keyboard nav (Tab + 1–4 shortcuts), `aria-label`s on icon buttons, `focus-visible` rings, reduced-motion respect, semantic headings.

## Keyboard shortcuts

| Key | Action |
|---|---|
| 1 | About |
| 2 | Experience |
| 3 | Skills |
| 4 | Education |
| Tab | Cycle through interactive elements |
