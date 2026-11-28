<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "cn"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <div
    data-slot="field-content"
    :class="cn(
      'cn-field-content group/field-content flex flex-1 flex-col leading-snug',
      props.class,
    )"
  >
    <slot />
  </div>
</template>
