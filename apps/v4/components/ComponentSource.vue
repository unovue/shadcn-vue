<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { fixImport } from '~/lib/registry-utils'
import { cn } from '~/lib/utils'
import { getIconForLanguageExtension } from './Icons'

const props = withDefaults(defineProps<{
  name?: string
  // src?: string
  title?: string
  language?: string
  collapsible?: boolean
  class?: HTMLAttributes['class']
  chromeLessOnMobile?: boolean
}>(), {
  language: 'vue',
  collapsible: true,
})

const code = fixImport((await import(`@/components/demo/${props.name}.${props.language}?raw`)).default)
</script>

<template>
  <div v-if="!collapsible" :class="cn('relative', props.class)">
    <ProsePre :code :language meta="'showLineNumbers'" :title />
  </div>
  <CodeCollapsibleWrapper v-else :class="props.class">
    <figure data-pretty-code-figure="" class="[&>pre]:max-h-96">
      <figcaption
        v-if="title"
        data-pretty-code-title=""
        class="text-code-foreground [&_svg]:text-code-foreground flex items-center gap-2 [&_svg]:size-4 [&_svg]:opacity-70"
        :data-language="language"
      >
        <component :is="getIconForLanguageExtension(language)" />
        {{ title }}
      </figcaption>
      <CopyButton :value="code" />
      <div>
        <ProsePre unwrap :code :language meta="'showLineNumbers'" :title />
      </div>
    </figure>
  </CodeCollapsibleWrapper>
</template>
