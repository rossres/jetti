# Example — Plain HTML / static site

The minimal possible Jetti install: a single static `index.html`.

## What the install CLI does

When you run `install jetti from https://jetti.co/install.md` against a directory containing a plain `index.html`, the CLI:

1. Detects no framework (no `package.json` with framework deps).
2. POSTs to `https://jetti.co/api/agent-installs` to mint a session.
3. Inserts the snippet inside `<head>` of `index.html`.

The result is [index.html](./index.html) in this directory — paste-ready as a working static page.

## Try it locally

```bash
# From the examples/plain-html/ directory:
python3 -m http.server 8000
# Or: npx serve .
```

Visit `http://localhost:8000`. The snippet loads from `jetti.co`; for regular visitors there's no visible UI.

To see the reviewer chrome, open the `reviewerLink` from your install response — it'll have a `#/r/rev_...` hash. The snippet activates on that hash match.

## Removing

Delete the `<script data-jetti-session=...>` line. Done.
