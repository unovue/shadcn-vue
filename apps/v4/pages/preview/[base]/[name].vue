<script setup lang="ts">
import { useMounted } from '@vueuse/core'
import { Index } from '~/registry/bases/__index__'

const route = useRoute()
const params = useDesignSystemSearchParams()
const isMounted = useMounted()
const { isReady } = useDesignSystemProvider()

const base = route.params.base?.toString() ?? ''
const name = route.params.name?.toString() ?? ''

// Get the item from the registry to determine its type
const registryItem = computed(() => {
  const baseRegistry = Index[base]
  return baseRegistry?.[name]
})

const isBlock = computed(() => registryItem.value?.type === 'registry:block')

function pascalCase(str: string) {
  return `-${str}`.replace(/-\w/g, c => c[1]?.toUpperCase() ?? '')
}

// Load component from blocks or examples based on type
const Component = defineAsyncComponent(() => {
  if (isBlock.value) {
    return import(`@/registry/bases/${base}/blocks/${name}.vue`).then(mod => mod.default)
  }
  // Examples have folder structure: examples/{name}/{PascalCaseName}.vue
  const exampleName = name.replace('-example', '')
  return import(`@/registry/bases/${base}/examples/${exampleName}/${pascalCase(name)}.vue`).then(mod => mod.default)
})

definePageMeta({
  layout: 'blank',
})
</script>

<template>
  <div v-if="isReady && isMounted" class="relative">
    <component :is="Component" />
  </div>
</template>

<style>
html {
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
  display: none;
  }
}
</style>
