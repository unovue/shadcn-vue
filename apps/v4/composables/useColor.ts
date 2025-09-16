import type { ColorFormat } from '@/lib/colors'
import { useMounted } from '@vueuse/core'

const COOKIE_NAME = 'color_config'
interface Config {
  format: ColorFormat
  lastCopied: string
}

export function useColors() {
  const colors = useCookie<Config>(COOKIE_NAME, {
    default: () => ({
      format: 'hsl',
      lastCopied: '',
    }),
  })
  const mounted = useMounted()

  const setColors = (config: Config) => {
    colors.value = config
  }

  return {
    isLoading: computed(() => !mounted.value),
    format: computed(() => colors.value.format),
    lastCopied: computed(() => colors.value.lastCopied),
    setFormat: (format: ColorFormat) => setColors({ ...colors.value, format }),
    setLastCopied: (lastCopied: string) => setColors({ ...colors.value, lastCopied }),
  }
}
