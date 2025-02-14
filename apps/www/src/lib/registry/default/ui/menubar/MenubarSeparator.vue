<script setup lang="ts">
import type { MenubarSeparatorProps } from 'radix-vue'
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { MenubarSeparator, useForwardProps } from 'radix-vue'
import { computed } from 'vue'

const props = defineProps<MenubarSeparatorProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <MenubarSeparator :class=" cn('-mx-1 my-1 h-px bg-muted', props.class)" v-bind="forwardedProps" />
</template>
