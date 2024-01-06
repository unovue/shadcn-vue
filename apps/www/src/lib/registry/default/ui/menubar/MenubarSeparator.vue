<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { MenubarSeparator, type MenubarSeparatorProps } from 'radix-vue'
import { cn } from '@/lib/utils'

const props = defineProps<MenubarSeparatorProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <MenubarSeparator :class=" cn('-mx-1 my-1 h-px bg-secondary', props.class)" v-bind="delegatedProps" />
</template>
