# Agent Instructions

If you are an AI agent (Claude Code, Codex, Cursor, etc.) working in this repository, here is what you need to know.

## What this repo is

This is the **public-facing repo for Jetti** — docs, the install CLI source, examples, and the developer landing page at [`rossres.github.io/jetti/`](https://rossres.github.io/jetti/).

The hosted Jetti server (the React app, snippet runtime, owner monitor, and `jetti apply` CLI source) lives in a separate, private app monorepo. **Do not** try to add server code, database migrations, or the React app source to this repo.

## What's safe to change

- Anything in `docs/` (the dev landing page + install recipes + architecture)
- `scripts/jetti-install.mjs` — the install CLI; framework adapters are the highest-leverage change
- `examples/` — sample apps showing the install flow on a stack
- `README.md`, `ROADMAP.md`, `CONTRIBUTING.md`, `SUPPORT.md`, `CODE_OF_CONDUCT.md`
- `.github/` workflows, templates, dependabot

## What's NOT safe to change

- The `<meta http-equiv="refresh">` patterns in `docs/index.html` — they're keyed off the live deploy
- The agent install contract URLs (`jetti.co/install.md`, `jetti.co/api/agent-installs`, `jetti.co/.well-known/jetti-install.json`) — these are stable contracts; clients depend on them
- The `framework matrix` in the README — keep ✅/🔜 honest. Don't mark something ✅ just because manual paste works

## Hard rules (do not violate)

1. **The snippet only runs on sites the developer explicitly installs it on.** Do not add code that loads, proxies, captures, or replays third-party site content the developer doesn't own.
2. **No bypassing access controls, anti-bot systems, paywalls, or third-party site protections.** Reports asking for this will be closed; PRs adding it will be reverted.
3. **Reviewers stay free.** Do not gate reviewer-side features behind plan limits.
4. **No telemetry beyond the session-mint call.** The install CLI shouldn't send anything to a third party.

## Verification

Before opening a PR:

```bash
node --check scripts/jetti-install.mjs
```

That's what CI runs. If you change the dev landing page, also visually verify `docs/index.html` renders correctly — open it in a browser. If you change framework detection, run the CLI against a fresh sample app in `examples/` to verify.

## Honesty in marketing copy

- Don't claim auto-detection for a framework that requires manual paste. Use 🔜.
- Don't claim `npx @jetti/cli` works until it's actually published.
- Don't reference assets (`.github/assets/hero-light.png`, etc.) that don't exist yet — broken images are worse than ASCII placeholders.

## When in doubt

Open a discussion before opening a PR: https://github.com/rossres/jetti/discussions

Or email **rossres@icloud.com** with subject `[Jetti question]`.
