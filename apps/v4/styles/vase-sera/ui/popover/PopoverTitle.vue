<script setup lang="ts">
import type { PopoverTitleProps } from '@vase-ui/vue/popover'
import type { HTMLAttributes } from 'vue'
import { Popover } from '@vase-ui/vue/popover'
import { cn } from 'cn'

interface Props extends /* @vue-ignore */ PopoverTitleProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <Popover.Title
    data-slot="popover-title"
    :class="cn('text-xs font-semibold uppercase cn-font-heading', props.class)"
  >
    <slot />
  </Popover.Title>
</template>
