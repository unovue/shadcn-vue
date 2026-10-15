<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "cn"
import { Input } from "@/registry/bases/reka/ui/input"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <Input
    data-slot="input-group-control"
    :class="cn(
      'cn-input-group-input flex-1',
      props.class,
    )"
  />
</template>
