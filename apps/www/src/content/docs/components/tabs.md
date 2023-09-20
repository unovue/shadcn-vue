---
title: Tabs
description: A set of layered sections of content—known as tab panels—that are displayed one at a time.
source: apps/www/src/lib/registry/default/ui/tabs 
primitive: https://www.radix-vue.com/components/tabs.html
---

<ComponentPreview name="TabsDemo" /> 


## Installation



```bash
npx shadcn-vue@latest add tabs
```

## Usage

```vue
<script setup lang="ts">
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
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