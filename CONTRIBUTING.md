# Contributing to Jetti

Thanks for considering a contribution. This repo is the **public face of Jetti** — docs, the install CLI source, and the developer landing page at [`rossres.github.io/jetti/`](https://rossres.github.io/jetti/). The hosted Jetti server (the React app, snippet runtime, owner monitor, and apply CLI source) lives in a separate app monorepo.

## What lives here

- `scripts/jetti-install.mjs` — the install CLI (Node, no dependencies).
- `docs/index.html` — the dev landing page, served via GitHub Pages.
- `README.md` and the rest of the public-facing scaffolding.

## What does NOT live here

- The Jetti server, snippet runtime, owner monitor, or the apply CLI source. Those live in the app monorepo. PRs that try to add server code here will be redirected.

## Getting set up

```bash
git clone https://github.com/rossres/jetti.git
cd jetti
node --check scripts/jetti-install.mjs   # this is what CI runs
```

You'll need Node 20+. The install CLI has no npm dependencies.

To test the CLI against a real Jetti instance:

```bash
mkdir /tmp/test-app && echo '<!doctype html><html><head></head><body></body></html>' > /tmp/test-app/index.html

node scripts/jetti-install.mjs \
  --api-origin https://jetti.co \
  --target-url https://example.com \
  --session-name "Test review" \
  --creator-email you@example.com \
  --root /tmp/test-app
```

## Where to start

- Check [open issues labeled `good first issue`](https://github.com/rossres/jetti/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22).
- The highest-leverage contributions today are **framework adapters** for `scripts/jetti-install.mjs` — Next.js (app router + pages router), Webflow, Shopify, GTM. The Vite/React and plain-HTML adapters in there show the shape.
- The dev landing page (`docs/index.html`) is self-contained HTML with inline CSS. Visual polish, accessibility fixes, and copy improvements are welcome.

## What we will and won't merge

Jetti has hard boundaries:

- The snippet only runs on sites the developer installs it on. PRs that bypass access controls, capture sensitive data, clone third-party content, evade anti-bot systems, or confuse reviewers about the original site will be closed.
- The CLI must not exfiltrate environment variables, repo contents, or secrets.
- The dev landing page must not claim features that aren't shipped.

When in doubt, open a discussion first.

## Commit and PR style

- One logical change per PR. Smaller is better.
- Commit message: `fix(area): short summary` or `feat(area): short summary`.
- The PR description should answer: what, why, how to verify.
- The CI workflow runs `node --check scripts/jetti-install.mjs` and verifies required files exist. Both must pass.

## Reporting security issues

Please do not file public issues for security vulnerabilities. See [`SECURITY.md`](./SECURITY.md).
