---
title: Tabs
description: A set of layered sections of content—known as tab panels—that are displayed one at a time.
source: apps/www/src/lib/registry/default/ui/tabs 
primitive: https://www.radix-vue.com/components/tabs.html
---

<script setup>
import { useConfigStore } from '@/stores/config'

const { codeConfig } = useConfigStore()
</script>


<ComponentPreview name="TabsDemo" /> 


## Installation



```bash
npx shadcn-vue@latest add tabs
```

## Usage

```vue-vue
<script setup lang="ts">
import { {{codeConfig.prefix}}Tabs, {{codeConfig.prefix}}TabsContent, {{codeConfig.prefix}}TabsList, {{codeConfig.prefix}}TabsTrigger } from '{{codeConfig.aliases.components}}/ui/tabs'
</script>

<template>
  <{{codeConfig.prefix}}Tabs default-value="account" class="w-[400px]">
    <{{codeConfig.prefix}}TabsList>
      <{{codeConfig.prefix}}TabsTrigger value="account">
        Account
      </{{codeConfig.prefix}}TabsTrigger>
      <{{codeConfig.prefix}}TabsTrigger value="password">
        Password
      </{{codeConfig.prefix}}TabsTrigger>
    </{{codeConfig.prefix}}TabsList>
    <{{codeConfig.prefix}}TabsContent value="account">
      Make changes to your account here.
    </{{codeConfig.prefix}}TabsContent>
    <{{codeConfig.prefix}}TabsContent value="password">
      Change your password here.
    </{{codeConfig.prefix}}TabsContent>
  </{{codeConfig.prefix}}Tabs>
</template>
```
