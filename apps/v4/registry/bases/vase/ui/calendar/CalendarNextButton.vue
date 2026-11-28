<script lang="ts" setup>
import type { CalendarNextButtonProps } from "@vase-ui/vue/calendar"
import type { HTMLAttributes } from "vue"
import { Calendar } from "@vase-ui/vue/calendar"
import { cn } from "cn"
import { IconPlaceholder } from "@/registry/bases/vase/components/icon-placeholder"
import { buttonVariants } from "@/registry/bases/vase/ui/button"

interface Props extends /* @vue-ignore */ CalendarNextButtonProps {
  class?: HTMLAttributes["class"]
}

const props = defineProps<Props>()
</script>

<template>
  <Calendar.NextButton
    data-slot="calendar-next-button"
    :class="cn(
      buttonVariants({ variant: 'outline' }),
      'pointer-events-auto size-7 bg-transparent p-0 opacity-50 hover:opacity-100',
      props.class,
    )"
  >
    <slot>
      <IconPlaceholder lucide="ChevronRightIcon" tabler="IconChevronRight" hugeicons="ArrowRight01Icon" phosphor="CaretRightIcon" remixicon="RiArrowRightSLine" class="cn-rtl-flip size-4" />
    </slot>
  </Calendar.NextButton>
</template>
