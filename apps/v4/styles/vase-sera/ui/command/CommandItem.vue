<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

import type { CommandSelectEvent } from '.'
import { CheckIcon } from '@lucide/vue'
import { cn } from 'cn'
import { computed, onBeforeUnmount, onMounted, ref, useId } from 'vue'
import { useCommand, useCommandGroup } from '.'

const props = defineProps<{
  class?: HTMLAttributes['class']
  value?: any
  disabled?: boolean
}>()

const emits = defineEmits<{
  select: [event: CommandSelectEvent]
}>()

const id = useId()
const command = useCommand()
const group = useCommandGroup()

const itemElement = ref<HTMLElement | null>(null)

const isDisabled = computed(() => Boolean(props.disabled || command.disabled.value))
const isRender = computed(() => command.isVisible(id))
const isHighlighted = computed(() => command.highlightedId.value === id)

function handleSelect(originalEvent: Event) {
  if (isDisabled.value) {
    return
  }

  const event: CommandSelectEvent = new CustomEvent('select', {
    cancelable: true,
    detail: { originalEvent, value: props.value },
  })

  emits('select', event)

  if (!event.defaultPrevented) {
    command.select(props.value)
    command.search.value = ''
  }
}

onMounted(() => {
  command.items.set(id, {
    // The search matches the text that the item shows, else its value.
    text: itemElement.value?.textContent?.trim() || String(props.value ?? ''),
    value: props.value,
    groupId: group?.id,
    select: handleSelect,
  })
})

onBeforeUnmount(() => {
  command.unregisterItem(id)
})
</script>

<template>
  <div
    v-if="isRender"
    :id="id"
    ref="itemElement"
    data-slot="command-item"
    role="option"
    :aria-selected="isHighlighted"
    :aria-disabled="isDisabled ? 'true' : undefined"
    :data-disabled="isDisabled ? 'true' : undefined"
    :data-highlighted="isHighlighted ? '' : undefined"
    :data-checked="command.isSelected(value) ? 'true' : undefined"
    :class="cn('data-highlighted:bg-muted data-highlighted:text-foreground data-highlighted:*:[svg]:text-foreground relative flex cursor-default items-center gap-2 rounded-none px-3 py-2 text-sm outline-hidden select-none in-data-[slot=dialog-content]:rounded-none [&_svg:not([class*=size-])]:size-3.5 group/command-item data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0', props.class)"
    @click="handleSelect"
    @pointermove="!isDisabled && command.highlightOnHover.value && command.highlight(id)"
  >
    <slot />
    <CheckIcon class="ml-auto opacity-0 group-has-data-[slot=command-shortcut]/command-item:hidden group-data-[checked=true]/command-item:opacity-100" />
  </div>
</template>
