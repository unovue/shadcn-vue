<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { Button } from '@/styles/reka-nova/ui/button'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const { shuffle } = useTypesetShuffle()
</script>

<template>
  <Button
    variant="outline"
    :class="cn(
      'touch-manipulation bg-transparent! px-2! py-0! text-sm! transition-none select-none hover:bg-muted! pointer-coarse:h-10!',
      props.class,
    )"
    @click="shuffle"
  >
    <span class="w-full truncate text-center font-medium">Shuffle</span>
  </Button>
</template>
