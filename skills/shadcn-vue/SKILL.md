---
name: shadcn-vue
description: Manages shadcn-vue components and projects — adding, searching, fixing, debugging, styling, and composing UI. Provides project context, component docs, and usage examples. Applies when working with shadcn-vue, component registries, presets, --preset codes, or any project with a components.json file. Also triggers for "shadcn-vue init", "create an app with --preset", or "switch to --preset".
user-invocable: false
allowed-tools: Bash(npx shadcn-vue@latest *), Bash(pnpm dlx shadcn-vue@latest *), Bash(bunx --bun shadcn-vue@latest *)
---

# shadcn-vue

A framework for building ui, components and design systems. Components are added as source code to the user's project via the CLI.

> **IMPORTANT:** Run all CLI commands using the project's package runner: `npx shadcn-vue@latest`, `pnpm dlx shadcn-vue@latest`, or `bunx --bun shadcn-vue@latest` — based on the project's `packageManager`. Examples below use `npx shadcn-vue@latest` but substitute the correct runner for the project.

## Current Project Context

```json
!`npx shadcn-vue@latest info --json`
```

The JSON above has two keys: `project` (detected framework, Tailwind setup, package manager) and `config` (the resolved `components.json`). It does not list installed components — list the `config.resolvedPaths.ui` directory for that. Use `npx shadcn-vue@latest docs <component>` to get the documentation URL for any component.

## Principles

1. **Use existing components first.** Use `npx shadcn-vue@latest search` to check registries before writing custom UI. Check community registries too.
2. **Compose, don't reinvent.** Settings page = Tabs + Card + form controls. Dashboard = Sidebar + Card + Chart + Table.
3. **Use built-in variants before custom styles.** `variant="outline"`, `size="sm"`, etc.
4. **Use semantic colors.** `bg-primary`, `text-muted-foreground` — never raw values like `bg-blue-500`.

## Critical Rules

These rules are **always enforced**. Each links to a file with Incorrect/Correct code pairs.

### Styling & Tailwind → [styling.md](./rules/styling.md)

- **`class` for layout, not styling.** Never override component colors or typography.
- **No `space-x-*` or `space-y-*`.** Use `flex` with `gap-*`. For vertical stacks, `flex flex-col gap-*`.
- **Use `size-*` when width and height are equal.** `size-10` not `w-10 h-10`.
- **Use `truncate` shorthand.** Not `overflow-hidden text-ellipsis whitespace-nowrap`.
- **No manual `dark:` color overrides.** Use semantic tokens (`bg-background`, `text-muted-foreground`).
- **Use `cn()` for conditional classes.** Don't write manual template literal ternaries.
- **No manual `z-index` on overlay components.** Dialog, Sheet, Popover, etc. handle their own stacking.

### Forms & Inputs → [forms.md](./rules/forms.md)

- **Forms use `FieldGroup` + `Field`.** Never use raw `div` with `space-y-*` or `grid gap-*` for form layout.
- **`InputGroup` uses `InputGroupInput`/`InputGroupTextarea`.** Never raw `Input`/`Textarea` inside `InputGroup`.
- **Buttons inside inputs use `InputGroup` + `InputGroupAddon`.**
- **Option sets (2–7 choices) use `ToggleGroup`.** Don't loop `Button` with manual active state.
- **`FieldSet` + `FieldLegend` for grouping related checkboxes/radios.** Don't use a `div` with a heading.
- **Field validation uses `data-invalid` + `aria-invalid` + `FieldError`.** `data-invalid` on `Field`, `aria-invalid` on the control, message in `FieldError` (not `FieldDescription`). For disabled: `data-disabled` on `Field`, `disabled` on the control.
- **Form state comes from a form library** (vee-validate, TanStack Form, Formisch) wired into `Field`. Don't use the legacy `Form`/`FormField` components.

### Component Structure → [composition.md](./rules/composition.md)

- **Items always inside their Group.** `SelectItem` → `SelectGroup`. `DropdownMenuItem` → `DropdownMenuGroup`. `CommandItem` → `CommandGroup`.
- **Dialog, Sheet, and Drawer always need a Title.** `DialogTitle`, `SheetTitle`, `DrawerTitle` required for accessibility. Use `class="sr-only"` if visually hidden.
- **Use full Card composition.** `CardHeader`/`CardTitle`/`CardDescription`/`CardContent`/`CardFooter`. Don't dump everything in `CardContent`.
- **Button has no `isPending`/`isLoading`.** Compose with `Spinner` + `data-icon` + `disabled`.
- **`TabsTrigger` must be inside `TabsList`.** Never render triggers directly in `Tabs`.
- **`Avatar` always needs `AvatarFallback`.** For when the image fails to load.

