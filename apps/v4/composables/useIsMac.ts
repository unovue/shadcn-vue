import { onMounted, ref } from 'vue'

export function useIsMac() {
  const isMac = ref(true)

  onMounted(() => {
    isMac.value = navigator.platform.toUpperCase().includes('MAC')
  })

  return isMac
}
