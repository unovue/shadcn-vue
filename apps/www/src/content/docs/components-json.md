---
title: components.json
description: Configuration for your project.
---

The `components.json` file holds configuration for your project.

We use it to understand how your project is set up and how to generate components customized for your project.

<Callout class="mt-6">

  Note: The `components.json` file is optional and **only required if you're using the CLI** to add components to your project. If you're using the copy
  and paste method, you don't need this file.

</Callout>

You can create a `components.json` file in your project by running the following command:

```bash
npx shadcn-vue@latest init
```

See the [CLI section](/docs/cli) for more information.

## $schema

You can see the JSON Schema for `components.json` [here](https://shadcn-vue.com/schema.json).

```json title="components.json"
{
  "$schema": "https://shadcn-vue.com/schema.json"
}
```

## style

The style for your components. **This cannot be changed after initialization.**

<!-- eslint-skip -->
```json title="components.json"
{
  "style": "default" | "new-york"
}
```

<ComponentPreview name="CardWithForm" />

## Tailwind

Configuration to help the CLI understand how Tailwind CSS is set up in your project.

See the [installation section](/docs/installation) for how to set up Tailwind CSS.

### tailwind.config

Path to where your `tailwind.config.js` file is located.

<!-- eslint-skip -->
```json title="components.json"
{
  "tailwind": {
    "config": "tailwind.config.js" | "tailwind.config.ts"
  }
}
```

### tailwind.css

Path to the CSS file that imports Tailwind CSS into your project.

```json title="components.json"
{
  "tailwind": {
    "css": "src/assets/index.css"
  }
}
```

### tailwind.baseColor

This is used to generate the default color palette for your components. **This cannot be changed after initialization.**

<!-- eslint-skip -->
```json title="components.json"
{
  "tailwind": {
    "baseColor": "gray" | "neutral" | "slate" | "stone" | "zinc"
  }
}
```

### tailwind.cssVariables

You can choose between using CSS variables or Tailwind CSS utility classes for theming.

To use utility classes for theming set `tailwind.cssVariables` to `false`. For CSS variables, set `tailwind.cssVariables` to `true`.

<!-- eslint-skip -->
```json title="components.json"
{
  "tailwind": {
    "cssVariables": `true` | `false`
  }
}
```

For more information, see the [theming docs](/docs/theming).

**This cannot be changed after initialization.** To switch between CSS variables and utility classes, you'll have to delete and re-install your components.

## aliases

The CLI uses these values and the `paths` config from your `tsconfig.json` or `jsconfig.json` file to place generated components in the correct location.

Path aliases have to be set up in your `tsconfig.json` or `jsconfig.json` file.

> A fallback to `tsconfig.app.json` if no `paths` were found in `tsconfig.json`

<Callout class="mt-6">

 **Important:** If you're using the `src` directory, make sure it is included
  under `paths` in your `tsconfig.json` or `jsconfig.json` file.

</Callout>

### aliases.utils

Import alias for your utility functions.

```json title="components.json"
{
  "aliases": {
    "utils": "@/lib/utils"
  }
}
```

### aliases.components

Import alias for your components.

```json title="components.json"
{
  "aliases": {
    "components": "@/components"
  }
}
```

### aliases.ui

Import alias for `ui` components.

The CLI will use the `aliases.ui` value to determine where to place your `ui` components. Use this config if you want to customize the installation directory for your `ui` components.

```json title="components.json"
{
  "aliases": {
    "ui": "@/app/ui"
  }
}
```
