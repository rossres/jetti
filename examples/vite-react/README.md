# Example — Vite + React

A minimal Vite + React app showing where Jetti's install CLI inserts the snippet.

## Run

```bash
npm create vite@latest my-app -- --template react-ts
cd my-app
npm install
```

You don't need this directory for that — it just shows the relevant file (`index.html`) so you can see what the CLI will patch.

## What the install CLI does

When you run `install jetti from https://jetti.co/install.md` against a Vite app, the CLI:

1. Detects Vite by the presence of `vite.config.js` / `vite.config.ts` and an `index.html` at the project root.
2. POSTs to `https://jetti.co/api/agent-installs` to mint a session.
3. Inserts the returned snippet inside `<head>` of `index.html`.

The result is the file in this directory: [index.html](./index.html).

## Removing later

Delete the `<script data-jetti-session=...>` line. That's it.

## Verification

After install:

```bash
npm run dev
```

Visit the local URL and check the browser console for `Jetti runtime loaded` (the snippet logs once on activation). For regular visitors there's no UI; the chrome only appears when the URL hash matches a reviewer or owner token from your install response.
