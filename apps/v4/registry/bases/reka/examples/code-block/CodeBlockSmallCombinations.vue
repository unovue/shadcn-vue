<script setup lang="ts">
import { Example } from "@/registry/bases/reka/components/example"
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
import { diff, source } from "./data"
import Highlighted from "./Highlighted.vue"

const lines = useHighlightedCode(
  diff.map(line => line.text).join("\n"),
  "vue",
)
</script>

<template>
  <Example title="Small Combinations">
    <div class="flex flex-col gap-4">
      <CodeBlock size="sm">
        <CodeBlockHeader>
          <CodeBlockTitle>components/Greeting.vue</CodeBlockTitle>
          <CodeBlockActions>
            <CodeBlockCopyButton :value="source" />
          </CodeBlockActions>
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
      <CodeBlock size="sm">
        <Highlighted
          :code="source"
          language="ts"
          line-numbers
          :start-line="995"
        />
      </CodeBlock>
    </div>
  </Example>
</template>
