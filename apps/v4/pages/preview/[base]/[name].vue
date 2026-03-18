<script setup lang="ts">
import type { RegistryItem } from 'shadcn-vue/schema'
import { useMounted } from '@vueuse/core'

const route = useRoute()
const isMounted = useMounted()
const { isReady } = useDesignSystemProvider()

const base = route.params.base?.toString() ?? ''
const name = route.params.name?.toString() ?? ''

const { data } = useFetch(`/api/base/${base}`)

// Get the item from the registry to determine its type
const registryItem = computed(() => {
  return data.value?.[name as keyof typeof data.value] as RegistryItem
})

const isBlock = computed(() => registryItem.value?.type === 'registry:block')

function pascalCase(str: string) {
  return `-${str}`.replace(/-\w/g, c => c[1]?.toUpperCase() ?? '')
}

// Load component from blocks or examples based on type
// NOTE: factory runs lazily; we must wait for `data` to load so isBlock.value is accurate
const Component = defineAsyncComponent(() => {
  if (isBlock.value) {
    return import(`@/registry/bases/${base}/blocks/${name}.vue`).then((mod) => {
      if (!mod.default)
        throw new Error(`No default export in block: ${name}`)
      return mod.default
    })
  }
  // Examples have folder structure: examples/{name}/{PascalCaseName}.vue
  const exampleName = name.replace('-example', '')
  return import(`@/registry/bases/${base}/examples/${exampleName}/${pascalCase(name)}.vue`).then((mod) => {
    if (!mod.default)
      throw new Error(`No default export in example: ${name}`)
    return mod.default
  })
})

definePageMeta({
  layout: 'blank',
  ssr: false,
})
</script>

<template>
  <div v-if="isReady && isMounted && data" class="relative">
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
