<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"
import { Separator } from "@/registry/bases/reka/ui/separator"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <div
    data-slot="field-separator"
    :data-content="!!$slots.default"
    :class="cn(
      'cn-field-separator relative',
      props.class,
    )"
  >
    <Separator class="absolute inset-0 top-1/2" />
    <span
      v-if="$slots.default"
      class="cn-field-separator-content bg-background relative mx-auto block w-fit"
      data-slot="field-separator-content"
    >
      <slot />
    </span>
  </div>
</template>
