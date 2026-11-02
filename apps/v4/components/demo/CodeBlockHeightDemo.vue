<script setup lang="ts">
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockTitle,
} from '@/registry/bases/reka/ui/code-block'

const logs = Array.from(
  { length: 40 },
  (_, index) =>
    `[${String(index + 1).padStart(2, '0')}] GET /api/chat 200 in ${12 + ((index * 7) % 40)}ms`,
).join('\n')
</script>

<template>
  <div class="w-full max-w-md">
    <CodeBlock>
      <CodeBlockHeader>
        <CodeBlockTitle>Logs</CodeBlockTitle>
        <CodeBlockActions>
          <CodeBlockCopyButton :value="logs" />
        </CodeBlockActions>
      </CodeBlockHeader>
      <CodeBlockContent class="max-h-48 scroll-fade-y">
        {{ logs }}
      </CodeBlockContent>
    </CodeBlock>
  </div>
</template>
