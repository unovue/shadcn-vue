<script setup lang="ts">
import type { Component, HTMLAttributes } from 'vue'
import { cn } from 'cn'
import { injectStepperItemContext } from '.'

const props = withDefaults(defineProps<{
  as?: keyof HTMLElementTagNameMap | Component
  class?: HTMLAttributes['class']
}>(), {
  as: 'span',
})

const item = injectStepperItemContext()
</script>

<template>
  <component
    :is="as"
    data-slot="stepper-indicator"
    :class="cn(
      'inline-flex items-center justify-center rounded-full text-muted-foreground/50 w-8 h-8',
      // Disabled
      'group-data-[disabled]:text-muted-foreground group-data-[disabled]:opacity-50',
      // Active
      'group-data-[state=active]:bg-primary group-data-[state=active]:text-primary-foreground',
      // Completed
      'group-data-[state=completed]:bg-accent group-data-[state=completed]:text-accent-foreground',
      props.class,
    )"
  >
    <slot :step="item.step.value">
      Step {{ item.step.value }}
    </slot>
  </component>
</template>
