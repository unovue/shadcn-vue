<script lang="ts" setup>
import type { RangeCalendarGridRowProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { RangeCalendarGridRow, useForwardProps } from "reka-ui"
import { cn } from "@/lib/utils"

const props = defineProps<RangeCalendarGridRowProps & { class?: HTMLAttributes["class"] }>()

const delegatedProps = reactiveOmit(props, "class")

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <RangeCalendarGridRow :class="cn('flex mt-2 w-full', props.class)" v-bind="forwardedProps">
    <slot />
  </RangeCalendarGridRow>
</template>
