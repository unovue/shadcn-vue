<script setup lang="ts">
import type { DialogTitleProps } from '@vase-ui/vue/dialog'
import type { HTMLAttributes } from 'vue'
import { Dialog } from '@vase-ui/vue/dialog'
import { cn } from 'cn'

interface Props extends /* @vue-ignore */ DialogTitleProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <Dialog.Title
    data-slot="sheet-title"
    :class="cn('text-foreground font-medium cn-font-heading', props.class)"
  >
    <slot />
  </Dialog.Title>
</template>
