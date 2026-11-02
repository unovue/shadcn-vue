<script setup lang="ts">
import type { ElementNode } from '@comark/vue'
import type { ComputedRef } from 'vue'
import { computed, inject } from 'vue'
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockLine,
  CodeBlockTitle,
  CodeBlockToken,
  useHighlightedCode,
} from '@/registry/bases/reka/ui/code-block'

const props = defineProps<{
  language?: string
  // The raw `pre` node. Comark passes it to components that declare it.
  // eslint-disable-next-line vue/prop-name-casing
  __node?: ElementNode
}>()

// ['pre', props, ['code', props, text]]
const code = computed(() => {
  const child = props.__node?.[2]
  return Array.isArray(child) && typeof child[2] === 'string' ? child[2] : ''
})
const language = computed(() => props.language ?? '')

// True while the closing fence has not arrived yet.
// Markdown provides the code of the trailing fence while it is still open.
const openFence = inject<ComputedRef<string | null> | null>('markdown-open-fence', null)
const incomplete = computed(() => {
  const value = openFence?.value
  return value != null && value.trimEnd() === code.value.trimEnd()
})

const lines = useHighlightedCode(code, language)
</script>

<template>
  <CodeBlock>
    <CodeBlockHeader>
      <CodeBlockTitle>{{ language || 'text' }}</CodeBlockTitle>
      <CodeBlockActions>
        <CodeBlockCopyButton :value="code" :disabled="incomplete" />
      </CodeBlockActions>
    </CodeBlockHeader>
    <CodeBlockContent line-numbers>
      <CodeBlockLine v-for="(line, index) in lines" :key="index">
        <CodeBlockToken v-for="(token, i) in line" :key="i" :token="token" />
      </CodeBlockLine>
    </CodeBlockContent>
  </CodeBlock>
</template>
