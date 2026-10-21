<script setup lang="ts">
import { ChevronRightIcon, FileTextIcon } from '@lucide/vue'
import { promiseTimeout, tryOnScopeDispose } from '@vueuse/core'
import { computed, reactive, ref } from 'vue'
import { Bubble, BubbleContent } from '@/registry/bases/reka/ui/bubble'
import { Button } from '@/registry/bases/reka/ui/button'
import { CodeBlock, CodeBlockContent } from '@/registry/bases/reka/ui/code-block'
import { Message, MessageContent } from '@/registry/bases/reka/ui/message'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/registry/bases/reka/ui/sheet'
import {
  Trace,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from '@/registry/bases/reka/ui/trace'

interface ToolPart {
  type: 'tool-readFile'
  toolCallId: string
  state: 'input-available' | 'output-available'
  input: { path: string }
  output?: { path: string, content: string }
}

interface TextPart {
  type: 'text'
  text: string
}

interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  parts: (ToolPart | TextPart)[]
}

const PACKAGE_JSON = `{
  "name": "acme-chat",
  "private": true,
  "dependencies": {
    "@ai-sdk/vue": "^4.0.0",
    "ai": "^7.0.0",
    "nuxt": "^4.2.0"
  }
}`

const QUESTION = 'Which AI SDK version does this app use?'
const ANSWER = 'It uses ai 7 with @ai-sdk/vue 4.'

const messages = ref<ChatMessage[]>([])
const status = ref<'ready' | 'submitted' | 'streaming'>('ready')
const busy = computed(() => status.value !== 'ready')

// Unmounting bumps `run`, so a running script stops at its next wait.
let run = 0
tryOnScopeDispose(() => run++)

async function sleep(ms: number) {
  const id = run
  await promiseTimeout(ms)
  return id === run
}

async function streamInto(target: { text: string }, text: string, delayMs: number) {
  for (const chunk of text.match(/\S+\s*/g) ?? []) {
    target.text += chunk
    if (!(await sleep(delayMs)))
      return false
  }
  return true
}

function getText(message: ChatMessage) {
  return message.parts
    .filter((part): part is TextPart => part.type === 'text')
    .map(part => part.text)
    .join('')
}

function isStreaming(message: ChatMessage) {
  return busy.value && message === messages.value.at(-1)
}

async function send() {
  messages.value = [{ id: 'user', role: 'user', parts: [{ type: 'text', text: QUESTION }] }]
  status.value = 'submitted'
  if (!(await sleep(300)))
    return

  const message = reactive<ChatMessage>({ id: 'assistant', role: 'assistant', parts: [] })
  messages.value.push(message)
  status.value = 'streaming'

  const part = reactive<ToolPart>({
    type: 'tool-readFile',
    toolCallId: 'call-readFile',
    state: 'input-available',
    input: { path: 'package.json' },
  })
  message.parts.push(part)
  if (!(await sleep(900)))
    return
  part.output = { path: 'package.json', content: PACKAGE_JSON }
  part.state = 'output-available'

  const text = reactive<TextPart>({ type: 'text', text: '' })
  message.parts.push(text)
  if (!(await streamInto(text, ANSWER, 20)))
    return
  status.value = 'ready'
}

function reset() {
  messages.value = []
}
</script>

<template>
  <div class="flex min-h-72 w-full max-w-sm flex-col gap-4 py-6 text-sm">
    <template v-for="message in messages" :key="message.id">
      <Message v-if="message.role === 'user'" align="end">
        <MessageContent>
          <Bubble align="end" variant="muted">
            <BubbleContent>{{ getText(message) }}</BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
      <Message v-else>
        <MessageContent class="gap-4">
          <template v-for="(part, index) in message.parts" :key="index">
            <p v-if="part.type === 'text'">
              {{ part.text }}
            </p>
            <Trace v-else-if="part.state !== 'output-available'">
              <TraceLine :status="isStreaming(message) ? 'running' : 'error'">
                <TraceIcon>
                  <FileTextIcon />
                </TraceIcon>
                <TraceTitle>
                  {{ isStreaming(message) ? 'Reading' : 'Failed to read' }} {{ part.input.path }}
                </TraceTitle>
              </TraceLine>
            </Trace>
            <Trace v-else-if="part.output">
              <Sheet>
                <SheetTrigger>
                  <TraceLine>
                    <TraceIcon>
                      <FileTextIcon />
                    </TraceIcon>
                    <TraceTitle>Read {{ part.output.path }}</TraceTitle>
                    <TraceIcon>
                      <ChevronRightIcon />
                    </TraceIcon>
                  </TraceLine>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle class="font-mono">
                      {{ part.output.path }}
                    </SheetTitle>
                    <SheetDescription>
                      {{ part.output.content.split('\n').length }} lines
                    </SheetDescription>
                  </SheetHeader>
                  <CodeBlock class="mx-6 mb-6 w-auto">
                    <CodeBlockContent line-numbers>
                      {{ part.output.content }}
                    </CodeBlockContent>
                  </CodeBlock>
                </SheetContent>
              </Sheet>
            </Trace>
          </template>
        </MessageContent>
      </Message>
    </template>
    <Button
      v-if="!busy"
      variant="outline"
      size="sm"
      class="mt-auto self-start"
      @click="messages.length === 0 ? send() : reset()"
    >
      {{ messages.length === 0 ? 'Send message' : 'Reset' }}
    </Button>
  </div>
</template>
