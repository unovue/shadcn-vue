<script setup lang="ts">
import type { StreamedBlock } from "./data"
import { computed } from "vue"
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

const props = defineProps<{
  block: StreamedBlock
  code: string
}>()

const rows = computed(() => props.code.split("\n"))
const text = computed(() =>
  props.block.diff ? rows.value.map(row => row.slice(1)).join("\n") : props.code,
)
const lines = useHighlightedCode(text, () => props.block.language)

function getVariant(index: number) {
  if (props.block.diff) {
    const row = rows.value[index]
    if (row?.startsWith("+"))
      return "added"
    if (row?.startsWith("-"))
      return "removed"
    return "default"
  }

  return props.block.highlight?.includes(index) ? "highlighted" : "default"
}
</script>

<template>
  <CodeBlock>
    <CodeBlockHeader v-if="block.title">
      <CodeBlockTitle>{{ block.title }}</CodeBlockTitle>
      <CodeBlockActions>
        <CodeBlockCopyButton
          :value="text"
          :disabled="code.length < block.code.length"
        />
      </CodeBlockActions>
    </CodeBlockHeader>
    <CodeBlockContent :line-numbers="block.lineNumbers">
      <CodeBlockLine
        v-for="(line, index) in lines"
        :key="index"
        :variant="getVariant(index)"
      >
        <CodeBlockToken v-for="(token, i) in line" :key="i" :token="token" />
      </CodeBlockLine>
    </CodeBlockContent>
  </CodeBlock>
</template>
