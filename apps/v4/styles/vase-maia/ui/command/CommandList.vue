<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from 'cn'
import { useCommand } from '.'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const command = useCommand()
</script>

<template>
  <div
    :id="command.listId"
    data-slot="command-list"
    role="listbox"
    :class="cn('no-scrollbar max-h-72 scroll-py-1 outline-none overflow-x-hidden overflow-y-auto', props.class)"
  >
    <div role="presentation">
      <slot />
    </div>
  </div>
</template>
