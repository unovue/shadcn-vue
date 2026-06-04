<script lang="ts">
export type ItemDisabledMatcher<TFieldName extends string> = (
  name: TFieldName,
  value: number,
) => boolean

export type TimeslotRootFields<TFieldName extends string> = {
  [K in TFieldName]: Iterable<number>
}

export interface TimeslotRootProps<TFieldName extends string> {
  class: HTMLAttributes["class"]
  fields: TimeslotRootFields<TFieldName>
  isItemDisabled?: ItemDisabledMatcher<TFieldName>
}

export type TimeslotRootModelValue<TFieldName extends string> = {
  [K in TFieldName]?: number | undefined
}

export interface TimeslotFieldSlotProps<TFieldName extends string> extends TimeslotFieldProps<number> {
  name: TFieldName
  onChange: (value?: number) => void
}
</script>

<script setup lang="ts" generic="TFieldName extends string">
import type { HTMLAttributes } from "vue"
import type { TimeslotFieldProps } from "./TimeslotField.vue"
import { Primitive } from "reka-ui"
import { cn } from "~/lib/utils"
import TimeslotField from "./TimeslotField.vue"

const props = defineProps<TimeslotRootProps<TFieldName> & { class?: HTMLAttributes["class"] }>()

const model = defineModel<TimeslotRootModelValue<TFieldName>>({
  default: {},
})
const modelState: TimeslotRootModelValue<TFieldName> = shallowReactive(model.value)
watch(modelState, (modelState) => {
  model.value = { ...toValue(modelState) }
})

function isItemDisabled(name: TFieldName, value: number) {
  return props.isItemDisabled
    ? props.isItemDisabled(name, value)
    : false
}

const fieldsOptions = computed(() => {
  const fields: TimeslotFieldSlotProps<TFieldName>[] = []

  for (const name in props.fields) {
    const fieldOptions = props.fields[name as TFieldName]
    fields.push({
      name,
      options: fieldOptions,
      modelValue: modelState[name],
      isItemDisabled: (value: number) => isItemDisabled(name, value),
      onChange: (value?: number) => {
        modelState[name] = value
      },
    })
  }

  return fields
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
      v-for="field in fieldsOptions"
      :key="field.name"
    >
      <slot
        v-bind="{ field }"
        :name="field.name"
      >
        <TimeslotField v-bind="field" />
      </slot>
    </template>
  </Primitive>
</template>
