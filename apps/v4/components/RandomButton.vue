<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
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
import { Button } from '@/styles/reka-nova/ui/button'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const params = useDesignSystemSearchParams()
const { isLocked } = useLocks()

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
  if (!isLocked('chartColor')) {
    const chartColors = getThemesForBaseColor(params.baseColor.value)
    params.chartColor.value = getRandomItem(chartColors).name
  }
}
</script>

<template>
  <Button
    variant="outline"
    :class="cn(
      'touch-manipulation bg-transparent! px-2! py-0! text-sm! transition-none select-none hover:bg-muted! pointer-coarse:h-10!',
      props.class,
    )"
    @click="randomize"
  >
    <span class="w-full text-center font-medium">Shuffle</span>
  </Button>
</template>
