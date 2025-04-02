<script setup lang="ts">
import { Toggle } from '@/registry/new-york-v4/ui/toggle'

import { BoldIcon, BookmarkIcon, ItalicIcon, UnderlineIcon } from 'lucide-vue-next'
</script>

<template>
  <div class="flex flex-wrap items-center gap-6">
    <Toggle aria-label="Toggle italic">
      <BoldIcon />
    </Toggle>
    <Toggle aria-label="Toggle italic" variant="default">
      <UnderlineIcon />
    </Toggle>
    <Toggle aria-label="Toggle italic" variant="default" disabled>
      Disabled
    </Toggle>
    <Toggle variant="outline" aria-label="Toggle italic">
      <ItalicIcon />
      Italic
    </Toggle>
    <Toggle
      aria-label="Toggle book"
      class="data-[state=on]:[&_svg]:fill-accent-foreground"
    >
      <BookmarkIcon />
    </Toggle>
    <Toggle variant="outline" aria-label="Toggle italic" size="sm">
      Small
    </Toggle>
    <Toggle variant="outline" aria-label="Toggle italic" size="lg">
      Large
    </Toggle>
  </div>
</template>
