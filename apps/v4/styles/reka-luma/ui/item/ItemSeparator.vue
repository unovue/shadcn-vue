<script setup lang="ts">
import type { SeparatorProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { Separator } from '@/styles/reka-luma/ui/separator'

const props = defineProps<
  SeparatorProps & { class?: HTMLAttributes['class'] }
>()
</script>

<template>
  <Separator
    data-slot="item-separator"
    orientation="horizontal"
    :class="cn('my-2', props.class)"
  />
</template>
