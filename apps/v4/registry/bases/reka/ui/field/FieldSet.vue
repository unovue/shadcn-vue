<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <fieldset
    data-slot="field-set"
    :class="cn('cn-field-set flex flex-col', props.class)"
  >
    <slot />
  </fieldset>
</template>
