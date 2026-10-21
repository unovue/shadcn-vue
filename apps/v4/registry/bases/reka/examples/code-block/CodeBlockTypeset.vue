<script setup lang="ts">
import IconPlaceholder from "@/components/IconPlaceholder.vue"
import { Example } from "@/registry/bases/reka/components/example"
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
} from "@/registry/bases/reka/ui/code-block"
import { source } from "./data"

const lines = useHighlightedCode(source, "ts")
const command = useHighlightedCode("pnpm add ai @ai-sdk/vue zod", "bash")
</script>

<template>
  <Example title="Typeset">
    <div class="typeset max-w-2xl">
      <h3>Stream a response</h3>
      <p>
        Create a server route that calls <code>streamText</code> and returns
        the stream to the client. The <code>Chat</code> class reads it on
        the other side.
      </p>
      <CodeBlock>
        <CodeBlockHeader>
          <CodeBlockTitle>
            <IconPlaceholder
              lucide="FileCodeIcon"
              tabler="IconFileCode"
              hugeicons="CodeIcon"
              phosphor="FileCodeIcon"
              remixicon="RiFileCodeLine"
            />
            server/api/chat.post.ts
          </CodeBlockTitle>
          <CodeBlockActions>
            <CodeBlockCopyButton :value="source" />
          </CodeBlockActions>
        </CodeBlockHeader>
        <CodeBlockContent line-numbers>
          <CodeBlockLine v-for="(line, index) in lines" :key="index">
            <CodeBlockToken v-for="(token, i) in line" :key="i" :token="token" />
          </CodeBlockLine>
        </CodeBlockContent>
      </CodeBlock>
      <p>Then install the packages the route uses.</p>
      <CodeBlock>
        <CodeBlockContent>
          <CodeBlockLine v-for="(line, index) in command" :key="index">
            <CodeBlockToken v-for="(token, i) in line" :key="i" :token="token" />
          </CodeBlockLine>
        </CodeBlockContent>
      </CodeBlock>
      <p>
        The model streams text parts as they arrive, so the answer renders
        while it is written.
      </p>
    </div>
  </Example>
</template>
