<script setup lang="ts">
import type { NavigationMenuRootEmits, NavigationMenuRootProps } from '@vase-ui/vue/navigation-menu'
import type { HTMLAttributes } from 'vue'
import { NavigationMenu } from '@vase-ui/vue/navigation-menu'
import { cn } from 'cn'
import NavigationMenuViewport from './NavigationMenuViewport.vue'

interface Props extends /* @vue-ignore */ NavigationMenuRootProps {
  class?: HTMLAttributes['class']
  viewport?: boolean
}
interface Emits extends /* @vue-ignore */ NavigationMenuRootEmits {}

const props = withDefaults(defineProps<Props>(), {
  viewport: true,
})
defineEmits<Emits>()
</script>

<template>
  <NavigationMenu.Root
    data-slot="navigation-menu"
    :data-viewport="viewport"
    :class="cn('group/navigation-menu relative flex max-w-max flex-1 items-center justify-center', props.class)"
  >
    <slot />
    <NavigationMenuViewport v-if="viewport" />
  </NavigationMenu.Root>
</template>
