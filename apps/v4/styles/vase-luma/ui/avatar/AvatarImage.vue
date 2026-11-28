<script setup lang="ts">
import type { AvatarImageEmits, AvatarImageProps } from '@vase-ui/vue/avatar'
import type { HTMLAttributes } from 'vue'
import { Avatar } from '@vase-ui/vue/avatar'
import { cn } from 'cn'

interface Props extends /* @vue-ignore */ AvatarImageProps {
  class?: HTMLAttributes['class']
}
interface Emits extends /* @vue-ignore */ AvatarImageEmits {}

const props = defineProps<Props>()
defineEmits<Emits>()
</script>

<template>
  <Avatar.Image
    data-slot="avatar-image"
    :class="cn('rounded-full aspect-square size-full object-cover', props.class)"
  />
</template>
