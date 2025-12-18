<script setup lang="ts">
import { useMounted } from '@vueuse/core'
import { BASE_COLORS } from '@/registry/config'

const props = defineProps<{
  isMobile: boolean
  anchorRef: HTMLDivElement | null
}>()

const params = useDesignSystemSearchParams()
const mounted = useMounted()
const colorMode = useColorMode()

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
          :style="
            {
              '--color':
                currentBaseColor?.cssVars?.[
                  colorMode.value as 'light' | 'dark'
                ]?.['muted-foreground'],
            }
          "
          class="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 rounded-full bg-(--color) select-none"
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
            if (value === 'dark') {
              colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
              return
            }

            params.baseColor.value = value
          }"
        >
          <PickerGroup>
            <PickerRadioItem v-for="baseColor in BASE_COLORS" :key="baseColor.name" :value="baseColor.name">
              <div class="flex items-center gap-2">
                <div
                  v-if="mounted"
                  :style="
                    {
                      '--color':
                        baseColor.cssVars?.[
                          colorMode.value as 'light' | 'dark'
                        ]?.['muted-foreground'],
                    }
                  "
                  class="size-4 rounded-full bg-(--color)"
                />
                {{ baseColor.title }}
              </div>
            </PickerRadioItem>
          </PickerGroup>
          <PickerSeparator />
          <PickerGroup>
            <PickerItem
              @click="() => {
                colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
              }"
            >
              <div class="flex flex-col justify-start pointer-coarse:gap-1">
                <div>
                  Switch to {{ colorMode.value === "dark" ? "Light" : "Dark" }} Mode
                </div>
                <div class="text-muted-foreground text-xs pointer-coarse:text-sm">
                  Base colors are easier to see in dark colorMode.
                </div>
              </div>
            </PickerItem>
          </PickerGroup>
        </PickerRadioGroup>
      </PickerContent>
    </Picker>
    <LockButton
      param="baseColor"
      class="absolute top-1/2 right-10 -translate-y-1/2"
    />
  </div>
</template>
