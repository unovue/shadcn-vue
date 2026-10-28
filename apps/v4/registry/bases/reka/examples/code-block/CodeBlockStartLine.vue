<script setup lang="ts">
import { Example } from "@/registry/bases/reka/components/example"
import { CodeBlock, CodeBlockHeader, CodeBlockTitle } from "@/registry/bases/reka/ui/code-block"
import { middle } from "./data"
import Highlighted from "./Highlighted.vue"
</script>

<template>
  <Example title="Start Line">
    <CodeBlock>
      <CodeBlockHeader>
        <CodeBlockTitle>server/api/projects.get.ts</CodeBlockTitle>
      </CodeBlockHeader>
      <Highlighted :code="middle" language="ts" line-numbers :start-line="995" />
    </CodeBlock>
  </Example>
</template>
