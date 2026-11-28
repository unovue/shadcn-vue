<script setup lang="ts">
import { Example } from "@/registry/bases/vase/components/example"
import { CodeBlock, CodeBlockContent } from "@/registry/bases/vase/ui/code-block"
</script>

<template>
  <Example title="Empty">
    <CodeBlock>
      <CodeBlockContent>{{ "" }}</CodeBlockContent>
    </CodeBlock>
  </Example>
</template>