### Use Components, Not Custom Markup → [composition.md](./rules/composition.md)

- **Use existing components before custom markup.** Check if a component exists before writing a styled `div`.
- **Callouts use `Alert`.** Don't build custom styled divs.
- **Empty states use `Empty`.** Don't build custom empty state markup.
- **Toast via `vue-sonner`.** Use `toast()` from `vue-sonner`. Mount `<Toaster />` (from the `sonner` component) once in the root layout and import `vue-sonner/style.css`.
- **Use `Separator`** instead of `<hr>` or `<div class="border-t">`.
- **Use `Skeleton`** for loading placeholders. No custom `animate-pulse` divs.
- **Use `Badge`** instead of custom styled spans.

### Icons → [icons.md](./rules/icons.md)

- **Icons in `Button` use `data-icon`.** `data-icon="inline-start"` or `data-icon="inline-end"` on the icon. (Styled only by the `reka-*` styles; the classic `new-york` and `new-york-v4` styles ignore it, space icons with `gap-2`, and size them automatically.)
- **No sizing classes on icons inside components.** Components handle icon sizing via CSS. No `size-4` or `w-4 h-4`.
- **Pass icons as objects, not string keys.** `:icon="CheckIcon"`, not a string lookup.

### CLI

- **Apply preset codes directly with the CLI.** Use `npx shadcn-vue@latest apply <code>` for existing projects, or `npx shadcn-vue@latest init --preset <code>` when initializing.

## Key Patterns

These are the most common patterns that differentiate correct shadcn-vue code. For edge cases, see the linked rule files above.

```html
<!-- Form layout: FieldGroup + Field, not div + Label. -->
<FieldGroup>
  <Field>
    <FieldLabel for="email">Email</FieldLabel>
    <Input id="email" />
  </Field>
</FieldGroup>

<!-- Validation: data-invalid on Field, aria-invalid on the control. -->
<Field data-invalid>
  <FieldLabel>Email</FieldLabel>
  <Input aria-invalid />
  <FieldError>Invalid email.</FieldError>
</Field>

<!-- Icons in buttons: data-icon, no sizing classes. -->
<Button>
  <SearchIcon data-icon="inline-start" />
  Search
</Button>

<!-- Spacing: gap-*, not space-y-*. -->
<div class="flex flex-col gap-4">  <!-- correct -->
<div class="space-y-4">           <!-- wrong -->

<!-- Equal dimensions: size-*, not w-* h-*. -->
<div class="size-10">   <!-- correct -->
<div class="w-10 h-10"> <!-- wrong -->

<!-- Component sizes: use the size prop when it exists (reka-* styles). -->
<Avatar size="lg">       <!-- correct -->
<Avatar class="size-10"> <!-- only when the style has no size prop -->

<!-- Status colors: Badge variants or semantic tokens, not raw colors. -->
<Badge variant="secondary">+20.1%</Badge>    <!-- correct -->
<span class="text-emerald-600">+20.1%</span> <!-- wrong -->
```

## Component Selection

| Need                       | Use                                                                                                 |
| -------------------------- | --------------------------------------------------------------------------------------------------- |
| Button/action              | `Button` with appropriate variant                                                                   |
| Form inputs                | `Input`, `Select`, `Combobox`, `Switch`, `Checkbox`, `RadioGroup`, `Textarea`, `InputOTP`, `Slider` |
| Toggle between 2–7 options | `ToggleGroup` + `ToggleGroupItem`                                                                   |
| Data display               | `Table`, `Card`, `Badge`, `Avatar`                                                                  |
| Data table                 | `Table` + TanStack Table v9 (`useTable`, `tableFeatures()`) — see the `data-table` docs              |
| Chat interface             | `MessageScroller`, `Message`, `Bubble`, `Attachment`, `Marker` (Tailwind v4 only)                   |
| Multi-step question flow   | `Questionnaire` (Tailwind v4 only)                                                                  |
| Rendered markdown / prose  | Typeset (`class="typeset typeset-<name>"`), not hand-styled elements                                |
| Loading text / scroll edge | `shimmer` and `scroll-fade` utilities                                                               |
| Navigation                 | `Sidebar`, `NavigationMenu`, `Breadcrumb`, `Tabs`, `Pagination`                                     |
| Overlays                   | `Dialog` (modal), `Sheet` (side panel), `Drawer` (swipe-to-dismiss panel), `AlertDialog` (confirmation) |
| Feedback                   | `vue-sonner` (toast), `Alert`, `Progress`, `Skeleton`, `Spinner`                                   |
| Command palette            | `CommandDialog` (or `Command` inline)                                                               |
| Charts                     | `Chart` (wraps Unovis)                                                                              |
| Layout                     | `Card`, `Separator`, `Resizable`, `ScrollArea`, `Accordion`, `Collapsible`                          |
| Empty states               | `Empty`                                                                                             |
| Menus                      | `DropdownMenu`, `ContextMenu`, `Menubar`                                                            |
| Tooltips/info              | `Tooltip`, `HoverCard`, `Popover`                                                                   |

