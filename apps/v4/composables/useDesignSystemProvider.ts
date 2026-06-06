import type { DesignSystemConfig } from '~/registry/config'
import { FONTS } from '~/lib/fonts'
import { buildRegistryTheme, DEFAULT_CONFIG, getTheme, POINTER_CURSOR_SELECTOR } from '~/registry/config'

const THEME_STYLE_ELEMENT_ID = 'design-system-theme-vars'
const MANAGED_BODY_CLASS_PREFIXES = ['style-', 'base-color-'] as const
const POINTER_CURSOR_CSS = `@layer base {
  ${POINTER_CURSOR_SELECTOR} {
    cursor: pointer;
  }
}
`

function removeManagedBodyClasses(body: Element) {
  for (const className of Array.from(body.classList)) {
    if (MANAGED_BODY_CLASS_PREFIXES.some(prefix => className.startsWith(prefix))) {
      body.classList.remove(className)
    }
  }
}

function buildCssRule(selector: string, cssVars?: Record<string, string>) {
  const declarations = Object.entries(cssVars ?? {})
    .filter(([, value]) => Boolean(value))
    .map(([key, value]) => `  --${key}: ${value};`)
    .join('\n')

  if (!declarations) {
    return `${selector} {}\n`
  }

  return `${selector} {\n${declarations}\n}\n`
}

