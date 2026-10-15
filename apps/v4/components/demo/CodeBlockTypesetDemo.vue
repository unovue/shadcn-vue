<script setup lang="ts">
import { FileCodeIcon } from '@lucide/vue'
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
  const result = streamText({ model: "anthropic/claude-sonnet-4.5", messages })

  return result.toUIMessageStreamResponse()
})`

const lines = useHighlightedCode(code, 'ts')
</script>

<template>
  <div class="typeset w-full max-w-md">
    <h3>Stream a response</h3>
    <p>
      Create a server route that calls <code>streamText</code> and returns
      the stream to the client.
    </p>
    <CodeBlock>
      <CodeBlockHeader>
        <CodeBlockTitle>
          <FileCodeIcon />
          server/api/chat.post.ts
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
    <p>
      The <code>Chat</code> class from <code>@ai-sdk/vue</code> reads the
      stream on the client and renders the answer while it is written.
    </p>
  </div>
</template>
