import type { BaseColorName, BaseName, FontValue, IconLibraryName, MenuAccentValue, MenuColorValue, RadiusValue, StyleName, ThemeName } from '@/registry/config'
import { useRouteQuery } from '@vueuse/router'
import { DEFAULT_CONFIG } from '@/registry/config'

export function useDesignSystemSearchParams() {
  const base = useRouteQuery<BaseName>('base', DEFAULT_CONFIG.base, { mode: 'push' })

  const item = useRouteQuery<string>('item', 'preview', { mode: 'push' })

  const iconLibrary = useRouteQuery<IconLibraryName>(
    'iconLibrary',
    DEFAULT_CONFIG.iconLibrary,
    { mode: 'push' },
  )

  const style = useRouteQuery<StyleName>('style', DEFAULT_CONFIG.style, { mode: 'push' })

  const theme = useRouteQuery<ThemeName>('theme', DEFAULT_CONFIG.theme, { mode: 'push' })

  const font = useRouteQuery<FontValue>('font', DEFAULT_CONFIG.font, { mode: 'push' })

  const baseColor = useRouteQuery<BaseColorName>(
    'baseColor',
    DEFAULT_CONFIG.baseColor,
    { mode: 'push' },
  )

  const menuAccent = useRouteQuery<MenuAccentValue>(
    'menuAccent',
    DEFAULT_CONFIG.menuAccent,
    { mode: 'push' },
  )

  const menuColor = useRouteQuery<MenuColorValue>(
    'menuColor',
    DEFAULT_CONFIG.menuColor,
    { mode: 'push' },
  )

  const radius = useRouteQuery<RadiusValue>('radius', 'default', { mode: 'push' })

  const template = useRouteQuery<'nuxt' | 'start' | 'vite'>('template', 'nuxt', { mode: 'push' })

  const size = useRouteQuery<number>('size', 100, { mode: 'push' })

  const custom = useRouteQuery<any>('custom', false, { mode: 'push' })

  return {
    base,
    item,
    iconLibrary,
    style,
    theme,
    font,
    baseColor,
    menuAccent,
    menuColor,
    radius,
    template,
    size,
    custom,
  }
}
