<script lang="ts" setup>
import type { RangeCalendarGridBodyProps } from "reka-ui"
import { RangeCalendarGridBody } from "reka-ui"

const props = defineProps<RangeCalendarGridBodyProps>()
</script>

<template>
  <RangeCalendarGridBody v-bind="props">
    <slot />
  </RangeCalendarGridBody>
</template>
