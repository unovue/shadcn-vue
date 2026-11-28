<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "cn"
import { useCommand } from "."

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()

const command = useCommand()
</script>

<template>
  <div
    :id="command.listId"
    data-slot="command-list"
    role="listbox"
    :class="cn('cn-command-list overflow-x-hidden overflow-y-auto', props.class)"
  >
    <div role="presentation">
      <slot />
    </div>
  </div>
</template>