## Key Fields

The injected project context contains these key fields:

- **`config.aliases`** → use the actual alias prefix for imports (e.g. `@/`, `~/`), never hardcode.
- **`project.tailwindVersion`** → `"v4"` uses `@theme inline` blocks; `"v3"` uses `tailwind.config.js`.
- **`project.tailwindCssFile`** → the global CSS file where custom CSS variables are defined. Always edit this file, never create a new one.
- **`config.style`** → registry style, written as `<base>-<style>` (e.g. `reka-nova`, `reka-vega`), or `new-york-v4` / `new-york` for the classic styles. The only base is `reka` (Reka UI primitives).
- **`config.iconLibrary`** → determines icon imports. Use `@lucide/vue` for `lucide`, `@tabler/icons-vue` for `tabler`, etc. Never assume `@lucide/vue`.
- **`config.resolvedPaths`** → exact file-system destinations for components, ui, utils, lib, composables, etc.
- **`project.framework.name`** → routing and file conventions (`vite`, `nuxt3`, `nuxt4`, `astro`, `laravel`, `inertia`, `manual`).
- **`project.packageManager`** → use this for any non-shadcn-vue dependency installs (e.g. `pnpm add date-fns` vs `npm install date-fns`).

See [cli.md — `info` command](./cli.md) for the full field reference.

## Component Docs, Examples, and Usage

Run `npx shadcn-vue@latest docs <component>` to get the documentation URL for each component (`https://shadcn-vue.com/docs/components/<name>`). Fetch the URL to get the actual content, including examples and the API reference.

```bash
npx shadcn-vue@latest docs button dialog select
```

**When creating, fixing, debugging, or using a component, always run `npx shadcn-vue@latest docs` and fetch the URLs first.** This ensures you're working with the correct API and usage patterns rather than guessing.

## Workflow

