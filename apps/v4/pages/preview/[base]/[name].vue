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

// Load component from blocks or examples based on type
// NOTE: factory runs lazily; we must wait for `data` to load so isBlock.value is accurate
const Component = defineAsyncComponent(() => {
  if (isBlock.value) {
    const isPreview = name.includes('preview')
    if (isPreview) {
      return import(`@/registry/bases/${base}/blocks/${name}/page.vue`).then((mod) => {
        if (!mod.default)
          throw new Error(`No default export in block: ${name}`)
        return mod.default
      })
    }
    else {
      return import(`@/registry/bases/${base}/blocks/${name}.vue`).then((mod) => {
        if (!mod.default)
          throw new Error(`No default export in block: ${name}`)
        return mod.default
      })
    }
  }
  // Examples have folder structure: examples/{name}/{File}.vue. The registry item lists the files of the folder,
  // and the file name keeps the capitals of an acronym (input-otp-example is InputOTPExample.vue).
  const exampleName = name.replace('-example', '')
  const exampleFile = registryItem.value?.files
    ?.map(file => file.path.split('/').pop()?.replace('.vue', ''))
    .find(file => file?.toLowerCase() === name.replaceAll('-', ''))
  return import(`@/registry/bases/${base}/examples/${exampleName}/${exampleFile}.vue`).then((mod) => {
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
