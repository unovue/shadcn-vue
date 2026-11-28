<script setup lang="ts">
import type { Component, HTMLAttributes } from 'vue'
import { cn } from 'cn'
import { computed } from 'vue'
import { useCommand } from '.'

const props = withDefaults(defineProps<{
  as?: keyof HTMLElementTagNameMap | Component
  class?: HTMLAttributes['class']
}>(), {
  as: 'div',
})

const command = useCommand()

const isRender = computed(() => !!command.search.value && command.visibleCount.value === 0)
</script>

<template>
  <component
    :is="as"
    v-if="isRender"
    data-slot="command-empty"
    :class="cn('py-6 text-center text-xs/relaxed', props.class)"
  >
    <slot />
  </component>
</template>
