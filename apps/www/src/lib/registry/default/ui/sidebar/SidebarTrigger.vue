<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import Button from '@/lib/registry/default/ui/button/Button.vue'
import { cn } from '@/lib/utils'
import { PanelLeft } from 'lucide-vue-next'
import { injectSidebarContext } from './utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const { toggleSidebar } = injectSidebarContext()
</script>

<template>
  <Button
    data-sidebar="trigger"
    variant="ghost"
    size="icon"
    :class="cn('h-7 w-7', props.class)"
    @click="toggleSidebar"
  >
    <PanelLeft />
    <span class="sr-only">Toggle Sidebar</span>
  </Button>
</template>
