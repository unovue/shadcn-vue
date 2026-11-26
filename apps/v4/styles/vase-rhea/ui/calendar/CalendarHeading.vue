<script lang="ts" setup>
import type { CalendarCaptionProps } from '@vase-ui/vue/calendar'
import type { HTMLAttributes } from 'vue'
import { Calendar } from '@vase-ui/vue/calendar'
import { cn } from 'cn'

interface Props extends /* @vue-ignore */ CalendarCaptionProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()

defineSlots<{
  default: (props: { headingValue: string }) => any
}>()
</script>

<template>
  <Calendar.Caption
    data-slot="calendar-heading"
    :class="cn('text-sm font-medium', props.class)"
  >
    <template #default="{ text }">
      <slot :heading-value="text">
        {{ text }}
      </slot>
    </template>
  </Calendar.Caption>
</template>
