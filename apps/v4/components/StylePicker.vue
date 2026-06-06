<script setup lang="ts">
import type { Style, StyleName } from '@/registry/config'
import { PRESETS } from '@/registry/config'

const props = defineProps<{
  styles: Style[]
  isMobile: boolean
  anchorRef: HTMLDivElement | null
}>()

const params = useDesignSystemSearchParams()
const currentStyle = computed(() => props.styles.find(style => style.name === params.style.value))

// Picking a style applies the full preset for that base+style (mirrors
// shadcn-ui upstream). Without this, switching to a style with non-default
// fields (e.g. Sera's taupe + Playfair Display heading) would leave the rest
// of the design system on whatever values the user previously had.
function handleStyleChange(value: unknown) {
  const styleName = value as StyleName
  params.style.value = styleName

  const preset = PRESETS.find(
    p => p.base === params.base.value && p.style === styleName,
  )
  if (!preset) {
    return
  }

  params.baseColor.value = preset.baseColor
  params.theme.value = preset.theme
  params.chartColor.value = preset.chartColor ?? preset.theme
  params.iconLibrary.value = preset.iconLibrary
  params.font.value = preset.font
  params.fontHeading.value = preset.fontHeading
  params.menuAccent.value = preset.menuAccent
  params.menuColor.value = preset.menuColor
  params.radius.value = preset.radius
}
</script>

<template>
  <div class="group/picker relative">
    <Picker>
      <PickerTrigger>
        <div class="flex flex-col justify-start text-left">
          <div class="text-muted-foreground text-xs">
            Style
          </div>
          <div class="text-foreground text-sm font-medium">
            {{ currentStyle?.title }}
          </div>
        </div>
        <div
          v-if="currentStyle?.icon"
          class="pointer-events-none absolute top-1/2 right-4 flex size-4 -translate-y-1/2 items-center justify-center select-none md:right-2.5"
          v-html="currentStyle.icon"
        />
      </PickerTrigger>
      <PickerContent
        :anchor="isMobile ? anchorRef : undefined"
        :side="isMobile ? 'top' : 'right'"
        :align="isMobile ? 'center' : 'start'"
      >
        <PickerRadioGroup
          :model-value="currentStyle?.name"
          @update:model-value="handleStyleChange"
        >
          <PickerGroup>
            <PickerRadioItem
              v-for="style in styles"
              :key="style.name"
              :value="style.name"
              :close-on-click="isMobile"
            >
              {{ style.title }}
            </PickerRadioItem>
          </PickerGroup>
        </PickerRadioGroup>
      </PickerContent>
    </Picker>
    <LockButton
      param="style"
      class="absolute top-1/2 right-8 -translate-y-1/2"
    />
  </div>
</template>
