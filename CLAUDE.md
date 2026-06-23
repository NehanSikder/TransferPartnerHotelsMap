# TransferPartnerHotelsMap — Repo Conventions

These apply to every contributor and every agent working in this repo.
The git workflow below is **enforced** by branch protection on `main`
(direct pushes are blocked; changes must go through a PR).

## Git workflow (required)

Never commit feature work directly to `main`. For every change:

1. Branch off `main`: `git checkout -b feature/<short-name>`
2. Commit there using Conventional Commits (`feat:`, `fix:`, `chore:`, `refactor:`, `docs:`).
3. Verify the build is green: `npm run build`
4. Push the branch: `git push -u origin feature/<short-name>`
5. Open a PR: `gh pr create --fill`
6. Merge with a **merge commit** (not squash, not rebase) so the feature is one
   revertable unit: `gh pr merge --merge`
7. Merging to `main` auto-deploys to GitHub Pages (`.github/workflows/deploy.yml`).

## Why merge commits

A `--merge` (no-fast-forward) merge wraps each feature in a single merge commit, so an
entire feature can be rolled back in one command:

```bash
git revert -m 1 <merge-commit> && git push origin main
```

## Deploy

- `main` auto-deploys to https://nehansikder.github.io/TransferPartnerHotelsMap/
- Always confirm `npm run build` passes before opening a PR.

## Stack (for context)

- Client-only **React + Vite**, **Leaflet / OpenStreetMap**. No backend, no database.
- Editable data is JSON under `src/data/` (cards, currencies, hotel programs, transfer
  partners, seed hotels).
- Hotel sourcing is behind a provider seam in `src/providers/`; the map is behind
  `src/map/` (a `<MapView>` contract, swappable for Google Maps without touching the app).
