<script setup lang="ts">
import { IconGripVertical } from '@tabler/icons-vue'
import { useSortableContext } from 'dnd-kit-vue'
import { Button } from '@/registry/new-york-v4/ui/button'

const { handleRef, sortable } = useSortableContext()
</script>

<template>
  <Button
    :ref="handleRef"
    variant="ghost"
    size="icon"
    class="text-muted-foreground size-7 hover:bg-transparent"
  >
    <IconGripVertical class="text-muted-foreground size-3" />
    <span class="sr-only">Drag to reorder</span>
  </Button>
</template>
