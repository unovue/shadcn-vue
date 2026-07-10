# reka-rhea style — design spec

**Date:** 2026-07-11
**Status:** Approved, ready for implementation

## Goal

Add a new style, `rhea`, to shadcn-vue that faithfully mirrors shadcn-ui React's
`base-rhea` style, so users can pick the look that is closest to upstream
shadcn/ui. The style must be fully integrated: authored token map, generated
per-style components, published registry JSON, runtime-scoped preview, and
selectable in the customizer/style switcher.

## Background: how styles work in this repo

A "style" is a single file — `apps/v4/registry/styles/style-{name}.css` — that
maps `cn-*` placeholder tokens (authored in `apps/v4/registry/bases/reka/ui/**`,
the single source-of-truth component set) to expanded Tailwind utility classes,
scoped under a `.style-{name} { ... }` wrapper.

Each `style-{name}.css` serves **two** purposes:

1. **Build time.** `scripts/lib/build-styles.ts` (`buildStyles()`) reads the
   file, builds a token→utilities map (`createStyleMap`), and transforms every
   file in `registry/bases/reka/ui/**` via `vue-metamorph`, replacing `cn-*`
   tokens with their expansions. Output → `apps/v4/styles/reka-{name}/ui/**`
   (a fully-overwritten build artifact). `buildStylesRegistry()` then publishes
   `apps/v4/public/r/styles/reka-{name}/*.json` for CLI installs.
   Both loop over the `STYLES` array and run inside `pnpm registry:build`.
2. **Runtime.** `assets/css/main.css` `@import`s each `style-{name}.css` under
   `layer(base)`, so `.style-{name}`-wrapped DOM renders that style live — this
   powers the customizer preview.

Token-expansion rules (`expand-cn-classes.ts`):
- A `cn-*` token present in the map is replaced by its utilities (merged via
  `tailwind-merge`).
- A `cn-*` token **absent** from the map is **stripped** (unless allowlisted:
  `cn-menu-target`, `cn-menu-translucent`, `cn-logical-sides`, `cn-rtl-flip`,
  `cn-font-heading` — these stay as literal classes, defined globally).

`STYLES` (`registry/styles.ts`) supplies switcher metadata (name/title/
description/icon). `PRESETS` (`registry/config.ts`) supplies a
base+style+theme+font bundle that the `PresetPicker`/`Customizer` render.

## Source of truth

The React repo already ships the exact token map:
`/Users/zernonia/Desktop/Coding/shadcn-ui/apps/v4/registry/styles/style-rhea.css`
(1550 lines, `.style-rhea {}` wrapper). This Vue pipeline is a deliberate
mirror of React's build-registry flow, so the file adapts near-verbatim.

### Token-alignment analysis (verified)

- Vue base references **388** unique `cn-*` tokens; the style-variant subset
  that shipping styles (e.g. vega) actually define is **367**.
- React `style-rhea.css` defines **373** tokens and is a **superset** of vega's
  367 — every style-variant token the Vue base needs has a rhea value.
- **React-extra tokens** (~31: `cn-drawer-popup`, `cn-select-value`, various
  `*-logical` direction variants, etc.) that the Vue base never references:
  harmless, remain unused in the map. Kept for future-proofing.
- **Vue-base tokens with cross-repo name drift** (drawer / combobox /
  pagination / navigation-menu families) that React's map does not name
  identically: these get **stripped** on expansion — which is exactly what
  every existing Vue style (vega, nova, …) already does. Those components fall
  back to their inline base classes, so `rhea` is no less complete than the
  shipping styles. Full per-token reconciliation was explicitly deferred
  (chosen approach: near-verbatim + verify).

## Approach: near-verbatim port + verify

Copy React's `style-rhea.css` essentially as-is (keeping the `.style-rhea`
wrapper and all rules), then wire the 4 integration points and run the build.
Verify by rendering, not by hand-diffing 1550 lines.

## Changes

### 1. `apps/v4/registry/styles/style-rhea.css` (new)
Adapted from React `style-rhea.css`. `.style-rhea { … }` wrapper preserved.
No content edits beyond what verification surfaces (e.g. any Vue-base token that
must be added because the Vue base — unlike React's — genuinely requires a
per-style value; expected: none, confirmed at verify step).

### 2. `apps/v4/registry/styles.ts` (edit)
Append a `STYLES` entry:
```ts
{
  name: "rhea",
  title: "Rhea",
  description: "The latest shadcn/ui look. Refined spacing and modern defaults.",
  icon: `<svg … 24×24 …>` // authored to match the existing icon set's visual language; user may swap
}
```

### 3. `apps/v4/registry/config.ts` (edit)
Append a `PRESETS` entry mirroring React's `base-rhea` preset:
```ts
{
  name: "reka-rhea",
  title: "Rhea",
  description: "Rhea / Lucide / Inter",
  base: "reka",
  style: "rhea",
  baseColor: "neutral",
  theme: "neutral",
  chartColor: "neutral",
  iconLibrary: "lucide",
  font: "inter",
  fontHeading: "inherit",
  item: "Item",
  menuAccent: "subtle",
  menuColor: "default",
  radius: "default",
}
```

### 4. `apps/v4/assets/css/main.css` (edit)
Add alongside the other style imports:
```css
@import "../../registry/styles/style-rhea.css" layer(base);
```

### 5. Generated artifacts (run the build)
Run `pnpm registry:build` (or the standalone `buildStyles()` +
`buildStylesRegistry()` runners) to produce:
- `apps/v4/styles/reka-rhea/ui/**` (66 components + composables)
- `apps/v4/public/r/styles/reka-rhea/*.json`
These are build outputs, committed like the other `reka-*` style outputs.

## Out of scope (explicit)

- **Default style unchanged.** `DEFAULT_CONFIG.style` stays `nova`. `rhea` is
  additive/selectable.
- **Homepage cards repoint** (`@/styles/reka-nova/*` → `@/styles/reka-rhea/*`)
  is an **optional follow-up**, not part of this task. Can be done after `rhea`
  is verified if the landing page should visually match upstream shadcn/ui.
- **Full token reconciliation** of drift-named edge components — deferred.

## Verification plan

1. `buildStyles()` runs clean; grep generated `styles/reka-rhea/ui/**` for
   leftover unexpanded `cn-*` tokens (expect only allowlisted ones, matching
   other styles).
2. `eslint` the generated output (the build already runs `eslint --fix`).
3. Boot dev server; render a `.style-rhea`-wrapped preview (or temporarily
   point a card demo at `@/styles/reka-rhea/*`) and visually confirm parity
   with React `base-rhea`.
4. Confirm `Rhea` appears in the style switcher (PresetPicker) and selecting it
   renders correctly.
5. Confirm `public/r/styles/reka-rhea/*.json` generated for CLI installs.

## Success criteria

- `styles/reka-rhea/ui/**` generated, compiles, no stray `cn-*`.
- `Rhea` selectable in the customizer and renders faithfully to base-rhea.
- Registry JSON published.
- No regression to existing styles (shared base + pipeline untouched except the
  additive `STYLES`/`PRESETS`/`main.css`/`style-rhea.css` entries).
