<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import {
  MenubarItem,
  type MenubarItemEmits,
  type MenubarItemProps,
  useEmitAsProps,
} from 'radix-vue'
import { cn } from '@/lib/utils'

const props = defineProps<MenubarItemProps & { class?: HTMLAttributes['class']; inset?: boolean }>()

const emits = defineEmits<MenubarItemEmits>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const emitsAsProps = useEmitAsProps(emits)
</script>

<template>
  <MenubarItem
    v-bind="{
      ...delegatedProps,
      ...emitsAsProps,
    }"
    :class="[
      cn(
        'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        inset && 'pl-8',
        props.class,
      ),
    ]"
  >
    <slot />
  </MenubarItem>
</template>
