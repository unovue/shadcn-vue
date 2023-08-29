<script setup lang="ts">
import { type AvatarImageEmits, AvatarImage as AvatarImagePrimitive, type AvatarImageProps } from 'radix-vue'
import { computed, useAttrs } from 'vue'
import { cn, useEmitAsProps } from '@/utils'

defineOptions({
  name: 'AvatarImage',
  inheritAttrs: false,
})
const props = defineProps<AvatarImageProps>()
const emits = defineEmits<AvatarImageEmits>()
const emitsAsProps = useEmitAsProps(emits)

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
  <AvatarImagePrimitive
    :class="cn('flex h-full w-full items-center justify-center rounded-full bg-muted', attrs.className ?? '')"
    v-bind="{ ...props, ...emitsAsProps, ...attrs.rest }"
  />
</template>
