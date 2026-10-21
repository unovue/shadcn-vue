<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "cn"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <div
    data-slot="code-block-footer"
    :class="cn('cn-code-block-footer flex min-w-0 shrink-0 items-center', props.class)"
  >
    <slot />
  </div>
</template>
