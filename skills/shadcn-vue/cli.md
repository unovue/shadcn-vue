# shadcn-vue CLI Reference

Configuration is read from `components.json`.

> **IMPORTANT:** Always run commands using the project's package runner: `npx shadcn-vue@latest`, `pnpm dlx shadcn-vue@latest`, or `bunx --bun shadcn-vue@latest`. Check `packageManager` from project context to choose the right one. Examples below use `npx shadcn-vue@latest` but substitute the correct runner for the project.
> **IMPORTANT:** Only use the flags documented below. Do not invent or guess flags — if a flag isn't listed here, it doesn't exist. The CLI auto-detects the package manager from the project's lockfile; there is no `--package-manager` flag.

## Contents

- Commands: init, apply, add, search, view, docs, diff (smart merge), info, migrate, build
- Templates: nuxt, vite, astro, laravel
- Presets: named, code, URL formats and fields
- Switching presets

---

## Commands

### `init` — Initialize or create a project

```bash
npx shadcn-vue@latest init [components...] [options]
```

Initializes shadcn-vue in an existing project, or creates a new project when the target directory has no `package.json`. Optionally installs components in the same step.

Whether a new project is scaffolded depends only on the directory: `--cwd` (or the current directory) without a `package.json` → new project from `--template`; otherwise → initialize the existing project. `--name` only names the new project (default `my-vue-app`) and skips the name prompt. The `nuxt` template scaffolds Nuxt 4.

| Flag                             | Short | Description                                                                 | Default   |
| -------------------------------- | ----- | --------------------------------------------------------------------------- | --------- |
| `--template <template>`          | `-t`  | Template for a new project (nuxt, vite, astro, laravel)                     | —         |
| `--preset [name]`                | `-p`  | Preset configuration (named, code, or URL)                                  | —         |
| `--base <base>`                  |       | Component library base (`reka` is the only one)                             | `reka`    |
| `--style <style>`                |       | Visual style (vega, nova, maia, lyra, mira, luma, sera)                     | —         |
| `--icon-library <library>`       |       | Icon library (lucide, tabler, hugeicons, phosphor, remixicon)               | `lucide`  |
| `--font <font>`                  |       | Font (e.g. inter, geist-sans, figtree, jetbrains-mono)                      | —         |
| `--base-color <color>`           | `-b`  | Base color (neutral, stone, zinc, mauve, olive, mist, taupe)                | `neutral` |
| `--yes`                          | `-y`  | Skip confirmation prompt                                                    | `true`    |
| `--defaults`                     | `-d`  | Use defaults (`--template=nuxt --preset=nova --base=reka`)                  | `false`   |
| `--force`                        | `-f`  | Force overwrite existing configuration                                      | `false`   |
| `--cwd <cwd>`                    | `-c`  | Working directory                                                           | current   |
| `--name <name>`                  | `-n`  | Name for the new project                                                    | —         |
| `--silent`                       | `-s`  | Mute output                                                                 | `false`   |
| `--src-dir` / `--no-src-dir`     |       | Use a `src/` directory when creating a new project                          | `false`   |
| `--css-variables` / `--no-css-variables` |  | Use CSS variables for theming                                          | `true`    |
| `--no-base-style`                |       | Don't install the base shadcn style                                         | —         |
| `--rtl` / `--no-rtl`             |       | Enable / disable RTL support                                                | —         |
| `--pointer` / `--no-pointer`     |       | Enable / disable pointer cursor on buttons                                  | —         |

`init` never re-installs or overwrites existing UI components; use `apply` for that. (`--reinstall` / `--no-reinstall` are accepted but have no effect.)

`npx shadcn-vue@latest create` is an alias for `npx shadcn-vue@latest init`.

### `apply` — Apply a preset to an existing project

```bash
npx shadcn-vue@latest apply [preset] [options]
```

Applies a preset to an existing project, overwriting preset-driven config, fonts, CSS variables, and detected UI components.

| Flag                | Short | Description                                | Default |
| ------------------- | ----- | ------------------------------------------ | ------- |
| `--preset <preset>` | —     | Preset configuration (named, code, or URL) | —       |
| `--yes`             | `-y`  | Skip confirmation prompt                   | `false` |
| `--cwd <cwd>`       | `-c`  | Working directory                          | current |
| `--silent`          | `-s`  | Mute output                                | `false` |

`[preset]` is a shorthand for `--preset <preset>`. If both are provided, they must match.
A preset is required: without one, `apply` exits with an error listing the named presets. To build a custom preset, have the user open `https://shadcn-vue.com/create` and pass the resulting code.

### `add` — Add components

> **IMPORTANT:** NEVER fetch raw files from GitHub or other sources manually. The CLI handles registry resolution, file paths, and CSS diffing automatically. To install from a GitHub repository, use the `owner/repo/item` form below.

```bash
npx shadcn-vue@latest add [components...] [options]
```

