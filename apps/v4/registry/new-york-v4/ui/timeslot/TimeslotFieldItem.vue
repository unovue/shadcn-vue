<script lang="ts">
import type { PrimitiveProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactivePick } from "@vueuse/core"

export interface TimeslotFieldItemProps<T extends number> extends PrimitiveProps {
  class?: HTMLAttributes["class"]
  value: T
  disabled?: boolean
  selected?: boolean
}

export interface TimeslotFieldItemEmits {
  (type: "select", target: HTMLElement): void
}
</script>

<script setup lang="ts" generic="T extends number">
import { Primitive, useForwardProps } from "reka-ui"
import { cn } from "~/lib/utils"
import TimeslotFieldItemText from "./TimeslotFieldItemText.vue"

const props = withDefaults(defineProps<TimeslotFieldItemProps<T>>(), {
  disabled: false,
  selected: false,
})

const emit = defineEmits<TimeslotFieldItemEmits>()
const delegatedProps = reactivePick(props, "as", "asChild")
const forwardProps = useForwardProps(delegatedProps)

const root = useTemplateRef("root")

function onButtonClick() {
  const target = root.value?.$el
  if (target instanceof HTMLElement) {
    emit("select", target)
  }
}
</script>

<template>
  <Primitive
    ref="root"
    data-timeslot-field-item
    data-slot="timeslot-field-item"
    :data-value="value"
    v-bind="forwardProps"
    :class="cn(
      'flex items-center justify-center first:justify-end last:justify-start',
      'text-muted-foreground',
      props.class,
    )"
  >
    <Primitive
      as="button"
      role="button"
      class="snap snap-center snap-normal text-center font-normal transition-colors cursor-pointer text-muted-foreground hover:text-foreground data-selected:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-3 rounded-md outline-none"
      :data-selected="props.selected"
      @click="onButtonClick"
    >
      <slot v-bind="{ value, disabled: props.disabled }">
        <TimeslotFieldItemText
          :value="value"
          :disabled="props.disabled"
        />
      </slot>
    </Primitive>
  </Primitive>
</template>
