<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <div
    data-slot="field-group"
    :class="cn(
      'cn-field-group group/field-group @container/field-group flex w-full flex-col',
      props.class,
    )"
  >
    <slot />
  </div>
</template>