export function useDesignSystemProvider() {
  const {
    style,
    theme,
    font,
    fontHeading,
    baseColor,
    menuAccent,
    menuColor,
    radius,
    iconLibrary,
    chartColor,
    pointer,
  } = useDesignSystemSearchParams('replace')
  const colorMode = useColorMode()

  useIframeMessageListener('color-mode-sync', (value) => {
    colorMode.value = value.colorMode as any
  })

  useIframeMessageListener('design-system-params', (value) => {
    style.value = value.style
    theme.value = value.theme
    font.value = value.font
    fontHeading.value = value.fontHeading
    baseColor.value = value.baseColor
    menuAccent.value = value.menuAccent
    menuColor.value = value.menuColor
    radius.value = value.radius
    iconLibrary.value = value.iconLibrary
    chartColor.value = value.chartColor
    if ('pointer' in value) {
      pointer.value = value.pointer === true
    }
  })

  const isReady = ref(false)

  // Styles that hard-edge by design (no border-radius): mirrors shadcn-ui.
  const RADIUS_LOCKED_STYLES = new Set(['lyra', 'sera'])
  const effectiveRadius = computed(() =>
    RADIUS_LOCKED_STYLES.has(style.value) ? 'none' : radius.value,
  )

  const selectedFont = computed(() =>
    FONTS.find(f => f.value === font.value),
  )
  const selectedHeadingFont = computed(() => {
    if (fontHeading.value === 'inherit' || fontHeading.value === font.value) {
      return selectedFont.value
    }
    return FONTS.find(f => f.value === fontHeading.value)
  })

  // Store initial font values for cleanup on unmount.
  const initialFontSans = ref<string | null>(null)
  const initialFontHeading = ref<string | null>(null)

  onMounted(() => {
    initialFontSans.value
      = document.documentElement.style.getPropertyValue('--font-sans')
    initialFontHeading.value
      = document.documentElement.style.getPropertyValue('--font-heading')
  })

  onUnmounted(() => {
    if (!import.meta.client) {
      return
    }

    removeManagedBodyClasses(document.body)
    document.getElementById(THEME_STYLE_ELEMENT_ID)?.remove()

    if (initialFontSans.value) {
      document.documentElement.style.setProperty('--font-sans', initialFontSans.value)
    }
    else {
      document.documentElement.style.removeProperty('--font-sans')
    }

    if (initialFontHeading.value) {
      document.documentElement.style.setProperty('--font-heading', initialFontHeading.value)
    }
    else {
      document.documentElement.style.removeProperty('--font-heading')
    }
  })

  // Force radius to "none" when the style hard-edges (lyra, sera).
  watch([style, radius], ([styleValue, radiusValue]) => {
    if (RADIUS_LOCKED_STYLES.has(styleValue) && radiusValue !== 'none') {
      radius.value = 'none' as typeof radius.value
    }
  })

  watchEffect(() => {
    if (!style.value || !theme.value || !font.value || !baseColor.value || !import.meta.client) {
      return
    }

    const body = document.body

    removeManagedBodyClasses(body)
    body.classList.add(`style-${style.value}`, `base-color-${baseColor.value}`)

    // Update font.
    // Always set --font-sans for the preview so the selected font is visible.
    // The font type (sans/serif/mono) is metadata for the CLI updater.
    if (selectedFont.value) {
      document.documentElement.style.setProperty(
        '--font-sans',
        selectedFont.value.fontFamily,
      )
    }

    if (selectedHeadingFont.value) {
      document.documentElement.style.setProperty(
        '--font-heading',
        selectedHeadingFont.value.fontFamily,
      )
    }

    isReady.value = true
  })

  const registryTheme = computed(() => {
    if (!baseColor.value || !theme.value || !menuAccent.value || !effectiveRadius.value) {
      return null
    }

    const config: DesignSystemConfig = {
      ...DEFAULT_CONFIG,
      baseColor: baseColor.value,
      theme: theme.value,
      menuAccent: menuAccent.value,
      radius: effectiveRadius.value,
    }

    return buildRegistryTheme(config)
  })

  watchEffect(() => {
    if (!registryTheme.value || !registryTheme.value?.cssVars || !import.meta.client) {
      return
    }

    let styleElement = document.getElementById(
      THEME_STYLE_ELEMENT_ID,
    ) as HTMLStyleElement | null

    if (!styleElement) {
      styleElement = document.createElement('style')
      styleElement.id = THEME_STYLE_ELEMENT_ID
      document.head.appendChild(styleElement)
    }

    const {
      light: lightVars,
      dark: darkVars,
      theme: themeVars,
    } = registryTheme.value.cssVars

    // Override chart vars only when chartColor is explicitly selected (non-empty).
    // Vue's buildRegistryTheme doesn't accept chartColor in config, so we apply
    // the override here instead of inside the registry builder.
    const chartColorTheme = chartColor.value ? getTheme(chartColor.value as any) : null
    const chartLightVars = chartColorTheme?.cssVars?.light as Record<string, string> | undefined
    const chartDarkVars = chartColorTheme?.cssVars?.dark as Record<string, string> | undefined
    const chartKeys = ['chart-1', 'chart-2', 'chart-3', 'chart-4', 'chart-5']

    const mergedLight: Record<string, string> = {
      ...(themeVars ?? {}),
      ...(lightVars ?? {}),
    }
    const mergedDark: Record<string, string> = { ...(darkVars ?? {}) }

    if (chartLightVars) {
      for (const key of chartKeys) {
        if (chartLightVars[key]) {
          mergedLight[key] = chartLightVars[key]
        }
      }
    }
    if (chartDarkVars) {
      for (const key of chartKeys) {
        if (chartDarkVars[key]) {
          mergedDark[key] = chartDarkVars[key]
        }
      }
    }

    styleElement.textContent = [
      buildCssRule(':root', mergedLight),
      buildCssRule('.dark', mergedDark),
      pointer.value ? POINTER_CURSOR_CSS : '',
    ].filter(Boolean).join('\n')
  })

  // Handle menu color inversion by adding/removing dark class to elements with cn-menu-target.
  watchEffect((onCleanup) => {
    if (!menuColor.value || !import.meta.client) {
      return
    }

    const isInvertedMenu
      = menuColor.value === 'inverted' || menuColor.value === 'inverted-translucent'
    const isTranslucentMenu
      = menuColor.value === 'default-translucent'
        || menuColor.value === 'inverted-translucent'
    let frameId = 0

    const updateMenuElements = () => {
      const allElements = document.querySelectorAll<HTMLElement>(
        '.cn-menu-target, [data-menu-translucent]',
      )

      if (allElements.length === 0) {
        return
      }

      // Disable transitions while toggling classes.
      allElements.forEach((element) => {
        element.style.transition = 'none'
      })

      allElements.forEach((element) => {
        if (element.classList.contains('cn-menu-target')) {
          if (isInvertedMenu) {
            element.classList.add('dark')
          }
          else {
            element.classList.remove('dark')
          }
        }

        // When translucent is enabled, move from data-attr to class so styles apply.
        // When disabled, move back to a data-attr so the element stays queryable
        // for future toggles without losing its identity as a menu element.
        if (isTranslucentMenu) {
          element.classList.add('cn-menu-translucent')
          element.removeAttribute('data-menu-translucent')
        }
        else if (element.classList.contains('cn-menu-translucent')) {
          element.classList.remove('cn-menu-translucent')
          element.setAttribute('data-menu-translucent', '')
        }
      })

      // Force a reflow, then re-enable transitions.
      void document.body.offsetHeight
      allElements.forEach((element) => {
        element.style.transition = ''
      })
    }

    const scheduleMenuUpdate = () => {
      if (frameId) {
        return
      }

      frameId = window.requestAnimationFrame(() => {
        frameId = 0
        updateMenuElements()
      })
    }

    // Update existing menu elements.
    updateMenuElements()

    // Watch for new menu elements being added to the DOM.
    const observer = new MutationObserver(() => {
      scheduleMenuUpdate()
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })

    onCleanup(() => {
      observer.disconnect()
      if (frameId) {
        window.cancelAnimationFrame(frameId)
      }
    })
  })

  return { isReady }
}
