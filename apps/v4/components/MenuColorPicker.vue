<script setup lang="ts">
import type { MenuColorValue } from '@/registry/config'
import { useMounted } from '@vueuse/core'

defineProps<{
  isMobile: boolean
  anchorRef: HTMLDivElement | null
}>()

const MENU_OPTIONS = [
  {
    value: 'default' as const,
    label: 'Default',
  },
  {
    value: 'inverted' as const,
    label: 'Inverted',
  },
] as const

const params = useDesignSystemSearchParams()
const colorMode = useColorMode()
const mounted = useMounted()

const currentMenu = computed(() => MENU_OPTIONS.find(m => m.value === params.menuColor.value) ?? MENU_OPTIONS[0])
const isDisabled = computed(() => mounted.value && colorMode.value === 'dark')
</script>

<template>
  <div class="group/picker relative">
    <Picker>
      <PickerTrigger :disabled="isDisabled">
        <div class="flex flex-col justify-start text-left">
          <div class="text-muted-foreground text-xs">
            Menu Color
          </div>
          <div class="text-foreground text-sm font-medium">
            {{ currentMenu?.label }}
          </div>
        </div>
        <div class="text-foreground pointer-events-none absolute top-1/2 right-4 flex size-4 -translate-y-1/2 items-center justify-center text-base select-none">
          <!-- Default icon -->
          <svg
            v-if="currentMenu?.value === 'default'"
            xmlns="http://www.w3.org/2000/svg"
            width="128"
            height="128"
            viewBox="0 0 24 24"
            fill="none"
            role="img"
            stroke="currentColor"
            class="text-foreground"
          >
            <path
              d="M2 11.5C2 7.02166 2 4.78249 3.39124 3.39124C4.78249 2 7.02166 2 11.5 2C15.9783 2 18.2175 2 19.6088 3.39124C21 4.78249 21 7.02166 21 11.5C21 15.9783 21 18.2175 19.6088 19.6088C18.2175 21 15.9783 21 11.5 21C7.02166 21 4.78249 21 3.39124 19.6088C2 18.2175 2 15.9783 2 11.5Z"
              stroke="currentColor"
              stroke-width="2"
            />
            <path d="M8.5 11.5L14.5001 11.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M9.5 15H13.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M7.5 8H15.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <!-- Inverted icon -->
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            width="128"
            height="128"
            viewBox="0 0 24 24"
            fill="none"
            role="img"
            class="fill-foreground text-foreground"
          >
            <path
              d="M2 11.5C2 7.02166 2 4.78249 3.39124 3.39124C4.78249 2 7.02166 2 11.5 2C15.9783 2 18.2175 2 19.6088 3.39124C21 4.78249 21 7.02166 21 11.5C21 15.9783 21 18.2175 19.6088 19.6088C18.2175 21 15.9783 21 11.5 21C7.02166 21 4.78249 21 3.39124 19.6088C2 18.2175 2 15.9783 2 11.5Z"
              stroke="currentColor"
              stroke-width="2"
            />
            <path d="M8.5 11.5L14.5001 11.5" stroke="var(--background)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M9.5 15H13.5" stroke="var(--background)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M7.5 8H15.5" stroke="var(--background)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </div>
      </PickerTrigger>
      <PickerContent
        :anchor="isMobile ? anchorRef : undefined"
        :side="isMobile ? 'top' : 'right'"
        :align="isMobile ? 'center' : 'start'"
      >
        <PickerRadioGroup
          :model-value="currentMenu?.value"
          @update:model-value="(value) => {
            params.menuColor.value = value as MenuColorValue
          }"
        >
          <PickerGroup>
            <PickerRadioItem value="default">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="128"
                height="128"
                viewBox="0 0 24 24"
                fill="none"
                role="img"
                stroke="currentColor"
                class="text-foreground mr-2 size-4"
              >
                <path
                  d="M2 11.5C2 7.02166 2 4.78249 3.39124 3.39124C4.78249 2 7.02166 2 11.5 2C15.9783 2 18.2175 2 19.6088 3.39124C21 4.78249 21 7.02166 21 11.5C21 15.9783 21 18.2175 19.6088 19.6088C18.2175 21 15.9783 21 11.5 21C7.02166 21 4.78249 21 3.39124 19.6088C2 18.2175 2 15.9783 2 11.5Z"
                  stroke="currentColor"
                  stroke-width="2"
                />
                <path d="M8.5 11.5L14.5001 11.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M9.5 15H13.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M7.5 8H15.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              Default
            </PickerRadioItem>
            <PickerRadioItem value="inverted">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="128"
                height="128"
                viewBox="0 0 24 24"
                fill="none"
                role="img"
                class="fill-foreground text-foreground mr-2 size-4"
              >
                <path
                  d="M2 11.5C2 7.02166 2 4.78249 3.39124 3.39124C4.78249 2 7.02166 2 11.5 2C15.9783 2 18.2175 2 19.6088 3.39124C21 4.78249 21 7.02166 21 11.5C21 15.9783 21 18.2175 19.6088 19.6088C18.2175 21 15.9783 21 11.5 21C7.02166 21 4.78249 21 3.39124 19.6088C2 18.2175 2 15.9783 2 11.5Z"
                  stroke="currentColor"
                  stroke-width="2"
                />
                <path d="M8.5 11.5L14.5001 11.5" stroke="var(--background)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M9.5 15H13.5" stroke="var(--background)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M7.5 8H15.5" stroke="var(--background)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              Inverted
            </PickerRadioItem>
          </PickerGroup>
        </PickerRadioGroup>
      </PickerContent>
    </Picker>
    <LockButton
      param="menuColor"
      class="absolute top-1/2 right-10 -translate-y-1/2"
    />
  </div>
</template>
