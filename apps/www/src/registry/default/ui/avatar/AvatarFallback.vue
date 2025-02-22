<script setup lang="ts">
import { AvatarFallback, type AvatarFallbackProps } from 'reka-ui'

const props = defineProps<AvatarFallbackProps>()
</script>

<template>
  <AvatarFallback v-bind="props">
    <slot />
  </AvatarFallback>
</template>
