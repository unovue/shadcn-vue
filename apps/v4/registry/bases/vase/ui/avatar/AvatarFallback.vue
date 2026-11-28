<script setup lang="ts">
import type { AvatarFallbackProps } from "@vase-ui/vue/avatar"
import type { HTMLAttributes } from "vue"
import { Avatar } from "@vase-ui/vue/avatar"
import { cn } from "cn"

interface Props extends /* @vue-ignore */ AvatarFallbackProps {
  class?: HTMLAttributes["class"]
}

const props = defineProps<Props>()
</script>

<template>
  <Avatar.Fallback
    data-slot="avatar-fallback"
    :class="cn('cn-avatar-fallback flex size-full items-center justify-center text-sm group-data-[size=sm]/avatar:text-xs', props.class)"
  >
    <slot />
  </Avatar.Fallback>
</template>
