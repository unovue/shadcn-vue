<script setup lang="ts">
import { LoaderIcon } from "lucide-vue-next"
import { cn } from "@/lib/utils"
</script>

<template>
  <LoaderIcon
    role="status"
    aria-label="Loading"
    :class="cn('size-4 animate-spin', $attrs.class ?? '')"
    v-bind="$attrs"
  />
</template>
