<script setup lang="ts">
import type { SeparatorProps } from '@vase-ui/vue/separator'
import type { HTMLAttributes } from 'vue'
import { cn } from 'cn'
import { Separator } from '@/styles/vase-mira/ui/separator'

interface Props extends /* @vue-ignore */ SeparatorProps {
  class?: HTMLAttributes['class']
  orientation?: 'horizontal' | 'vertical'
}

const props = withDefaults(defineProps<Props>(), {
  orientation: 'vertical',
})
</script>

<template>
  <Separator
    data-slot="button-group-separator"
    :orientation="orientation"
    :class="cn(
      'bg-input relative self-stretch data-horizontal:mx-px data-horizontal:w-auto data-vertical:my-px data-vertical:h-auto',
      props.class,
    )"
  />
</template>
