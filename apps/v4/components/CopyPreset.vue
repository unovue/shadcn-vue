<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { useClipboard } from '@vueuse/core'
import { cn } from '@/lib/utils'
import { Button } from '@/styles/reka-nova/ui/button'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const params = useDesignSystemSearchParams()
const { copy, copied } = useClipboard()

const presetId = computed(() => params.preset.value)

function handleCopy() {
  copy(`--preset ${presetId.value}`)
}
</script>

<template>
  <Button
    variant="outline"
    :class="cn(
      'touch-manipulation bg-transparent! px-2! py-0! text-sm! transition-none select-none hover:bg-muted! pointer-coarse:h-10!',
      props.class,
    )"
    @click="handleCopy"
  >
    <span>{{ copied ? 'Copied' : `--preset ${presetId}` }}</span>
  </Button>
</template>
