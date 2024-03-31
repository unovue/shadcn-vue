<script setup lang="ts">
import { useUrlSearchParams } from '@vueuse/core'
import ComponentLoader from './ComponentLoader.vue'

const params = useUrlSearchParams('hash-params')
</script>

<template>
  <div v-if="params.name && params.style" :class="params.containerClass">
    <ComponentLoader :key="params.style?.toString()" :name="params.name?.toString()" :type-name="'block'" />
  </div>
</template>
