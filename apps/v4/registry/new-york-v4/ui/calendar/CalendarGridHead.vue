<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'
import { CalendarGridHead, type CalendarGridHeadProps } from 'reka-ui'

const props = defineProps<CalendarGridHeadProps & { class?: HTMLAttributes['class'] }>()
</script>

<template>
  <CalendarGridHead v-bind="props">
    <slot />
  </CalendarGridHead>
</template>
