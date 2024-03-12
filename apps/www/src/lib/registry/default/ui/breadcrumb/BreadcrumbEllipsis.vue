<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'
import { MoreHorizontal } from 'lucide-vue-next'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <span
    role="presentation"
    aria-hidden="true"
    :class="cn('flex h-9 w-9 items-center justify-center', props.class)"
  >
    <MoreHorizontal class="h-4 w-4" />
    <span class="sr-only">More</span>
  </span>
</template>
