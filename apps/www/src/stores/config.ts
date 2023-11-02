import { defineStore } from 'pinia'
import 'pinia-shared-state'

import { computed, ref } from 'vue'
import { useData } from 'vitepress'
import { type Theme, themes } from './../lib/registry/themes'
import { type Style, styles } from '@/lib/registry/styles'

interface Config {
  theme: Theme['name']
  radius: number
  style: Style
}

export const RADII = [0, 0.25, 0.5, 0.75, 1]

// const DEFAULT_CONFIGS = {
//   theme: 'zinc',
//   radius: 0.5,
//   style: styles[0].name,
//   alias: '@/components/',
// } as const

export const useConfigStore = defineStore('config', () => {
  const { isDark } = useData()

  const theme = ref<Config['theme']>('zinc')
  const radius = ref(0.5)
  const style = ref<Config['style']>('default')
  const alias = ref('@/components/')

  const themeClass = computed(() => `theme-${theme.value}`)

  const themePrimary = computed(() => {
    const t = themes.find(t => t.name === theme.value)
    return `hsl(${
      t?.cssVars[isDark ? 'dark' : 'light'].primary
    })`
  })

  return {
    themeClass,
    themePrimary,
    theme,
    radius,
    style,
    alias,
  }
}, {
  share: {
    enable: true,
  },
})
