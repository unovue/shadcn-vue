<script setup lang="ts">
import type { MenubarProps } from '@vase-ui/vue/menubar'
import type { HTMLAttributes } from 'vue'
import { Menubar } from '@vase-ui/vue/menubar'
import { cn } from 'cn'

interface Props extends /* @vue-ignore */ MenubarProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <Menubar
    data-slot="menubar"
    :class="cn('h-9 rounded-4xl border p-1 flex items-center', props.class)"
  >
    <slot />
  </Menubar>
</template>
