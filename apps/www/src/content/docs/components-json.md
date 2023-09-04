---
title: components.json
description: Configuration for your project.
---

The `components.json` file holds configuration for your project.

We use it to understand how your project is set up and how to generate components customized for your project.

<Callout class="mt-6">
  Note: The <code>components.json</code> file is optional and **only required if you're
  using the CLI** to add components to your project. If you're using the copy
  and paste method, you don't need this file.
</Callout>

You can create a `components.json` file in your project by running the following command:

```bash
npx shadcn-svelte@latest init
```

See the [CLI section](/docs/cli) for more information.

## $schema

You can see the JSON Schema for `components.json` [here](https://shadcn-svelte.com/schema.json).

```json title="components.json"
{
  "$schema": "https://shadcn-svelte.com/schema.json"
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

## tailwind

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
    "css": "src/app.postcss"
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

## aliases

The CLI uses these values and the `alias` config from your `svelte.config.js` file to place generated components in the correct location.

Path aliases have to be set up in your `svelte.config.js` file.

### aliases.utils

Import alias for your utility functions.

```json title="components.json"
{
  "aliases": {
    "utils": "$lib/utils"
  }
}
```

### aliases.components

Import alias for your components.

```json title="components.json"
{
  "aliases": {
    "components": "$lib/components"
  }
}
```