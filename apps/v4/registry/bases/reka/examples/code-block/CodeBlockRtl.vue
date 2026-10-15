<script setup lang="ts">
import { Example } from "@/registry/bases/reka/components/example"
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockTitle,
} from "@/registry/bases/reka/ui/code-block"
import { source } from "./data"
import Highlighted from "./Highlighted.vue"
</script>

<template>
  <Example title="RTL">
    <div dir="rtl" class="flex flex-col gap-3 text-sm">
      <p>أنشئ ملف المسار وأعد البث إلى العميل.</p>
      <CodeBlock>
        <CodeBlockHeader>
          <CodeBlockTitle>server/api/chat.post.ts</CodeBlockTitle>
          <CodeBlockActions>
            <CodeBlockCopyButton :value="source" />
          </CodeBlockActions>
        </CodeBlockHeader>
        <Highlighted :code="source" language="ts" line-numbers />
      </CodeBlock>
    </div>
  </Example>
</template>
