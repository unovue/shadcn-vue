<script setup lang="ts">
import type { TabsTabProps } from '@vase-ui/vue/tabs'
import type { HTMLAttributes } from 'vue'
import { Tabs } from '@vase-ui/vue/tabs'
import { cn } from 'cn'

interface Props extends /* @vue-ignore */ TabsTabProps {
  class?: HTMLAttributes['class']
  value: TabsTabProps['value']
}

const props = defineProps<Props>()
</script>

<template>
  <Tabs.Tab :value="value">
    <template #element="{ props: tabProps, elementRef, state }">
      <button
        v-bind="tabProps"
        :ref="elementRef"
        data-slot="tabs-trigger"
        :data-active="state.active ? '' : undefined"
        :class="cn(
          'gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium group-data-[variant=default]/tabs-list:data-active:shadow-sm group-data-[variant=line]/tabs-list:data-active:shadow-none [&_svg:not([class*=size-])]:size-4 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 relative inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center whitespace-nowrap text-foreground/60 transition-all group-data-vertical/tabs:w-full group-data-vertical/tabs:justify-start hover:text-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-1 focus-visible:outline-ring aria-disabled:pointer-events-none aria-disabled:opacity-50 dark:text-muted-foreground dark:hover:text-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0',
          'group-data-[variant=line]/tabs-list:bg-transparent group-data-[variant=line]/tabs-list:data-active:bg-transparent dark:group-data-[variant=line]/tabs-list:data-active:border-transparent dark:group-data-[variant=line]/tabs-list:data-active:bg-transparent',
          'data-active:bg-background data-active:text-foreground dark:data-active:border-input dark:data-active:bg-input/30 dark:data-active:text-foreground',
          'after:absolute after:bg-foreground after:opacity-0 after:transition-opacity group-data-horizontal/tabs:after:inset-x-0 group-data-horizontal/tabs:after:bottom-[-5px] group-data-horizontal/tabs:after:h-0.5 group-data-vertical/tabs:after:inset-y-0 group-data-vertical/tabs:after:-right-1 group-data-vertical/tabs:after:w-0.5 group-data-[variant=line]/tabs-list:data-active:after:opacity-100',
          props.class,
        )"
      >
        <slot />
      </button>
    </template>
  </Tabs.Tab>
</template>
