# Replace `@nuxt/fonts` with unifont (client-side font loading)

**Date:** 2026-07-11
**Scope:** `apps/v4` docs/customizer app only. Not the CLI-facing font registry.

## Problem

The v4 app used the `@nuxt/fonts` module to auto-download `@font-face` files by
scanning CSS for font-family names. That module is now disabled (commented out in
`nuxt.config.ts`, not in the `modules` array), which means:

- **Docs have no real Geist**: the font vars name `"Geist"` but nothing downloads
  the `@font-face`, so text falls back to Arial.
- **The customizer's font pickers don't work end-to-end**: `FontPicker.vue` +
  `useDesignSystemProvider.ts` swap the `--font-sans` / `--font-heading` CSS vars
  to a family string, but nothing loads the actual `@font-face` for the ~25 fonts
  in `lib/fonts.ts` when one is picked.

We want to control font downloading **programmatically** with `unifont` instead of
the auto-magic module: load only **Geist** by default (for docs), and fetch other
fonts on demand when the user selects them in the customizer.

## Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Where unifont runs | **Client-side (browser)** | User preference; no server route needed. |
| Provider | **`bunny`** (`unifont` `providers.bunny`) | Only provider whose endpoints (`/list`, `/css`) are fully CORS-enabled for browser `fetch`. Google's `fonts.google.com/metadata/fonts` returns **no** `access-control-allow-origin`, so unifont's `google` provider fails in the browser. Bunny mirrors Google Fonts with **identical family names**, so `lib/fonts.ts` names map 1:1 with zero remapping. Verified Bunny carries Geist, Geist Mono, and all 25 fonts. |
| Default Geist loading | **Eager Bunny `<link>`** in `nuxt.config` head | No JS dependency, fast LCP, no flash of fallback for docs. |
| unifont bundle inclusion | **Dynamic `import('unifont')`** inside the composable | `unifont` pulls in `css-tree` (non-trivial). Lazy-loading keeps docs/marketing pages that never open the customizer lean. |

### CORS verification (empirical, `curl -I -H "Origin: …"`)

- `fonts.google.com/metadata/fonts` → 200, **no** `access-control-allow-origin` → browser-blocked.
- `fonts.googleapis.com/css2` → `access-control-allow-origin: *` (but the google provider still needs the metadata endpoint above).
- `fonts.bunny.net/list` and `/css` → `access-control-allow-origin: *` → works client-side. ✅

## Architecture

Three independent parts.

### 1. Default Geist for docs — eager, no JS

- Re-enable `@import "./fonts.css"` in `apps/v4/assets/css/main.css` (currently
  commented out) and keep the `@theme` font vars as-is.
- Add a plain Bunny stylesheet link to `app.head.link` in
  `apps/v4/nuxt.config.ts`:
  - `https://fonts.bunny.net/css?family=geist:400,500,600,700|geist-mono:400,500`
  - Include `<link rel="preconnect" href="https://fonts.bunny.net">` for connection warm-up.
- Result: every page renders Geist immediately with no JS dependency.

### 2. On-demand fonts in the customizer — unifont + Bunny (client)

New composable `apps/v4/composables/useFontLoader.ts`:

- **Memoized unifont instance**: a module-level singleton promise created via a
  dynamic `import('unifont')` →
  `createUnifont([providers.bunny()])`. Created lazily on first `loadFont` call.
- **`loadFont(family: string): Promise<void>`**:
  - No-op on the server (`import.meta.client` guard) and for empty/`inherit` values.
  - Skip families already covered by the eager default (`Geist`, `Geist Mono`).
  - Dedupe via a module-level `Set<string>` keyed by family (also guard against
    concurrent in-flight loads keyed the same way) so re-selecting a font never
    refetches or re-injects.
  - `resolveFont(family, { weights: ['400','500','600','700'] })` (Bunny returns
    only the weights it actually has).
  - Build `@font-face` CSS from the returned `FontFaceData[]` (family, weight,
    style, `font-display: swap`, `src` list from `RemoteFontSource`/`LocalFontSource`,
    `unicode-range`).
  - Inject a single `<style data-font="<family>">` element into `document.head`.
  - Wrap in try/catch → on failure `console.warn` and resolve anyway
    (non-blocking; the CSS var is still set and the family falls back through the
    existing CSS font stack).

### 3. Wire into the design-system provider

In `apps/v4/composables/useDesignSystemProvider.ts`, the existing watcher applies
`selectedFont` / `selectedHeadingFont` by setting `--font-sans` / `--font-heading`.
Call `loadFont(font.name)` for the relevant selected font(s) in that same watcher,
right before/as the CSS var is set. This single integration point covers the body,
heading, and mono pickers (all flow through this provider). Loading is fire-and-forget
(non-blocking); `font-display: swap` handles the visual swap when the file arrives.

### 4. Remove `@nuxt/fonts`

- Delete the commented `fonts: { … }` config block in `nuxt.config.ts`.
- Remove `"@nuxt/fonts"` from `apps/v4/package.json` dependencies.

## Data flow

```
FontPicker sets param
  → useDesignSystemSearchParams updates font / fontHeading
    → useDesignSystemProvider watcher runs
      → useFontLoader.loadFont(family)   (dynamic import unifont, bunny resolveFont, inject @font-face)
      → sets --font-sans / --font-heading CSS var
        → text swaps to loaded font (font-display: swap)
```

## Error handling

- unifont / Bunny fetch failure → caught, `console.warn`, non-blocking. The CSS var
  is still set; text uses the fallback in the existing font stack.
- Dedupe `Set` + in-flight guard prevents duplicate fetches / duplicate `<style>`.
- SSR: `loadFont` is a no-op on the server; injection happens client-only.

## Out of scope

- `apps/v4/registry/fonts.ts` — CLI-facing registry for consumers of the
  `shadcn-vue` CLI; separate concern, untouched.
- The in-progress theme-color edits currently in the working tree
  (`main.css` oklch tweaks) — unrelated, left alone.
- Self-hosting fonts / build-time generation — not needed; Bunny CDN is used at
  runtime.

## Testing / verification

- **Docs baseline**: load a docs page (customizer never opened) → Network shows the
  eager Bunny Geist request; body renders in Geist; `unifont`/`css-tree` **not** in
  the loaded JS.
- **Customizer**: open the customizer, pick `Inter` → Network shows a
  `fonts.bunny.net` request; a `<style data-font="Inter">` appears in `<head>`;
  preview text renders in Inter. Re-selecting Inter → no new request. Pick a heading
  font and a mono font → same behavior.
- **Failure path**: simulate offline / block bunny.net → no crash; text falls back;
  a single warning is logged.
```
