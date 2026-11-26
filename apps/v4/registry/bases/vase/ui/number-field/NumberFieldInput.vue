<script setup lang="ts">
import type { NumberFieldInputProps } from "@vase-ui/vue/number-field"
import type { HTMLAttributes } from "vue"
import { NumberField } from "@vase-ui/vue/number-field"
import { cn } from "cn"

interface Props extends /* @vue-ignore */ NumberFieldInputProps {
  class?: HTMLAttributes["class"]
}

const props = defineProps<Props>()
</script>

<template>
  <NumberField.Input
    data-slot="input"
    :class="cn(
      'cn-input w-full min-w-0 text-center outline-none placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
      props.class,
    )"
  />
</template>
