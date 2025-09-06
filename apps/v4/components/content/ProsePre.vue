<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { getIconForLanguageExtension } from '@/components/Icons'
import { cn } from '~/lib/utils'

const props = defineProps<{
  code: string
  language: string
  filename?: string
  highlights?: number[]
  meta?: string
  class?: HTMLAttributes['class']
  unwrap?: boolean
}>()

const npmBlock = ['npm install', 'npm create', 'npm run', 'npx']
const isNpmCommand = computed(() => npmBlock.some(s => props.code.startsWith(s)))
const isShowingLineNumber = computed(() => props.meta?.includes('showLineNumbers'))

const title = computed(() => props.filename || props.meta?.match(/title="([^"]+)"/)?.[1])

const lang = computed(() => props.language.replace('language-', ''))
const IconExtension = computed(() => {
  return getIconForLanguageExtension(lang.value)
})

const highlighter = await getShikiHighlighter()
const highlighted = highlighter.highlight(props.code.trimEnd(), { lang: lang.value, transformers: [
  {
    name: 'stripe-wrapper',
    root(node) {
      const pre = node.children.find(child => child.type === 'element' && child.tagName === 'pre')
      if (pre?.type === 'element') {
        const code = pre.children.find(child => child.type === 'element' && child.tagName === 'code')
        if (code?.type === 'element') {
          node.children = code.children
        }
      }
    },
  },
  {
    name: 'modify-lines',
    line(node) {
      node.properties.class = undefined
      node.properties['data-line'] = ''
    },
  },
  {
    name: 'highlight-line-inline',
    line(node, line, ...a) {
      if (props.highlights?.includes(line))
        node.properties['data-highlighted-line'] = ''
    },
    // TODO: implement `data-highlighted-chars`
    tokens(tokens) {},
  },
] })

const codeAttributes = computed(() => isShowingLineNumber.value
  ? ({
      'data-line-numbers': '',
      'data-line-numbers-max-digits': 2,
    })
  : undefined)
</script>

<template>
  <pre v-if="unwrap" :class="cn('no-scrollbar min-w-0 overflow-x-auto px-4 py-3.5 outline-none has-[[data-highlighted-line]]:px-0 has-[[data-line-numbers]]:px-0 has-[[data-slot=tabs]]:p-0 !bg-transparent', props.class)" :data-language="lang"><code v-bind="codeAttributes" v-html="highlighted" /></pre>
  <figure v-else data-pretty-code-figure>
    <pre v-if="isNpmCommand" :class="cn('no-scrollbar min-w-0 overflow-x-auto px-4 py-3.5 outline-none has-[[data-highlighted-line]]:px-0 has-[[data-line-numbers]]:px-0 has-[[data-slot=tabs]]:p-0', props.class)"><CodeBlockCommand :code /></pre>

    <template v-else-if="title">
      <figcaption data-pretty-code-title :data-language="lang" class="text-code-foreground [&_svg]:text-code-foreground flex items-center gap-2 [&_svg]:size-4 [&_svg]:opacity-70">
        <component :is="IconExtension" v-if="IconExtension" />
        {{ title }}
      </figcaption>
      <pre :data-language="lang" :class="cn('no-scrollbar min-w-0 overflow-x-auto px-4 py-3.5 outline-none has-[[data-highlighted-line]]:px-0 has-[[data-line-numbers]]:px-0 has-[[data-slot=tabs]]:p-0', props.class)"><CopyButton :value="code" /><code v-bind="codeAttributes" v-html="highlighted" /></pre>
    </template>

    <pre v-else :data-language="lang" :class="cn('no-scrollbar min-w-0 overflow-x-auto px-4 py-3.5 outline-none has-[[data-highlighted-line]]:px-0 has-[[data-line-numbers]]:px-0 has-[[data-slot=tabs]]:p-0', props.class)"><CopyButton :value="code" /><code v-bind="codeAttributes" v-html="highlighted" /></pre>
  </figure>
</template>
