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
const colorMode = useColorMode()

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

const filteredBaseTheme = computed(() => props.themes
  .filter(theme =>
    BASE_COLORS.find(baseColor => baseColor.name === theme.name),
  )
  .map((theme) => {
    const isBaseColor = BASE_COLORS.find(
      baseColor => baseColor.name === theme.name,
    )
    return {
      theme,
      isBaseColor,
    }
  }))

const filteredTheme = computed(() => props.themes
  .filter(
    theme =>
      !BASE_COLORS.find(
        baseColor => baseColor.name === theme.name,
      ),
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
          :style="
            {
              '--color':
                currentTheme?.cssVars?.[
                  colorMode.value as 'light' | 'dark'
                ]?.[
                  currentThemeIsBaseColor ? 'muted-foreground' : 'primary'
                ],
            }
          "
          class="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 rounded-full bg-(--color) select-none"
        />
      </PickerTrigger>
      <PickerContent
        :anchor="isMobile ? anchorRef : undefined"
        :side="isMobile ? 'top' : 'right'"
        :align="isMobile ? 'center' : 'start'"
        class="max-h-96"
      >
        <PickerRadioGroup
          :model-value="currentTheme?.name"
          @update:model-value="(value) => {
            params.theme.value = value as ThemeName
          }"
        >
          <PickerGroup>
            <PickerRadioItem v-for="({ theme, isBaseColor }) in filteredBaseTheme" :key="theme.name" :value="theme.name">
              <div class="flex items-start gap-2">
                <div
                  v-if="mounted"
                  :style="
                    {
                      '--color':
                        theme.cssVars?.[
                          colorMode.value as 'light' | 'dark'
                        ]?.[
                          isBaseColor ? 'muted-foreground' : 'primary'
                        ],
                    }"
                  class="size-4 translate-y-1 rounded-full bg-(--color)"
                />
                <div class="flex flex-col justify-start pointer-coarse:gap-1">
                  <div>{{ theme.title }}</div>
                  <div class="text-muted-foreground text-xs pointer-coarse:text-sm">
                    Match base color
                  </div>
                </div>
              </div>
            </PickerRadioItem>
          </PickerGroup>
          <PickerSeparator />
          <PickerGroup>
            <PickerRadioItem v-for="theme in filteredTheme" :key="theme.name" :value="theme.name">
              <div class="flex items-center gap-2">
                <div
                  v-if="mounted"
                  :style="
                    {
                      '--color':
                        theme.cssVars?.[
                          colorMode.value as 'light' | 'dark'
                        ]?.primary,
                    }"
                  class="size-4 rounded-full bg-(--color)"
                />
                {{ theme.title }}
              </div>
            </PickerRadioItem>
          </PickerGroup>
        </PickerRadioGroup>
      </PickerContent>
    </Picker>
    <LockButton
      param="theme"
      class="absolute top-1/2 right-10 -translate-y-1/2"
    />
  </div>
</template>
