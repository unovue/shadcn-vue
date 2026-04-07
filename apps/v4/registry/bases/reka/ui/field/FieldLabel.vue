<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"
import { Label } from "@/registry/bases/reka/ui/label"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <Label
    data-slot="field-label"
    :class="cn(
      'cn-field-label group/field-label peer/field-label flex w-fit leading-snug',
      'has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col',
      props.class,
    )"
  >
    <slot />
  </Label>
</template>
