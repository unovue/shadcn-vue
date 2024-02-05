<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { TagsInputItem, type TagsInputItemProps, useForwardProps } from 'radix-vue'

import { cn } from '@/lib/utils'

const props = defineProps<TagsInputItemProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <TagsInputItem v-bind="forwardedProps" :class="cn('flex h-6 items-center rounded-md bg-secondary', props.class)">
    <slot />
  </TagsInputItem>
</template>
