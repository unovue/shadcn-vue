<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from 'cn'
import { Tabs } from '@/registry/new-york-v4/ui/tabs'

const props = defineProps<{ class?: HTMLAttributes['class'] }>()
</script>

<template>
  <Tabs :class="cn(props.class)">
    <slot />
  </Tabs>
</template>
