<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import Spinner from './Spinner.vue'
import { useConfigStore } from '@/stores/config'

const props = defineProps<{
  name: string
  typeName?: 'example' | 'block'
}>()
const { style } = useConfigStore()

const Component = defineAsyncComponent({
  loadingComponent: Spinner,
  loader: () => import(`../../../src/lib/registry/${style.value}/${props.typeName}/${props.name}.vue`),
  timeout: 5000,
})
</script>

<template>
  <Component :is="Component" />
</template>
