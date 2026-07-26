---
title: FAQ
description: Frequently asked questions about running a registry.
---

## Frequently asked questions

### What does a complex component look like?

Here's an example of a complex component that installs a page, two components, a composable, a format date utils and a config file.

```json:line-numbers
{
  "$schema": "https://shadcn-vue.com/schema/registry-item.json",
  "name": "hello-world",
  "title": "Hello World",
  "type": "registry:block",
  "description": "A complex hello world component",
  "files": [
    {
      "path": "registry/new-york/HelloWorld/page.vue",
      "type": "registry:page",
      "target": "pages/hello/index.vue"
    },
    {
      "path": "registry/new-york/HelloWorld/components/HelloWorld.vue",
      "type": "registry:component"
    },
    {
      "path": "registry/new-york/HelloWorld/components/FormattedMessage.vue",
      "type": "registry:component"
    },
    {
      "path": "registry/new-york/HelloWorld/composables/useHello.ts",
      "type": "registry:hook"
    },
    {
      "path": "registry/new-york/HelloWorld/lib/formatDate.ts",
      "type": "registry:utils"
    },
    {
      "path": "registry/new-york/HelloWorld/hello.config.ts",
      "type": "registry:file",
      "target": "~/hello.config.ts"
    }
  ]
}
```

### How do I add a new Tailwind color?

To add a new color you need to add it to `cssVars` and `tailwind.config.theme.extend.colors`.

```json:line-numbers  {10-19} {24-29}
{
  "$schema": "https://shadcn-vue.com/schema/registry-item.json",
  "name": "hello-world",
  "title": "Hello World",
  "type": "registry:block",
  "description": "A complex hello world component",
  "files": [
    // ...
  ],
  "cssVars": {
    "light": {
      "brand-background": "20 14.3% 4.1%",
      "brand-accent": "20 14.3% 4.1%"
    },
    "dark": {
      "brand-background": "20 14.3% 4.1%",
      "brand-accent": "20 14.3% 4.1%"
    }
  },
  "tailwind": {
    "config": {
      "theme": {
        "extend": {
          "colors": {
            "brand": {
              "DEFAULT": "hsl(var(--brand-background))",
              "accent": "hsl(var(--brand-accent))"
            }
          }
        }
      }
    }
  }
}
```

The CLI will update the project CSS file and tailwind.config.js file. Once updated, the new colors will be available to be used as utility classes: `bg-brand` and `text-brand-accent`.

### How do I add a Tailwind animation?

To add a new animation you add it to `tailwind.config.theme.extend.animation` and `tailwind.config.theme.extend.keyframes`.

```json:line-numbers  {14-22}
{
  "$schema": "https://shadcn-vue.com/schema/registry-item.json",
  "name": "hello-world",
  "title": "Hello World",
  "type": "registry:block",
  "description": "A complex hello world component",
  "files": [
    // ...
  ],
  "tailwind": {
    "config": {
      "theme": {
        "extend": {
          "keyframes": {
            "wiggle": {
              "0%, 100%": { "transform": "rotate(-3deg)" },
              "50%": { "transform": "rotate(3deg)" }
            }
          },
          "animation": {
            "wiggle": "wiggle 1s ease-in-out infinite"
          }
        }
      }
    }
  }
}
```
