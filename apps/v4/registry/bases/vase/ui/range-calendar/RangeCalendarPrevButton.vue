<script lang="ts" setup>
import type { CalendarPreviousButtonProps } from "@vase-ui/vue/calendar"
import type { HTMLAttributes } from "vue"
import { Calendar } from "@vase-ui/vue/calendar"
import { cn } from "cn"
import { IconPlaceholder } from "@/registry/bases/vase/components/icon-placeholder"
import { buttonVariants } from "@/registry/bases/vase/ui/button"

interface Props extends /* @vue-ignore */ CalendarPreviousButtonProps {
  class?: HTMLAttributes["class"]
}

const props = defineProps<Props>()
</script>

<template>
  <Calendar.PreviousButton
    data-slot="range-calendar-prev-button"
    :class="cn(
      buttonVariants({ variant: 'outline' }),
      'absolute left-1',
      'size-7 bg-transparent p-0 opacity-50 hover:opacity-100',
      props.class,
    )"
  >
    <slot>
      <IconPlaceholder lucide="ChevronLeftIcon" tabler="IconChevronLeft" hugeicons="ArrowLeft01Icon" phosphor="CaretLeftIcon" remixicon="RiArrowLeftSLine" class="size-4" />
    </slot>
  </Calendar.PreviousButton>
</template>
