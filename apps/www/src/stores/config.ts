import { computed } from 'vue'
import { useSessionStorage } from '@vueuse/core'
import type { Theme } from './../lib/registry/themes'
import { styles } from '@/lib/registry/styles'

interface Config {
  theme: Theme['name']
  radius: number
  style: string
}

export const RADII = [0, 0.25, 0.5, 0.75, 1]

export function useConfigStore() {
  const config = useSessionStorage<Config>('config', {
    theme: 'zinc',
    radius: 0.5,
    style: styles[0].name,
  })

  const themeClass = computed(() => `theme-${config.value.theme}`)

  const theme = computed(() => config.value.theme)
  const radius = computed(() => config.value.radius)
  const style = computed(() => config.value.style)

  function setTheme(themeName: Theme['name']) {
    config.value.theme = themeName
  }

  function setRadius(newRadius: number) {
    config.value.radius = newRadius
  }

  return { config, theme, setTheme, radius, setRadius, themeClass, style }
}
