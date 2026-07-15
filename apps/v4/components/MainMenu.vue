<script setup lang="ts">
import { Menu09Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/vue'
import { useColorMode } from '@vueuse/core'
import { useLocks } from '@/composables/useLocks'
import { FONTS } from '@/lib/fonts'
import {
  BASE_COLORS,
  getThemesForBaseColor,
  iconLibraries,
  MENU_ACCENTS,
  MENU_COLORS,
  RADII,
  STYLES,
} from '@/registry/config'

const isMac = ref(false)
const { openActionMenu } = useActionMenu()
const { openPreset } = useOpenPresetTrigger()
const { showResetDialog } = useReset()
const { isLocked } = useLocks()
const colorMode = useColorMode()
function toggleMode() {
  colorMode.value = colorMode.value === 'dark' ? 'light' : 'dark'
}
const params = useDesignSystemSearchParams()

onMounted(() => {
  const platform = navigator.platform || navigator.userAgent
  isMac.value = /Mac|iPhone|iPad|iPod/.test(platform)
})

function getRandomItem<T>(array: readonly T[]): T {
  return array[Math.floor(Math.random() * array.length)]!
}

function randomize() {
  if (!isLocked('style'))
    params.style.value = getRandomItem(STYLES).name
  if (!isLocked('baseColor'))
    params.baseColor.value = getRandomItem(BASE_COLORS).name
  if (!isLocked('theme')) {
    const themes = getThemesForBaseColor(params.baseColor.value)
    params.theme.value = getRandomItem(themes).name
  }
  if (!isLocked('iconLibrary')) {
    const names = Object.keys(iconLibraries) as (keyof typeof iconLibraries)[]
    params.iconLibrary.value = getRandomItem(names)
  }
  if (!isLocked('font'))
    params.font.value = getRandomItem(FONTS).value
  if (!isLocked('radius'))
    params.radius.value = getRandomItem(RADII).name
  if (!isLocked('menuColor'))
    params.menuColor.value = getRandomItem(MENU_COLORS).value
  if (!isLocked('menuAccent'))
    params.menuAccent.value = getRandomItem(MENU_ACCENTS).value
}

function isEditableTarget(target: EventTarget | null) {
  return (
    (target instanceof HTMLElement && target.isContentEditable)
    || target instanceof HTMLInputElement
    || target instanceof HTMLTextAreaElement
    || target instanceof HTMLSelectElement
  )
}

function handleKeyDown(event: KeyboardEvent) {
  if (isEditableTarget(event.target))
    return
  if (event.key === 'r' && !event.shiftKey && !event.metaKey && !event.ctrlKey && !event.altKey) {
    event.preventDefault()
    randomize()
  }
  if (event.key === 'R' && event.shiftKey && !event.metaKey && !event.ctrlKey && !event.altKey) {
    event.preventDefault()
    showResetDialog.value = true
  }
  if (event.key === 'd' && !event.shiftKey && !event.metaKey && !event.ctrlKey && !event.altKey) {
    event.preventDefault()
    toggleMode()
  }
}

onMounted(() => window.addEventListener('keydown', handleKeyDown))
onUnmounted(() => window.removeEventListener('keydown', handleKeyDown))
</script>

<template>
  <Picker>
    <PickerTrigger
      class="flex items-center justify-between gap-2 rounded-lg px-1.75 ring-1 ring-foreground/10 focus-visible:ring-1"
    >
      <span class="font-medium">Menu</span>
      <HugeiconsIcon :icon="Menu09Icon" :stroke-width="2" class="size-5" />
    </PickerTrigger>
    <PickerContent side="right" align="start" :align-offset="-8">
      <PickerGroup>
        <PickerItem @click="openActionMenu">
          Navigate...
          <PickerShortcut>{{ isMac ? '⌘P' : 'Ctrl+P' }}</PickerShortcut>
        </PickerItem>
        <PickerItem @click="openPreset">
          Open Preset... <PickerShortcut>O</PickerShortcut>
        </PickerItem>
        <PickerItem @click="randomize">
          Shuffle <PickerShortcut>R</PickerShortcut>
        </PickerItem>
        <PickerItem @click="toggleMode">
          Light/Dark <PickerShortcut>D</PickerShortcut>
        </PickerItem>
      </PickerGroup>
      <PickerSeparator />
      <PickerGroup>
        <PickerItem @click="showResetDialog = true">
          Reset <PickerShortcut>⇧R</PickerShortcut>
        </PickerItem>
      </PickerGroup>
    </PickerContent>
  </Picker>
</template>
