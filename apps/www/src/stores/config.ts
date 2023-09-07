import { computed, ref } from 'vue'
import type { Theme } from './../lib/registry/themes'

interface Config {
  theme: Theme['name']
  radius: number
}

export const RADII = [0, 0.25, 0.5, 0.75, 1]

export function useConfigStore() {
  const config = ref<Config>({
    theme: 'zinc',
    radius: 0.5,
  })

  const themeClass = computed(() => `theme-${config.value.theme}`)

  const theme = computed(() => config.value.theme)

  const radius = computed(() => config.value.radius)

  function setTheme(themeName: Theme['name']) {
    config.value.theme = themeName
  }

  function setRadius(newRadius: number) {
    config.value.radius = newRadius
  }

  return { config, theme, setTheme, radius, setRadius, themeClass }
}
