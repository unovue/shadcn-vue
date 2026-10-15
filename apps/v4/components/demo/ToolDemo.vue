<script setup lang="ts">
import { TerminalIcon } from '@lucide/vue'
import { computed, onBeforeUnmount, reactive, ref } from 'vue'
import { Bubble, BubbleContent } from '@/registry/bases/reka/ui/bubble'
import { Button } from '@/registry/bases/reka/ui/button'
import { CodeBlock, CodeBlockContent } from '@/registry/bases/reka/ui/code-block'
import { Message, MessageContent } from '@/registry/bases/reka/ui/message'
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from '@/registry/bases/reka/ui/trace'

interface ToolPart {
  type: 'tool-runCommand'
  toolCallId: string
  state: 'input-available' | 'output-available' | 'output-error'
  input: { command: string }
  output?: { stdout: string }
  errorText?: string
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

const QUESTION = 'Which package managers are installed?'
const ANSWER = 'Node 24 and npm 11 are installed. pnpm is not.'

// The commands the agent runs, in order, with their result.
const SCRIPT: ({ command: string, stdout: string } | { command: string, error: string })[] = [
  { command: 'node --version', stdout: 'v24.18.0' },
  { command: 'npm --version', stdout: '11.6.2' },
  { command: 'pnpm --version', error: 'command not found: pnpm' },
]

function finish(part: ToolPart, step: (typeof SCRIPT)[number]) {
  if ('error' in step) {
    part.state = 'output-error'
    part.errorText = step.error
  }
  else {
    part.state = 'output-available'
    part.output = { stdout: step.stdout }
  }
  return part
}

function transcript(): ChatMessage[] {
  return [
    { id: 'user-0', role: 'user', parts: [{ type: 'text', text: QUESTION }] },
    {
      id: 'assistant-0',
      role: 'assistant',
      parts: [
        ...SCRIPT.map((step, index) => finish({
          type: 'tool-runCommand',
          toolCallId: `call-0-${index}`,
          state: 'input-available',
          input: { command: step.command },
        }, step)),
        { type: 'text', text: ANSWER },
      ],
    },
  ]
}

const messages = ref<ChatMessage[]>(transcript())
const status = ref<'ready' | 'submitted' | 'streaming'>('ready')
const busy = computed(() => status.value !== 'ready')

// The finished transcript starts with the failed call open.
const initial = ref(true)

let timers: ReturnType<typeof setTimeout>[] = []
let run = 0

function sleep(ms: number) {
  return new Promise<void>(resolve => timers.push(setTimeout(resolve, ms)))
}

async function streamInto(target: { text: string }, text: string, delayMs: number) {
  for (const chunk of text.match(/\S+\s*/g) ?? []) {
    target.text += chunk
    await sleep(delayMs)
  }
}

function getText(message: ChatMessage) {
  return message.parts
    .filter((part): part is TextPart => part.type === 'text')
    .map(part => part.text)
    .join('')
}

function getTools(message: ChatMessage) {
  return message.parts.filter((part): part is ToolPart => part.type === 'tool-runCommand')
}

function isStreaming(message: ChatMessage) {
  return busy.value && message === messages.value.at(-1)
}

async function replay() {
  const id = ++run
  initial.value = false
  messages.value = [{ id: `user-${id}`, role: 'user', parts: [{ type: 'text', text: QUESTION }] }]
  status.value = 'submitted'
  await sleep(300)

  const message = reactive<ChatMessage>({ id: `assistant-${id}`, role: 'assistant', parts: [] })
  messages.value.push(message)
  status.value = 'streaming'

  for (const [index, step] of SCRIPT.entries()) {
    const part = reactive<ToolPart>({
      type: 'tool-runCommand',
      toolCallId: `call-${id}-${index}`,
      state: 'input-available',
      input: { command: step.command },
    })
    message.parts.push(part)
    await sleep(900)
    finish(part, step)
  }

  const text = reactive<TextPart>({ type: 'text', text: '' })
  message.parts.push(text)
  await streamInto(text, ANSWER, 20)
  status.value = 'ready'
}

onBeforeUnmount(() => {
  timers.forEach(clearTimeout)
  timers = []
})
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
          <Trace v-if="getTools(message).length > 0">
            <template v-for="part in getTools(message)" :key="part.toolCallId">
              <TraceCollapsible
                v-if="part.state === 'output-available' || part.state === 'output-error'"
                :default-open="initial && part.state === 'output-error'"
              >
                <TraceCollapsibleTrigger>
                  <TraceLine :status="part.state === 'output-error' ? 'error' : undefined">
                    <TraceIcon>
                      <TerminalIcon />
                    </TraceIcon>
                    <TraceTitle>
                      {{ part.state === 'output-error' ? 'Failed to run' : 'Ran' }} {{ part.input.command }}
                    </TraceTitle>
                  </TraceLine>
                </TraceCollapsibleTrigger>
                <TraceCollapsibleContent>
                  <CodeBlock size="sm">
                    <CodeBlockContent wrap class="max-h-64">
                      {{ part.state === 'output-error' ? part.errorText : part.output?.stdout }}
                    </CodeBlockContent>
                  </CodeBlock>
                </TraceCollapsibleContent>
              </TraceCollapsible>
              <TraceLine v-else :status="isStreaming(message) ? 'running' : 'error'">
                <TraceIcon>
                  <TerminalIcon />
                </TraceIcon>
                <TraceTitle>
                  {{ isStreaming(message) ? 'Running' : 'Failed to run' }} {{ part.input.command }}
                </TraceTitle>
              </TraceLine>
            </template>
          </Trace>
          <p v-if="getText(message)">
            {{ getText(message) }}
          </p>
        </MessageContent>
      </Message>
    </template>
    <Button
      v-if="!busy"
      variant="outline"
      size="sm"
      class="mt-auto self-start"
      @click="replay"
    >
      Replay
    </Button>
  </div>
</template>
