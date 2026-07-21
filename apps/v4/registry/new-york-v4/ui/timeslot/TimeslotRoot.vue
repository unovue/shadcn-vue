<script lang="ts">
import type { HTMLAttributes } from "vue"
import type { TimeslotSegmentProps } from "./TimeslotSegment.vue"

export type ReadonlyItemMatcher<TSegmentPart extends string> = (
  name: TSegmentPart,
  value: number,
) => boolean

export type TimeslotRootSegments<TSegmentPart extends string> = {
  [K in TSegmentPart]: readonly number[]
}

export interface TimeslotRootProps<TSegmentPart extends string> {
  class?: HTMLAttributes["class"]
  segments: TimeslotRootSegments<TSegmentPart>
  isReadonlyItem?: ReadonlyItemMatcher<TSegmentPart>
}

export type TimeslotRootModelValue<TSegmentPart extends string> = {
  [K in TSegmentPart]?: number | undefined
}

export interface TimeslotSegmentSlotProps<TSegmentPart extends string> extends TimeslotSegmentProps<number> {
  name: TSegmentPart
  onChange: (value?: number) => void
}
</script>

<script setup lang="ts" generic="TSegmentPart extends string">
import { Primitive } from "reka-ui"
import { cn } from "~/lib/utils"
import TimeslotSegment from "./TimeslotSegment.vue"

const props = defineProps<TimeslotRootProps<TSegmentPart>>()

const model = defineModel<TimeslotRootModelValue<TSegmentPart>>({
  default: () => ({}),
})
const modelState: TimeslotRootModelValue<TSegmentPart> = shallowReactive(model.value)
watch(modelState, (modelState) => {
  model.value = { ...toValue(modelState) }
})

function isReadonlyItem(name: TSegmentPart, value: number) {
  return props.isReadonlyItem
    ? props.isReadonlyItem(name, value)
    : false
}

const segmentsOptions = computed(() => {
  const segments: TimeslotSegmentSlotProps<TSegmentPart>[] = []

  for (const name in props.segments) {
    const fieldOptions = props.segments[name as TSegmentPart]
    segments.push({
      name,
      options: fieldOptions,
      modelValue: modelState[name],
      isReadonlyItem: (value: number) => isReadonlyItem(name, value),
      onChange: (value?: number) => {
        modelState[name] = value
      },
    })
  }

  return segments
})
</script>

<template>
  <Primitive
    data-timeslot-root
    :class="cn(
      'flex gap-4',
      props.class,
    )"
  >
    <template
      v-for="segment in segmentsOptions"
      :key="segment.name"
    >
      <slot
        v-bind="{ segment }"
        :name="segment.name"
      >
        <TimeslotSegment v-bind="segment" />
      </slot>
    </template>
  </Primitive>
</template>
