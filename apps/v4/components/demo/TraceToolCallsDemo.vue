<script setup lang="ts">
import { TerminalIcon } from '@lucide/vue'
import { promiseTimeout, tryOnScopeDispose } from '@vueuse/core'
import { computed, ref } from 'vue'
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

interface TextPart {
  type: 'text'
  text: string
}

interface ToolPart {
  type: 'dynamic-tool'
  toolCallId: string
  input: { command: string }
  state: 'input-available' | 'output-available' | 'output-error' | 'output-denied'
  output?: { stdout: string }
  errorText?: string
}

type Part = TextPart | ToolPart

interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  parts: Part[]
}

const question = 'Which package managers are installed?'
const tools = [
  { command: 'node --version', stdout: 'v24.18.0' },
  { command: 'npm --version', stdout: '11.6.2' },
  { command: 'pnpm --version', error: 'command not found: pnpm' },
]
const answer = 'Node 24 and npm 11 are installed. pnpm is not.'

const messages = ref<ChatMessage[]>([])
const status = ref<'ready' | 'streaming'>('ready')

const busy = computed(() => status.value === 'streaming')
const nextMessage = computed(() => messages.value.length === 0 ? question : undefined)

// Simulated streaming. Swap for `new Chat()` from `@ai-sdk/vue` in your app.
let runId = 0

// Invalidate the running script on unmount so pending steps bail out.
tryOnScopeDispose(() => {
  runId++
})

async function sendMessage(text: string) {
  const id = ++runId
  messages.value.push({
    id: `user-${id}`,
    role: 'user',
    parts: [{ type: 'text', text }],
  })
  messages.value.push({ id: `assistant-${id}`, role: 'assistant', parts: [] })
  const message = messages.value.at(-1)!
  status.value = 'streaming'

  for (const [index, tool] of tools.entries()) {
    message.parts.push({
      type: 'dynamic-tool',
      toolCallId: `call-${id}-${index}`,
      input: { command: tool.command },
      state: 'input-available',
    })
    const part = message.parts.at(-1) as ToolPart
    await promiseTimeout(900)
    if (id !== runId)
      return
    if (tool.error) {
      part.state = 'output-error'
      part.errorText = tool.error
    }
    else {
      part.state = 'output-available'
      part.output = { stdout: tool.stdout! }
    }
  }

  message.parts.push({ type: 'text', text: '' })
  const part = message.parts.at(-1) as TextPart
  for (const chunk of answer.split(/(?<= )/)) {
    await promiseTimeout(20)
    if (id !== runId)
      return
    part.text += chunk
  }

  status.value = 'ready'
}

function reset() {
  runId++
  messages.value = []
  status.value = 'ready'
}

function getMessageText(message: ChatMessage) {
  return message.parts
    .map(part => (part.type === 'text' ? part.text : ''))
    .join('')
}

function groupParts(parts: Part[]) {
  const runs: { trace: boolean, parts: Part[] }[] = []

  for (const part of parts) {
    const trace = part.type === 'dynamic-tool'

    if (!trace && part.type !== 'text')
      continue

    const last = runs.at(-1)

    if (last?.trace === trace)
      last.parts.push(part)
    else
      runs.push({ trace, parts: [part] })
  }

  return runs
}

function isLive(message: ChatMessage) {
  return status.value === 'streaming' && message === messages.value.at(-1)
}
</script>

<template>
  <div class="flex min-h-72 w-full max-w-sm flex-col gap-4 py-6 text-sm">
    <template v-for="message in messages" :key="message.id">
      <Message v-if="message.role === 'user'" align="end">
        <MessageContent>
          <Bubble align="end" variant="muted">
            <BubbleContent>{{ getMessageText(message) }}</BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
      <Message v-else>
        <MessageContent class="gap-4">
          <template v-for="(run, runIndex) in groupParts(message.parts)" :key="runIndex">
            <Trace v-if="run.trace">
              <template v-for="(part, index) in run.parts" :key="part.type === 'dynamic-tool' ? part.toolCallId : index">
                <template v-if="part.type === 'dynamic-tool'">
                  <TraceCollapsible
                    v-if="part.state === 'output-available' || part.state === 'output-error'"
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
                  <TraceLine v-else-if="part.state === 'output-denied'">
                    <TraceIcon>
                      <TerminalIcon />
                    </TraceIcon>
                    <TraceTitle>Denied {{ part.input.command }}</TraceTitle>
                  </TraceLine>
                  <TraceLine v-else :status="isLive(message) ? 'running' : 'error'">
                    <TraceIcon>
                      <TerminalIcon />
                    </TraceIcon>
                    <TraceTitle>
                      {{ isLive(message) ? 'Running' : 'Failed to run' }} {{ part.input.command }}
                    </TraceTitle>
                  </TraceLine>
                </template>
              </template>
            </Trace>
            <template v-else>
              <template v-for="(part, index) in run.parts" :key="`${runIndex}-${index}`">
                <p v-if="part.type === 'text'">
                  {{ part.text }}
                </p>
              </template>
            </template>
          </template>
        </MessageContent>
      </Message>
    </template>
    <Button
      v-if="!busy"
      variant="outline"
      size="sm"
      class="mt-auto self-start"
      @click="nextMessage ? sendMessage(nextMessage) : reset()"
    >
      {{ nextMessage ? 'Send message' : 'Reset' }}
    </Button>
  </div>
</template>
