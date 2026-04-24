<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"
import { Textarea } from "@/registry/bases/reka/ui/textarea"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <Textarea
    data-slot="input-group-control"
    :class="cn(
      'cn-input-group-textarea flex-1 resize-none',
      props.class,
    )"
  />
</template>
