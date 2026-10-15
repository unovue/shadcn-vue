<script setup lang="ts">
import {
  ArrowUpRightIcon,
  CircleAlertIcon,
  CircleCheckIcon,
  GlobeIcon,
  LoaderCircleIcon,
} from '@lucide/vue'
import { computed, onBeforeUnmount, ref } from 'vue'
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

interface ReasoningPart {
  type: 'reasoning'
  text: string
  state: 'streaming' | 'done'
}

interface ToolPart {
  type: 'tool-runCommand'
  toolCallId: string
  input: { command: string }
  state: 'input-available' | 'output-available' | 'output-error'
  output?: { stdout: string }
  errorText?: string
}

interface SourcePart {
  type: 'source-url'
  url: string
  title?: string
}

type Part = TextPart | ReasoningPart | ToolPart | SourcePart

interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  parts: Part[]
}

const question = 'Why does pnpm install fail in CI?'
const reasoning = 'CI installs with a frozen lockfile, so the install stops when package.json and pnpm-lock.yaml disagree. I should check what the last commit changed, then reproduce the install.'
const tools = [
  { command: 'pnpm --version', delayMs: 700, stdout: '10.18.0' },
  {
    command: 'git diff --stat HEAD~1 -- package.json pnpm-lock.yaml',
    delayMs: 900,
    stdout: ' package.json | 2 +-\n 1 file changed, 1 insertion(+), 1 deletion(-)',
  },
  {
    command: 'pnpm install --frozen-lockfile',
    delayMs: 1200,
    error: 'ERR_PNPM_OUTDATED_LOCKFILE  Cannot install with "frozen-lockfile" because pnpm-lock.yaml is not up to date with package.json',
  },
]
const sources = [
  {
    url: 'https://pnpm.io/cli/install#--frozen-lockfile',
    title: 'pnpm install | pnpm.io',
  },
  {
    url: 'https://pnpm.io/continuous-integration',
    title: 'Continuous Integration | pnpm.io',
  },
]
const answer = 'The last commit bumped a version in package.json without updating pnpm-lock.yaml, so the frozen install fails. Run pnpm install locally and commit the lockfile.'

// The finished conversation, shown before the first replay.
const transcript: ChatMessage[] = [
  { id: 'user-0', role: 'user', parts: [{ type: 'text', text: question }] },
  {
    id: 'assistant-0',
    role: 'assistant',
    parts: [
      { type: 'reasoning', text: reasoning, state: 'done' },
      ...tools.map((tool, index): ToolPart => ({
        type: 'tool-runCommand',
        toolCallId: `call-0-${index}`,
        input: { command: tool.command },
        ...(tool.error
          ? { state: 'output-error' as const, errorText: tool.error }
          : { state: 'output-available' as const, output: { stdout: tool.stdout! } }),
      })),
      ...sources.map((source): SourcePart => ({ type: 'source-url', ...source })),
      { type: 'text', text: answer },
    ],
  },
]

const messages = ref<ChatMessage[]>(transcript)
const status = ref<'ready' | 'streaming'>('ready')
const open = ref<Record<string, boolean | undefined>>({})

const busy = computed(() => status.value === 'streaming')

// Simulated streaming. Swap for `new Chat()` from `@ai-sdk/vue` in your app.
const timers = new Set<ReturnType<typeof setTimeout>>()
let runId = 0

function wait(ms: number) {
  return new Promise<void>((resolve) => {
    const timer = setTimeout(() => {
      timers.delete(timer)
      resolve()
    }, ms)
    timers.add(timer)
  })
}

async function stream(part: TextPart | ReasoningPart, text: string, delayMs: number, id: number) {
  for (const chunk of text.split(/(?<= )/)) {
    await wait(delayMs)
    if (id !== runId)
      return false
    part.text += chunk
  }
  return true
}

