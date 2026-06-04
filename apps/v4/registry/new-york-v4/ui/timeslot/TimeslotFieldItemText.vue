<script lang="ts">
import type { PrimitiveProps } from "reka-ui"

export interface TimeslotFieldItemTextProps extends PrimitiveProps {
  class?: HTMLAttributes["class"]
  value: number
  disabled?: boolean
}
</script>

<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { Primitive } from "reka-ui"
import { cn } from "~/lib/utils"

const props = defineProps<TimeslotFieldItemTextProps>()

const formattedText = computed(() => {
  return props.value.toString().slice(-2).padStart(2, "0")
})
</script>

<template>
  <Primitive
    as="span"
    :class="cn(
      'text-xl transition-colors whitespace-nowrap',
      props.disabled ? 'text-secondary' : '',
      props.class,
    )"
  >
    {{ formattedText }}
  </Primitive>
</template>
