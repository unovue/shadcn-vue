<script setup lang="ts">
import type { ListboxItemProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit, useMutationObserver } from '@vueuse/core'
import { useForwardPropsEmits } from 'reka-ui'
import { cn } from '@/lib/utils'
import { CommandItem, useCommand } from '@/registry/new-york-v4/ui/command'

const props = defineProps<ListboxItemProps & { class?: HTMLAttributes['class'] }>()

const emits = defineEmits<{
  (e: 'select'): void
  (e: 'highlight'): void
}>()

const delegatedProps = reactiveOmit(props, 'class')

const forwarded = useForwardPropsEmits(delegatedProps, emits)

const itemRef = useTemplateRef<HTMLElement & typeof CommandItem | null>('itemRef')

const { filterState } = useCommand()

// Makes sure the component re-renders when filterState.search changes
const isVisible = computed(() => {
  if (!filterState.search) {
    return true
  }
  const value = props.value?.toString() || ''
  const keywords = (props as any).keywords || []
  const extendValue = `${value} ${keywords.join(' ')}`
  return extendValue.toLowerCase().includes(filterState.search.toLowerCase())
})

useMutationObserver(itemRef, (mutations) => {
  mutations.forEach((mutation) => {
    if (
      mutation.type === 'attributes'
      && mutation.attributeName === 'data-highlighted'
      && itemRef.value?.$el.hasAttribute('data-highlighted')
    ) {
      emits('highlight')
    }
  })
}, {
  attributes: true,
  characterData: true,
  childList: true,
  subtree: true,
})
</script>

<template>
  <CommandItem
    v-if="isVisible"
    v-bind="forwarded"
    ref="itemRef"
    :class="cn('data-[highlighted]:border-input data-[selected=true]:border-input data-[selected=true]:bg-input/50 data-[highlighted]:bg-input/50  h-9 rounded-md border border-transparent !px-3 font-medium', props.class)"
  >
    <slot />
  </CommandItem>
</template>
