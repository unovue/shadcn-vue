<script setup lang="ts">
import { ArrowUpRightIcon, GlobeIcon } from '@lucide/vue'
import { promiseTimeout, tryOnScopeDispose } from '@vueuse/core'
import { computed, reactive, ref } from 'vue'
import { Bubble, BubbleContent } from '@/registry/bases/reka/ui/bubble'
import { Button } from '@/registry/bases/reka/ui/button'
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

interface SourcePart {
  type: 'source-url'
  sourceId: string
  url: string
  title?: string
}

interface TextPart {
  type: 'text'
  text: string
}

interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  parts: (SourcePart | TextPart)[]
}

const QUESTION = 'How do I start an Astro project with pnpm?'
const ANSWER = 'Run pnpm create astro@latest and follow the prompts. It scaffolds the project and installs the dependencies.'

// The agent cites the Astro docs twice.
const SOURCES: SourcePart[] = [
  {
    type: 'source-url',
    sourceId: 'source-0',
    url: 'https://docs.astro.build/en/install-and-setup/',
    title: 'Install Astro | docs.astro.build',
  },
  {
    type: 'source-url',
    sourceId: 'source-1',
    url: 'https://www.npmjs.com/package/create-astro',
    title: 'create-astro | npmjs.com',
  },
  {
    type: 'source-url',
    sourceId: 'source-2',
    url: 'https://docs.astro.build/en/install-and-setup/',
    title: 'Install Astro | docs.astro.build',
  },
  {
    type: 'source-url',
    sourceId: 'source-3',
    url: 'https://pnpm.io/cli/create',
    title: 'pnpm create | pnpm.io',
  },
]

function transcript(): ChatMessage[] {
  return [
    { id: 'user-0', role: 'user', parts: [{ type: 'text', text: QUESTION }] },
    {
      id: 'assistant-0',
      role: 'assistant',
      parts: [{ type: 'text', text: ANSWER }, ...SOURCES],
    },
  ]
}

const messages = ref<ChatMessage[]>(transcript())
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

function getHostname(url: string) {
  return new URL(url).hostname
}

function getSources(message: ChatMessage) {
  return message.parts
    .filter((part): part is SourcePart => part.type === 'source-url')
    .filter((part, index, all) => all.findIndex(other => other.url === part.url) === index)
}

async function replay() {
  const id = ++run
  messages.value = [{ id: `user-${id}`, role: 'user', parts: [{ type: 'text', text: QUESTION }] }]
  status.value = 'submitted'
  if (!(await sleep(300)))
    return

  const message = reactive<ChatMessage>({ id: `assistant-${id}`, role: 'assistant', parts: [] })
  messages.value.push(message)
  status.value = 'streaming'

  const text = reactive<TextPart>({ type: 'text', text: '' })
  message.parts.push(text)
  if (!(await streamInto(text, ANSWER, 20)))
    return

  for (const source of SOURCES) {
    message.parts.push({ ...source })
    if (!(await sleep(20)))
      return
  }
  status.value = 'ready'
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
          <p v-if="getText(message)">
            {{ getText(message) }}
          </p>
          <Trace v-if="getSources(message).length > 0">
            <TraceCollapsible default-open>
              <TraceCollapsibleTrigger>
                <TraceLine>
                  <TraceIcon>
                    <GlobeIcon />
                  </TraceIcon>
                  <TraceTitle>Used {{ getSources(message).length }} sources</TraceTitle>
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
