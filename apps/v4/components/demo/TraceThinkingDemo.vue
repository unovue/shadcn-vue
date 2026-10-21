<script setup lang="ts">
import { BrainIcon } from '@lucide/vue'
import { createReusableTemplate, promiseTimeout, tryOnScopeDispose } from '@vueuse/core'
import { computed, ref } from 'vue'
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

interface Part {
  type: 'reasoning' | 'text'
  text: string
  state: 'streaming' | 'done'
}

interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  parts: Part[]
}

const question = 'Why is the checkout deploy so slow?'
const reasoning = 'The build log shows install and compile finish in under a minute. Image optimization takes almost four, and it reruns on every deploy because the cache key includes the commit hash.'
const answer = 'Image optimization is the bottleneck. Key its cache on the lockfile and the image directory instead of the commit hash.'

const messages = ref<ChatMessage[]>([])
const status = ref<'ready' | 'streaming'>('ready')
const open = ref<Record<string, boolean | undefined>>({})

const [DefineThinkingLine, ThinkingLine] = createReusableTemplate<{ running: boolean }>()

const busy = computed(() => status.value === 'streaming')
const nextMessage = computed(() => messages.value.length === 0 ? question : undefined)

// Simulated streaming. Swap for `new Chat()` from `@ai-sdk/vue` in your app.
let runId = 0

// Invalidate the running script on unmount so pending steps bail out.
tryOnScopeDispose(() => {
  runId++
})

async function stream(part: Part, text: string, delayMs: number, id: number) {
  for (const chunk of text.split(/(?<= )/)) {
    await promiseTimeout(delayMs)
    if (id !== runId)
      return false
    part.text += chunk
  }
  part.state = 'done'
  return true
}

async function sendMessage(text: string) {
  const id = ++runId
  messages.value.push({
    id: `user-${id}`,
    role: 'user',
    parts: [{ type: 'text', text, state: 'done' }],
  })
  messages.value.push({ id: `assistant-${id}`, role: 'assistant', parts: [] })
  const message = messages.value.at(-1)!
  status.value = 'streaming'

  message.parts.push({ type: 'reasoning', text: '', state: 'streaming' })
  if (!await stream(message.parts.at(-1)!, reasoning, 60, id))
    return
  await promiseTimeout(400)
  if (id !== runId)
    return
  message.parts.push({ type: 'text', text: '', state: 'streaming' })
  if (!await stream(message.parts.at(-1)!, answer, 20, id))
    return

  status.value = 'ready'
}

function reset() {
  runId++
  messages.value = []
  open.value = {}
  status.value = 'ready'
}

function getMessageText(message: ChatMessage) {
  return message.parts
    .filter(part => part.type === 'text')
    .map(part => part.text)
    .join('')
}

function groupParts(parts: Part[]) {
  const runs: { trace: boolean, parts: Part[] }[] = []

  for (const part of parts) {
    const trace = part.type === 'reasoning'

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
  <DefineThinkingLine v-slot="{ running }">
    <TraceLine :status="running ? 'running' : undefined">
      <TraceIcon>
        <BrainIcon />
      </TraceIcon>
      <TraceTitle>
        {{ running ? 'Thinking' : 'Thought' }}
      </TraceTitle>
    </TraceLine>
  </DefineThinkingLine>
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
              <template v-for="(part, index) in run.parts" :key="index">
                <template v-if="part.type === 'reasoning'">
                  <ThinkingLine
                    v-if="part.text.length === 0"
                    :running="isLive(message) && part.state === 'streaming'"
                  />
                  <TraceCollapsible
                    v-else
                    :open="open[`${message.id}-${runIndex}-${index}`] ?? (isLive(message) && part.state === 'streaming')"
                    @update:open="open[`${message.id}-${runIndex}-${index}`] = $event"
                  >
                    <TraceCollapsibleTrigger>
                      <ThinkingLine :running="isLive(message) && part.state === 'streaming'" />
                    </TraceCollapsibleTrigger>
                    <TraceCollapsibleContent class="whitespace-pre-wrap">
                      {{ part.text }}
                    </TraceCollapsibleContent>
                  </TraceCollapsible>
                </template>
              </template>
            </Trace>
            <template v-else>
              <p v-for="(part, index) in run.parts" :key="`${runIndex}-${index}`">
                {{ part.text }}
              </p>
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
