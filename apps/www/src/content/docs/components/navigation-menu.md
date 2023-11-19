---
title: Navigation Menu
description: A collection of links for navigating websites.
source: apps/www/src/lib/registry/default/ui/navigation-menu 
primitive: https://www.radix-vue.com/components/navigation-menu.html
---

<script setup>
import { useConfigStore } from '@/stores/config'

const { codeConfig } = useConfigStore()
</script>


<ComponentPreview name="NavigationMenuDemo" /> 

## Installation 

```bash
npx shadcn-vue@latest add navigation-menu
```

## Usage

```vue-vue
<script setup lang="ts">
import {
  {{codeConfig.prefix}}NavigationMenu,
  {{codeConfig.prefix}}NavigationMenuContent,
  {{codeConfig.prefix}}NavigationMenuIndicator,
  {{codeConfig.prefix}}NavigationMenuItem,
  {{codeConfig.prefix}}NavigationMenuLink,
  {{codeConfig.prefix}}NavigationMenuList,
  {{codeConfig.prefix}}NavigationMenuTrigger,
  {{codeConfig.prefix}}NavigationMenuViewport,
} from '{{codeConfig.aliases.components}}/ui/navigation-menu'
</script>

<template>
  <{{codeConfig.prefix}}NavigationMenu>
    <{{codeConfig.prefix}}NavigationMenuList>
      <{{codeConfig.prefix}}NavigationMenuItem>
        <{{codeConfig.prefix}}NavigationMenuTrigger>Item One</{{codeConfig.prefix}}NavigationMenuTrigger>
        <{{codeConfig.prefix}}NavigationMenuContent>
          <{{codeConfig.prefix}}NavigationMenuLink>Link</{{codeConfig.prefix}}NavigationMenuLink>
        </{{codeConfig.prefix}}NavigationMenuContent>
      </{{codeConfig.prefix}}NavigationMenuItem>
    </{{codeConfig.prefix}}NavigationMenuList>
  </{{codeConfig.prefix}}NavigationMenu>
</template>
```

## Examples 

### Link Component

When using the Nuxt.js <NuxtLink /> component, you can use `navigationMenuTriggerStyle()` to apply the correct styles to the trigger.

```ts
import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu'
```

```vue
<template>
  <NavigationMenuItem>
    <NuxtLink to="/docs">
      <NavigationMenuLink :class="navigationMenuTriggerStyle()">
        Documentation
      </NavigationMenuLink>
    </NuxtLink>
  </NavigationMenuItem>
</template>
```

