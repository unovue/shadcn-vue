<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Tabs } from '@/registry/new-york-v4/ui/tabs'
import { cn } from '~/lib/utils'

const props = defineProps<{ class?: HTMLAttributes['class'] }>()
</script>

<template>
  <Tabs :class="cn('relative mt-6 w-full', props.class)">
    <slot />
  </Tabs>
</template>
