<script setup lang="ts">
import type { FunctionalComponent, HTMLAttributes } from 'vue'
import { Markdown as Comark } from '@comark/vue'
import { computed, h, provide } from 'vue'
import { cn } from '@/lib/utils'
import MarkdownCodeBlock from './MarkdownCodeBlock.vue'

const props = withDefaults(defineProps<{
  value?: string
  streaming?: boolean
  components?: Record<string, any>
  class?: HTMLAttributes['class']
}>(), {
  value: '',
  streaming: false,
})

// Fenced code renders as a CodeBlock (see MarkdownCodeBlock). Comark does not
// run components inside `pre`, so `code` only matches inline code.
const MarkdownCode: FunctionalComponent = (_, { slots }) =>
  h('code', { class: 'rounded-sm bg-muted px-1 py-0.5 font-mono text-[0.9em]' }, slots.default?.())

// Comark matches components by tag name.
const DEFAULT_COMPONENTS = {
  pre: MarkdownCodeBlock,
  code: MarkdownCode,
}

const components = computed(() => ({ ...DEFAULT_COMPONENTS, ...props.components }))

// Comark closes an unfinished fence while streaming, but does not say so. The
// trailing fence is still open when an odd number of lines start with ```.
// Provide its code so MarkdownCodeBlock can disable the copy button.
const openFence = computed(() => {
  if (!props.streaming)
    return null

  const lines = props.value.trim().split('\n')
  const fences = lines.flatMap((line, index) => (line.startsWith('```') ? [index] : []))

  if (fences.length % 2 === 0)
    return null

  return lines.slice(fences.at(-1)! + 1).join('\n')
})

provide('markdown-open-fence', openFence)
</script>

<template>
  <Comark
    data-slot="markdown"
    :value="value"
    :streaming="streaming"
    :components="components"
    :class="cn('typeset w-full min-w-0 overflow-hidden', props.class)"
  />
</template>
