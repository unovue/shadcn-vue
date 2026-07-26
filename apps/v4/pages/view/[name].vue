<script setup lang="ts">
import { cn } from '~/lib/utils'

const { params } = useRoute()
const Component = defineAsyncComponent({
  loader: () => import(`@/registry/new-york-v4/blocks/${params.name}/page.vue`),
})
const { data } = await useFetch(() => `/api/block/${params.name}`)

definePageMeta({
  layout: 'blank',
})
</script>

<template>
  <div :class="cn('bg-background', (data?.item?.meta as any)?.container ?? '')">
    <component :is="Component" />
  </div>
</template>
