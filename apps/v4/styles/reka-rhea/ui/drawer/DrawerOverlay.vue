<script lang="ts" setup>
import type { DrawerOverlayProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { DrawerOverlay } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = defineProps<DrawerOverlayProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <DrawerOverlay
    data-slot="drawer-overlay"
    v-bind="delegatedProps"
    :class="cn('bg-black/30 supports-backdrop-filter:backdrop-blur-sm fixed inset-0 z-50', props.class)"
  />
</template>
