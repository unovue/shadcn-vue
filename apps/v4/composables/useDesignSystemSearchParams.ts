import type { PresetConfig } from 'shadcn-vue/preset'
import type { WritableComputedRef } from 'vue'
import type { BaseColorName, BaseName, FontValue, IconLibraryName, MenuAccentValue, MenuColorValue, RadiusValue, StyleName, ThemeName } from '@/registry/config'
import { useRouteQuery } from '@vueuse/router'
import { decodePreset, encodePreset } from 'shadcn-vue/preset'
import { computed } from 'vue'
import { DEFAULT_CONFIG } from '@/registry/config'

type PresetFieldKey = keyof PresetConfig

export const PRESET_FIELD_KEYS: PresetFieldKey[] = [
  'base',
  'style',
  'baseColor',
  'theme',
  'chartColor',
  'iconLibrary',
  'font',
  'fontHeading',
  'radius',
  'menuAccent',
  'menuColor',
]

const PRESET_DEFAULTS: PresetConfig = {
  base: DEFAULT_CONFIG.base as PresetConfig['base'],
  style: DEFAULT_CONFIG.style as PresetConfig['style'],
  baseColor: DEFAULT_CONFIG.baseColor as PresetConfig['baseColor'],
  theme: DEFAULT_CONFIG.theme as PresetConfig['theme'],
  chartColor: 'emerald' as PresetConfig['chartColor'],
  iconLibrary: DEFAULT_CONFIG.iconLibrary as PresetConfig['iconLibrary'],
  font: DEFAULT_CONFIG.font as PresetConfig['font'],
  fontHeading: DEFAULT_CONFIG.fontHeading as PresetConfig['fontHeading'],
  radius: DEFAULT_CONFIG.radius as PresetConfig['radius'],
  menuAccent: DEFAULT_CONFIG.menuAccent as PresetConfig['menuAccent'],
  menuColor: DEFAULT_CONFIG.menuColor as PresetConfig['menuColor'],
}

const DEFAULT_PRESET = encodePreset(PRESET_DEFAULTS)

export function useDesignSystemSearchParams(mode: 'push' | 'replace' = 'push') {
  const DEFAULT_OPTIONS = { mode, route: useRoute(), router: useRouter() }

  const base = useRouteQuery<BaseName>('base', DEFAULT_CONFIG.base, DEFAULT_OPTIONS)
  const item = useRouteQuery<string>('item', 'preview-02', DEFAULT_OPTIONS)
  const template = useRouteQuery<'nuxt' | 'vite' | 'laravel' | 'astro'>('template', 'nuxt', DEFAULT_OPTIONS)
  const size = useRouteQuery<number>('size', 100, DEFAULT_OPTIONS)
  const pointerQuery = useRouteQuery<string | undefined>('pointer', undefined, DEFAULT_OPTIONS)

  const preset = useRouteQuery<string>('preset', DEFAULT_PRESET, DEFAULT_OPTIONS)

  /**
   * Build a writable computed for one preset field.
   * Reads decode the current preset; writes re-encode with the new value.
   * Sequential writes within the same tick are safe — vueuse useRouteQuery
   * updates its internal cache synchronously on set, so subsequent reads
   * see the just-written value.
   */
  function presetField<T extends string>(key: PresetFieldKey): WritableComputedRef<T> {
    return computed<T>({
      get: () => (decodePreset(preset.value) ?? PRESET_DEFAULTS)[key] as T,
      set: (value) => {
        const decoded = decodePreset(preset.value) ?? PRESET_DEFAULTS
        const next = { ...decoded, [key]: value } as PresetConfig
        preset.value = encodePreset(next)
      },
    })
  }

  const style = presetField<StyleName>('style')
  const baseColor = presetField<BaseColorName>('baseColor')
  const theme = presetField<ThemeName>('theme')
  const chartColor = presetField<string>('chartColor')
  const font = presetField<FontValue>('font')
  const fontHeading = presetField<string>('fontHeading')
  const radius = presetField<RadiusValue>('radius')
  const iconLibrary = presetField<IconLibraryName>('iconLibrary')
  const menuColor = presetField<MenuColorValue>('menuColor')
  const menuAccent = presetField<MenuAccentValue>('menuAccent')
  const pointer = computed<boolean>({
    get: () => pointerQuery.value === 'true',
    set: (value) => {
      pointerQuery.value = value ? 'true' : undefined
    },
  })

  return {
    base,
    item,
    iconLibrary,
    style,
    theme,
    chartColor,
    font,
    fontHeading,
    baseColor,
    menuAccent,
    menuColor,
    radius,
    template,
    pointer,
    size,
    preset,
  }
}

export type DesignSystemSearchParams = Record<keyof ReturnType<typeof useDesignSystemSearchParams>, any>
