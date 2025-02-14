<script setup lang="ts">
import type { PrimitiveProps } from 'radix-vue'
import { DashIcon } from '@radix-icons/vue'
import { Primitive, useForwardProps } from 'radix-vue'

const props = defineProps<PrimitiveProps>()
const forwardedProps = useForwardProps(props)
</script>

<template>
  <Primitive v-bind="forwardedProps">
    <slot>
      <DashIcon />
    </slot>
  </primitive>
</template>
