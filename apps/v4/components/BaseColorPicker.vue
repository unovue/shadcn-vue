<script setup lang="ts">
import type { BaseColorName } from '@/registry/config'
import { useMounted } from '@vueuse/core'
import { BASE_COLORS } from '@/registry/config'

defineProps<{
  isMobile: boolean
  anchorRef: HTMLDivElement | null
}>()

const params = useDesignSystemSearchParams()
const mounted = useMounted()

const currentBaseColor = computed(
  () => BASE_COLORS.find(baseColor => baseColor.name === params.baseColor.value),
)
</script>

<template>
  <div class="group/picker relative">
    <Picker>
      <PickerTrigger>
        <div class="flex flex-col justify-start text-left">
          <div class="text-muted-foreground text-xs">
            Base Color
          </div>
          <div class="text-foreground text-sm font-medium">
            {{ currentBaseColor?.title }}
          </div>
        </div>
        <div
          v-if="mounted"
          class="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 rounded-full bg-(--color) select-none md:right-2.5"
          :style="{ '--color': currentBaseColor?.cssVars?.dark?.['muted-foreground'] }"
        />
      </PickerTrigger>
      <PickerContent
        :anchor="isMobile ? anchorRef : undefined"
        :side="isMobile ? 'top' : 'right'"
        :align="isMobile ? 'center' : 'start'"
      >
        <PickerRadioGroup
          :model-value="currentBaseColor?.name"
          @update:model-value="(value) => {
            params.baseColor.value = value as BaseColorName
          }"
        >
          <PickerGroup>
            <PickerRadioItem
              v-for="baseColor in BASE_COLORS"
              :key="baseColor.name"
              :value="baseColor.name"
              :close-on-click="isMobile"
            >
              {{ baseColor.title }}
            </PickerRadioItem>
          </PickerGroup>
        </PickerRadioGroup>
      </PickerContent>
    </Picker>
    <LockButton
      param="baseColor"
      class="absolute top-1/2 right-8 -translate-y-1/2"
    />
  </div>
</template>
