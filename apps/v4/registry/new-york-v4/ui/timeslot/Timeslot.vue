<script lang="ts">
import type { SegmentPart, TimeValue } from "reka-ui"
import type { HourCycle } from "./TimeslotHours.vue"
import type { TimeslotRootModelValue, TimeslotRootProps, TimeslotRootSegments } from "./TimeslotRoot.vue"

export type TimeslotSegmentPart = Extract<SegmentPart, "hour" | "minute">
export type TimeslotProps = TimeslotRootProps<TimeslotSegmentPart> & {
  hourCycle?: HourCycle
}
export type TimeslotSegments = TimeslotRootSegments<TimeslotSegmentPart>
export type TimeslotModelValue = TimeValue
</script>

<script setup lang="ts">
import { Time } from "@internationalized/date"
import { reactiveOmit } from "@vueuse/core"
import { cn } from "~/lib/utils.ts"
import TimeslotHours from "./TimeslotHours.vue"
import TimeslotRoot from "./TimeslotRoot.vue"

const props = defineProps<TimeslotProps>()

const model = defineModel<TimeslotModelValue>()

const rootModel = computed(() => {
  if (!model.value)
    return
  const { hour, minute } = model.value
  return { hour, minute }
})
function onRootModelUpdate(value: TimeslotRootModelValue<TimeslotSegmentPart>) {
  model.value = new Time(value.hour, value.minute)
}

const forwardProps = reactiveOmit(props, "class", "hourCycle")
</script>

<template>
  <TimeslotRoot
    v-bind="forwardProps"
    :model-value="rootModel"
    :class="cn('max-h-full max-w-full', props.class)"
    @update:model-value="onRootModelUpdate"
  >
    <template #hour="{ segment }">
      <TimeslotHours
        v-bind="segment"
        :hour-cycle="props.hourCycle"
      />
    </template>
  </TimeslotRoot>
</template>
