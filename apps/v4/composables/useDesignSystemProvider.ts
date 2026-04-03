import type { DesignSystemConfig } from '~/registry/config'
import { FONTS } from '~/lib/fonts'
import { buildRegistryTheme, DEFAULT_CONFIG, getTheme } from '~/registry/config'

export function useDesignSystemProvider() {
  const { style, theme, font, baseColor, menuAccent, menuColor, radius, iconLibrary, chartColor } = useDesignSystemSearchParams('replace')
  const colorMode = useColorMode()

  useIframeMessageListener('color-mode-sync', (value) => {
    colorMode.value = value.colorMode as any
  })

  useIframeMessageListener('design-system-params', (value) => {
    // console.log(value)
    style.value = value.style
    theme.value = value.theme
    font.value = value.font
    baseColor.value = value.baseColor
    menuAccent.value = value.menuAccent
    menuColor.value = value.menuColor
    radius.value = value.radius
    iconLibrary.value = value.iconLibrary
    chartColor.value = value.chartColor
  })

  const isReady = ref(false)

  watchEffect(() => {
    if (!style.value || !theme.value || !font.value || !baseColor.value || !import.meta.client) {
      return
    }

    const body = document.body

    // Update style class in place (remove old, add new).
    body.classList.forEach((className) => {
      if (className.startsWith('style-')) {
        body.classList.remove(className)
      }
    })
    body.classList.add(`style-${style.value}`)

    // Update base color class in place.
    body.classList.forEach((className) => {
      if (className.startsWith('base-color-')) {
        body.classList.remove(className)
      }
    })
    body.classList.add(`base-color-${baseColor.value}`)

    // Update font.
    const selectedFont = FONTS.find(f => f.value === font.value)
    if (selectedFont) {
      const fontFamily = selectedFont.fontFamily
      document.documentElement.style.setProperty('--font-sans', fontFamily)
    }

    isReady.value = true
  })

  const registryTheme = computed(() => {
    if (!baseColor.value || !theme.value || !menuAccent.value || !radius.value) {
      return null
    }

    const config: DesignSystemConfig = {
      ...DEFAULT_CONFIG,
      baseColor: baseColor.value,
      theme: theme.value,
      menuAccent: menuAccent.value,
      radius: radius.value,
    }

    return buildRegistryTheme(config)
  })

  watchEffect(() => {
    if (!registryTheme.value || !registryTheme.value?.cssVars || !import.meta.client) {
      return
    }

    const styleId = 'design-system-theme-vars'
    let styleElement = document.getElementById(
      styleId,
    ) as HTMLStyleElement | null

    if (!styleElement) {
      styleElement = document.createElement('style')
      styleElement.id = styleId
      document.head.appendChild(styleElement)
    }

    const {
      light: lightVars,
      dark: darkVars,
      theme: themeVars,
    } = registryTheme.value.cssVars

    // Override chart vars only when chartColor is explicitly selected (non-empty).
    const chartColorTheme = chartColor.value ? getTheme(chartColor.value as any) : null
    const chartLightVars = chartColorTheme?.cssVars?.light as Record<string, string> | undefined
    const chartDarkVars = chartColorTheme?.cssVars?.dark as Record<string, string> | undefined
    const chartKeys = ['chart-1', 'chart-2', 'chart-3', 'chart-4', 'chart-5']

    let cssText = ':root {\n'
    // Add theme vars (shared across light/dark).
    if (themeVars) {
      Object.entries(themeVars).forEach(([key, value]) => {
        if (value) {
          cssText += `  --${key}: ${value};\n`
        }
      })
    }
    // Add light mode vars (chart vars overridden by chartColor selection).
    if (lightVars) {
      Object.entries(lightVars).forEach(([key, value]) => {
        const overrideValue = chartLightVars && chartKeys.includes(key) ? chartLightVars[key] : undefined
        if (overrideValue || value) {
          cssText += `  --${key}: ${overrideValue ?? value};\n`
        }
      })
    }
    cssText += '}\n\n'

    cssText += '.dark {\n'
    if (darkVars) {
      Object.entries(darkVars).forEach(([key, value]) => {
        const overrideValue = chartDarkVars && chartKeys.includes(key) ? chartDarkVars[key] : undefined
        if (overrideValue || value) {
          cssText += `  --${key}: ${overrideValue ?? value};\n`
        }
      })
    }
    cssText += '}\n'

    styleElement.textContent = cssText
  })

  // Handle menu color inversion by adding/removing dark class to elements with cn-menu-target.
  watchEffect(() => {
    if (!menuColor.value || !import.meta.client) {
      return
    }

    const updateMenuElements = () => {
      const menuElements = document.querySelectorAll('.cn-menu-target')
      menuElements.forEach((element) => {
        if (menuColor.value === 'inverted') {
          element.classList.add('dark')
        }
        else {
          element.classList.remove('dark')
        }
      })
    }

    // Update existing menu elements.
    updateMenuElements()

    // Watch for new menu elements being added to the DOM.
    const observer = new MutationObserver(() => {
      updateMenuElements()
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })

    return () => {
      observer.disconnect()
    }
  })

  return { isReady }
}
