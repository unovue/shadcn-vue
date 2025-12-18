<script setup lang="ts">
import { useMounted } from '@vueuse/core'

const route = useRoute()
const params = useDesignSystemSearchParams()
const isMounted = useMounted()
const { isReady } = useDesignSystemProvider()

// console.log(route, params)

const name = route.params.name?.toString() ?? ''
function pascalCase(str: string) {
  return `-${str}`.replace(/-\w/g, c => c[1]?.toUpperCase() ?? '')
}
const Component = defineAsyncComponent(() =>
  import(`@/registry/bases/${route.params.base}/examples/${name.replace('-example', '')}/${pascalCase(name)}.vue`).then(mod => mod.default),
)

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
