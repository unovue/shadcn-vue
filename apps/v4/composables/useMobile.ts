import { useMediaQuery } from '@vueuse/core'

const MOBILE_BREAKPOINT = 768

export const useIsMobile = () => useMediaQuery(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
