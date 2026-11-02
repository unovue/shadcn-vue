<script setup lang="ts">
import { Example } from "@/registry/bases/reka/components/example"
import {
  CodeBlock,
  CodeBlockContent,
  CodeBlockHeader,
  CodeBlockLine,
  CodeBlockTitle,
  CodeBlockToken,
  useHighlightedCode,
} from "@/registry/bases/reka/ui/code-block"
import { diff } from "./data"

const lines = useHighlightedCode(
  diff.map(line => line.text).join("\n"),
  "vue",
)
</script>

<template>
  <Example title="Diff">
    <CodeBlock>
      <CodeBlockHeader>
        <CodeBlockTitle>components/Greeting.vue</CodeBlockTitle>
      </CodeBlockHeader>
      <CodeBlockContent line-numbers>
        <CodeBlockLine
          v-for="(line, index) in lines"
          :key="index"
          :variant="diff[index]?.variant"
        >
          <CodeBlockToken v-for="(token, i) in line" :key="i" :token="token" />
        </CodeBlockLine>
      </CodeBlockContent>
    </CodeBlock>
  </Example>
</template>
