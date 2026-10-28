<script setup lang="ts">
import { TerminalIcon } from '@lucide/vue'
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockLine,
  CodeBlockTitle,
  CodeBlockToken,
  useHighlightedCode,
} from '@/registry/bases/reka/ui/code-block'

const code = `pnpm add ai @ai-sdk/vue zod
pnpm dev`

const lines = useHighlightedCode(code, 'bash')
</script>

<template>
  <div class="flex w-full max-w-md flex-col gap-3 text-sm" dir="rtl">
    <p>ثبّت الحزم، ثم شغّل خادم التطوير.</p>
    <CodeBlock>
      <CodeBlockHeader>
        <CodeBlockTitle>
          <TerminalIcon />
          الطرفية
        </CodeBlockTitle>
        <CodeBlockActions>
          <CodeBlockCopyButton :value="code" />
        </CodeBlockActions>
      </CodeBlockHeader>
      <CodeBlockContent line-numbers>
        <CodeBlockLine v-for="(line, index) in lines" :key="index">
          <CodeBlockToken v-for="(token, i) in line" :key="i" :token="token" />
        </CodeBlockLine>
      </CodeBlockContent>
    </CodeBlock>
  </div>
</template>
