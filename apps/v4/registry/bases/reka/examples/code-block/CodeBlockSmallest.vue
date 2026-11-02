<script setup lang="ts">
import { Example } from "@/registry/bases/reka/components/example"
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockTitle,
} from "@/registry/bases/reka/ui/code-block"
import Highlighted from "./Highlighted.vue"
</script>

<template>
  <Example title="Single Line and Empty">
    <div class="flex flex-col gap-4">
      <CodeBlock>
        <CodeBlockHeader>
          <CodeBlockTitle>Install</CodeBlockTitle>
          <CodeBlockActions>
            <CodeBlockCopyButton value="pnpm dlx shadcn-vue@latest add code-block" />
          </CodeBlockActions>
        </CodeBlockHeader>
        <Highlighted
          code="pnpm dlx shadcn-vue@latest add code-block"
          language="bash"
        />
      </CodeBlock>
      <CodeBlock>
        <CodeBlockHeader>
          <CodeBlockTitle>output.log</CodeBlockTitle>
        </CodeBlockHeader>
        <CodeBlockContent>{{ "" }}</CodeBlockContent>
      </CodeBlock>
      <CodeBlock>
        <Highlighted code="pnpm dev" language="bash" />
      </CodeBlock>
    </div>
  </Example>
</template>
