# Changelog

All notable changes to Jetti's public surface (this repo: docs, install CLI, dev landing page) are documented here. The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html) once it reaches 1.0.

For changes to the hosted Jetti server (the React app, snippet runtime, owner monitor, and apply CLI source), those live in a separate app monorepo and are tracked there.

## [Unreleased]

### Added

- **Depth-pass README sections** merged from a parallel session: "What it looks like in 60 seconds" (timed walkthrough), "Two review modes" (Quick text vs Full site), "What reviewers can do / can't do," "Compared to Loom / Figma comments / GitHub issues" (yes/no positioning table), expanded FAQ (8 product-grounded questions), and "The install contract" (three-surface explanation).
- README badge row trimmed: dropped redundant `web · jetti.co` and static `Status: pre-1.0` badges; added a live GitHub release badge linked to `/releases/latest` so the v0.4 mark in the hero ASCII is backed by a real release.
- Manual-quickstart `curl` block collapsed into `<details>` so the agent prompt remains the single visual focus above the fold.
- Framework support matrix rows linked to their tracking issues (#3 Next.js, #4 Webflow, #5 Shopify, #9 Astro, #12 GTM).

### Fixed

- README hero used to reference `.github/assets/hero-light.png` and `demo-install.gif` which don't exist yet — replaced with canonical JETTI ASCII banner and `┌─ status ─┐` panel until designer assets ship.

## [0.4.0] - 2026-05-08

First public Jetti release. Tracks the install skill version baked into `scripts/jetti-install.mjs` and matches the **v0.4 · skill** badge in the README.

### Added

- Initial public Jetti repo carved out from the internal app monorepo.
- **Substantive build-out** to make the repo feel like a real OSS project (per the BMAD-METHOD reference): `ROADMAP.md`, `CODE_OF_CONDUCT.md` (Contributor Covenant 2.1), `SUPPORT.md`, `AGENTS.md` (instructions for AI agents working on this repo), `package.json` (ready to publish as `@jetti/cli`), `docs/architecture.md` (full system overview with ASCII flow diagram and v1 schema example), `docs/install-recipes.md` (copy-paste instructions for Vite/React, plain HTML, Next.js both routers, Astro, Webflow, Shopify, GTM, Hugo/Jekyll/11ty), `examples/vite-react/`, `examples/plain-html/`.
- README with: Table of contents, "What Jetti does," agent + manual quickstarts, "Why Jetti" comparison, three concrete use cases (agency / founder / photo swaps), framework support matrix, privacy boundaries, repository layout map, contributing pointer, acknowledgments (BMAD / Bun / react.email), [star history embed](https://star-history.com/#rossres/jetti).
- `docs/index.html` — developer landing page served via GitHub Pages at [`rossres.github.io/jetti/`](https://rossres.github.io/jetti/). Carved out from the internal monorepo and rewired with `rossres/jetti` URLs.
- `scripts/jetti-install.mjs` — install CLI source.
- `LICENSE` (MIT), `CONTRIBUTING.md`, `SECURITY.md`.
- `.github/` scaffolding: CI syntax check + required-files job, dependabot, issue templates (with `framework-adapter` label), PR template.
- `.github/assets/social-preview.png` — temporary 1280×640 brand-kit social card (cream `#FDF9F0`, copper `#D97757` jetti wordmark with sticker shadow, honey `#FBBF24` accent squiggle, mono terminal panel with the install command, MIT · v0.4 · skill footer). Replaces the generic GitHub auto-OG when uploaded via Settings → Social preview. Designer's polished version replaces this later.
- 7 seed issues filed (3 framework adapters from a parallel session: #3 Next.js, #4 Webflow, #5 Shopify; 4 from this session: #9 Astro, #12 GTM, #13 publish `@jetti/cli`, #14 verification handshake).
- GitHub Discussions enabled.

[Unreleased]: https://github.com/rossres/jetti/compare/v0.4.0...main
[0.4.0]: https://github.com/rossres/jetti/releases/tag/v0.4.0
