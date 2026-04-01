# ThePipeline

Static HTML/CSS/JS coach dashboard. No build step.

## Layout

| Path | Purpose |
|------|--------|
| `*.html` | Pages at site root (required for GitHub Pages when source is `/`) |
| `assets/js/` | Shared JavaScript |
| `scripts/` | Local dev server (`serve.py`) |
| `docs/` | Mirror of deployable files for GitHub Pages **/docs** branch folder |
| `archive/` | Bundled reference zips (not loaded by the app) |

## Commands

```bash
npm start          # http://127.0.0.1:8080 — serves repo root
npm run sync-docs  # After editing HTML/JS, refresh docs/ if you publish from /docs
```

## GitHub Pages

- **Source `/ (root)`:** uses files in the repository root + `assets/`.
- **Source `/docs`:** run `npm run sync-docs` before pushing so `docs/` matches root.
