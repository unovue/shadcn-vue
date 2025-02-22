<script setup lang="ts">
import { HoverCardTrigger, type HoverCardTriggerProps } from 'reka-ui'

const props = defineProps<HoverCardTriggerProps>()
</script>

<template>
  <HoverCardTrigger v-bind="props">
    <slot />
  </HoverCardTrigger>
</template>
