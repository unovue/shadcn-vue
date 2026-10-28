<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { cn } from 'cn'
import { useForwardProps } from 'reka-ui'

const props = defineProps<{ class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')

const forwarded = useForwardProps(delegatedProps)
</script>

<template>
  <div
    data-slot="input-otp-group"
    v-bind="forwarded"
    :class="cn('has-aria-invalid:border-b-destructive dark:has-aria-invalid:border-b-destructive/50 rounded-none gap-1 flex items-center', props.class)"
  >
    <slot />
  </div>
</template>
