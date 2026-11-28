<script setup lang="ts">
import type { ComboboxListProps } from '@vase-ui/vue/combobox'
import type { HTMLAttributes } from 'vue'
import { Combobox } from '@vase-ui/vue/combobox'
import { cn } from 'cn'

interface Props extends /* @vue-ignore */ ComboboxListProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <Combobox.List
    data-slot="combobox-viewport"
    :class="cn('no-scrollbar max-h-[min(calc(--spacing(72)---spacing(9)),calc(var(--available-height)---spacing(9)))] scroll-py-1 overflow-y-auto data-empty:p-0', props.class)"
  >
    <slot />
    <template v-if="$slots.item" #item="slotProps">
      <slot name="item" v-bind="slotProps" />
    </template>
  </Combobox.List>
</template>
