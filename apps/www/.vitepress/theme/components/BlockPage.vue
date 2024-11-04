<script setup lang="ts">
import { useUrlSearchParams } from '@vueuse/core'
import ComponentLoader from './ComponentLoader.vue'

const params = useUrlSearchParams('history')
</script>

<template>
  <div v-if="params.name" :class="params.containerClass">
    <ComponentLoader :key="params.style?.toString()" :name="params.name?.toString()" :type-name="'block'" />
  </div>
</template>
