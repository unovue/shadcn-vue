<script setup lang="ts">
import { Slider } from '@/lib/registry/default/ui/slider'
import { cn } from '@/lib/utils'
import { ref } from 'vue'

const modelValue = ref([50])
</script>

<template>
  <Slider
    v-model="modelValue"
    :max="100"
    :step="1"
    :class="cn('w-3/5', $attrs.class ?? '')"
  />
</template>
