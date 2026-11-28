<script setup lang="ts">
import type { SelectScrollUpArrowProps } from '@vase-ui/vue/select'

import type { HTMLAttributes } from 'vue'
import { ChevronUpIcon } from '@lucide/vue'
import { Select } from '@vase-ui/vue/select'
import { cn } from 'cn'

interface Props extends /* @vue-ignore */ SelectScrollUpArrowProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <Select.ScrollUpArrow
    data-slot="select-scroll-up-button"
    :class="cn('bg-popover z-10 flex cursor-default items-center justify-center py-1 [&_svg:not([class*=size-])]:size-4 top-0 w-full', props.class)"
  >
    <slot>
      <ChevronUpIcon />
    </slot>
  </Select.ScrollUpArrow>
</template>
