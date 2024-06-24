<script setup lang="ts">
import { Primitive, type PrimitiveProps, useForwardProps } from 'radix-vue'
import { Dot } from 'lucide-vue-next'

const props = defineProps<PrimitiveProps>()
const forwardedProps = useForwardProps(props)
</script>

<template>
  <Primitive v-bind="forwardedProps">
    <slot>
      <Dot />
    </slot>
  </primitive>
</template>
