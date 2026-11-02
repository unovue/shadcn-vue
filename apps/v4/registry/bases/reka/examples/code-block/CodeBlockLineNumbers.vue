<script setup lang="ts">
import { Example } from "@/registry/bases/reka/components/example"
import {
  CodeBlock,
  CodeBlockContent,
  CodeBlockLine,
  CodeBlockToken,
  useHighlightedCode,
} from "@/registry/bases/reka/ui/code-block"
import { source } from "./data"

const lines = useHighlightedCode(source, "ts")
</script>

<template>
  <Example title="Line Numbers">
    <CodeBlock>
      <CodeBlockContent line-numbers>
        <CodeBlockLine v-for="(line, index) in lines" :key="index">
          <CodeBlockToken v-for="(token, i) in line" :key="i" :token="token" />
        </CodeBlockLine>
      </CodeBlockContent>
    </CodeBlock>
  </Example>
</template>
