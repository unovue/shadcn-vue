<script setup lang="ts">
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockTitle,
} from '@/registry/bases/reka/ui/code-block'

const error = `TypeError: Cannot read properties of undefined (reading 'map')
    at setup (components/MessageList.vue:18:22)
    at callWithErrorHandling (runtime-core.esm-bundler.js:199:19)`
</script>

<template>
  <div class="w-full max-w-md">
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
  </div>
</template>
