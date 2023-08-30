<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'

interface SliderProps {
  modelValue: number
  class?: string
  step?: number | string
  disabled?: boolean
  min?: number
  max?: number
}

const props = withDefaults(defineProps<SliderProps>(), {
  step: 1,
  disabled: false,
  min: 0,
  max: 100,
})

const emit = defineEmits(['update:modelValue'])

const progressStyle = computed(() => {
  const { modelValue, min, max } = props
  const clampedValue = Math.max(min, Math.min(modelValue, max))
  const relativeValue = (clampedValue - min) / (max - min)
  return {
    width: `${relativeValue * 100}%`,
  }
})
</script>

<template>
  <div :class="cn('w-full', props.class)">
    <div class="relative w-full flex items-center h-2">
      <input
        type="range"
        :step="props.step"
        :disabled="props.disabled"
        :min="props.min"
        :max="props.max"
        class="w-full absolute appearance-none cursor-default disabled:cursor-not-allowed disabled:bg-opacity-50 focus:outline-none peer group bg-transparent rounded-lg focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-950 h-4 [&::-webkit-slider-thumb]:relative [&::-moz-range-thumb]:relative [&::-webkit-slider-thumb]:active:cursor-grabbing [&::-webkit-slider-thumb]:z-[1] [&::-webkit-slider-thumb]:cursor-grab [&::-moz-range-thumb]:cursor-grab [&::-moz-range-thumb]:active:cursor-grabbing [&::-moz-range-thumb]:z-[1] [&::-webkit-slider-thumb]:appearance-none [&::-moz-range-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 text-foreground [&::-webkit-slider-thumb]:ring-2 [&::-webkit-slider-thumb]:ring-primary [&::-webkit-slider-thumb]:bg-background [&::-moz-range-thumb]:bg-current [&::-webkit-slider-thumb]:h-3 [&::-moz-range-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-moz-range-thumb]:w-3 [&::-webkit-slider-thumb]:-mt-[3px] [&::-moz-range-thumb]:-mt-[3px] [&::-webkit-slider-runnable-track]:group-disabled:bg-opacity-50 [&::-moz-slider-runnable-track]:group-disabled:bg-opacity-50 [&::-webkit-slider-runnable-track]:bg-secondary [&::-moz-slider-runnable-track]:bg-secondary [&::-webkit-slider-runnable-track]:rounded-lg [&::-moz-slider-runnable-track]:rounded-lg [&::-webkit-slider-runnable-track]:h-1.5 [&::-moz-slider-runnable-track]:h-1.5"
        :value="props.modelValue"
        @input="
          ($event) =>
            emit(
              'update:modelValue',
              ($event.target as HTMLInputElement).valueAsNumber,
            )
        "
      >
      <span
        class="absolute pointer-events-none peer-disabled:bg-opacity-50 rounded-s-lg bg-primary h-2"
        :style="progressStyle"
      />
    </div>
  </div>
</template>
