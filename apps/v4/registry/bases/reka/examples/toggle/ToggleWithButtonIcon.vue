<script setup lang="ts">
import IconPlaceholder from "@/components/IconPlaceholder.vue"
import { Button } from "@/registry/bases/reka/ui/button"
import { Toggle } from "@/registry/bases/reka/ui/toggle"
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex items-center gap-2">
      <Button variant="outline" size="icon-sm">
        <IconPlaceholder
          lucide="BoldIcon"
          tabler="IconBold"
          hugeicons="TextBoldIcon"
        />
      </Button>
      <Toggle variant="outline" aria-label="Toggle sm icon" size="sm">
        <IconPlaceholder
          lucide="BoldIcon"
          tabler="IconBold"
          hugeicons="TextBoldIcon"
        />
      </Toggle>
    </div>
    <div class="flex items-center gap-2">
      <Button variant="outline" size="icon">
        <IconPlaceholder
          lucide="ItalicIcon"
          tabler="IconItalic"
          hugeicons="TextItalicIcon"
        />
      </Button>
      <Toggle
        variant="outline"
        aria-label="Toggle default icon"
        size="default"
      >
        <IconPlaceholder
          lucide="ItalicIcon"
          tabler="IconItalic"
          hugeicons="TextItalicIcon"
        />
      </Toggle>
    </div>
    <div class="flex items-center gap-2">
      <Button variant="outline" size="icon-lg">
        <IconPlaceholder
          lucide="UnderlineIcon"
          tabler="IconUnderline"
          hugeicons="TextUnderlineIcon"
        />
      </Button>
      <Toggle variant="outline" aria-label="Toggle lg icon" size="lg">
        <IconPlaceholder
          lucide="UnderlineIcon"
          tabler="IconUnderline"
          hugeicons="TextUnderlineIcon"
        />
      </Toggle>
    </div>
  </div>
</template>
