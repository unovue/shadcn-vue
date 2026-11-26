<script lang="ts" setup>
import type { CalendarPreviousButtonProps } from '@vase-ui/vue/calendar'

import type { HTMLAttributes } from 'vue'
import { ChevronLeftIcon } from '@lucide/vue'
import { Calendar } from '@vase-ui/vue/calendar'
import { cn } from 'cn'
import { buttonVariants } from '@/styles/vase-rhea/ui/button'

interface Props extends /* @vue-ignore */ CalendarPreviousButtonProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <Calendar.PreviousButton
    data-slot="calendar-prev-button"
    :class="cn(
      buttonVariants({ variant: 'outline' }),
      'pointer-events-auto size-7 bg-transparent p-0 opacity-50 hover:opacity-100',
      props.class,
    )"
  >
    <slot>
      <ChevronLeftIcon class="cn-rtl-flip size-4" />
    </slot>
  </Calendar.PreviousButton>
</template>
