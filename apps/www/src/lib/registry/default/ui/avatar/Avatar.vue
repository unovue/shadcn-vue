<script setup lang="ts">
import { defineProps, withDefaults } from 'vue'
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
const computedClasses = cn(avatarVariant({ size: props.size, shape: props.shape }), props.class)
</script>

<template>
  <AvatarRoot :class="computedClasses">
    <slot />
  </AvatarRoot>
</template>
