<script setup lang="ts">
import type { FontHeadingOption } from '@/lib/fonts'
import type { FontValue } from '~/registry/config'
import { FONTS } from '@/lib/fonts'

const props = defineProps<{
  label?: string
  param?: 'font' | 'fontHeading'
  fonts: FontHeadingOption[]
  isMobile: boolean
  anchorRef: HTMLDivElement | null
}>()

const params = useDesignSystemSearchParams()

const paramKey = computed(() => props.param ?? 'font')
const label = computed(() => props.label ?? 'Font')

const currentValue = computed(() => params[paramKey.value].value)

const currentFont = computed(
  () => props.fonts.find(font => font.value === currentValue.value),
)

const currentBodyFont = computed(
  () => FONTS.find(font => font.value === params.font.value),
)

const inheritsBodyFont = computed(
  () => paramKey.value === 'fontHeading' && currentValue.value === 'inherit',
)

const displayFontName = computed(
  () => inheritsBodyFont.value ? currentBodyFont.value?.name : currentFont.value?.name,
)

const inheritFontLabel = computed(
  () => currentBodyFont.value?.name ?? 'Body font',
)

const groupedFonts = computed(() => {
  const pickerFonts = paramKey.value === 'fontHeading'
    ? props.fonts.filter(font => font.value !== 'inherit')
    : props.fonts

  const groups = new Map<string, FontHeadingOption[]>()
  for (const font of pickerFonts) {
    const existing = groups.get(font.type)
    if (existing) {
      existing.push(font)
    }
    else {
      groups.set(font.type, [font])
    }
  }

  return Array.from(groups.entries()).map(([type, items]) => ({
    type,
    label: `${type.charAt(0).toUpperCase()}${type.slice(1)}`,
    items,
  }))
})
</script>

<template>
  <div class="group/picker relative">
    <Picker>
      <PickerTrigger>
        <div class="flex flex-col justify-start text-left">
          <div class="text-muted-foreground text-xs">
            {{ label }}
          </div>
          <div class="line-clamp-1 max-w-[80%] truncate text-foreground text-sm font-medium">
            {{ displayFontName }}
          </div>
        </div>
        <div
          class="text-foreground pointer-events-none absolute top-1/2 right-4 flex size-4 -translate-y-1/2 items-center justify-center text-base select-none md:right-2.5"
          :style="{
            fontFamily: currentFont?.fontFamily ?? currentBodyFont?.fontFamily,
          }"
        >
          Aa
        </div>
      </PickerTrigger>
      <PickerContent
        :anchor="isMobile ? anchorRef : undefined"
        :side="isMobile ? 'top' : 'right'"
        :align="isMobile ? 'center' : 'start'"
        class="max-h-96"
      >
        <PickerRadioGroup
          :model-value="currentValue"
          @update:model-value="(value) => {
            params[paramKey].value = value as FontValue
          }"
        >
          <template v-if="paramKey === 'fontHeading'">
            <PickerGroup>
              <PickerRadioItem value="inherit" :close-on-click="isMobile">
                {{ inheritFontLabel }}
              </PickerRadioItem>
            </PickerGroup>
            <PickerSeparator />
          </template>
          <PickerGroup v-for="group in groupedFonts" :key="group.type">
            <PickerLabel>{{ group.label }}</PickerLabel>
            <PickerRadioItem
              v-for="font in group.items"
              :key="font.value"
              :value="font.value"
              :close-on-click="isMobile"
            >
              {{ font.name }}
            </PickerRadioItem>
          </PickerGroup>
        </PickerRadioGroup>
      </PickerContent>
    </Picker>
    <LockButton
      :param="paramKey"
      class="absolute top-1/2 right-8 -translate-y-1/2"
    />
  </div>
</template>
