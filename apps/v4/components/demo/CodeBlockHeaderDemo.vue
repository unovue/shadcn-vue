<script setup lang="ts">
import { TerminalIcon } from '@lucide/vue'
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockTitle,
} from '@/registry/bases/reka/ui/code-block'

const command = 'pnpm add ai @ai-sdk/vue zod'

const output = `$ ${command}
Packages: +14
Progress: resolved 412, reused 398, downloaded 14, added 14, done
Done in 2.8s using pnpm v10.18.0`
</script>

<template>
  <div class="w-full max-w-md">
    <CodeBlock>
      <CodeBlockHeader>
        <CodeBlockTitle>
          <TerminalIcon />
          Terminal
        </CodeBlockTitle>
        <CodeBlockActions>
          <CodeBlockCopyButton :value="command" />
        </CodeBlockActions>
      </CodeBlockHeader>
      <CodeBlockContent>{{ output }}</CodeBlockContent>
    </CodeBlock>
  </div>
</template>
