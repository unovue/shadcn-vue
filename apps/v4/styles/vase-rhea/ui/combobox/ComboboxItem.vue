<script setup lang="ts">
import type { ComboboxItemProps } from '@vase-ui/vue/combobox'
import type { HTMLAttributes } from 'vue'
import { Combobox } from '@vase-ui/vue/combobox'
import { cn } from 'cn'

interface Props extends /* @vue-ignore */ ComboboxItemProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <Combobox.Item
    data-slot="combobox-item"
    :class="cn('data-highlighted:bg-accent data-highlighted:text-accent-foreground not-data-[variant=destructive]:data-highlighted:**:text-accent-foreground gap-2 min-h-7 rounded-xl py-1.5 pr-8 pl-2 text-sm [&_svg:not([class*=size-])]:size-4 group/combobox-item relative flex w-full cursor-default items-center outline-hidden select-none aria-disabled:pointer-events-none aria-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0', props.class)"
  >
    <slot />
  </Combobox.Item>
</template>
