<script setup lang="ts">
import type { SelectScrollDownArrowProps } from '@vase-ui/vue/select'

import type { HTMLAttributes } from 'vue'
import { ChevronDownIcon } from '@lucide/vue'
import { Select } from '@vase-ui/vue/select'
import { cn } from 'cn'

interface Props extends /* @vue-ignore */ SelectScrollDownArrowProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <Select.ScrollDownArrow
    data-slot="select-scroll-down-button"
    :class="cn('bg-popover z-10 flex cursor-default items-center justify-center py-1 [&_svg:not([class*=size-])]:size-4 bottom-0 w-full', props.class)"
  >
    <slot>
      <ChevronDownIcon />
    </slot>
  </Select.ScrollDownArrow>
</template>
