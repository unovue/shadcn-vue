<script setup lang="ts">
import type { MenuColorValue } from '@/registry/config'
import { Menu02Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/vue'
import { useMounted } from '@vueuse/core'
import { isTranslucentMenuColor } from '@/registry/config'

defineProps<{
  isMobile: boolean
  anchorRef: HTMLDivElement | null
}>()

type ColorChoice = 'default' | 'inverted'
type SurfaceChoice = 'solid' | 'translucent'

const MENU_OPTIONS = [
  { value: 'default' as MenuColorValue, label: 'Default / Solid' },
  { value: 'default-translucent' as MenuColorValue, label: 'Default / Translucent' },
  { value: 'inverted' as MenuColorValue, label: 'Inverted / Solid' },
  { value: 'inverted-translucent' as MenuColorValue, label: 'Inverted / Translucent' },
]

function getMenuColorValue(color: ColorChoice, translucent: boolean): MenuColorValue {
  if (color === 'default') {
    return translucent ? 'default-translucent' : 'default'
  }
  return translucent ? 'inverted-translucent' : 'inverted'
}

const params = useDesignSystemSearchParams()
const colorMode = useColorMode()
const mounted = useMounted()

const lastSolidMenuAccent = ref(params.menuAccent.value)

const currentMenu = computed(() => MENU_OPTIONS.find(m => m.value === params.menuColor.value))

const colorChoice = computed<ColorChoice>(() =>
  params.menuColor.value === 'inverted' || params.menuColor.value === 'inverted-translucent'
    ? 'inverted'
    : 'default',
)

const surfaceChoice = computed<SurfaceChoice>(() =>
  params.menuColor.value === 'default-translucent' || params.menuColor.value === 'inverted-translucent'
    ? 'translucent'
    : 'solid',
)

const isDark = computed(() => mounted.value && colorMode.value === 'dark')

watch(() => surfaceChoice.value, (s) => {
  if (s === 'solid') {
    lastSolidMenuAccent.value = params.menuAccent.value
  }
})

function setColor(color: ColorChoice) {
  const nextMenuColor = getMenuColorValue(color, surfaceChoice.value === 'translucent')
  params.menuColor.value = nextMenuColor
  if (isTranslucentMenuColor(nextMenuColor)) {
    params.menuAccent.value = 'subtle'
  }
}

function setSurface(choice: SurfaceChoice) {
  const isTranslucent = choice === 'translucent'
  const nextMenuColor = getMenuColorValue(colorChoice.value, isTranslucent)
  params.menuColor.value = nextMenuColor
  params.menuAccent.value = isTranslucent ? 'subtle' : lastSolidMenuAccent.value
}
</script>

<template>
  <div class="group/picker relative">
    <Picker>
      <PickerTrigger>
        <div class="flex flex-col justify-start text-left">
          <div class="text-muted-foreground text-xs">
            Menu
          </div>
          <div class="line-clamp-1 max-w-[80%] truncate text-foreground text-sm font-medium">
            {{ currentMenu?.label }}
          </div>
        </div>
        <div class="text-foreground pointer-events-none absolute top-1/2 right-4 flex size-4 -translate-y-1/2 items-center justify-center text-base select-none md:right-2.5">
          <HugeiconsIcon :icon="Menu02Icon" :stroke-width="2" class="size-4" />
        </div>
      </PickerTrigger>
      <PickerContent
        :anchor="isMobile ? anchorRef : undefined"
        :side="isMobile ? 'top' : 'right'"
        :align="isMobile ? 'center' : 'start'"
      >
        <PickerGroup>
          <PickerLabel>Color</PickerLabel>
          <PickerRadioGroup
            :model-value="colorChoice"
            @update:model-value="(value) => setColor(value as ColorChoice)"
          >
            <PickerRadioItem value="default" :close-on-click="isMobile">
              Default
            </PickerRadioItem>
            <PickerRadioItem value="inverted" :close-on-click="isMobile" :disabled="isDark">
              Inverted
            </PickerRadioItem>
          </PickerRadioGroup>
        </PickerGroup>
        <PickerSeparator />
        <PickerGroup>
          <PickerLabel>Appearance</PickerLabel>
          <PickerRadioGroup
            :model-value="surfaceChoice"
            @update:model-value="(value) => setSurface(value as SurfaceChoice)"
          >
            <PickerRadioItem value="solid" :close-on-click="isMobile">
              Solid
            </PickerRadioItem>
            <PickerRadioItem value="translucent" :close-on-click="isMobile">
              Translucent
            </PickerRadioItem>
          </PickerRadioGroup>
        </PickerGroup>
      </PickerContent>
    </Picker>
    <LockButton
      param="menuColor"
      class="absolute top-1/2 right-8 -translate-y-1/2"
    />
  </div>
</template>
