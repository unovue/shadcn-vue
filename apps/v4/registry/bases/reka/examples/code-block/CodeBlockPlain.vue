<script setup lang="ts">
import { Example } from "@/registry/bases/reka/components/example"
import { CodeBlock, CodeBlockContent } from "@/registry/bases/reka/ui/code-block"
import { build } from "./data"
</script>

<template>
  <Example title="Plain">
    <CodeBlock>
      <CodeBlockContent>{{ build }}</CodeBlockContent>
    </CodeBlock>
  </Example>
</template>
