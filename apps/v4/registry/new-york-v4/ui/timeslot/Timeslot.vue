<script lang="ts">
import type { SegmentPart, TimeValue } from "reka-ui"
import type { TimeslotRootModelValue, TimeslotRootProps, TimeslotRootSegments } from "./TimeslotRoot.vue"

export type TimeslotSegmentPart = Extract<SegmentPart, "hour" | "minute">
export type TimeslotProps = TimeslotRootProps<TimeslotSegmentPart> & {
  format?: Intl.DateTimeFormatOptions
}
export type TimeslotSegments = TimeslotRootSegments<TimeslotSegmentPart>
export type TimeslotModelValue = TimeValue
</script>

<script setup lang="ts">
import { Time } from "@internationalized/date"
import { reactiveOmit } from "@vueuse/core"
import { useLocale } from "reka-ui"
import { cn } from "~/lib/utils.ts"
import TimeslotHours from "./TimeslotHours.vue"
import TimeslotRoot from "./TimeslotRoot.vue"

const props = withDefaults(defineProps<TimeslotProps>(), {
  format(): Intl.DateTimeFormatOptions {
    return {
      dateStyle: "short",
      timeStyle: "short",
    }
  },
})

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

const forwardProps = reactiveOmit(props, "class", "format")

const locale = useLocale()

const dateTimeFormat = shallowRef<Intl.DateTimeFormat>()
onMounted(() => {
  watch([locale, () => props.format], ([locale, dateTimeFormatOptions]) => {
    dateTimeFormat.value = new Intl.DateTimeFormat(locale, dateTimeFormatOptions)
  }, {
    immediate: true,
  })
})

const hourCycle = computed(() => {
  const options = dateTimeFormat.value?.resolvedOptions()
  return options?.hour12 ? 12 : 24
})
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
        :hour-cycle="hourCycle"
      />
    </template>
  </TimeslotRoot>
</template>
