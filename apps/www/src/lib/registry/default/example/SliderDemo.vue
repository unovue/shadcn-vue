<script setup lang="ts">
import { cn } from '@/lib/utils'
import { Slider } from '@/lib/registry/default/ui/slider'

const modelValue = [50]
</script>

<template>
  <Slider
    v-model="modelValue"
    :max="100"
    :step="1"
    :class="cn('w-[60%]', $attrs.class ?? '')"
  />
</template>
