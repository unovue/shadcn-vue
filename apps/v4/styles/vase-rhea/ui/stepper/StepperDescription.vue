<script setup lang="ts">
import type { Component, HTMLAttributes } from 'vue'
import { cn } from 'cn'
import { injectStepperItemContext } from '.'

const props = withDefaults(defineProps<{
  as?: keyof HTMLElementTagNameMap | Component
  class?: HTMLAttributes['class']
}>(), {
  as: 'p',
})

const item = injectStepperItemContext()
</script>

<template>
  <component
    :is="as"
    :id="item.descriptionId"
    data-slot="stepper-description"
    :class="cn('text-xs text-muted-foreground', props.class)"
  >
    <slot :state="item.state.value" />
  </component>
</template>
