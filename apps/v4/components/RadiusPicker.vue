<script setup lang="ts">
import type { RadiusValue } from '@/registry/config'
import { RADII } from '@/registry/config'

defineProps<{
  isMobile: boolean
  anchorRef: HTMLDivElement | null
}>()

const params = useDesignSystemSearchParams()

// Sera and Lyra both pin radius to "none" — Sera for its editorial hard-edged
// look, Lyra for its boxy mono aesthetic. Mirrors shadcn-ui upstream.
const isRadiusLocked = computed(() => params.style.value === 'lyra' || params.style.value === 'sera')
const selectedRadiusName = computed(() => isRadiusLocked.value ? 'none' : params.radius.value)
const currentRadius = computed(() => RADII.find(r => r.name === selectedRadiusName.value))
const defaultRadius = computed(() => RADII.find(r => r.name === 'default'))
const otherRadii = computed(() => RADII.filter(r => r.name !== 'default'))
</script>

<template>
  <div class="group/picker relative">
    <Picker>
      <PickerTrigger :disabled="isRadiusLocked">
        <div class="flex flex-col justify-start text-left">
          <div class="text-muted-foreground text-xs">
            Radius
          </div>
          <div class="text-foreground text-sm font-medium">
            {{ currentRadius?.label }}
          </div>
        </div>
        <div class="text-foreground pointer-events-none absolute top-1/2 right-4 flex size-4 -translate-y-1/2 rotate-90 items-center justify-center text-base select-none md:right-2.5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            class="text-foreground"
          >
            <path
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 20v-5C4 8.925 8.925 4 15 4h5"
            />
          </svg>
        </div>
      </PickerTrigger>
      <PickerContent
        :anchor="isMobile ? anchorRef : undefined"
        :side="isMobile ? 'top' : 'right'"
        :align="isMobile ? 'center' : 'start'"
      >
        <PickerRadioGroup
          :model-value="currentRadius?.name"
          @update:model-value="(value) => {
            if (isRadiusLocked) return
            params.radius.value = value as RadiusValue
          }"
        >
          <PickerGroup>
            <PickerRadioItem
              v-if="defaultRadius"
              :value="defaultRadius.name"
              :close-on-click="isMobile"
            >
              {{ defaultRadius.label }}
            </PickerRadioItem>
          </PickerGroup>
          <PickerSeparator />
          <PickerGroup>
            <PickerRadioItem
              v-for="radius in otherRadii"
              :key="radius.name"
              :value="radius.name"
              :close-on-click="isMobile"
            >
              {{ radius.label }}
            </PickerRadioItem>
          </PickerGroup>
        </PickerRadioGroup>
      </PickerContent>
    </Picker>
    <LockButton
      param="radius"
      class="absolute top-1/2 right-8 -translate-y-1/2"
    />
  </div>
</template>
