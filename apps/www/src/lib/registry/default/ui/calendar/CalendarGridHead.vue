<script lang="ts" setup>
import { CalendarGridHead, type CalendarGridHeadProps } from 'radix-vue'

const props = defineProps<CalendarGridHeadProps>()
</script>

<template>
  <CalendarGridHead v-bind="props">
    <slot />
  </CalendarGridHead>
</template>
