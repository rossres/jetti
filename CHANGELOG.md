# Changelog

All notable changes to Jetti's public surface (this repo: docs, install CLI, dev landing page) are documented here. The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html) once it reaches 1.0.

For changes to the hosted Jetti server (the React app, snippet runtime, owner monitor, and apply CLI source), those live in a separate app monorepo and are tracked there.

## [Unreleased]

### Added

- Initial public Jetti repo carved out from the internal app monorepo.
- **Expanded README** with: Table of contents, "What Jetti does," Why Jetti (vs Loom/BugHerd/Figma/Marker), three concrete use cases, FAQ, Roadmap link, Repository layout map, Community + Support, Acknowledgments, and a [star history embed](https://star-history.com/#rossres/jetti).
- **`ROADMAP.md`** — milestone-tracked framework adapter plan, "Next" / "Later" / "Out of scope" sections.
- **`CODE_OF_CONDUCT.md`** — Contributor Covenant 2.1.
- **`SUPPORT.md`** — quick guide for where to ask, by question type.
- **`AGENTS.md`** — explicit instructions for AI agents working on this repo (what's safe to change, what's not, hard rules, honesty constraints).
- **`package.json`** — npm package metadata; sets up future `@jetti/cli` publish with `bin: jetti-install`.
- **`docs/architecture.md`** — full system overview: install contract, snippet runtime, handoff bundle, apply CLI. ASCII flow diagram, endpoint reference, schema versioning notes.
- **`docs/install-recipes.md`** — copy-paste install instructions for Vite/React, plain HTML, Next.js (app router + pages router), Astro, Webflow, Shopify themes, GTM, Hugo/Jekyll/11ty.
- **`examples/vite-react/`** — working `index.html` showing the patched snippet location, plus a README walking through the install flow on Vite.
- **`examples/plain-html/`** — minimal static page with the snippet installed and brand-aligned styling; serveable via `python3 -m http.server`.
- `docs/index.html` — developer landing page served via GitHub Pages at [`rossres.github.io/jetti/`](https://rossres.github.io/jetti/).
- `scripts/jetti-install.mjs` — install CLI source.
- `LICENSE` (MIT), `CONTRIBUTING.md`, `SECURITY.md`.
- `.github/` scaffolding: CI syntax check + required-files job, dependabot, issue templates, PR template.

### Fixed

- README hero used to reference `.github/assets/hero-light.png` and `demo-install.gif` which don't exist yet — replaced with canonical JETTI ASCII banner and `┌─ status ─┐` panel until designer assets ship.

[Unreleased]: https://github.com/rossres/jetti/commits/main
