<script setup lang="ts">
import { AvatarRoot } from 'radix-vue'
import { avatarVariant } from '.'
import { cn } from '@/lib/utils'

interface Props {
  size?: NonNullable<Parameters<typeof avatarVariant>[0]>['size']
  shape?: NonNullable<Parameters<typeof avatarVariant>[0]>['shape']
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 'sm',
  shape: 'circle',
})
</script>

<template>
  <AvatarRoot :class="cn(avatarVariant({ size, shape }), props.class)">
    <slot />
  </AvatarRoot>
</template>
