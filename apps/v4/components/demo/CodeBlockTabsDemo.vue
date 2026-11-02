<script setup lang="ts">
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/registry/bases/reka/ui/tabs'

const files = [
  {
    id: 'route',
    title: 'server/api/chat.post.ts',
    language: 'ts',
    code: `import { streamText } from "ai"

export default defineEventHandler(async (event) => {
  const { messages } = await readBody(event)
  const result = streamText({ model: "anthropic/claude-sonnet-4.5", messages })

  return result.toUIMessageStreamResponse()
})`,
  },
  {
    id: 'chat',
    title: 'components/Chat.vue',
    language: 'vue',
    code: `<script setup lang="ts">
import { Chat } from "@ai-sdk/vue"

const chat = new Chat({})
<\/script>

<template>
  <MessageList :messages="chat.messages" />
</template>`,
  },
  {
    id: 'env',
    title: '.env',
    language: 'bash',
    code: 'AI_GATEWAY_API_KEY=your-api-key',
  },
]

const highlighted = files.map(file => useHighlightedCode(file.code, file.language))
</script>

<template>
  <Tabs default-value="route" class="w-full max-w-md">
    <TabsList>
      <TabsTrigger v-for="file in files" :key="file.id" :value="file.id">
        {{ file.title.split('/').at(-1) }}
      </TabsTrigger>
    </TabsList>
    <TabsContent v-for="(file, index) in files" :key="file.id" :value="file.id">
      <CodeBlock>
        <CodeBlockHeader>
          <CodeBlockTitle>{{ file.title }}</CodeBlockTitle>
          <CodeBlockActions>
            <CodeBlockCopyButton :value="file.code" />
          </CodeBlockActions>
        </CodeBlockHeader>
        <CodeBlockContent line-numbers>
          <CodeBlockLine v-for="(line, i) in highlighted[index]?.value" :key="i">
            <CodeBlockToken v-for="(token, j) in line" :key="j" :token="token" />
          </CodeBlockLine>
        </CodeBlockContent>
      </CodeBlock>
    </TabsContent>
  </Tabs>
</template>
