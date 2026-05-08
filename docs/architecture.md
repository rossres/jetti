# Jetti Architecture

This document describes how the four pieces of Jetti fit together: the **install contract**, the **snippet runtime**, the **handoff bundle**, and the **apply CLI**. It's the system view; the user-facing flow is in the [README](../README.md#how-it-works).

## The four pieces

```
┌──────────────────────────────────────────────────────────────────────┐
│ 1. Install contract        2. Snippet runtime                        │
│    (jetti.co)                 (loaded on dev's site)                 │
│                                                                      │
│      /install.md           ┌──────────────────────────────┐          │
│      /api/agent-installs   │  Reviewer's browser          │          │
│      /.well-known/...      │   - inline edit chrome       │          │
│              │             │   - photo swap UI            │          │
│              ▼             │   - comment annotations      │          │
│      mints session         └──────────────────────────────┘          │
│              │                          │                            │
│              ▼                          ▼                            │
│      snippet code     ───────►   captures edits                      │
│              │                          │                            │
│              ▼                          ▼                            │
│      patched into             3. Handoff bundle                      │
│      dev's <head>                (signed JSON, short-lived)          │
│                                          │                           │
│                                          ▼                           │
│                                4. Apply CLI                          │
│                                   (npx jetti apply)                  │
│                                          │                           │
│                                          ▼                           │
│                                   Branch + draft PR                  │
└──────────────────────────────────────────────────────────────────────┘
```

## 1. Install contract

The install contract is a set of stable URLs hosted at `jetti.co` that any AI agent or CLI can call to install Jetti.

### `GET https://jetti.co/install.md`

Agent-readable Markdown describing the install flow. Agents (Claude Code, Codex, Cursor) read this when the developer says "install jetti from https://jetti.co/install.md."

The contract instructs the agent to:

1. Detect the framework (Vite/React, plain HTML, Next.js, etc.)
2. POST to `/api/agent-installs` to mint a session
3. Patch the project's entry file (e.g. `index.html`) with the snippet
4. Report the reviewer link back to the developer

### `POST https://jetti.co/api/agent-installs`

Mints a unique review session. Request body:

```json
{
  "targetUrl": "https://your-site.example.com",
  "sessionName": "Homepage review",
  "creatorEmail": "you@example.com",
  "reviewerEmail": "reviewer@example.com"  // optional
}
```

Response:

```json
{
  "snippetCode": "<script src=\"https://jetti.co/snippet.js\" data-jetti-session=\"...\" data-jetti-api=\"https://jetti.co\"></script>",
  "reviewerLink": "https://jetti.co/#/r/rev_...",
  "ownerLink": "https://jetti.co/#/o/own_...",
  "sessionId": "ses_..."
}
```

### `GET https://jetti.co/.well-known/jetti-install.json`

Machine-readable manifest describing the contract. Useful for agents that prefer JSON to Markdown, or for tooling that wants to check the contract version before invoking it.

## 2. Snippet runtime

A single JavaScript bundle served at `https://jetti.co/snippet.js`. The snippet is installed via a `<script>` tag with session-scoped data attributes:

```html
<script
  src="https://jetti.co/snippet.js"
  data-jetti-session="ses_..."
  data-jetti-api="https://jetti.co">
</script>
```

When loaded, the snippet:

- Reads the session ID from its data attributes
- Activates only if the URL hash matches a reviewer or owner token (no chrome on regular visitors)
- Renders inline edit affordances on hover (text editing, photo swap)
- Captures edits to a websocket-backed session on the Jetti server
- Provides a removable bottom bar with submit/cancel controls

The snippet is **fully removable** — deleting the `<script>` tag uninstalls it. There is no service worker, no localStorage persistence beyond the live session, and no third-party tracking.

## 3. Handoff bundle

When the reviewer submits their edits, the Jetti server packages them into a **signed handoff bundle** — a JSON document with a structured representation of the changes:

```json
{
  "version": "1",
  "sessionId": "ses_...",
  "createdAt": "2026-05-07T14:32:00Z",
  "edits": {
    "text": [
      { "selector": "h1.hero-title", "before": "...", "after": "...", "context": "..." }
    ],
    "photos": [
      { "selector": "img.hero-photo", "before": "/old.jpg", "after": "blob:...", "newImage": "<base64 or URL>" }
    ],
    "comments": [
      { "selector": "section.pricing", "text": "Make this $19 not $29" }
    ]
  }
}
```

The bundle URL is **signed and short-lived** — typically ~24 hours. The apply CLI consumes the bundle once and then discards the URL.

## 4. Apply CLI

The apply CLI is published to npm and run via `npx jetti apply <handoff-url>`. It:

1. Fetches the handoff bundle
2. Resolves the selectors against the developer's local source files (HTML / JSX / Astro / etc.)
3. Stages the changes on a fresh branch (`jetti-handoff-<sessionId>`)
4. If the GitHub CLI (`gh`) is available, opens a draft PR with the diff

The apply CLI source lives in the internal app monorepo (not in this repo) and ships to npm. This repo references it as a published package.

The apply CLI has a "brake-tap" state machine — it pauses on each ambiguous edit (e.g. selectors that match multiple elements) and waits for the developer's agent to disambiguate. This is what keeps the apply step honest.

## Boundaries

By design, Jetti does not:

- Load third-party authenticated pages
- Bypass paywalls, anti-bot systems, or access controls
- Capture reviewer keystrokes outside the explicit edit boxes
- Send any telemetry from the install CLI beyond the session-mint call
- Persist anything client-side beyond the live reviewer session

These boundaries are codified in [SECURITY.md](../SECURITY.md) and the AGENTS.md instructions to AI agents working on this repo.

## Versioning

The install contract and handoff bundle versions are independent and follow semver:

- The install contract is at v0 (pre-1.0) — endpoints are stable but may add fields.
- The handoff bundle is at v1 — already pinned to a schema. The apply CLI refuses bundles with mismatched versions.

Breaking changes will be announced in the [CHANGELOG](../CHANGELOG.md) and via release notes.
