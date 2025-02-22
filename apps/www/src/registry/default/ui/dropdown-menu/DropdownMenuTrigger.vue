<script setup lang="ts">
import { DropdownMenuTrigger, type DropdownMenuTriggerProps, useForwardProps } from 'reka-ui'

const props = defineProps<DropdownMenuTriggerProps>()

const forwardedProps = useForwardProps(props)
</script>

<template>
  <DropdownMenuTrigger class="outline-none" v-bind="forwardedProps">
    <slot />
  </DropdownMenuTrigger>
</template>
