<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div
    data-slot="card-header"
    :class="cn('gap-1.5 rounded-none px-8 group-data-[size=sm]/card:px-5 [.border-b]:pb-8 group-data-[size=sm]/card:[.border-b]:pb-5 group/card-header @container/card-header grid auto-rows-min items-start has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto]', props.class)"
  >
    <slot />
  </div>
</template>
