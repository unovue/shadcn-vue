<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

const props = defineProps<{
  name: string
  align?: 'center' | 'start' | 'end'
  description?: string
  hideCode?: boolean
  type?: 'block' | 'component' | 'example'
  class?: HTMLAttributes['class']
}>()

const Component = props.type === 'block'
  ? defineAsyncComponent({
      loader: () => import(`@/registry/new-york-v4/blocks/${props.name}/page.vue`),
    })
  : props.name.toLowerCase().includes('chart') && !props.name.toLocaleLowerCase().includes('demo')
    ? defineAsyncComponent({
        loader: () => import(`@/registry/new-york-v4/charts/${props.name}.vue`),
      })
    : defineAsyncComponent({
        loader: () => import(`@/components/demo/${props.name}.vue`),
      })
</script>

<template>
  <p v-if="!Component" class="text-muted-foreground text-sm">
    Component
    <code class="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm">
      {{ name }}
    </code>
    not found in registry.
  </p>

  <div v-else-if="type === 'block'" class="relative aspect-[4/2.5] w-full overflow-hidden rounded-md border md:-mx-1">
    <img
      :src="`/r/styles/new-york-v4/${name}-light.png`"
      :alt="name"
      width="1440"
      height="900"
      class="bg-background absolute top-0 left-0 z-20 w-[970px] max-w-none sm:w-[1280px] md:hidden dark:hidden md:dark:hidden"
    >
    <img
      :src="`/r/styles/new-york-v4/${name}-dark.png`"
      :alt="name"
      :width="1440"
      :height="900"
      class="bg-background absolute top-0 left-0 z-20 hidden w-[970px] max-w-none sm:w-[1280px] md:hidden dark:block md:dark:hidden"
    >
    <div class="bg-background absolute inset-0 hidden w-[1600px] md:block">
      <iframe :src="`/view/${name}`" class="size-full" />
    </div>
  </div>

  <ComponentPreviewTabs
    v-else
    :class="props.class"
    :align
    :hide-code
    :component="Component"
  >
    <ComponentSource v-if="!hideCode" :name :collapsible="false" />
  </ComponentPreviewTabs>
</template>
