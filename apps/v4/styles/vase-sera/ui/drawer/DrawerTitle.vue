<script lang="ts" setup>
import type { DrawerTitleProps } from '@vase-ui/vue/drawer'
import type { HTMLAttributes } from 'vue'
import { Drawer } from '@vase-ui/vue/drawer'
import { cn } from 'cn'

interface Props extends /* @vue-ignore */ DrawerTitleProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <Drawer.Title
    data-slot="drawer-title"
    :class="cn('text-foreground text-lg font-semibold uppercase tracking-wider cn-font-heading', props.class)"
  >
    <slot />
  </Drawer.Title>
</template>
