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
import { error } from "./data"
</script>

<template>
  <Example title="Destructive">
    <CodeBlock variant="destructive">
      <CodeBlockHeader>
        <CodeBlockTitle>Error</CodeBlockTitle>
        <CodeBlockActions>
          <CodeBlockCopyButton :value="error" />
        </CodeBlockActions>
      </CodeBlockHeader>
      <CodeBlockContent wrap>
        {{ error }}
      </CodeBlockContent>
    </CodeBlock>
  </Example>
</template>