| Form                             | Resolves to                                                              |
| -------------------------------- | ------------------------------------------------------------------------ |
| `button`                         | an item in the default registry                                          |
| `@acme/button`                   | an item in a configured or [directory](https://shadcn-vue.com/docs/directory) registry     |
| `https://acme.com/r/button.json` | a registry item fetched from that URL                                    |
| `./button.json`                  | a registry item on disk                                                  |
| `owner/repo/button`              | an item in the root `registry.json` of a public GitHub repository        |
| `owner/repo/button#v1.0.0`       | the same, pinned to a branch, tag or commit                              |

GitHub items resolve from the default branch unless pinned, and all files come from a single commit. `npx shadcn-vue@latest search owner/repo` lists a repository's items.

Some items (`message`, `bubble`, `attachment`, `marker`, `questionnaire`, `message-scroller`) only exist for Tailwind v4. In a Tailwind v3 project (non-empty `tailwind.config` in `components.json`) the CLI reports that the style does not provide them — don't treat that as a missing registry.

| Flag            | Short | Description                                                                                                          | Default |
| --------------- | ----- | -------------------------------------------------------------------------------------------------------------------- | ------- |
| `--yes`         | `-y`  | Skip confirmation prompt                                                                                             | `false` |
| `--overwrite`   | `-o`  | Overwrite existing files                                                                                             | `false` |
| `--cwd <cwd>`   | `-c`  | Working directory                                                                                                    | current |
| `--all`         | `-a`  | Add all available components                                                                                         | `false` |
| `--path <path>` | `-p`  | Target path for the component                                                                                        | —       |
| `--silent`      | `-s`  | Mute output                                                                                                          | `false` |

#### Smart Merge from Upstream

See [Updating Components in SKILL.md](./SKILL.md#updating-components) for the full workflow.

### `search` — Search registries

```bash
npx shadcn-vue@latest search <registries...> [options]
```

Fuzzy search across registries. Also aliased as `npx shadcn-vue@latest list`. Without `-q`, lists all items.

| Flag                | Short | Description            | Default |
| ------------------- | ----- | ---------------------- | ------- |
| `--query <query>`   | `-q`  | Search query           | —       |
| `--limit <number>`  | `-l`  | Max items per registry | `100`   |
| `--offset <number>` | `-o`  | Items to skip          | `0`     |
| `--cwd <cwd>`       | `-c`  | Working directory      | current |

### `view` — View item details

```bash
npx shadcn-vue@latest view <items...> [options]
```

Displays item info including file contents. Example: `npx shadcn-vue@latest view @shadcn/button`.

### `docs` — Get component documentation URLs

```bash
npx shadcn-vue@latest docs <components...> [options]
```

Outputs the documentation URL for each component. Accepts one or more component names from the default registry. Fetch the URL to get the actual content (usage, examples, API reference).

| Flag          | Short | Description       | Default |
| ------------- | ----- | ----------------- | ------- |
| `--json`      |       | Output as JSON    | `false` |
| `--cwd <cwd>` | `-c`  | Working directory | current |

Example output for `npx shadcn-vue@latest docs input button`:

```text
input
  - docs  https://shadcn-vue.com/docs/components/input

button
  - docs  https://shadcn-vue.com/docs/components/button
```

### `diff` — Check for updates

```bash
npx shadcn-vue@latest diff [component] [options]
```

Compares installed components with the default registry (for the project's current `style`). Without a component, lists every installed component that has updates and the files affected. With a component, prints a line diff per file. Use this for [smart merge](./SKILL.md#updating-components).

| Flag          | Short | Description       | Default |
| ------------- | ----- | ----------------- | ------- |
| `--cwd <cwd>` | `-c`  | Working directory | current |

> `add --dry-run`, `add --diff` and `add --view` are not supported in shadcn-vue; they exit with an error.

### `info` — Project information

```bash
npx shadcn-vue@latest info [options]
```

Displays project info and `components.json` configuration. Run this first to discover the project's framework, aliases, Tailwind version, and resolved paths.

| Flag          | Short | Description       | Default |
| ------------- | ----- | ----------------- | ------- |
| `--json`      |       | Output as JSON    | `false` |
| `--cwd <cwd>` | `-c`  | Working directory | current |

`info --json` returns exactly two keys: `{ "project": ..., "config": ... }`. It does **not** list installed components — list the `config.resolvedPaths.ui` directory instead.

**`project` fields:**

| Field                | Type             | Meaning                                                                                      |
| -------------------- | ---------------- | -------------------------------------------------------------------------------------------- |
| `framework`          | `object`         | Detected framework; `framework.name` is `vite`, `nuxt3`, `nuxt4`, `astro`, `laravel`, `inertia` or `manual` |
| `isSrcDir`           | `boolean`        | Whether the project uses a `src/` directory                                                  |
| `typescript`         | `boolean`        | Whether the project uses TypeScript                                                          |
| `tailwindVersion`    | `string`         | `"v3"` or `"v4"`                                                                             |
| `tailwindConfigFile` | `string \| null` | Path to the Tailwind config file                                                             |
| `tailwindCssFile`    | `string \| null` | Path to the global CSS file                                                                  |
| `aliasPrefix`        | `string \| null` | Import alias prefix (e.g. `@`, `~`)                                                          |
| `packageManager`     | `string`         | Detected package manager (`npm`, `pnpm`, `yarn`, `bun`)                                      |

**`config` fields** (resolved `components.json`):

| Field                   | Type      | Meaning                                                                                     |
| ----------------------- | --------- | ------------------------------------------------------------------------------------------- |
| `style`                 | `string`  | Registry style: `reka-<style>` (e.g. `reka-nova`, `reka-vega`), or `new-york-v4` / `new-york` |
| `font` / `fontHeading`  | `string`  | Body and heading font set by the preset                                                     |
| `typescript`            | `boolean` | TypeScript flag                                                                             |
| `tailwind.config`       | `string`  | Tailwind config path (empty for Tailwind v4)                                                |
| `tailwind.css`          | `string`  | Global CSS path — this is where custom CSS variables go                                     |
| `tailwind.baseColor`    | `string`  | Base color of the theme                                                                     |
| `tailwind.cssVariables` | `boolean` | Whether theming uses CSS variables                                                          |
| `tailwind.prefix`       | `string`  | Tailwind class prefix                                                                       |
| `iconLibrary`           | `string`  | Icon library (e.g. `lucide`, `tabler`) — determines the icon import package                 |
| `rtl`                   | `boolean` | RTL support enabled                                                                         |
| `pointer`               | `boolean` | Pointer cursor on interactive elements                                                      |
| `menuColor` / `menuAccent` | `string` | Menu appearance set by the preset                                                          |
| `aliases.components`    | `string`  | Component import alias (e.g. `@/components`)                                                |
| `aliases.utils`         | `string`  | Utils import alias (e.g. `@/lib/utils`)                                                     |
| `aliases.ui`            | `string`  | UI component alias (e.g. `@/components/ui`)                                                 |
| `aliases.lib`           | `string`  | Lib alias (e.g. `@/lib`)                                                                    |
| `aliases.composables` / `aliases.hooks` | `string` | Composables alias (e.g. `@/composables`)                                    |
| `resolvedPaths`         | `object`  | Absolute file-system paths for each alias                                                   |
| `registries`            | `object`  | Configured custom registries                                                                |

There is no `base` field; the base (`reka`) is the prefix of `style`.

### `migrate` — Run a migration

```bash
npx shadcn-vue@latest migrate [migration] [path] [options]
```

| Migration | Description                                                   |
| --------- | ------------------------------------------------------------- |
| `icons`   | Migrate UI components to a different icon library             |
| `rtl`     | Migrate components to RTL-safe (logical) classes              |

`[path]` is an optional path or glob to limit the files migrated.

| Flag          | Short | Description             | Default |
| ------------- | ----- | ----------------------- | ------- |
| `--list`      | `-l`  | List all migrations     | `false` |
| `--yes`       | `-y`  | Skip confirmation prompt | `false` |
| `--cwd <cwd>` | `-c`  | Working directory       | current |

### `build` — Build a custom registry

```bash
npx shadcn-vue@latest build [registry] [options]
```

Builds `registry.json` into individual JSON files for distribution. Default input: `./registry.json`, default output: `./public/r`.

| Flag              | Short | Description       | Default      |
| ----------------- | ----- | ----------------- | ------------ |
| `--output <path>` | `-o`  | Output directory  | `./public/r` |
| `--cwd <cwd>`     | `-c`  | Working directory | current      |

---

## Templates

| Value   | Framework |
| ------- | --------- |
| `nuxt`  | Nuxt      |
| `vite`  | Vite      |
| `astro` | Astro     |
| `laravel` | Laravel |

---

## Presets

Three ways to specify a preset via `--preset`:

1. **Named:** `--preset nova` or `--preset lyra` (named presets: `nova`, `vega`, `maia`, `lyra`, `mira`, `luma`, `sera`; the `rhea` style is only available via a code or URL)
2. **Code:** `--preset a2r6bw` (version-prefixed base62 string, e.g. `a2r6bw`)
3. **URL:** `--preset "https://shadcn-vue.com/init?base=reka&style=nova&..."`

> **IMPORTANT:** Never try to decode, fetch, or resolve preset codes manually. Preset codes are opaque — pass them directly to `npx shadcn-vue@latest init --preset <code>` and let the CLI handle resolution.
> Use `npx shadcn-vue@latest apply --preset <code>` when overwriting an existing project's preset.

## Switching Presets

Ask the user first: **overwrite**, **merge**, or **skip** existing components?

- **Overwrite / Re-install** → `npx shadcn-vue@latest apply --preset <code>`. Overwrites all detected component files with the new preset styles. Use when the user hasn't customized components.
- **Merge** → `npx shadcn-vue@latest init --preset <code> --force` (updates config and CSS only), then run `npx shadcn-vue@latest diff` and use the [smart merge workflow](./SKILL.md#updating-components) to update components one by one, preserving local changes. Use when the user has customized components.
- **Skip** → `npx shadcn-vue@latest init --preset <code> --force`. Only updates config and CSS variables, leaves existing components as-is.

Always run preset commands inside the user's project directory. `apply` only works in an existing project with a `components.json` file and keeps the base from the current `style`. `apply` has no `--base` flag.
