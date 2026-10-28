# Customization & Theming

Components reference semantic CSS variable tokens. Change the variables to change every component.

## Contents

- How it works (CSS variables → Tailwind utilities → components)
- Color variables and OKLCH format
- Dark mode setup
- Changing the theme (presets, CSS variables)
- Adding custom colors (Tailwind v3 and v4)
- Border radius
- Customizing components (variants, class, wrappers)
- Checking for updates

---

## How It Works

1. CSS variables defined in `:root` (light) and `.dark` (dark mode).
2. Tailwind maps them to utilities: `bg-primary`, `text-muted-foreground`, etc.
3. Components use these utilities — changing a variable changes all components that reference it.

---

## Color Variables

Most colors follow the `name` / `name-foreground` convention. The base variable is for backgrounds, `-foreground` is for text/icons on that background.

| Variable                                 | Purpose                                          |
| ---------------------------------------- | ------------------------------------------------ |
| `--background` / `--foreground`          | Page background and default text                 |
| `--card` / `--card-foreground`           | Card surfaces                                    |
| `--popover` / `--popover-foreground`     | Popover, DropdownMenu and other floating surfaces |
| `--primary` / `--primary-foreground`     | Primary buttons and actions                      |
| `--secondary` / `--secondary-foreground` | Secondary actions                                |
| `--muted` / `--muted-foreground`         | Muted/disabled states                            |
| `--accent` / `--accent-foreground`       | Hover and accent states                          |
| `--destructive`                          | Error and destructive actions (no foreground pair in Tailwind v4 themes) |
| `--border`                               | Default border color                             |
| `--input`                                | Form input borders                               |
| `--ring`                                 | Focus ring color                                 |
| `--chart-1` through `--chart-5`          | Chart/data visualization                         |
| `--sidebar-*`                            | Sidebar-specific colors                          |
| `--radius`                               | Base radius (see [Border Radius](#border-radius)) |

Don't reference tokens that aren't in the project's CSS file (e.g. `--surface`, `--warning`) — add them first (see below).

In Tailwind v4 themes, colors use OKLCH: `--primary: oklch(0.205 0 0)` where values are lightness (0–1), chroma (0 = gray), and hue (0–360). Tailwind v3 themes use bare HSL channels instead: `--primary: 0 0% 9%`.

---

## Dark Mode

Class-based toggle via `.dark` on the root element. In Nuxt, use `@nuxtjs/color-mode`:

```js
<!-- nuxt.config.ts -->
export default defineNuxtConfig({
  modules: ['@nuxtjs/color-mode'],
  colorMode: {
    classSuffix: ''
  }
})
```

---

## Changing the Theme

```bash
# Apply a preset code from shadcn-vue.com.
npx shadcn-vue@latest apply --preset a2r6bw

# Positional shorthand also works.
npx shadcn-vue@latest apply a2r6bw

# Switch to a named preset and overwrite existing components.
npx shadcn-vue@latest apply --preset nova

# Preserve existing components instead.
npx shadcn-vue@latest init --preset nova --force

# Use a custom theme URL.
npx shadcn-vue@latest apply --preset "https://shadcn-vue.com/init?base=reka&style=nova&..."
```

Or edit CSS variables directly in `globals.css`.

---

## Adding Custom Colors

Add variables to the file at `tailwindCssFile` from `npx shadcn-vue@latest info` (typically `globals.css`). Never create a new CSS file for this.

```css
/* 1. Define in the global CSS file. */
:root {
  --warning: oklch(0.84 0.16 84);
  --warning-foreground: oklch(0.28 0.07 46);
}
.dark {
  --warning: oklch(0.41 0.11 46);
  --warning-foreground: oklch(0.99 0.02 95);
}
```

```css
/* 2a. Register with Tailwind v4 (@theme inline). */
@theme inline {
  --color-warning: var(--warning);
  --color-warning-foreground: var(--warning-foreground);
}
```

When `tailwindVersion` is `"v3"` (check via `npx shadcn-vue@latest info`), define the variables as bare HSL channels (matching the rest of the v3 theme) and register them in `tailwind.config.js`:

```css
/* 1b. Tailwind v3: HSL channels, no color function. */
:root {
  --warning: 38 92% 50%;
  --warning-foreground: 48 96% 89%;
}
.dark {
  --warning: 48 96% 89%;
  --warning-foreground: 38 92% 50%;
}
```

```js
// 2b. Register with Tailwind v3 (tailwind.config.js).
module.exports = {
  theme: {
    extend: {
      colors: {
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
        },
      },
    },
  },
}
```

```html
<!-- 3. Use in components. -->
<div class="bg-warning text-warning-foreground">Warning</div>
```

---

## Border Radius

`--radius` controls border radius globally. The radius scale is derived from it by multiplication, so changing `--radius` updates every step:

```css
@theme inline {
  --radius-sm: calc(var(--radius) * 0.6);
  --radius-md: calc(var(--radius) * 0.8);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) * 1.4);
  --radius-2xl: calc(var(--radius) * 1.8);
  --radius-3xl: calc(var(--radius) * 2.2);
  --radius-4xl: calc(var(--radius) * 2.6);
}
```

---

## Customizing Components

See also: [rules/styling.md](./rules/styling.md) for Incorrect/Correct examples.

Prefer these approaches in order:

### 1. Built-in variants

```html
<Button variant="outline" size="sm">
  Click
</Button>
```

### 2. Tailwind classes via `class`

```html
<Card class="mx-auto max-w-md">...</Card>
```

### 3. Add a new variant

Edit the component source to add a variant via `cva`:

```js
// components/ui/button/index.ts — inside buttonVariants' `variant` map
warning: "bg-warning text-warning-foreground hover:bg-warning/90",
```

### 4. Wrapper components

Compose shadcn-vue primitives into higher-level components:

```js
<script setup lang="ts">
defineProps<{
  title: string
  description: string
}>()

const emit = defineEmits(['confirm'])
</script>

<template>
  <AlertDialog>
    <AlertDialogTrigger as-child>
      <slot />
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>{{ title }}</AlertDialogTitle>
        <AlertDialogDescription>{{ description }}</AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction @click="emit('confirm')">Confirm</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
```

See [Updating Components in SKILL.md](./SKILL.md#updating-components) for the full smart merge workflow.
