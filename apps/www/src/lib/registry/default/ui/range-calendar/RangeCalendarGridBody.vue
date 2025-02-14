<script lang="ts" setup>
import type { RangeCalendarGridBodyProps } from 'radix-vue'
import { RangeCalendarGridBody } from 'radix-vue'

const props = defineProps<RangeCalendarGridBodyProps>()
</script>

<template>
  <RangeCalendarGridBody v-bind="props">
    <slot />
  </RangeCalendarGridBody>
</template>
