<script setup lang="ts">
import { ref } from 'vue'
import { cn } from '@/lib/utils'
import { Slider } from '@/lib/registry/default/ui/slider'

const modelValue = ref([50])
</script>

<template>
  <Slider
    v-model="modelValue"
    :max="100"
    :step="1"
    :class="cn('w-[60%]', $attrs.class ?? '')"
  />
</template>
