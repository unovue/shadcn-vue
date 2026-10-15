<script setup lang="ts">
import {
  ArrowUpRightIcon,
  CircleAlertIcon,
  CircleCheckIcon,
  GlobeIcon,
  LoaderCircleIcon,
} from '@lucide/vue'
import { createReusableTemplate } from '@vueuse/core'
import { computed, onBeforeUnmount, reactive, ref } from 'vue'
import { Badge } from '@/registry/bases/reka/ui/badge'
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

type ToolState = 'input-available' | 'output-available' | 'output-error'
type Status = 'running' | 'error' | undefined

interface ToolPartBase<TType extends string, TInput, TOutput> {
  type: TType
  toolCallId: string
  state: ToolState
  input: TInput
  output?: TOutput
  errorText?: string
}

type StepPart
  = | ToolPartBase<'tool-readBuildLog', { deployment: string }, { log: string }>
    | ToolPartBase<'tool-searchWeb', { query: string }, { results: { title: string, url: string }[] }>
    | ToolPartBase<'tool-searchCode', { query: string }, { files: string[] }>

interface TextPart {
  type: 'text'
  text: string
}

interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  parts: (StepPart | TextPart)[]
}

const QUESTION = 'Why is the checkout deploy so slow?'
const ANSWER = 'Image optimization takes almost four minutes because its cache key includes the commit hash. Key it on the image directory instead.'

// The steps the agent takes, in order, with their output.
const SCRIPT: Omit<StepPart, 'toolCallId' | 'state'>[] = [
  {
    type: 'tool-readBuildLog',
    input: { deployment: 'dpl_8Kx2' },
    output: { log: 'install    41s\ncompile    38s\nimages   3m 52s' },
  },
  {
    type: 'tool-searchWeb',
    input: { query: 'next.js image cache key' },
    output: {
      results: [
        {
          title: 'Image component | nextjs.org',
          url: 'https://nextjs.org/docs/app/api-reference/components/image',
        },
        {
          title: 'Build cache | vercel.com',
          url: 'https://vercel.com/docs/deployments/troubleshoot-a-build',
        },
      ],
    },
  },
  {
    type: 'tool-searchCode',
    input: { query: 'cacheKey' },
    output: { files: ['next.config.ts', 'scripts/optimize-images.ts'] },
  },
]

function transcript(): ChatMessage[] {
  return [
    { id: 'user-0', role: 'user', parts: [{ type: 'text', text: QUESTION }] },
    {
      id: 'assistant-0',
      role: 'assistant',
      parts: [
        ...SCRIPT.map((step, index) => ({
          ...step,
          toolCallId: `call-0-${index}`,
          state: 'output-available',
        }) as StepPart),
        { type: 'text', text: ANSWER },
      ],
    },
  ]
}

const messages = ref<ChatMessage[]>(transcript())
const status = ref<'ready' | 'submitted' | 'streaming'>('ready')
const busy = computed(() => status.value !== 'ready')

// The open state of each summary, once the person opens or closes it.
const openState = ref<Record<string, boolean | undefined>>({})

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

function getSteps(message: ChatMessage) {
  return message.parts.filter((part): part is StepPart => part.type !== 'text')
}

function isStreaming(message: ChatMessage) {
  return busy.value && message === messages.value.at(-1)
}

function getSummary(message: ChatMessage) {
  const steps = getSteps(message)
  const running = isStreaming(message) && getText(message).length === 0
  const failed = steps.filter(part => part.state === 'output-error').length
  const status: Status = running ? 'running' : failed > 0 ? 'error' : undefined
  const title = running
    ? 'Researching'
    : `Researched in ${steps.length} steps${failed > 0 ? `, ${failed} failed` : ''}`

  return { running, status, title }
}

function getStepStatus(part: StepPart, streaming: boolean): Status {
  if (part.state === 'output-available')
    return undefined
  return part.state === 'output-error' || !streaming ? 'error' : 'running'
}

function getStepTitle(part: StepPart, streaming: boolean) {
  const status = getStepStatus(part, streaming)
  const verb = (running: string, done: string, failed: string) =>
    status === 'running' ? running : status === 'error' ? failed : done

  if (part.type === 'tool-searchWeb')
    return `${verb('Searching', 'Searched', 'Failed to search')} the web for ${part.input.query}`
  if (part.type === 'tool-readBuildLog')
    return `${verb('Reading', 'Read', 'Failed to read')} the build log for ${part.input.deployment}`
  return `${verb('Searching', 'Searched', 'Failed to search')} the code for ${part.input.query}`
}

