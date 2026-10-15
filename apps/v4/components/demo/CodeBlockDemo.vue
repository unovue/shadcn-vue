<script setup lang="ts">
import { DownloadIcon, FileCodeIcon, WrapTextIcon } from '@lucide/vue'
import { ref } from 'vue'
import { Button } from '@/registry/bases/reka/ui/button'
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

const code = `import { streamText } from "ai"

export default defineEventHandler(async (event) => {
  const { messages } = await readBody(event)

  const result = streamText({
    model: "anthropic/claude-sonnet-4.5",
    system: "You are a helpful assistant. Answer in one short paragraph.",
    messages,
  })

  return result.toUIMessageStreamResponse()
})`

const wrap = ref(false)
const lines = useHighlightedCode(code, 'ts')

function download(value: string, filename: string) {
  const url = URL.createObjectURL(new Blob([value], { type: 'text/plain' }))
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
}
</script>

<template>
  <div class="w-full max-w-lg">
    <CodeBlock>
      <CodeBlockHeader>
        <CodeBlockTitle>
          <FileCodeIcon />
          server/api/chat.post.ts
        </CodeBlockTitle>
        <CodeBlockActions>
          <Button
            variant="ghost"
            size="icon-xs"
            aria-label="Wrap lines"
            :aria-pressed="wrap"
            class="aria-pressed:text-foreground"
            @click="wrap = !wrap"
          >
            <WrapTextIcon />
          </Button>
          <Button
            variant="ghost"
            size="icon-xs"
            aria-label="Download"
            @click="download(code, 'chat.post.ts')"
          >
            <DownloadIcon />
          </Button>
          <CodeBlockCopyButton :value="code" />
        </CodeBlockActions>
      </CodeBlockHeader>
      <CodeBlockContent :wrap="wrap" line-numbers>
        <CodeBlockLine
          v-for="(line, index) in lines"
          :key="index"
          :variant="index >= 5 && index <= 9 ? 'highlighted' : 'default'"
        >
          <CodeBlockToken v-for="(token, i) in line" :key="i" :token="token" />
        </CodeBlockLine>
      </CodeBlockContent>
    </CodeBlock>
  </div>
</template>
