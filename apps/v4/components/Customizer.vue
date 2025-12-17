<script setup lang="ts">
import { Settings05Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/vue'

// import { MenuAccentPicker } from '@/app/(create)/components/accent-picker'
// import { BaseColorPicker } from '@/app/(create)/components/base-color-picker'
// import { BasePicker } from '@/app/(create)/components/base-picker'
// import { CustomizerControls } from '@/app/(create)/components/customizer-controls'
// import { FontPicker } from '@/app/(create)/components/font-picker'
// import { IconLibraryPicker } from '@/app/(create)/components/icon-library-picker'
// import { MenuColorPicker } from '@/app/(create)/components/menu-picker'
// import { PresetPicker } from '@/app/(create)/components/preset-picker'
// import { RadiusPicker } from '@/app/(create)/components/radius-picker'
// import { StylePicker } from '@/app/(create)/components/style-picker'
// import { ThemePicker } from '@/app/(create)/components/theme-picker'
// import { FONTS } from '@/app/(create)/lib/fonts'

import { FONTS } from '@/lib/fonts'
import { getThemesForBaseColor, PRESETS, STYLES } from '@/registry/config'
import { FieldGroup } from '@/registry/new-york-v4/ui/field'

const { baseColor } = useDesignSystemSearchParams()
const isMobile = useIsMobile()

const availableThemes = computed(() => getThemesForBaseColor(baseColor.value))

const anchorRef = ref<HTMLDivElement | null>(null)
</script>

<template>
  <div ref="anchorRef" class="no-scrollbar -mx-2.5 flex flex-col overflow-y-auto p-1 md:mx-0 md:h-[calc(100svh-var(--header-height)-2rem)] md:w-48 md:gap-0 md:py-0">
    <div class="hidden items-center gap-2 px-[calc(--spacing(2.5))] pb-1 md:flex md:flex-col md:items-start">
      <HugeiconsIcon
        :icon="Settings05Icon"
        class="size-4"
        :stroke-width="2"
      />
      <div class="relative flex flex-col gap-1 rounded-lg text-[13px]/snug">
        <div class="flex items-center gap-1 font-medium text-balance">
          Build your own theme
        </div>
        <div class="hidden md:flex">
          When you're done, click Create Project to start a new project.
        </div>
      </div>
    </div>
    <div class="no-scrollbar h-14 overflow-x-auto overflow-y-hidden p-px md:h-full md:overflow-x-hidden md:overflow-y-auto">
      <FieldGroup class="flex h-full flex-1 flex-row gap-2 md:flex-col md:gap-0">
        <PresetPicker
          :presets="PRESETS"
          :is-mobile="isMobile"
          :anchor-ref="anchorRef"
        />
        <!-- <BasePicker is-mobile="{isMobile}" anchor-ref="{anchorRef}" /> -->
        <StylePicker
          :styles="STYLES as any"
          :is-mobile="isMobile"
          :anchor-ref="anchorRef"
        />
        <BaseColorPicker
          :is-mobile="isMobile"
          :anchor-ref="anchorRef"
        />
        <ThemePicker
          :themes="availableThemes"
          :is-mobile="isMobile"
          :anchor-ref="anchorRef"
        />
        <IconLibraryPicker
          :is-mobile="isMobile"
          :anchor-ref="anchorRef"
        />
        <FontPicker
          :fonts="FONTS as any"
          :is-mobile="isMobile"
          :anchor-ref="anchorRef"
        />
        <!-- <RadiusPicker is-mobile="{isMobile}" anchor-ref="{anchorRef}" />
        <MenuColorPicker is-mobile="{isMobile}" anchor-ref="{anchorRef}" />
        <MenuAccentPicker is-mobile="{isMobile}" anchor-ref="{anchorRef}" />
        <CustomizerControls class="mt-auto hidden w-full flex-col md:flex" /> -->
      </FieldGroup>
    </div>
  </div>
</template>
