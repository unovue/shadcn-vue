import type { BaseColorName, BaseName, FontValue, IconLibraryName, MenuAccentValue, MenuColorValue, RadiusValue, StyleName, ThemeName } from '@/registry/config'
import { useRouteQuery } from '@vueuse/router'
import { DEFAULT_CONFIG } from '@/registry/config'

export function useDesignSystemSearchParams(mode: 'push' | 'replace' = 'push') {
  const base = useRouteQuery<BaseName>('base', DEFAULT_CONFIG.base, { mode })

  const item = useRouteQuery<string>('item', 'preview', { mode })

  const iconLibrary = useRouteQuery<IconLibraryName>(
    'iconLibrary',
    DEFAULT_CONFIG.iconLibrary,
    { mode },
  )

  const style = useRouteQuery<StyleName>('style', DEFAULT_CONFIG.style, { mode })

  const theme = useRouteQuery<ThemeName>('theme', DEFAULT_CONFIG.theme, { mode })

  const font = useRouteQuery<FontValue>('font', DEFAULT_CONFIG.font, { mode })

  const baseColor = useRouteQuery<BaseColorName>(
    'baseColor',
    DEFAULT_CONFIG.baseColor,
    { mode },
  )

  const menuAccent = useRouteQuery<MenuAccentValue>(
    'menuAccent',
    DEFAULT_CONFIG.menuAccent,
    { mode },
  )

  const menuColor = useRouteQuery<MenuColorValue>(
    'menuColor',
    DEFAULT_CONFIG.menuColor,
    { mode },
  )

  const radius = useRouteQuery<RadiusValue>('radius', 'default', { mode })

  const template = useRouteQuery<'nuxt' | 'start' | 'vite'>('template', 'nuxt', { mode })

  const size = useRouteQuery<number>('size', 100, { mode })

  const custom = useRouteQuery<any>('custom', false, { mode })

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

export type DesignSystemSearchParams = Record<keyof ReturnType<typeof useDesignSystemSearchParams>, any>
