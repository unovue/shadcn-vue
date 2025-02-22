import { styles } from '@/registry/registry-styles'
import { useStorage } from '@vueuse/core'

export const useStyle = () => useStorage('selected-style', styles[0].name)
