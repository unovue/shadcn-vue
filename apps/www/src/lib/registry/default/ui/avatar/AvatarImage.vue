<script setup lang="ts">
import { AvatarImage, type AvatarImageProps } from 'radix-vue'

const props = defineProps<AvatarImageProps>()
</script>

<template>
  <AvatarImage v-bind="props" class="size-full object-cover" />
</template>
