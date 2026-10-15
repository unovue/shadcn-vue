<script setup lang="ts">
import { Example } from "@/registry/bases/reka/components/example"
import { CodeBlock, CodeBlockContent } from "@/registry/bases/reka/ui/code-block"
</script>

<template>
  <Example title="Empty">
    <CodeBlock>
      <CodeBlockContent>{{ "" }}</CodeBlockContent>
    </CodeBlock>
  </Example>
</template>
