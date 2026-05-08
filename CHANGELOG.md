# Changelog

All notable changes to Jetti's public surface (this repo: docs, install CLI, dev landing page) are documented here. The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html) once it reaches 1.0.

For changes to the hosted Jetti server (the React app, snippet runtime, owner monitor, and apply CLI source), those live in a separate app monorepo and are tracked there.

## [Unreleased]

### Added
- Initial public Jetti repo carved out from the internal app monorepo.
- README with agent quickstart, manual quickstart, two-CLI overview, framework support matrix, privacy boundaries.
- `docs/index.html` — developer landing page served via GitHub Pages at [`rossres.github.io/jetti/`](https://rossres.github.io/jetti/).
- `scripts/jetti-install.mjs` — install CLI source (in-repo today; `npx @jetti/install` planned).
- `LICENSE` (MIT), `CONTRIBUTING.md`, `SECURITY.md`.
- `.github/` scaffolding: CI syntax check, dependabot, issue templates, PR template.

[Unreleased]: https://github.com/rossres/jetti/commits/main
