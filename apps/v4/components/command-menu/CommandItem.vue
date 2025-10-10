<script setup lang="ts">
import type { ListboxItemProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit, useMutationObserver } from '@vueuse/core'
import { useForwardPropsEmits } from 'reka-ui'
import { cn } from '@/lib/utils'
import { CommandItem } from '@/registry/new-york-v4/ui/command'

const props = defineProps<ListboxItemProps & { class?: HTMLAttributes['class'] }>()

const emits = defineEmits<{
  (e: 'select'): void
  (e: 'highlight'): void
}>()

const delegatedProps = reactiveOmit(props, 'class')

const forwarded = useForwardPropsEmits(delegatedProps, emits)

const itemRef = useTemplateRef<InstanceType<typeof CommandItem>>('itemRef')

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
    v-bind="forwarded"
    ref="itemRef"
    :class="cn('data-[highlighted]:border-input data-[selected=true]:border-input data-[selected=true]:bg-input/50 data-[highlighted]:bg-input/50  h-9 rounded-md border border-transparent !px-3 font-medium', props.class)"
  >
    <slot />
  </CommandItem>
</template>
