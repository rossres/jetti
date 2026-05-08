# Changelog

All notable changes to Jetti's public surface (this repo: docs, install CLI, dev landing page) are documented here. The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html) once it reaches 1.0.

For changes to the hosted Jetti server (the React app, snippet runtime, owner monitor, and apply CLI source), those live in a separate app monorepo and are tracked there.

## [Unreleased]

### Added
- `.github/assets/social-preview.png` — temporary 1280×640 brand-kit social card (replaced when designer ships final).
- Latest-release badge in README pointing at the GitHub releases page.

### Changed
- README badge row trimmed from 6 → 5: dropped redundant `web · jetti.co` and static `Status: pre-1.0` badges; added a live GitHub release badge.
- README "Quickstart — without an agent" `curl` block collapsed into a `<details>` summary so the agent prompt remains the single visual focus above the fold.
- Framework support matrix rows linked to their tracking issues ([#3](https://github.com/rossres/jetti/issues/3) Next.js, [#4](https://github.com/rossres/jetti/issues/4) Webflow, [#5](https://github.com/rossres/jetti/issues/5) Shopify).

## [0.4.0] - 2026-05-08

First public Jetti release. Tracks the install skill version baked into `scripts/jetti-install.mjs` and matches the **v0.4 · skill** badge in the README.

### Added
- Initial public Jetti repo carved out from the internal app monorepo.
- README with agent quickstart, manual quickstart, two-CLI overview, framework support matrix, privacy boundaries.
- `docs/index.html` — developer landing page served via GitHub Pages at [`rossres.github.io/jetti/`](https://rossres.github.io/jetti/).
- `scripts/jetti-install.mjs` — install CLI source (in-repo today; `npx @jetti/install` planned).
- `LICENSE` (MIT), `CONTRIBUTING.md`, `SECURITY.md`.
- `.github/` scaffolding: CI syntax check, dependabot, issue templates, PR template.

[Unreleased]: https://github.com/rossres/jetti/compare/v0.4.0...main
[0.4.0]: https://github.com/rossres/jetti/releases/tag/v0.4.0
