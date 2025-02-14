<script lang="ts" setup>
import type { CalendarGridHeadProps } from 'radix-vue'
import type { HTMLAttributes } from 'vue'
import { CalendarGridHead } from 'radix-vue'

const props = defineProps<CalendarGridHeadProps & { class?: HTMLAttributes['class'] }>()
</script>

<template>
  <CalendarGridHead v-bind="props">
    <slot />
  </CalendarGridHead>
</template>
