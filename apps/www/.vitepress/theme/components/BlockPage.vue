<script setup lang="ts">
import { useUrlSearchParams } from '@vueuse/core'
import ComponentLoader from './ComponentLoader.vue'

const params = useUrlSearchParams('hash-params')
</script>

<template>
  <div :class="params.containerClass">
    <ComponentLoader :name="params.name.toString()" :type-name="'block'" />
  </div>
</template>
