<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

import { SearchIcon } from '@lucide/vue'
import { cn } from 'cn'
import { onMounted, ref } from 'vue'
import { InputGroup, InputGroupAddon } from '@/styles/vase-nova/ui/input-group'
import { useCommand } from '.'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const command = useCommand()

const inputElement = ref<HTMLInputElement | null>(null)

function handleKeydown(event: KeyboardEvent) {
  if (event.isComposing || command.disabled.value) {
    return
  }

  if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
    event.preventDefault()
    command.moveHighlight(event.key === 'ArrowDown' ? 'next' : 'previous')
  }
  else if (event.key === 'Enter') {
    event.preventDefault()
    command.selectHighlighted(event)
  }
}

onMounted(() => inputElement.value?.focus())
</script>

<template>
  <div
    data-slot="command-input-wrapper"
    class="p-1 pb-0"
  >
    <InputGroup class="bg-input/30 border-input/30 h-8! rounded-lg! shadow-none! *:data-[slot=input-group-addon]:pl-2!">
      <input
        v-bind="$attrs"
        ref="inputElement"
        v-model="command.search.value"
        data-slot="command-input"
        type="text"
        role="combobox"
        aria-expanded="true"
        aria-autocomplete="list"
        autocomplete="off"
        autocorrect="off"
        :spellcheck="false"
        :aria-controls="command.listId"
        :aria-activedescendant="command.highlightedId.value ?? undefined"
        :disabled="command.disabled.value || undefined"
        :class="cn('w-full text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50', props.class)"
        @keydown="handleKeydown"
      >
      <InputGroupAddon>
        <SearchIcon class="size-4 shrink-0 opacity-50" />
      </InputGroupAddon>
    </InputGroup>
  </div>
</template>
