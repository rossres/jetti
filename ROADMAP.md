# Jetti Roadmap

This is a living document. Status reflects what's shipped on `main` and what's tracked by GitHub issues. Open issues are the source of truth for "what's actually being worked on"; this document gives the high-level shape.

## Now (in progress / next)

### Framework adapters for the install CLI

The install CLI today auto-detects two stacks: plain HTML and Vite + React. Everything else falls back to "manual snippet paste" via [`docs/install-recipes.md`](./docs/install-recipes.md).

| Adapter | Status | Issue |
|---|---|---|
| Plain HTML | ✅ shipped | — |
| Vite + React | ✅ shipped | — |
| Next.js (app router) | 🔜 design ready | [framework-adapter: Next.js app router](https://github.com/rossres/jetti/issues?q=is%3Aissue+label%3Aframework-adapter+nextjs+app) |
| Next.js (pages router) | 🔜 | [framework-adapter: Next.js pages router](https://github.com/rossres/jetti/issues?q=is%3Aissue+label%3Aframework-adapter+nextjs+pages) |
| Astro | 🔜 | [framework-adapter: Astro](https://github.com/rossres/jetti/issues?q=is%3Aissue+label%3Aframework-adapter+astro) |
| Webflow / custom code | 🔜 helper, not detection | [framework-adapter: Webflow](https://github.com/rossres/jetti/issues?q=is%3Aissue+label%3Aframework-adapter+webflow) |
| Shopify themes | 🔜 helper | [framework-adapter: Shopify](https://github.com/rossres/jetti/issues?q=is%3Aissue+label%3Aframework-adapter+shopify) |
| GTM | 🔜 helper | [framework-adapter: GTM](https://github.com/rossres/jetti/issues?q=is%3Aissue+label%3Aframework-adapter+gtm) |

The pattern for each adapter:

1. Detect the stack (e.g. `next.config.js` + `app/` directory → app router).
2. Identify the patch target (e.g. `app/layout.tsx`).
3. Insert the snippet preserving existing code style.
4. Return the changed-file path so the agent can verify.

See [`scripts/jetti-install.mjs`](./scripts/jetti-install.mjs) for the existing Vite/HTML implementations as a pattern reference.

### `npx @jetti/cli` published package

Today the install CLI is read in-repo. The roadmap is to publish a unified CLI that exposes:

- `npx @jetti/cli install` — wraps `scripts/jetti-install.mjs`
- `npx @jetti/cli apply <handoff-url>` — wraps the existing `npx jetti apply`

Tracked via [issue: publish @jetti/cli](https://github.com/rossres/jetti/issues?q=is%3Aissue+publish+jetti%2Fcli).

### Post-install verification handshake

After the snippet is installed, the CLI currently says "run app/build next" rather than confirming the snippet actually loaded. The roadmap is a brief polling step that confirms a heartbeat from the snippet runtime and updates the status panel from `pending` to `verified`.

Tracked via [issue: snippet heartbeat verification](https://github.com/rossres/jetti/issues?q=is%3Aissue+heartbeat).

## Next (after framework adapters)

### Self-host documentation

A clearer path for teams who want to run their own Jetti server. Today the recommendation is "use jetti.co"; the next step is publishing a deployment recipe (Railway, Fly, plain Docker) that lets a team run their own instance.

### Reviewer offline-friendly mode

The reviewer flow currently requires a live websocket back to the Jetti server. A queue-and-batch mode would let reviewers work in unstable network conditions and submit when reconnected.

### Handoff format versioning

Pin the handoff JSON schema to a published version so the apply CLI can refuse mismatched bundles cleanly.

## Later (parking lot)

These are tracked for context, not actively planned. Open a discussion if any of them feel urgent for your use case:

- **Multi-reviewer coordination** — multiple reviewers on one session with conflict resolution.
- **Reviewer voice notes** — Loom-style audio with each text edit, optional.
- **PR-level review mode** — Jetti runs on a deployed preview URL and the handoff targets the PR branch directly.
- **Localization** — reviewer UI in non-English locales.
- **Terminal companion app** — desktop overlay for the developer's terminal that watches the install/apply flow.

## Out of scope (intentionally)

These are things Jetti will not do, by design:

- **Browser extension or installable app for reviewers.** The snippet is removable; an extension is not. Lower friction wins.
- **Generic web-feedback platform.** Tools like BugHerd cover the comment-pinning use case; Jetti's wedge is structured edits, not annotations.
- **Bypassing access controls or anti-bot systems.** Hard rule. See [SECURITY.md](./SECURITY.md).
- **Running on third-party sites the developer doesn't control.** The snippet only loads on sites it's been installed into.

## How priorities shift

This file is updated alongside the related issues. If something here doesn't match what's actually moving in [issues](https://github.com/rossres/jetti/issues), the issues win — open a PR against this file to fix the drift.

For the smallest contributions, "ship a framework adapter" is always the highest-impact thing. The pattern is well-defined; the existing `scripts/jetti-install.mjs` shows the shape; and each adapter unlocks a meaningful chunk of users.
