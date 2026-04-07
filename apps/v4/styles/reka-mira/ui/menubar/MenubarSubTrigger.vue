<script setup lang="ts">
import type { MenubarSubTriggerProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { MenubarSubTrigger, useForwardProps } from 'reka-ui'
import { cn } from '@/lib/utils'
import { IconPlaceholder } from '@/registry/bases/reka/components/icon-placeholder'

const props = defineProps<MenubarSubTriggerProps & { class?: HTMLAttributes['class'], inset?: boolean }>()

const delegatedProps = reactiveOmit(props, 'class', 'inset')
const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <MenubarSubTrigger
    data-slot="menubar-sub-trigger"
    :data-inset="inset ? '' : undefined"
    v-bind="forwardedProps"
    :class="cn(
      `focus:bg-accent focus:text-accent-foreground data-open:bg-accent data-open:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground min-h-7 gap-2 rounded-md px-2 py-1 text-xs data-[inset]:pl-8 [&_svg:not([class*='size-'])]:size-3.5 flex cursor-default items-center outline-none select-none`,
      props.class,
    )"
  >
    <slot />
    <IconPlaceholder lucide="ChevronRightIcon" tabler="IconChevronRight" hugeicons="ArrowRight01Icon" phosphor="CaretRightIcon" remixicon="RiArrowRightSLine" class="ml-auto size-4" />
  </MenubarSubTrigger>
</template>