async function replay() {
  const id = ++runId
  open.value = {}
  messages.value = [
    { id: `user-${id}`, role: 'user', parts: [{ type: 'text', text: question }] },
    { id: `assistant-${id}`, role: 'assistant', parts: [] },
  ]
  const message = messages.value.at(-1)!
  status.value = 'streaming'

  message.parts.push({ type: 'reasoning', text: '', state: 'streaming' })
  const thinking = message.parts.at(-1) as ReasoningPart
  if (!await stream(thinking, reasoning, 40, id))
    return
  thinking.state = 'done'

  for (const [index, tool] of tools.entries()) {
    message.parts.push({
      type: 'tool-runCommand',
      toolCallId: `call-${id}-${index}`,
      input: { command: tool.command },
      state: 'input-available',
    })
    const part = message.parts.at(-1) as ToolPart
    await wait(tool.delayMs)
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

  for (const source of sources)
    message.parts.push({ type: 'source-url', ...source })

  await wait(1000)
  if (id !== runId)
    return

  message.parts.push({ type: 'text', text: '' })
  if (!await stream(message.parts.at(-1) as TextPart, answer, 20, id))
    return

  status.value = 'ready'
}

onBeforeUnmount(() => {
  runId++
  timers.forEach(clearTimeout)
  timers.clear()
})

function getMessageText(message: ChatMessage) {
  return message.parts
    .map(part => (part.type === 'text' ? part.text : ''))
    .join('')
}

function getRows(message: ChatMessage) {
  return message.parts.filter(
    (part): part is ReasoningPart | ToolPart =>
      part.type === 'reasoning' || part.type === 'tool-runCommand',
  )
}

function getSources(message: ChatMessage) {
  return message.parts.filter(
    (part): part is SourcePart => part.type === 'source-url',
  )
}

function getHostname(url: string) {
  return new URL(url).hostname
}

function isStreaming(message: ChatMessage) {
  return busy.value && message === messages.value.at(-1)
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
          <Trace v-if="getRows(message).length + getSources(message).length > 0">
            <template
              v-for="(part, index) in getRows(message)"
              :key="part.type === 'tool-runCommand' ? part.toolCallId : index"
            >
              <!-- Thinking row -->
              <template v-if="part.type === 'reasoning'">
                <TraceLine
                  v-if="part.text.length === 0"
                  :status="isStreaming(message) && part.state === 'streaming' ? 'running' : undefined"
                >
                  <TraceIcon>
                    <LoaderCircleIcon v-if="isStreaming(message) && part.state === 'streaming'" class="animate-spin" />
                    <CircleCheckIcon v-else />
                  </TraceIcon>
                  <TraceTitle>
                    {{ isStreaming(message) && part.state === 'streaming' ? 'Thinking' : 'Thought for 5s' }}
                  </TraceTitle>
                </TraceLine>
                <TraceCollapsible
                  v-else
                  :open="open[`${message.id}-${index}`] ?? (isStreaming(message) && part.state === 'streaming')"
                  @update:open="open[`${message.id}-${index}`] = $event"
                >
                  <TraceCollapsibleTrigger>
                    <TraceLine :status="isStreaming(message) && part.state === 'streaming' ? 'running' : undefined">
                      <TraceIcon>
                        <LoaderCircleIcon v-if="isStreaming(message) && part.state === 'streaming'" class="animate-spin" />
                        <CircleCheckIcon v-else />
                      </TraceIcon>
                      <TraceTitle>
                        {{ isStreaming(message) && part.state === 'streaming' ? 'Thinking' : 'Thought for 5s' }}
                      </TraceTitle>
                    </TraceLine>
                  </TraceCollapsibleTrigger>
                  <TraceCollapsibleContent class="whitespace-pre-wrap">
                    {{ part.text }}
                  </TraceCollapsibleContent>
                </TraceCollapsible>
              </template>

              <!-- Tool row -->
              <template v-else-if="part.type === 'tool-runCommand'">
                <TraceCollapsible
                  v-if="part.state === 'output-available' || part.state === 'output-error'"
                  :default-open="index === 2"
                >
                  <TraceCollapsibleTrigger>
                    <TraceLine :status="part.state === 'output-error' ? 'error' : undefined">
                      <TraceIcon>
                        <CircleAlertIcon v-if="part.state === 'output-error'" />
                        <CircleCheckIcon v-else />
                      </TraceIcon>
                      <TraceTitle>
                        {{ part.state === 'output-error' ? 'Failed to run' : 'Ran' }} {{ part.input.command }}
                      </TraceTitle>
                    </TraceLine>
                  </TraceCollapsibleTrigger>
                  <TraceCollapsibleContent>
                    <CodeBlock v-if="part.state === 'output-error'" size="sm" variant="destructive">
                      <CodeBlockContent wrap class="max-h-64">
                        {{ part.errorText }}
                      </CodeBlockContent>
                    </CodeBlock>
                    <CodeBlock v-else size="sm">
                      <CodeBlockContent wrap class="max-h-64">
                        {{ part.output?.stdout }}
                      </CodeBlockContent>
                    </CodeBlock>
                  </TraceCollapsibleContent>
                </TraceCollapsible>
                <TraceLine v-else :status="isStreaming(message) ? 'running' : 'error'">
                  <TraceIcon>
                    <LoaderCircleIcon v-if="isStreaming(message)" class="animate-spin" />
                    <CircleAlertIcon v-else />
                  </TraceIcon>
                  <TraceTitle>
                    {{ isStreaming(message) ? 'Running' : 'Failed to run' }} {{ part.input.command }}
                  </TraceTitle>
                </TraceLine>
              </template>
            </template>

            <!-- Sources row -->
            <TraceCollapsible v-if="getSources(message).length > 0">
              <TraceCollapsibleTrigger>
                <TraceLine :status="isStreaming(message) && getMessageText(message).length === 0 ? 'running' : undefined">
                  <TraceIcon>
                    <LoaderCircleIcon v-if="isStreaming(message) && getMessageText(message).length === 0" class="animate-spin" />
                    <GlobeIcon v-else />
                  </TraceIcon>
                  <TraceTitle>
                    {{ isStreaming(message) && getMessageText(message).length === 0 ? 'Using' : 'Used' }} {{ getSources(message).length }} sources
                  </TraceTitle>
                </TraceLine>
              </TraceCollapsibleTrigger>
              <TraceCollapsibleContent>
                <Trace>
                  <a
                    v-for="source in getSources(message)"
                    :key="source.url"
                    :href="source.url"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <TraceLine>
                      <TraceIcon>
                        <GlobeIcon />
                      </TraceIcon>
                      <TraceTitle>
                        {{ source.title ?? getHostname(source.url) }}
                        <span class="sr-only"> (opens in a new tab)</span>
                      </TraceTitle>
                      <TraceIcon>
                        <ArrowUpRightIcon />
                      </TraceIcon>
                    </TraceLine>
                  </a>
                </Trace>
              </TraceCollapsibleContent>
            </TraceCollapsible>
          </Trace>
          <p v-if="getMessageText(message)">
            {{ getMessageText(message) }}
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
