<script lang="ts" setup>
import type { DrawerDescriptionProps } from '@vase-ui/vue/drawer'
import type { HTMLAttributes } from 'vue'
import { Drawer } from '@vase-ui/vue/drawer'
import { cn } from 'cn'

interface Props extends /* @vue-ignore */ DrawerDescriptionProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <Drawer.Description
    data-slot="drawer-description"
    :class="cn('text-muted-foreground text-sm', props.class)"
  >
    <slot />
  </Drawer.Description>
</template>
