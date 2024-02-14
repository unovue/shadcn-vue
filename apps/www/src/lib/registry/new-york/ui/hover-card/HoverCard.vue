<script setup lang="ts">
import { HoverCardRoot, type HoverCardRootProps, useForwardProps } from 'radix-vue'

const props = defineProps<HoverCardRootProps>()

const forwardedProps = useForwardProps(props)
</script>

<template>
  <HoverCardRoot v-bind="forwardedProps">
    <slot />
  </HoverCardRoot>
</template>
