# Install recipes

Framework-specific instructions for installing Jetti. The auto-detect path covers Vite + React and plain HTML today; everything else needs a manual snippet paste until the [framework adapters](../ROADMAP.md#now-in-progress--next) ship.

In all cases, the snippet you need looks like this (the `data-jetti-session` value comes from `POST /api/agent-installs`):

```html
<script
  src="https://jetti.co/snippet.js"
  data-jetti-session="ses_REPLACE_ME"
  data-jetti-api="https://jetti.co">
</script>
```

You can either:

- **Mint a session via your AI agent** — paste `install jetti from https://jetti.co/install.md` and let the agent handle the API call + paste, or
- **Mint a session manually** with curl:

  ```bash
  curl -X POST https://jetti.co/api/agent-installs \
    -H 'content-type: application/json' \
    -d '{"targetUrl":"https://your-site.example.com","sessionName":"Homepage review","creatorEmail":"you@example.com"}'
  ```

  The response includes `snippetCode` (the full `<script>` tag) and `reviewerLink`.

---

## Vite + React (auto-detected)

Run the install CLI from your project root:

```bash
node /path/to/scripts/jetti-install.mjs \
  --api-origin https://jetti.co \
  --target-url https://your-site.example.com \
  --session-name "Homepage review" \
  --creator-email you@example.com
```

It detects the Vite root, mints a session, and patches `index.html`'s `<head>`. No manual edits needed.

## Plain HTML / static (auto-detected)

Same as Vite — the CLI patches the project's `index.html`.

## Next.js (app router) — manual today

Until the adapter ships, paste the snippet into `app/layout.tsx`:

```tsx
// app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Jetti review session */}
        <script
          src="https://jetti.co/snippet.js"
          data-jetti-session="ses_REPLACE_ME"
          data-jetti-api="https://jetti.co"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

Note: the `<script>` does not need `async` or `defer` — the Jetti runtime handles its own readiness. If you're using Next.js's `<Script>` component, prefer `strategy="afterInteractive"`.

## Next.js (pages router) — manual today

Paste into `pages/_document.tsx`:

```tsx
// pages/_document.tsx
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Jetti review session */}
        <script
          src="https://jetti.co/snippet.js"
          data-jetti-session="ses_REPLACE_ME"
          data-jetti-api="https://jetti.co"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
```

## Astro — manual today

Paste into your root layout (typically `src/layouts/Layout.astro`):

```astro
---
// src/layouts/Layout.astro
---
<html lang="en">
  <head>
    <!-- Jetti review session -->
    <script
      src="https://jetti.co/snippet.js"
      data-jetti-session="ses_REPLACE_ME"
      data-jetti-api="https://jetti.co"
      is:inline
    />
  </head>
  <body>
    <slot />
  </body>
</html>
```

The `is:inline` attribute prevents Astro's bundler from processing the script.

## Webflow — custom code embed

1. Open your Webflow project's **Project Settings → Custom Code**.
2. Paste the snippet into the **Head Code** section.
3. Publish to your staging or live domain.

Webflow's custom-code editor accepts the raw `<script>` tag directly. No transformation needed.

## Shopify themes — theme.liquid

Edit `layout/theme.liquid` and paste the snippet just before the closing `</head>` tag:

```liquid
<!-- layout/theme.liquid -->
<head>
  ...

  {%- comment -%} Jetti review session {%- endcomment -%}
  <script
    src="https://jetti.co/snippet.js"
    data-jetti-session="ses_REPLACE_ME"
    data-jetti-api="https://jetti.co"
  ></script>
</head>
```

To remove later, delete the `<script>` block. No theme cleanup needed.

## Google Tag Manager — Custom HTML tag

1. In GTM, create a new tag of type **Custom HTML**.
2. Paste the snippet into the HTML field.
3. Set the trigger to **All Pages** (or a more specific page rule if you only want Jetti on certain routes).
4. Publish the GTM workspace.

GTM injects the snippet at runtime. Note: the snippet's session token will be embedded in the GTM tag — if you rotate sessions, you need to update the tag.

## Other static-site generators (Hugo, Jekyll, 11ty, etc.)

Paste the snippet into your site's main layout template:

- **Hugo**: `layouts/_default/baseof.html` inside the `<head>` block
- **Jekyll**: `_includes/head.html` or `_layouts/default.html`
- **11ty**: your base layout (typically `_includes/base.njk` or similar)

The snippet is plain HTML; any template engine will pass it through unchanged.

## React / Vue / Svelte component (without a framework router)

If you're rendering an SPA without Next.js / Nuxt / SvelteKit, paste the snippet into the static `index.html` file that boots your app — not into a component. The Jetti runtime needs to attach to the document before your app boots.

---

## Verifying the install

After installing, load your site in a browser. You should see:

- **Regular visitors:** nothing — the snippet activates only on reviewer/owner URLs.
- **Reviewer URL** (open the `reviewerLink` from the install response): a small bottom bar with edit affordances on hover.
- **Owner URL** (open the `ownerLink`): the owner monitor showing capture activity.

If the snippet didn't load, check the browser console for a Content Security Policy block or a CORS error. If your site uses CSP, you'll need to allow `https://jetti.co` in `script-src` and `connect-src`.

## Removing Jetti

Delete the `<script>` tag with `data-jetti-session`. The reviewer link stops working. No leftover state on visitors' browsers.
