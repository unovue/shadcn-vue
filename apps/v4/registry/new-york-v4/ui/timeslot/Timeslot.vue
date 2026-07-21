<script lang="ts">
import type { SegmentPart } from "reka-ui"
import type { TimeslotRootFields, TimeslotRootModelValue, TimeslotRootProps } from "./TimeslotRoot.vue"

export type TimeslotFieldName = Extract<SegmentPart, "hour" | "minute">
export type TimeslotProps = TimeslotRootProps<TimeslotFieldName> & {
  format?: Intl.DateTimeFormatOptions
}
export type TimeslotFields = TimeslotRootFields<TimeslotFieldName>
export type TimeslotModelValue = TimeslotRootModelValue<TimeslotFieldName>
</script>

<script setup lang="ts">
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

const meridiem = computed(() => {
  const options = dateTimeFormat.value?.resolvedOptions()
  return !!options?.hour12
})
</script>

<template>
  <TimeslotRoot
    v-bind="forwardProps"
    v-model="model"
    :class="cn('max-h-full max-w-full', props.class)"
  >
    <template #hour="{ field }">
      <TimeslotHours
        v-bind="field"
        :meridiem="meridiem"
      />
    </template>
  </TimeslotRoot>
</template>
