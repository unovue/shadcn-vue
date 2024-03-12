<script lang="ts" setup>
import { type HTMLAttributes, computed } from 'vue'
import { Slot } from 'radix-vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
  asChild?: boolean
}>()

const Comp = computed(() => props.asChild ? Slot : 'a')
</script>

<template>
  <Comp :class="cn('transition-colors hover:text-foreground', props.class)">
    <slot />
  </Comp>
</template>
