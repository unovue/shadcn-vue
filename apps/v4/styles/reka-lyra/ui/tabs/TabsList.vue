<script setup lang="ts">
import type { TabsListProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { TabsList } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = withDefaults(defineProps<TabsListProps & {
  class?: HTMLAttributes['class']
  variant?: 'default' | 'line'
}>(), {
  variant: 'default',
})

const delegatedProps = reactiveOmit(props, 'class', 'variant')
</script>

<template>
  <TabsList
    data-slot="tabs-list"
    :data-variant="variant"
    v-bind="delegatedProps"
    :class="cn(
      'rounded-none p-[3px] group-data-horizontal/tabs:h-8 data-[variant=line]:rounded-none group/tabs-list inline-flex w-fit items-center justify-center text-muted-foreground group-data-vertical/tabs:h-fit group-data-vertical/tabs:flex-col',
      variant === 'default' && 'bg-muted',
      variant === 'line' && 'gap-1 bg-transparent',
      props.class,
    )"
  >
    <slot />
  </TabsList>
</template>
