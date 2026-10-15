<script setup lang="ts">
import { computed, onBeforeUnmount, reactive, ref } from 'vue'
import { Bubble, BubbleContent } from '@/registry/bases/reka/ui/bubble'
import { Button } from '@/registry/bases/reka/ui/button'
import { Message, MessageContent } from '@/registry/bases/reka/ui/message'
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceLine,
  TraceTitle,
} from '@/registry/bases/reka/ui/trace'

interface ReasoningPart {
  type: 'reasoning'
  text: string
  state: 'streaming' | 'done'
}

interface TextPart {
  type: 'text'
  text: string
}

interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  parts: (ReasoningPart | TextPart)[]
}

const QUESTION = 'Why is the checkout deploy so slow?'
const REASONING = 'The deploy log has three phases. Install takes 38s and next build takes 52s, both normal for this repo.\n\nImage optimization takes 3m 50s. It reruns on every deploy because its cache key includes the commit hash, so the cache never hits.'
const ANSWER = 'Image optimization is the bottleneck. Key its cache on the lockfile and the image directory instead of the commit hash, and the deploy should take under two minutes.'

function transcript(): ChatMessage[] {
  return [
    { id: 'user-0', role: 'user', parts: [{ type: 'text', text: QUESTION }] },
    {
      id: 'assistant-0',
      role: 'assistant',
      parts: [
        { type: 'reasoning', text: REASONING, state: 'done' },
        { type: 'text', text: ANSWER },
      ],
    },
  ]
}

const messages = ref<ChatMessage[]>(transcript())
const status = ref<'ready' | 'submitted' | 'streaming'>('ready')
const busy = computed(() => status.value !== 'ready')

// The open state each line was set to by the person. Until then, a line
// follows `running`. The finished transcript starts with its lines open.
const openState = ref<Record<string, boolean | undefined>>({ 'assistant-0-0': true })

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

function getReasoning(message: ChatMessage) {
  return message.parts.filter((part): part is ReasoningPart => part.type === 'reasoning')
}

function isStreaming(message: ChatMessage) {
  return busy.value && message === messages.value.at(-1)
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

  const reasoning = reactive<ReasoningPart>({ type: 'reasoning', text: '', state: 'streaming' })
  message.parts.push(reasoning)
  await streamInto(reasoning, REASONING, 40)
  reasoning.state = 'done'
  await sleep(400)

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
          <Trace v-if="getReasoning(message).length > 0">
            <template v-for="(part, index) in getReasoning(message)" :key="index">
              <TraceLine
                v-if="part.text.length === 0"
                :status="isStreaming(message) && part.state === 'streaming' ? 'running' : undefined"
              >
                <TraceTitle>
                  {{ isStreaming(message) && part.state === 'streaming' ? 'Thinking' : 'Thought for 5s' }}
                </TraceTitle>
              </TraceLine>
              <TraceCollapsible
                v-else
                :open="openState[`${message.id}-${index}`] ?? (isStreaming(message) && part.state === 'streaming')"
                @update:open="openState[`${message.id}-${index}`] = $event"
              >
                <TraceCollapsibleTrigger>
                  <TraceLine :status="isStreaming(message) && part.state === 'streaming' ? 'running' : undefined">
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
