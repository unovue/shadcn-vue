<script setup lang="ts">
import type { RegistryItem } from 'shadcn-vue/schema'
import { FONT_HEADING_OPTIONS, FONTS } from '@/lib/fonts'
import { getThemesForBaseColor, STYLES } from '@/registry/config'

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/styles/reka-nova/ui/card'
import {
  FieldGroup,
  FieldSeparator,
} from '@/styles/reka-nova/ui/field'

const props = defineProps<{
  items?: Pick<RegistryItem, 'name' | 'title' | 'type'>[]
}>()

const { baseColor, style } = useDesignSystemSearchParams()
const isMobile = useIsMobile()

const anchorRef = ref<HTMLDivElement | null>(null)

const availableThemes = computed(() => getThemesForBaseColor(baseColor.value))
</script>

<template>
  <Card
    ref="anchorRef"
    size="sm"
    class="dark top-24 right-12 isolate z-10 max-h-full min-h-0 w-full self-start rounded-2xl bg-card/90 shadow-xl backdrop-blur-xl md:w-(--customizer-width)"
  >
    <CardHeader class="hidden items-center justify-between gap-2 border-b md:flex">
      <MainMenu />
    </CardHeader>
    <CardContent class="no-scrollbar min-h-0 flex-1 overflow-x-auto overflow-y-hidden md:overflow-y-auto">
      <FieldGroup class="flex-row gap-2.5 py-px **:data-[slot=field-separator]:-mx-3 **:data-[slot=field-separator]:w-auto md:flex-col md:gap-3.25">
        <StylePicker
          :styles="STYLES as any"
          :is-mobile="isMobile"
          :anchor-ref="anchorRef"
        />
        <FieldSeparator class="hidden md:block" />
        <BaseColorPicker
          :is-mobile="isMobile"
          :anchor-ref="anchorRef"
        />
        <ThemePicker
          :themes="availableThemes"
          :is-mobile="isMobile"
          :anchor-ref="anchorRef"
        />
        <ChartColorPicker
          :is-mobile="isMobile"
          :anchor-ref="anchorRef"
        />
        <FieldSeparator class="hidden md:block" />
        <FontPicker
          label="Heading"
          param="fontHeading"
          :fonts="FONT_HEADING_OPTIONS as any"
          :is-mobile="isMobile"
          :anchor-ref="anchorRef"
        />
        <FontPicker
          label="Font"
          param="font"
          :fonts="FONTS as any"
          :is-mobile="isMobile"
          :anchor-ref="anchorRef"
        />
        <FieldSeparator class="hidden md:block" />
        <IconLibraryPicker
          :is-mobile="isMobile"
          :anchor-ref="anchorRef"
        />
        <RadiusPicker
          :is-mobile="isMobile"
          :anchor-ref="anchorRef"
        />
        <FieldSeparator class="hidden md:block" />
        <MenuColorPicker
          :is-mobile="isMobile"
          :anchor-ref="anchorRef"
        />
        <MenuAccentPicker
          :is-mobile="isMobile"
          :anchor-ref="anchorRef"
        />
        <BasePicker
          v-if="isMobile"
          :is-mobile="isMobile"
          :anchor-ref="anchorRef"
        />
      </FieldGroup>
    </CardContent>
    <CardFooter class="flex min-w-0 gap-2 md:flex-col md:rounded-b-none md:**:[button,a]:w-full">
      <CopyPreset class="flex-1 md:flex-none" />
      <OpenPreset class="flex-1 md:flex-none" />
      <RandomButton class="flex-1 md:flex-none" />
      <ActionMenu :items="props.items" />
      <ResetDialog />
    </CardFooter>
    <CardFooter class="-mt-3 hidden min-w-0 gap-2 md:flex md:flex-col md:**:[button,a]:w-full">
      <ProjectForm />
    </CardFooter>
  </Card>
</template>
