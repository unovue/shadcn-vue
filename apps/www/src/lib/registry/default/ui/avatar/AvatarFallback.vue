<script setup lang="ts">
import { AvatarFallback as AvatarFallbackPrimitive, type AvatarFallbackProps } from 'radix-vue'
import { computed, useAttrs } from 'vue'
import { cn } from '@/utils'

defineOptions({
  name: 'AvatarFallback',
  inheritAttrs: false,
})

const props = defineProps<AvatarFallbackProps>()

const allAttrs = useAttrs()
const attrs = computed(() => {
  const { class: className, ...rest } = allAttrs
  return {
    className,
    rest,
  }
})
</script>

<template>
  <AvatarFallbackPrimitive
    :class="cn('aspect-square h-full w-full', attrs.className ?? '')"
    v-bind="{ ...attrs.rest, ...props }"
  />
</template>
