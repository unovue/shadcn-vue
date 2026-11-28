<script setup lang="ts">
import type { MenuSeparatorProps } from '@vase-ui/vue/menu'
import type { HTMLAttributes } from 'vue'
import { Menu } from '@vase-ui/vue/menu'
import { cn } from 'cn'

interface Props extends /* @vue-ignore */ MenuSeparatorProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <Menu.Separator
    data-slot="dropdown-menu-separator"
    :class="cn('bg-border/50 -mx-1.5 my-1.5 h-px', props.class)"
  />
</template>
