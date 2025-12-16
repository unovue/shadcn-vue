<script setup lang="ts">
import IconPlaceholder from "@/components/IconPlaceholder.vue"
import { Tabs, TabsList, TabsTrigger } from "@/registry/bases/reka/ui/tabs"
</script>

<template>
  <Tabs default-value="preview">
    <TabsList>
      <TabsTrigger value="preview">
        <IconPlaceholder
          lucide="AppWindowIcon"
          tabler="IconAppWindow"
          hugeicons="CursorInWindowIcon"
        />
        Preview
      </TabsTrigger>
      <TabsTrigger value="code">
        <IconPlaceholder
          lucide="CodeIcon"
          tabler="IconCode"
          hugeicons="CodeIcon"
        />
        Code
      </TabsTrigger>
    </TabsList>
  </Tabs>
</template>
