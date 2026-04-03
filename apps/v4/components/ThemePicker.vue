<script setup lang="ts">
import type { Theme, ThemeName } from '@/registry/config'
import { useMounted } from '@vueuse/core'
import { BASE_COLORS } from '@/registry/config'

const props = defineProps<{
  themes: Theme[]
  isMobile: boolean
  anchorRef: HTMLDivElement | null
}>()

const params = useDesignSystemSearchParams()
const mounted = useMounted()

const currentTheme = computed(
  () => props.themes.find(theme => theme.name === params.theme.value),
)

const currentThemeIsBaseColor = computed(
  () => BASE_COLORS.find(baseColor => baseColor.name === params.theme.value),
)

watch(currentTheme, () => {
  if (!currentTheme.value && props.themes.length > 0) {
    params.theme.value = props.themes[0]!.name
  }
})

const filteredBaseThemes = computed(() => props.themes.filter(theme =>
  BASE_COLORS.find(baseColor => baseColor.name === theme.name),
))

const filteredThemes = computed(() => props.themes.filter(theme =>
  !BASE_COLORS.find(baseColor => baseColor.name === theme.name),
))
</script>

<template>
  <div class="group/picker relative">
    <Picker>
      <PickerTrigger>
        <div class="flex flex-col justify-start text-left">
          <div class="text-muted-foreground text-xs">
            Theme
          </div>
          <div class="text-foreground text-sm font-medium">
            {{ currentTheme?.title }}
          </div>
        </div>
        <div
          v-if="mounted"
          class="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 rounded-full bg-(--color) select-none md:right-2.5"
          :style="{
            '--color': currentTheme?.cssVars?.dark?.[currentThemeIsBaseColor ? 'muted-foreground' : 'primary'],
          }"
        />
      </PickerTrigger>
      <PickerContent
        :anchor="isMobile ? anchorRef : undefined"
        :side="isMobile ? 'top' : 'right'"
        :align="isMobile ? 'center' : 'start'"
        class="max-h-92"
      >
        <PickerRadioGroup
          :model-value="currentTheme?.name"
          @update:model-value="(value) => {
            params.theme.value = value as ThemeName
          }"
        >
          <PickerGroup>
            <PickerRadioItem
              v-for="theme in filteredBaseThemes"
              :key="theme.name"
              :value="theme.name"
              :close-on-click="isMobile"
            >
              {{ theme.title }}
            </PickerRadioItem>
          </PickerGroup>
          <PickerSeparator />
          <PickerGroup>
            <PickerRadioItem
              v-for="theme in filteredThemes"
              :key="theme.name"
              :value="theme.name"
              :close-on-click="isMobile"
            >
              {{ theme.title }}
            </PickerRadioItem>
          </PickerGroup>
        </PickerRadioGroup>
      </PickerContent>
    </Picker>
    <LockButton
      param="theme"
      class="absolute top-1/2 right-8 -translate-y-1/2"
    />
  </div>
</template>