1. **Get project context** — already injected above. Run `npx shadcn-vue@latest info` again if you need to refresh.
2. **Check installed components first** — before running `add`, list the `config.resolvedPaths.ui` directory (each component is a folder, e.g. `button/`). Don't import components that haven't been added, and don't re-add ones already installed.
3. **Find components** — `npx shadcn-vue@latest search`.
4. **Get docs and examples** — run `npx shadcn-vue@latest docs <component>` to get the URL, then fetch it. Use `npx shadcn-vue@latest view` to browse registry items you haven't installed. To compare installed components with the registry, use `npx shadcn-vue@latest diff`.
5. **Install or update** — `npx shadcn-vue@latest add`. When updating existing components, run `diff` first (see [Updating Components](#updating-components) below).
6. **Fix imports in third-party components** — After adding components from community registries, check the added non-UI files for hardcoded import paths like `@/components/ui/...`. These won't match the project's actual aliases. Use `npx shadcn-vue@latest info` to get the correct `ui` alias (e.g. `@workspace/ui/components`) and rewrite the imports accordingly. The CLI rewrites imports for its own UI files, but third-party registry components may use default paths that don't match the project.
7. **Review added components** — After adding a component or block from any registry, **always read the added files and verify they are correct**. Check for missing sub-components (e.g. `SelectItem` without `SelectGroup`), missing imports, incorrect composition, or violations of the [Critical Rules](#critical-rules). Also replace any icon imports with the project's `iconLibrary` from the project context (e.g. if the registry item uses `@lucide/vue` but the project uses `hugeicons`, swap the imports and icon names accordingly). Fix all issues before moving on.
8. **Registry must be explicit** — When the user asks to add a block or component, **do not guess the registry**. If no registry is specified (e.g. user says "add a login block" without specifying `@shadcn`, etc.), ask which registry to use. Never default to a registry on behalf of the user.
9. **Switching presets** — Ask the user first: **overwrite**, **merge**, or **skip**?
   - **Overwrite**: `npx shadcn-vue@latest apply <code>`. Overwrites detected components, fonts, and CSS variables.
   - **Merge**: `npx shadcn-vue@latest init --preset <code> --force` (updates `components.json` and CSS only — `init` never touches existing components), then [smart merge](#updating-components) each installed component against the new style.
   - **Skip**: `npx shadcn-vue@latest init --preset <code> --force`. Only updates config and CSS, leaves components as-is.
   - **Important**: Always run preset commands inside the user's project directory. `apply` only works in an existing project with a `components.json` file and keeps the base from the current `style`.

## Updating Components

When the user asks to update a component from upstream while keeping their local changes, use `diff` to intelligently merge. **NEVER fetch raw files from GitHub manually — always use the CLI.**

> `add --dry-run`, `add --diff` and `add --view` are **not supported** in shadcn-vue — they print a warning and exit with code 1. Use the `diff` command instead.

1. Run `npx shadcn-vue@latest diff` to list installed components that differ from the registry, and the files affected.
2. For each component, run `npx shadcn-vue@latest diff <component>` to see the line diff between the registry version (for the project's current `style`) and the local file.
3. Decide per file based on the diff:
   - No local changes → safe to overwrite with `npx shadcn-vue@latest add <component> --overwrite`.
   - Has local changes → read the local file, analyze the diff, and apply upstream updates by hand while preserving local modifications.
   - User says "just update everything" → use `--overwrite`, but confirm first.
4. **Never use `--overwrite` without the user's explicit approval.**

`diff` only covers components from the default shadcn-vue registry. For items from other registries, use `npx shadcn-vue@latest view <item>` and compare the file contents manually.

## Quick Reference

```bash
# Create a new project (run in an empty directory — no package.json).
npx shadcn-vue@latest init --name my-app --preset nova --template nuxt
npx shadcn-vue@latest init --name my-app --preset a2r6bw --template vite

# Initialize an existing project (directory has a package.json).
npx shadcn-vue@latest init --preset nova
npx shadcn-vue@latest init --defaults  # shortcut: --template=nuxt --preset=nova --base=reka

# Apply a preset to an existing project.
npx shadcn-vue@latest apply a2r6bw

# Add components.
npx shadcn-vue@latest add button card dialog
npx shadcn-vue@latest add --all

# Search registries.
npx shadcn-vue@latest search @shadcn -q "sidebar"

# Get component docs and example URLs.
npx shadcn-vue@latest docs button dialog select

# View registry item details (for items not yet installed).
npx shadcn-vue@latest view @shadcn/button

# Install from a public GitHub repo with a root registry.json.
npx shadcn-vue@latest add owner/repo/item
npx shadcn-vue@latest add owner/repo/item#v1.0.0
```

**Named presets:** `nova`, `vega`, `maia`, `lyra`, `mira`, `luma`, `sera`. The `rhea` style has no named preset — use a preset code from [shadcn-vue.com/create](https://shadcn-vue.com/create).
**Templates:** `nuxt`, `vite`, `astro` and `laravel`
**Preset codes:** Version-prefixed base62 strings (e.g. `a2r6bw`), from [shadcn-vue.com](https://shadcn-vue.com).

## Detailed References

- [rules/forms.md](./rules/forms.md) — FieldGroup, Field, InputGroup, ToggleGroup, FieldSet, validation states, FieldError, form libraries (vee-validate, TanStack Form, Formisch)
- [rules/composition.md](./rules/composition.md) — Groups, overlays, Card, Tabs, Avatar, Alert, Empty, Toast, Separator, Skeleton, Badge, Button loading
- [rules/icons.md](./rules/icons.md) — data-icon, icon sizing, passing icons as objects
- [rules/styling.md](./rules/styling.md) — Semantic colors, variants, class, spacing, size, truncate, dark mode, cn(), z-index
- [cli.md](./cli.md) — Commands, flags, presets, templates
- [customization.md](./customization.md) — Theming, CSS variables, extending components
