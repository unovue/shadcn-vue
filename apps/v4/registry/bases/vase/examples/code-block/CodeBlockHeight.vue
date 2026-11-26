<script setup lang="ts">
import { Example } from "@/registry/bases/vase/components/example"
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockTitle,
} from "@/registry/bases/vase/ui/code-block"
import { log } from "./data"
</script>

<template>
  <Example title="Height">
    <CodeBlock>
      <CodeBlockHeader>
        <CodeBlockTitle>Logs</CodeBlockTitle>
        <CodeBlockActions>
          <CodeBlockCopyButton :value="log" />
        </CodeBlockActions>
      </CodeBlockHeader>
      <CodeBlockContent class="max-h-48 scroll-fade-y">
        {{ log }}
      </CodeBlockContent>
    </CodeBlock>
  </Example>
</template>
