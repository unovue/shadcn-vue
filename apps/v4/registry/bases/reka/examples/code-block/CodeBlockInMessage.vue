<script setup lang="ts">
import { Example } from "@/registry/bases/reka/components/example"
import { Bubble, BubbleContent } from "@/registry/bases/reka/ui/bubble"
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockTitle,
} from "@/registry/bases/reka/ui/code-block"
import { Message, MessageContent } from "@/registry/bases/reka/ui/message"
import { source } from "./data"
import Highlighted from "./Highlighted.vue"
</script>

<template>
  <Example title="Chat Answer">
    <div class="flex flex-col gap-4 text-sm">
      <Message align="end">
        <MessageContent>
          <Bubble>
            <BubbleContent>How do I stream a response?</BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
      <Message>
        <MessageContent class="gap-3">
          <p>Create a server route that returns the stream:</p>
          <CodeBlock>
            <CodeBlockHeader>
              <CodeBlockTitle>server/api/chat.post.ts</CodeBlockTitle>
              <CodeBlockActions>
                <CodeBlockCopyButton :value="source" />
              </CodeBlockActions>
            </CodeBlockHeader>
            <Highlighted :code="source" language="ts" />
          </CodeBlock>
          <p>The client reads it with the Chat class.</p>
        </MessageContent>
      </Message>
    </div>
  </Example>
</template>
