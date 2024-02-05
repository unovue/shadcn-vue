<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { TagsInputItem, type TagsInputItemProps, useForwardProps } from 'radix-vue'
import { buttonVariants } from '@/lib/registry/default/ui/button'

import { cn } from '@/lib/utils'

const props = defineProps<TagsInputItemProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <TagsInputItem v-bind="forwardedProps" :class="cn('flex items-center rounded-md bg-secondary', props.class)">
    <slot />
  </TagsInputItem>
</template>
