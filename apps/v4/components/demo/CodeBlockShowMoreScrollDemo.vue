<script setup lang="ts">
import { ChevronDownIcon } from '@lucide/vue'
import { ref, useId } from 'vue'
import { Button } from '@/registry/bases/reka/ui/button'
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockFooter,
  CodeBlockHeader,
  CodeBlockLine,
  CodeBlockTitle,
  CodeBlockToken,
  useHighlightedCode,
} from '@/registry/bases/reka/ui/code-block'

const code = `<script setup lang="ts">
import { Chat } from "@ai-sdk/vue"
import { ref } from "vue"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const input = ref("")
const chat = new Chat({})

function onSubmit() {
  chat.sendMessage({ text: input.value })
  input.value = ""
}
<\/script>

<template>
  <div class="flex flex-col gap-4">
    <div v-for="message in chat.messages" :key="message.id">
      <template v-for="(part, index) in message.parts" :key="index">
        <p v-if="part.type === 'text'">
          {{ part.text }}
        </p>
      </template>
    </div>
    <form @submit.prevent="onSubmit">
      <Input v-model="input" />
      <Button :disabled="chat.status !== 'ready'">
        Send
      </Button>
    </form>
  </div>
</template>`

const expanded = ref(false)
const lines = useHighlightedCode(code, 'vue')
const id = useId()
</script>

<template>
  <div class="w-full max-w-md">
    <CodeBlock>
      <CodeBlockHeader>
        <CodeBlockTitle>components/Chat.vue</CodeBlockTitle>
        <CodeBlockActions>
          <CodeBlockCopyButton :value="code" />
        </CodeBlockActions>
      </CodeBlockHeader>
      <CodeBlockContent
        :id="id"
        line-numbers
        :class="expanded ? 'max-h-96 scroll-fade-y' : 'max-h-64 scroll-fade-y overflow-y-hidden'"
      >
        <CodeBlockLine v-for="(line, index) in lines" :key="index">
          <CodeBlockToken v-for="(token, i) in line" :key="i" :token="token" />
        </CodeBlockLine>
      </CodeBlockContent>
      <CodeBlockFooter class="justify-center">
        <Button
          variant="ghost"
          size="xs"
          :aria-expanded="expanded"
          :aria-controls="id"
          @click="expanded = !expanded"
        >
          <ChevronDownIcon class="transition-transform in-aria-expanded:rotate-180" />
          {{ expanded ? 'Show less' : 'Show more' }}
        </Button>
      </CodeBlockFooter>
    </CodeBlock>
  </div>
</template>
