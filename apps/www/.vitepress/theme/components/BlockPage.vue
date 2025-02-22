<script setup lang="ts">
import { cn } from '@/lib/utils'
import { useUrlSearchParams } from '@vueuse/core'
import ComponentLoader from './ComponentLoader.vue'

const params = useUrlSearchParams('history')
</script>

<template>
  <div
    v-if="params.name"
    :class="cn('relative flex min-h-svh flex-col bg-background', params.containerClass)"
  >
    <ComponentLoader :key="params.style?.toString()" :name="params.name?.toString()" :type-name="'block'" />
  </div>
</template>
