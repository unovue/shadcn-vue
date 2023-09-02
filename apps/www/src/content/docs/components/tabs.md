---
title: Tabs
description: A set of layered sections of content—known as tab panels—that are displayed one at a time.
source: https://github.com/radix-vue/shadcn-vue/tree/main/apps/www/src/lib/registry/default/ui/tabs 
primitive: https://www.radix-vue.com/components/tabs.html
---

<ComponentPreview name="TabsDemo" >

<<< ../../../lib/registry/default/examples/TabsDemo.vue

</ComponentPreview>



## Installation

```bash
npx shadcn-vue@latest add tabs
```

<ManualInstall>

1. Install `radix-vue`:

```bash
npm install radix-vue
```

2. Copy and paste the component source files linked at the top of this page into your project.
</ManualInstall>

## Usage

```vue
<script setup lang="ts">
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/lib/registry/default/ui/tabs'
</script>

<template>
  <Tabs default-value="account" class="w-[400px]">
    <TabsList>
      <TabsTrigger value="account">
        Account
      </TabsTrigger>
      <TabsTrigger value="password">
        Password
      </TabsTrigger>
    </TabsList>
    <TabsContent value="account">
      Make changes to your account here.
    </TabsContent>
    <TabsContent value="password">
      Change your password here.
    </TabsContent>
  </Tabs>
</template>
```