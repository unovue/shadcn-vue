<script setup lang="ts">
import { AvatarRoot as AvatarRootPrimitive, type AvatarRootProps } from 'radix-vue'
import { computed, useAttrs } from 'vue'
import { cn } from '@/utils'

defineOptions({
  name: 'Avatar',
  inheritAttrs: false,
})

const props = defineProps<AvatarRootProps>()

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
  <AvatarRootPrimitive
    :class="cn(
      'relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full',
      attrs.className ?? '',
    )"
    v-bind="{ ...attrs.rest, ...props }"
  >
    <slot />
  </AvatarRootPrimitive>
</template>
