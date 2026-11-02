<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "cn"
import { AvatarRoot } from "reka-ui"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <AvatarRoot
    data-slot="avatar"
    :class="cn('relative flex size-8 shrink-0 overflow-hidden rounded-full', props.class)"
  >
    <slot />
  </AvatarRoot>
</template>
