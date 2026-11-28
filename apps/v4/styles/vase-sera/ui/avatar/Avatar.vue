<script setup lang="ts">
import type { AvatarRootProps } from '@vase-ui/vue/avatar'
import type { HTMLAttributes } from 'vue'
import type { AvatarVariants } from '.'
import { Avatar } from '@vase-ui/vue/avatar'
import { cn } from 'cn'
import { avatarVariants } from '.'

interface Props extends /* @vue-ignore */ AvatarRootProps {
  class?: HTMLAttributes['class']
  size?: AvatarVariants['size']
}

const props = defineProps<Props>()
</script>

<template>
  <Avatar.Root
    data-slot="avatar"
    :data-size="size ?? 'default'"
    :class="cn(avatarVariants({ size }), props.class)"
  >
    <slot />
  </Avatar.Root>
</template>
