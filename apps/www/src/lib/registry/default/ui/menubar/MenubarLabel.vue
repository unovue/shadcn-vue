<script setup lang="ts">
import { MenubarLabel, type MenubarLabelProps } from 'radix-vue'
import { cn } from '@/lib/utils'

const props = defineProps<MenubarLabelProps & { class?: string }>()
</script>

<template>
  <div :class="cn('px-2 py-1.5 text-sm font-semibold', props.class)">
    <MenubarLabel>
      <slot />
    </MenubarLabel>
  </div>
</template>
