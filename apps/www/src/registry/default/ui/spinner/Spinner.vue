<script setup lang="ts">
import { Loader2Icon } from "lucide-vue-next"
import { cn } from "@/lib/utils"
</script>

<template>
  <Loader2Icon
    role="status"
    aria-label="Loading"
    :class="cn('size-4 animate-spin', $attrs.class ?? '')"
    v-bind="$attrs"
  />
</template>
