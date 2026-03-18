<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { ShuffleIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/vue'
import { useLocks } from '@/composables/useLocks'
import { FONTS } from '@/lib/fonts'
import { cn } from '@/lib/utils'
import {
  BASE_COLORS,
  getThemesForBaseColor,
  iconLibraries,
  MENU_ACCENTS,
  MENU_COLORS,
  RADII,
  STYLES,
} from '@/registry/config'
import { Button } from '@/registry/new-york-v4/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/registry/new-york-v4/ui/tooltip'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const params = useDesignSystemSearchParams()
const { isLocked } = useLocks()

function getRandomItem<T>(array: readonly T[]): T {
  return array[Math.floor(Math.random() * array.length)]!
}

function randomize() {
  // Randomize style if not locked
  if (!isLocked('style')) {
    params.style.value = getRandomItem(STYLES).name
  }

  // Randomize base color if not locked
  if (!isLocked('baseColor')) {
    params.baseColor.value = getRandomItem(BASE_COLORS).name
  }

  // Randomize theme if not locked (must be compatible with base color)
  if (!isLocked('theme')) {
    const availableThemes = getThemesForBaseColor(params.baseColor.value)
    params.theme.value = getRandomItem(availableThemes).name
  }

  // Randomize icon library if not locked
  if (!isLocked('iconLibrary')) {
    const iconLibraryNames = Object.keys(iconLibraries) as (keyof typeof iconLibraries)[]
    params.iconLibrary.value = getRandomItem(iconLibraryNames)
  }

  // Randomize font if not locked
  if (!isLocked('font')) {
    params.font.value = getRandomItem(FONTS).value
  }

  // Randomize radius if not locked
  if (!isLocked('radius')) {
    params.radius.value = getRandomItem(RADII).name
  }

  // Randomize menu color if not locked
  if (!isLocked('menuColor')) {
    params.menuColor.value = getRandomItem(MENU_COLORS).value
  }

  // Randomize menu accent if not locked
  if (!isLocked('menuAccent')) {
    params.menuAccent.value = getRandomItem(MENU_ACCENTS).value
  }

  // Mark as custom since we're randomizing
  params.custom.value = true
}

// Listen for keyboard shortcut (R key)
function handleKeyDown(event: KeyboardEvent) {
  if (event.key === 'r' && !event.metaKey && !event.ctrlKey && !event.altKey) {
    // Don't trigger if typing in an input
    if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
      return
    }
    event.preventDefault()
    randomize()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
})
</script>

<template>
  <div :class="cn('flex items-center gap-2', props.class)">
    <Tooltip>
      <TooltipTrigger as-child>
        <Button
          variant="outline"
          size="sm"
          class="gap-2"
          @click="randomize"
        >
          <HugeiconsIcon
            :icon="ShuffleIcon"
            :stroke-width="2"
            class="size-4"
          />
          <span class="hidden sm:inline">Randomize</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <div class="flex items-center gap-1">
          Randomize unlocked options
          <kbd class="bg-muted text-muted-foreground ml-1 rounded px-1.5 py-0.5 text-xs">R</kbd>
        </div>
      </TooltipContent>
    </Tooltip>
  </div>
</template>
