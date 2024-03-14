import { computed } from 'vue'
import { useSessionStorage, useStorage } from '@vueuse/core'
import { useData } from 'vitepress'
import { type Theme, themes } from './../lib/registry/themes'
import { type Style, styles } from '@/lib/registry/styles'

interface Config {
  theme?: Theme['name']
  radius: number
  style: Style
}

interface CodeConfig {
  prefix: string
  componentsPath: string
  utilsPath: string
}

export const RADII = [0, 0.25, 0.5, 0.75, 1]

export function useConfigStore() {
  const { isDark } = useData()
  const config = useSessionStorage<Config>('config', {
    radius: 0.5,
    style: styles[0].name,
  })
  const codeConfig = useStorage<CodeConfig>('code-config', {
    prefix: '',
    componentsPath: '@/components',
    utilsPath: '@/utils',
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

  const themePrimary = computed(() => {
    const t = themes.find(t => t.name === theme.value)
    return `hsl(${
      t?.cssVars[isDark ? 'dark' : 'light'].primary
    })`
  })

  const setCodeConfig = (payload: CodeConfig) => {
    codeConfig.value = payload
  }

  return {
    config,
    theme,
    setTheme,
    radius,
    setRadius,
    themeClass,
    style,
    themePrimary,

    codeConfig,
    setCodeConfig,
  }
}
