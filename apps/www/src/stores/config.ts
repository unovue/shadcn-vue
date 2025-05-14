import type { Style } from '@/registry/registry-styles'
import type { Theme } from '@/registry/registry-themes'
import { useStorage } from '@vueuse/core'
import { useData } from 'vitepress'
import { computed } from 'vue'
import { styles } from '@/registry/registry-styles'
import { themes } from '@/registry/registry-themes'

type PackageManager = 'pnpm' | 'npm' | 'yarn' | 'bun'

export interface Config {
  theme?: Theme['name']
  radius: number
  style: Style['name']
  packageManager: PackageManager
}

interface CodeConfig {
  prefix: string
  componentsPath: string
  utilsPath: string
}

export const RADII = [0, 0.25, 0.5, 0.75, 1]

export function useConfigStore() {
  const { isDark } = useData()
  const config = useStorage('config-1', {
    theme: 'zinc',
    radius: 0.5,
    style: styles[0].name,
    packageManager: 'pnpm',
  } satisfies Config)
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
    return `hsl(${t?.cssVars?.[isDark ? 'dark' : 'light']?.primary
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
