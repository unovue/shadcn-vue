<script setup lang="ts">
import type { Preset } from '@/registry/config'
import { STYLES } from '@/registry/config'

const props = defineProps<{
  presets: Preset[]
  isMobile: boolean
  anchorRef: HTMLDivElement | null
}>()

const params = useDesignSystemSearchParams()

const currentPreset = computed(() => {
  return props.presets.find(
    preset =>
      preset.base === params.base.value
      && preset.style === params.style.value
      && preset.baseColor === params.baseColor.value
      && preset.theme === params.theme.value
      && preset.iconLibrary === params.iconLibrary.value
      && preset.font === params.font.value
      && preset.menuAccent === params.menuAccent.value
      && preset.menuColor === params.menuColor.value
      && preset.radius === params.radius.value,
  )
})

const currentBasePresets = computed(() => props.presets.filter(preset => preset.base === params.base.value))

function handlePresetChange(value: string) {
  const preset = props.presets.find(p => p.title === value)
  if (!preset) {
    return
  }

  // Update all params including base.
  params.base.value = preset.base
  params.style.value = preset.style
  params.baseColor.value = preset.baseColor
  params.theme.value = preset.theme
  params.iconLibrary.value = preset.iconLibrary
  params.font.value = preset.font
  params.menuAccent.value = preset.menuAccent
  params.menuColor.value = preset.menuColor
  params.radius.value = preset.radius
  params.custom.value = false
}
</script>

<template>
  <Picker>
    <PickerTrigger>
      <div class="flex flex-col justify-start text-left">
        <div class="text-muted-foreground text-xs">
          Preset
        </div>
        <div class="text-foreground line-clamp-1 text-sm font-medium">
          {{ currentPreset?.description ?? "Custom" }}
        </div>
      </div>
    </PickerTrigger>
    <PickerContent
      :anchor="isMobile ? anchorRef : undefined"
      :side="isMobile ? 'top' : 'right'"
      :align="isMobile ? 'center' : 'start'"
      class="md:w-72"
    >
      <PickerRadioGroup
        :model-value="currentPreset?.title ?? ''"
        @update:model-value="handlePresetChange"
      >
        <PickerGroup>
          <PickerRadioItem v-for="preset in currentBasePresets" :key="preset.title" :value="preset.title">
            <div class="flex items-center gap-2">
              <div v-if="STYLES.find((s) => s.name === preset.style)" class="flex size-4 shrink-0 items-center justify-center" v-html="STYLES.find((s) => s.name === preset.style)?.icon" />
              {{ preset.description }}
            </div>
          </PickerRadioItem>
        </PickerGroup>
      </PickerRadioGroup>
    </PickerContent>
  </Picker>
</template>
