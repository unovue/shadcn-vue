import type { BaseColorName, BaseName, FontValue, IconLibraryName, MenuAccentValue, MenuColorValue, RadiusValue, StyleName, ThemeName } from '@/registry/config'
import { useRouteQuery } from '@vueuse/router'
import { DEFAULT_CONFIG } from '@/registry/config'

export function useDesignSystemSearchParams(mode: 'push' | 'replace' = 'push') {
  const DEFAULT_OPTIONS = { mode, route: useRoute(), router: useRouter() }
  const base = useRouteQuery<BaseName>('base', DEFAULT_CONFIG.base, DEFAULT_OPTIONS)

  const item = useRouteQuery<string>('item', 'preview-02', DEFAULT_OPTIONS)

  const iconLibrary = useRouteQuery<IconLibraryName>(
    'iconLibrary',
    DEFAULT_CONFIG.iconLibrary,
    DEFAULT_OPTIONS,
  )

  const style = useRouteQuery<StyleName>('style', DEFAULT_CONFIG.style, DEFAULT_OPTIONS)

  const theme = useRouteQuery<ThemeName>('theme', DEFAULT_CONFIG.theme, DEFAULT_OPTIONS)

  const font = useRouteQuery<FontValue>('font', DEFAULT_CONFIG.font, DEFAULT_OPTIONS)

  const fontHeading = useRouteQuery<string>('fontHeading', 'inherit', DEFAULT_OPTIONS)

  const chartColor = useRouteQuery<string>('chartColor', 'emerald', DEFAULT_OPTIONS)

  const baseColor = useRouteQuery<BaseColorName>(
    'baseColor',
    DEFAULT_CONFIG.baseColor,
    DEFAULT_OPTIONS,
  )

  const menuAccent = useRouteQuery<MenuAccentValue>(
    'menuAccent',
    DEFAULT_CONFIG.menuAccent,
    DEFAULT_OPTIONS,
  )

  const menuColor = useRouteQuery<MenuColorValue>(
    'menuColor',
    DEFAULT_CONFIG.menuColor,
    DEFAULT_OPTIONS,
  )

  const radius = useRouteQuery<RadiusValue>('radius', 'default', DEFAULT_OPTIONS)

  const template = useRouteQuery<'nuxt' | 'vite' | 'laravel' | 'astro'>('template', 'nuxt', DEFAULT_OPTIONS)

  const size = useRouteQuery<number>('size', 100, DEFAULT_OPTIONS)

  const custom = useRouteQuery<any>('custom', false, DEFAULT_OPTIONS)

  return {
    base,
    item,
    iconLibrary,
    style,
    theme,
    font,
    fontHeading,
    chartColor,
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
