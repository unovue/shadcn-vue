<script setup lang="ts">
import type { ListboxContentProps } from 'reka-ui'
import { cn } from '@/lib/utils'
import { ListboxContent, useForwardProps } from 'reka-ui'
import { computed, type HTMLAttributes } from 'vue'

const props = defineProps<ListboxContentProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwarded = useForwardProps(delegatedProps)
</script>

<template>
  <ListboxContent v-bind="forwarded" :class="cn('max-h-[300px] overflow-y-auto overflow-x-hidden', props.class)">
    <div role="presentation">
      <slot />
    </div>
  </ListboxContent>
</template>
