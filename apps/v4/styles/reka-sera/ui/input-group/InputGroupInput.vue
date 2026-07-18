<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { Input } from '@/styles/reka-sera/ui/input'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <Input
    data-slot="input-group-control"
    :class="cn(
      'border-0 bg-transparent ring-0 focus-visible:ring-0 aria-invalid:ring-0 dark:bg-transparent group-has-[>[data-align=inline-start]]/input-group:pl-2 group-has-[>[data-align=inline-end]]/input-group:pr-2 flex-1',
      props.class,
    )"
  />
</template>
