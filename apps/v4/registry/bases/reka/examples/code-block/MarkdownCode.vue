<script setup lang="ts">
import { computed, inject } from "vue"
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
} from "@/registry/bases/reka/ui/code-block"
import { markdownStreamKey } from "./data"

// Rendered by Comark for fenced code blocks. The raw node is
// ["pre", { language }, ["code", { class }, code]].
const props = defineProps<{
  language?: string
  // eslint-disable-next-line vue/prop-name-casing
  __node?: unknown[]
}>()

const stream = inject(markdownStreamKey, undefined)

const code = computed(() => {
  const child = props.__node?.[2]
  return Array.isArray(child) && typeof child[2] === "string" ? child[2] : ""
})

// The last fence is still open while it has no closing line.
const incomplete = computed(() => {
  if (!stream?.streaming.value)
    return false
  const text = stream.text.value
  const fences = text.split("\n").filter(line => line.startsWith("```")).length
  return fences % 2 === 1 && text.trimEnd().endsWith(code.value.trimEnd())
})

const lines = useHighlightedCode(code, () => props.language ?? "")
</script>

<template>
  <CodeBlock class="my-3">
    <CodeBlockHeader>
      <CodeBlockTitle>{{ language || "text" }}</CodeBlockTitle>
      <CodeBlockActions>
        <CodeBlockCopyButton :value="code" :disabled="incomplete" />
      </CodeBlockActions>
    </CodeBlockHeader>
    <CodeBlockContent>
      <CodeBlockLine v-for="(line, index) in lines" :key="index">
        <CodeBlockToken v-for="(token, i) in line" :key="i" :token="token" />
      </CodeBlockLine>
    </CodeBlockContent>
  </CodeBlock>
</template>
