<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Separator, type SeparatorProps } from 'radix-vue'
import { cn } from '@/lib/utils'

const props = defineProps<SeparatorProps & { class?: HTMLAttributes['class'] }>()
</script>

<template>
  <Separator
    :class="[
      cn('shrink-0 bg-secondary', props.class),
      props.orientation === 'vertical' ? 'w-px h-full' : 'h-px w-full',
    ]"
  />
</template>
