<script setup lang="ts">
import { BASE_COLORS, getThemesForBaseColor } from '@/registry/config'

const props = defineProps<{
  isMobile: boolean
  anchorRef: HTMLDivElement | null
}>()

const params = useDesignSystemSearchParams()

const availableChartColors = computed(() => getThemesForBaseColor(params.baseColor.value))

const currentChartColor = computed(
  () => availableChartColors.value.find(theme => theme.name === params.chartColor.value),
)

const currentChartColorIsBaseColor = computed(
  () => BASE_COLORS.find(baseColor => baseColor.name === params.chartColor.value),
)

watch(availableChartColors, (themes) => {
  if (!currentChartColor.value && themes.length > 0) {
    params.chartColor.value = themes[0]!.name
  }
}, { immediate: true })
</script>

<template>
  <div class="group/picker relative">
    <Picker>
      <PickerTrigger>
        <div class="flex flex-col justify-start text-left">
          <div class="text-muted-foreground text-xs">
            Chart Color
          </div>
          <div class="text-foreground text-sm font-medium">
            {{ currentChartColor?.title }}
          </div>
        </div>
        <div
          v-if="currentChartColor"
          class="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 rounded-full bg-(--color) select-none md:right-2.5"
          :style="{
            '--color': currentChartColor?.cssVars?.dark?.[currentChartColorIsBaseColor ? 'muted-foreground' : 'primary'],
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
          :model-value="currentChartColor?.name"
          @update:model-value="(value) => {
            params.chartColor.value = value as string
          }"
        >
          <PickerGroup>
            <PickerRadioItem
              v-for="theme in availableChartColors.filter(t => BASE_COLORS.find(b => b.name === t.name))"
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
              v-for="theme in availableChartColors.filter(t => !BASE_COLORS.find(b => b.name === t.name))"
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
      param="chartColor"
      class="absolute top-1/2 right-8 -translate-y-1/2"
    />
  </div>
</template>
