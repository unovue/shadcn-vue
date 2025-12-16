<script setup lang="ts">
import IconPlaceholder from "@/components/IconPlaceholder.vue"
import { Toggle } from "@/registry/bases/reka/ui/toggle"
</script>

<template>
  <div class="flex flex-wrap items-center gap-2">
    <Toggle variant="outline" aria-label="Toggle italic">
      <IconPlaceholder
        lucide="ItalicIcon"
        tabler="IconItalic"
        hugeicons="TextItalicIcon"
      />
      Italic
    </Toggle>
    <Toggle variant="outline" aria-label="Toggle bold">
      <IconPlaceholder
        lucide="BoldIcon"
        tabler="IconBold"
        hugeicons="TextBoldIcon"
      />
      Bold
    </Toggle>
  </div>
</template>
