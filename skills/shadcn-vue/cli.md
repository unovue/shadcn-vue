# shadcn-vue CLI Reference

Configuration is read from `components.json`.

> **IMPORTANT:** Always run commands using the project's package runner: `npx shadcn-vue@latest`, `pnpm dlx shadcn-vue@latest`, or `bunx --bun shadcn-vue@latest`. Check `packageManager` from project context to choose the right one. Examples below use `npx shadcn-vue@latest` but substitute the correct runner for the project.
> **IMPORTANT:** Only use the flags documented below. Do not invent or guess flags — if a flag isn't listed here, it doesn't exist. The CLI auto-detects the package manager from the project's lockfile; there is no `--package-manager` flag.

## Contents

- Commands: init, apply, add (smart merge), search, view, docs, info, build
- Templates: nuxt, vite, astro, laravel
- Presets: named, code, URL formats and fields
- Switching presets

---

## Commands

### `init` — Initialize or create a project

```bash
npx shadcn-vue@latest init [components...] [options]
```

Initializes shadcn-vue in an existing project or creates a new project (when `--name` is provided). Optionally installs components in the same step.

| Flag                    | Short | Description                                         | Default |
| ----------------------- | ----- | --------------------------------------------------- | ------- |
| `--template <template>` | `-t`  | Template (nuxt, vite, astro, laravel)               | —       |
| `--preset [name]`       | `-p`  | Preset configuration (named, code, or URL)          | —       |
| `--yes`                 | `-y`  | Skip confirmation prompt                            | `true`  |
| `--defaults`            | `-d`  | Use defaults (`--template=nuxt --preset=nova`) | `false` |
| `--force`               | `-f`  | Force overwrite existing configuration              | `false` |
| `--cwd <cwd>`           | `-c`  | Working directory                                   | current |
| `--name <name>`         | `-n`  | Name for new project                                | —       |
| `--silent`              | `-s`  | Mute output                                         | `false` |
| `--rtl`                 |       | Enable RTL support                                  | —       |
| `--reinstall`           |       | Re-install existing UI components                   | `false` |

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
If no preset is provided, the CLI offers to open the custom preset builder on `shadcn-vue.com/create`.

### `add` — Add components

> **IMPORTANT:** NEVER fetch raw files from GitHub or other sources manually. The CLI handles registry resolution, file paths, and CSS diffing automatically.

```bash
npx shadcn-vue@latest add [components...] [options]
```

Accepts component names, registry-prefixed names (`@magicui/shimmer-button`), URLs, or local paths.

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

Outputs resolved URLs for component documentation, examples, and API references. Accepts one or more component names. Fetch the URLs to get the actual content.

Example output for `npx shadcn-vue@latest docs input button`:

```text
input
  docs      https://shadcn-vue.com/docs/components/input
  examples  https://raw.githubusercontent.com/.../examples/InputExample.vue

button
  docs      https://shadcn-vue.com/docs/components/button
  examples  https://raw.githubusercontent.com/.../examples/ButtonExample.vue
```

Some components include an `api` link to the underlying library (e.g. `reka-ui` for the primitive components).

### `diff` — Check for updates

Do not use this command. Use `npx shadcn-vue@latest add --diff` instead.

### `info` — Project information

```bash
npx shadcn-vue@latest info [options]
```

Displays project info and `components.json` configuration. Run this first to discover the project's framework, aliases, Tailwind version, and resolved paths.

| Flag          | Short | Description       | Default |
| ------------- | ----- | ----------------- | ------- |
| `--cwd <cwd>` | `-c`  | Working directory | current |

**Project Info fields:**

| Field                | Type      | Meaning                                                 |
| -------------------- | --------- | ------------------------------------------------------- |
| `framework`          | `string`  | Detected framework (`nuxt`, `vite`, `astro`, `laravel`) |
| `frameworkVersion`   | `string`  | Framework version (e.g. `3.15.0`)                       |
| `isSrcDir`           | `boolean` | Whether the project uses a `src/` directory             |
| `isTs`               | `boolean` | Whether the project uses TypeScript                     |
| `tailwindVersion`    | `string`  | `"v3"` or `"v4"`                                        |
| `tailwindConfigFile` | `string`  | Path to the Tailwind config file                        |
| `tailwindCssFile`    | `string`  | Path to the global CSS file                             |
| `aliasPrefix`        | `string`  | Import alias prefix (e.g. `@`, `~`, `@/`)               |
| `packageManager`     | `string`  | Detected package manager (`npm`, `pnpm`, `yarn`, `bun`) |

**Components.json fields:**

| Field                | Type      | Meaning                                                                                     |
| -------------------- | --------- | --------------------------------------------------------------------------------------------|
| `base`               | `string`  | Primitive library (`reka`) — determines component APIs and available props                  |
| `style`              | `string`  | Visual style (e.g. `nova`, `vega`)                                                          |
| `typescript`         | `boolean` | TypeScript flag                                                                             |
| `tailwind.config`    | `string`  | Tailwind config path                                                                        |
| `tailwind.css`       | `string`  | Global CSS path — this is where custom CSS variables go                                     |
| `iconLibrary`        | `string`  | Icon library — determines icon import package (e.g. `lucide-vue-next`, `@tabler/icons-vue`) |
| `aliases.components` | `string`  | Component import alias (e.g. `@/components`)                                                |
| `aliases.utils`      | `string`  | Utils import alias (e.g. `@/lib/utils`)                                                     |
| `aliases.ui`         | `string`  | UI component alias (e.g. `@/components/ui`)                                                 |
| `aliases.lib`        | `string`  | Lib alias (e.g. `@/lib`)                                                                    |
| `aliases.composables`| `string`  | Composables/Hooks alias (e.g. `@/composables`)                                              |
| `resolvedPaths`      | `object`  | Absolute file-system paths for each alias                                                   |
| `registries`         | `object`  | Configured custom registries                                                                |

**Links fields:**

The `info` output includes a **Links** section with templated URLs for component docs, source, and examples. For resolved URLs, use `npx shadcn-vue@latest docs <component>` instead.

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

1. **Named:** `--preset nova` or `--preset lyra`
2. **Code:** `--preset a2r6bw` (version-prefixed base62 string, e.g. `a2r6bw`)
3. **URL:** `--preset "https://shadcn-vue.com/init?base=reka&style=nova&..."`

> **IMPORTANT:** Never try to decode, fetch, or resolve preset codes manually. Preset codes are opaque — pass them directly to `npx shadcn-vue@latest init --preset <code>` and let the CLI handle resolution.
> Use `npx shadcn-vue@latest apply --preset <code>` when overwriting an existing project's preset.

## Switching Presets

Ask the user first: **overwrite**, **merge**, or **skip** existing components?

- **Overwrite / Re-install** → `npx shadcn-vue@latest apply --preset <code>`. Overwrites all detected component files with the new preset styles. Use when the user hasn't customized components.
- **Merge** → `npx shadcn-vue@latest init --preset <code> --force --no-reinstall`, then run `npx shadcn-vue@latest info` to get the list of installed components and use the [smart merge workflow](./SKILL.md#updating-components) to update them one by one, preserving local changes. Use when the user has customized components.
- **Skip** → `npx shadcn-vue@latest init --preset <code> --force --no-reinstall`. Only updates config and CSS variables, leaves existing components as-is.

Always run preset commands inside the user's project directory. `apply` only works in an existing project with a `components.json` file. The CLI automatically preserves the current base (`base`) from `components.json`. If you must use a scratch/temp directory (e.g. for `--dry-run` comparisons), pass `--base <current-base>` explicitly — preset codes do not encode the base.
