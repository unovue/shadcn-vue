<script setup lang="ts">
import type { MenubarLabelProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { MenubarLabel } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = defineProps<MenubarLabelProps & { class?: HTMLAttributes['class'], inset?: boolean }>()
const delegatedProps = reactiveOmit(props, 'class', 'inset')
</script>

<template>
  <MenubarLabel
    data-slot="menubar-label"
    :data-inset="inset ? '' : undefined"
    v-bind="delegatedProps"
    :class="cn('text-muted-foreground px-3.5 py-2.5 text-xs data-inset:pl-9.5', props.class)"
  >
    <slot />
  </MenubarLabel>
</template>
