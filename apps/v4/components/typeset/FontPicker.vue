<script setup lang="ts">
import { findTypesetFont, TYPESET_FONTS } from '@/lib/typeset/fonts'
import { coerceTypesetValue } from '@/lib/typeset/params'

const props = defineProps<{
  label: string
  param: 'body' | 'heading' | 'mono'
  isMobile: boolean
}>()

const params = useTypesetSearchParams()
const { setOverride, clearOverride } = useTypesetPreviewOverride()

const currentValue = computed(() => params[props.param].value)

const bodyFont = computed(() => findTypesetFont(params.body.value) ?? TYPESET_FONTS[0]!)

// The heading picker's first entry is "inherit": it follows whatever the body
// font is, so it renders under the body font's name rather than "Inherit".
const inheritsBodyFont = computed(
  () => props.param === 'heading' && currentValue.value === 'inherit',
)

const currentFont = computed(() =>
  inheritsBodyFont.value
    ? bodyFont.value
    : findTypesetFont(currentValue.value) ?? bodyFont.value,
)

// Every picker offers every font (no type filter); grouping is just labels.
const groupedFonts = computed(() => [
  { label: 'Sans', fonts: TYPESET_FONTS.filter(font => font.type === 'sans') },
  { label: 'Serif', fonts: TYPESET_FONTS.filter(font => font.type === 'serif') },
  { label: 'Mono', fonts: TYPESET_FONTS.filter(font => font.type === 'mono') },
])

function selectFont(value: string) {
  const coerced = coerceTypesetValue(props.param, value)
  if (coerced !== null) {
    params[props.param].value = coerced as never
  }
}

function previewFont(value: string) {
  if (props.isMobile) {
    return
  }
  const coerced = coerceTypesetValue(props.param, value)
  if (coerced !== null) {
    setOverride({ [props.param]: coerced })
  }
}
</script>

<template>
  <div class="group/picker relative">
    <Picker @update:open="(open: boolean) => !open && clearOverride()">
      <PickerTrigger>
        <div class="flex flex-col justify-start text-left">
          <div class="text-xs text-muted-foreground">
            {{ label }}
          </div>
          <div class="line-clamp-1 max-w-[80%] truncate text-sm font-medium text-foreground">
            {{ currentFont.label }}
          </div>
        </div>
        <div
          class="pointer-events-none absolute top-1/2 right-4 flex size-4 -translate-y-1/2 items-center justify-center text-base text-foreground select-none md:right-2.5"
          :style="{ fontFamily: currentFont.value }"
        >
          Aa
        </div>
      </PickerTrigger>
      <PickerContent
        :side="isMobile ? 'top' : 'right'"
        :align="isMobile ? 'center' : 'start'"
        class="max-h-96"
        @mouseleave="clearOverride"
      >
        <PickerRadioGroup
          :model-value="currentValue"
          @update:model-value="(value) => selectFont(value as string)"
        >
          <template v-if="param === 'heading'">
            <PickerGroup>
              <PickerRadioItem
                value="inherit"
                @mousemove="previewFont('inherit')"
                @focus="previewFont('inherit')"
              >
                {{ bodyFont.label }}
              </PickerRadioItem>
            </PickerGroup>
            <PickerSeparator />
          </template>
          <PickerGroup v-for="group in groupedFonts" :key="group.label">
            <PickerLabel>{{ group.label }}</PickerLabel>
            <PickerRadioItem
              v-for="font in group.fonts"
              :key="font.id"
              :value="font.id"
              @mousemove="previewFont(font.id)"
              @focus="previewFont(font.id)"
            >
              {{ font.label }}
            </PickerRadioItem>
          </PickerGroup>
        </PickerRadioGroup>
      </PickerContent>
    </Picker>
    <TypesetLockButton
      :param="param"
      class="absolute top-1/2 right-8 -translate-y-1/2"
    />
  </div>
</template>
