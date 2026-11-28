<script lang="ts" setup>
import type { CalendarNextButtonProps } from '@vase-ui/vue/calendar'

import type { HTMLAttributes } from 'vue'
import { ChevronRightIcon } from '@lucide/vue'
import { Calendar } from '@vase-ui/vue/calendar'
import { cn } from 'cn'
import { buttonVariants } from '@/styles/vase-rhea/ui/button'

interface Props extends /* @vue-ignore */ CalendarNextButtonProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <Calendar.NextButton
    data-slot="range-calendar-next-button"
    :class="cn(
      buttonVariants({ variant: 'outline' }),
      'absolute right-1',
      'size-7 bg-transparent p-0 opacity-50 hover:opacity-100',
      props.class,
    )"
  >
    <slot>
      <ChevronRightIcon class="size-4" />
    </slot>
  </Calendar.NextButton>
</template>
