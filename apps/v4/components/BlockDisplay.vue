<script setup lang="ts">
import { cn } from '~/lib/utils'

const props = defineProps<{
  name: string
}>()

const { data } = await useFetch(() => `/api/block/${props.name}`)
</script>

<template>
  <BlockViewer v-if="data?.item" :item="data.item" :tree="data.tree" :highlighted-files="data.highlightedFiles">
    <ComponentPreview
      :name="name"
      hide-code
      :class="cn(
        'my-0 **:[.preview]:h-auto **:[.preview]:p-4 **:[.preview>.p-6]:p-0',
        // item.meta?.containerClassName
      )"
    />
  </BlockViewer>
</template>
