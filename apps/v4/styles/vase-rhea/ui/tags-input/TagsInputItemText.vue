<script setup lang="ts">
import type { Component, HTMLAttributes } from 'vue'
import { cn } from 'cn'
import { useId } from 'vue'
import { injectTagsInputItemContext } from '.'

const props = withDefaults(defineProps<{
  as?: keyof HTMLElementTagNameMap | Component
  class?: HTMLAttributes['class']
}>(), {
  as: 'span',
})

const itemContext = injectTagsInputItemContext()

itemContext.textId.value ||= useId()
</script>

<template>
  <component
    :is="as"
    :id="itemContext.textId.value"
    data-slot="tags-input-item-text"
    :class="cn('py-0.5 px-2 text-sm rounded bg-transparent', props.class)"
  >
    <slot>{{ itemContext.displayValue.value }}</slot>
  </component>
</template>
