import { useStorage } from '@vueuse/core'
import { styles } from '@/registry/registry-styles'

export const useStyle = () => useStorage('selected-style', styles[0].name)
