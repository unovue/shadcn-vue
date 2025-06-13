<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '~/lib/utils'

const props = withDefaults(defineProps<{
  name?: string
  // src?: string
  title?: string
  language?: string
  collapsible?: boolean
  class?: HTMLAttributes['class']
}>(), {
  language: 'vue',
})

const code = (await import(`@/components/demo/${props.name}.${props.language}?raw`)).default
</script>

<template>
  <div v-if="!collapsible" :class="cn('relative', props.class)">
    <ProsePre :code :language meta="'showLineNumbers'" :title />
  </div>
  <CodeCollapsibleWrapper :class="props.class">
    <ProsePre :code :language meta="'showLineNumbers'" :title />
  </CodeCollapsibleWrapper>
</template>
