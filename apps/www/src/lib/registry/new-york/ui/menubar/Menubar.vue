<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import {
  MenubarRoot,
  type MenubarRootEmits,
  type MenubarRootProps,
  useEmitAsProps,
} from 'radix-vue'
import { cn } from '@/lib/utils'

const props = defineProps<MenubarRootProps & { class?: HTMLAttributes['class'] }>()
const emits = defineEmits<MenubarRootEmits>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <MenubarRoot
    v-bind="{
      ...delegatedProps,
      ...useEmitAsProps(emits),
    }"
    :class="
      cn(
        'flex h-10 items-center space-x-1 rounded-md border border-border p-1',
        props.class,
      )
    "
  >
    <slot />
  </MenubarRoot>
</template>
