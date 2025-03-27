---
title: Laravel
description: Install and configure Laravel with Inertia
---

<Callout class="bg-blue-50 border-blue-600 dark:border-blue-900 dark:bg-blue-950 mt-0 mb-6 [&_code]:bg-blue-100 dark:[&_code]:bg-blue-900">

  **Note:** The following guide is for Tailwind v4. If you are using Tailwind
  v3, use `shadcn-vue@1.0.3`.

</Callout>

<Steps>

### Create project

Start by creating a new Laravel project with Inertia and Vue using the laravel installer `laravel new my-app`:

```bash
laravel new my-app --vue
```

### Add Components

You can now start adding components to your project.

```bash
npx shadcn-vue@latest add switch
```

The command above will add the `Switch` component to `resources/js/components/ui/switch`. You can then import it like this:

```vue {2,7}
<script setup lang="ts">
import { Switch } from '@/Components/ui/switch'
</script>

<template>
  <div>
    <Switch />
  </div>
</template>
```

</Steps>
