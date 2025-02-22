---
title: Laravel
description: Install and configure Laravel with Inertia
---

<Steps>

### Create project

Start by creating a new Laravel project with Inertia and Vue using the Laravel installer `laravel new my-app`:

```bash
laravel new my-app --typescript --breeze --stack=vue --git --no-interaction
```

### Run the CLI

Run the `shadcn-vue` init command to setup your project:

```bash
npx shadcn-vue@latest init
```

### Configure components.json

You will be asked a few questions to configure `components.json`:

```txt:line-numbers
Which style would you like to use?
Which color would you like to use as base color?
Do you want to use CSS variables for colors? › yes
```

### That's it

You can now start adding components to your project.

```bash
npx shadcn-vue@latest add button
```

The command above will add the `Button` component to your project. You can then import it like this:

```vue {2,7}
<script setup lang="ts">
import { Button } from '@/Components/ui/button'
</script>

<template>
  <div>
    <Button>Click me</Button>
  </div>
</template>
```

</Steps>
