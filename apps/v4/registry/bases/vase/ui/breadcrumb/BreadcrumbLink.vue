<script lang="ts" setup>
import type { Component, HTMLAttributes } from "vue"
import { cn } from "cn"

const props = withDefaults(defineProps<{
  as?: keyof HTMLElementTagNameMap | Component
  class?: HTMLAttributes["class"]
}>(), {
  as: "a",
})
</script>

<template>
  <component
    :is="as"
    data-slot="breadcrumb-link"
    :class="cn('cn-breadcrumb-link', props.class)"
  >
    <slot />
  </component>
</template>