async function replay() {
  const id = ++run
  messages.value = [{ id: `user-${id}`, role: 'user', parts: [{ type: 'text', text: QUESTION }] }]
  openState.value = {}
  status.value = 'submitted'
  await sleep(300)

  const message = reactive<ChatMessage>({ id: `assistant-${id}`, role: 'assistant', parts: [] })
  messages.value.push(message)
  status.value = 'streaming'

  for (const [index, step] of SCRIPT.entries()) {
    const { output, ...rest } = step
    const part = reactive({
      ...rest,
      toolCallId: `call-${id}-${index}`,
      state: 'input-available',
    } as StepPart)
    message.parts.push(part)
    await sleep(900)
    part.output = output as never
    part.state = 'output-available'
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

const [DefineLine, ReuseLine] = createReusableTemplate<{
  title: string
  status: Status
}>()
</script>

<template>
  <DefineLine v-slot="{ title, status: lineStatus }">
    <TraceLine :status="lineStatus">
      <TraceIcon>
        <LoaderCircleIcon v-if="lineStatus === 'running'" class="animate-spin" />
        <CircleAlertIcon v-else-if="lineStatus === 'error'" />
        <CircleCheckIcon v-else />
      </TraceIcon>
      <TraceTitle>{{ title }}</TraceTitle>
    </TraceLine>
  </DefineLine>

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
          <Trace v-if="getSteps(message).length > 0">
            <TraceCollapsible
              :open="openState[message.id] ?? getSummary(message).running"
              :unmount-on-hide="false"
              @update:open="openState[message.id] = $event"
            >
              <TraceCollapsibleTrigger>
                <ReuseLine
                  :title="getSummary(message).title"
                  :status="getSummary(message).status"
                />
              </TraceCollapsibleTrigger>
              <TraceCollapsibleContent>
                <Trace>
                  <template v-for="part in getSteps(message)" :key="part.toolCallId">
                    <ReuseLine
                      v-if="part.state === 'input-available'"
                      :title="getStepTitle(part, isStreaming(message))"
                      :status="getStepStatus(part, isStreaming(message))"
                    />
                    <TraceCollapsible
                      v-else
                      :default-open="part.type === 'tool-readBuildLog'"
                    >
                      <TraceCollapsibleTrigger>
                        <ReuseLine
                          :title="getStepTitle(part, isStreaming(message))"
                          :status="getStepStatus(part, isStreaming(message))"
                        />
                      </TraceCollapsibleTrigger>
                      <TraceCollapsibleContent>
                        <CodeBlock v-if="part.state === 'output-error'" size="sm" variant="destructive">
                          <CodeBlockContent wrap class="max-h-64">
                            {{ part.errorText }}
                          </CodeBlockContent>
                        </CodeBlock>
                        <Trace v-else-if="part.type === 'tool-searchWeb'">
                          <a
                            v-for="result in part.output?.results"
                            :key="result.url"
                            :href="result.url"
                            target="_blank"
                            rel="noreferrer"
                          >
                            <TraceLine>
                              <TraceIcon>
                                <GlobeIcon />
                              </TraceIcon>
                              <TraceTitle>
                                {{ result.title }}
                                <span class="sr-only"> (opens in a new tab)</span>
                              </TraceTitle>
                              <TraceIcon>
                                <ArrowUpRightIcon />
                              </TraceIcon>
                            </TraceLine>
                          </a>
                        </Trace>
                        <CodeBlock v-else-if="part.type === 'tool-readBuildLog'" size="sm">
                          <CodeBlockContent wrap class="max-h-64">
                            {{ part.output?.log }}
                          </CodeBlockContent>
                        </CodeBlock>
                        <div v-else class="flex flex-wrap gap-1.5">
                          <Badge
                            v-for="file in part.output?.files"
                            :key="file"
                            variant="secondary"
                            class="font-mono"
                          >
                            {{ file }}
                          </Badge>
                        </div>
                      </TraceCollapsibleContent>
                    </TraceCollapsible>
                  </template>
                </Trace>
              </TraceCollapsibleContent>
            </TraceCollapsible>
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
