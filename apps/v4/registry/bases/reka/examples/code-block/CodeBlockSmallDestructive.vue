<script setup lang="ts">
import { Example } from "@/registry/bases/reka/components/example"
import { CodeBlock, CodeBlockContent } from "@/registry/bases/reka/ui/code-block"
import { error } from "./data"
</script>

<template>
  <Example title="Small Destructive">
    <CodeBlock size="sm" variant="destructive">
      <CodeBlockContent wrap>
        {{ error }}
      </CodeBlockContent>
    </CodeBlock>
  </Example>
</template>
