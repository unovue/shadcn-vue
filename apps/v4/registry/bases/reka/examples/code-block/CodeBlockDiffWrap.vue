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
import { longDiff } from "./data"

const lines = useHighlightedCode(
  longDiff.map(line => line.text).join("\n"),
  "ts",
)
</script>

<template>
  <Example title="Diff, Wrap and Highlighting">
    <CodeBlock>
      <CodeBlockHeader>
        <CodeBlockTitle>server/api/projects.get.ts</CodeBlockTitle>
      </CodeBlockHeader>
      <CodeBlockContent wrap line-numbers :start-line="12">
        <CodeBlockLine
          v-for="(line, index) in lines"
          :key="index"
          :variant="longDiff[index]?.variant"
        >
          <CodeBlockToken v-for="(token, i) in line" :key="i" :token="token" />
        </CodeBlockLine>
      </CodeBlockContent>
    </CodeBlock>
  </Example>
</template>
