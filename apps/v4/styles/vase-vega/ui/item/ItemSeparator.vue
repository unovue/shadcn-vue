<script setup lang="ts">
import type { SeparatorProps } from '@vase-ui/vue/separator'
import type { HTMLAttributes } from 'vue'
import { cn } from 'cn'
import { Separator } from '@/styles/vase-vega/ui/separator'

interface Props extends /* @vue-ignore */ SeparatorProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <Separator
    data-slot="item-separator"
    orientation="horizontal"
    :class="cn('my-2', props.class)"
  />
</template>
