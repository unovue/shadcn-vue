<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { MenubarSubTrigger, type MenubarSubTriggerProps } from 'radix-vue'
import { ChevronRight } from 'lucide-vue-next'
import { cn } from '@/lib/utils'

const props = defineProps<MenubarSubTriggerProps & { class?: HTMLAttributes['class']; inset?: boolean }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <MenubarSubTrigger
    v-bind="delegatedProps"
    :class="[
      cn(
        'flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground',
        inset && 'pl-8',
        props.class,
      ),
    ]"
  >
    <slot />
    <ChevronRight class="ml-auto h-4 w-4" />
  </MenubarSubTrigger>
</template>
