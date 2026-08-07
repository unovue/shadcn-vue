<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Menu09Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/vue'
import { useEventListener } from '@vueuse/core'
import { isEditableTarget } from '@/lib/typeset/keyboard'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const isMac = useIsMac()
const { canGoBack, canGoForward, goBack, goForward } = useTypesetHistory()
const { toggleTheme } = useTypesetThemeToggle()
const { shuffle, reset } = useTypesetShuffle()

// R shuffles, ⇧R resets. Undo/Redo (⌘Z) and Light/Dark (D) are bound in their
// own composables.
useEventListener(globalThis.document, 'keydown', (event: KeyboardEvent) => {
  if (event.metaKey || event.ctrlKey || event.altKey) {
    return
  }
  if (isEditableTarget(event.target)) {
    return
  }
  if (event.key !== 'r' && event.key !== 'R') {
    return
  }
  event.preventDefault()
  if (event.shiftKey) {
    reset()
  }
  else {
    shuffle()
  }
})
</script>

<template>
  <Picker>
    <PickerTrigger
      :class="cn(
        'flex items-center justify-between gap-2 rounded-lg px-1.75 ring-1 ring-foreground/10 focus-visible:ring-1',
        props.class,
      )"
    >
      <span class="font-medium">Menu</span>
      <HugeiconsIcon :icon="Menu09Icon" :stroke-width="2" class="size-5" />
    </PickerTrigger>
    <PickerContent side="right" align="start" :align-offset="-8">
      <PickerGroup>
        <PickerItem @click="shuffle">
          Shuffle <PickerShortcut>R</PickerShortcut>
        </PickerItem>
        <PickerItem @click="toggleTheme">
          Light/Dark <PickerShortcut>D</PickerShortcut>
        </PickerItem>
      </PickerGroup>
      <PickerSeparator />
      <PickerGroup>
        <PickerItem :disabled="!canGoBack" @click="goBack">
          Undo <PickerShortcut>{{ isMac ? '⌘Z' : 'Ctrl+Z' }}</PickerShortcut>
        </PickerItem>
        <PickerItem :disabled="!canGoForward" @click="goForward">
          Redo <PickerShortcut>{{ isMac ? '⇧⌘Z' : 'Ctrl+Shift+Z' }}</PickerShortcut>
        </PickerItem>
        <PickerSeparator />
        <PickerItem @click="reset">
          Reset <PickerShortcut>⇧R</PickerShortcut>
        </PickerItem>
      </PickerGroup>
    </PickerContent>
  </Picker>
</template>
