<script setup lang="ts">
import {
  CircleCheckIcon,
  CircleDotIcon,
  CircleIcon,
  RouteIcon,
} from '@lucide/vue'
import { createReusableTemplate } from '@vueuse/core'
import { computed, onBeforeUnmount, reactive, ref } from 'vue'
import { Bubble, BubbleContent } from '@/registry/bases/reka/ui/bubble'
import { Button } from '@/registry/bases/reka/ui/button'
import { Message, MessageContent } from '@/registry/bases/reka/ui/message'
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceDescription,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from '@/registry/bases/reka/ui/trace'

interface PlanData {
  title: string
  steps: { title: string, status: 'done' | 'running' | 'pending' }[]
}

interface PlanPart {
  type: 'data-plan'
  id: string
  data: PlanData
}

interface TextPart {
  type: 'text'
  text: string
}

interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  parts: (PlanPart | TextPart)[]
}

const STEPS = [
  'Install @base-ui/react',
  'Replace the Radix imports',
  'Rename asChild to render',
  'Run the type checker',
]

const QUESTION = 'Migrate the dialog components to Base UI.'
const ANSWER = 'Migrated Dialog and AlertDialog. The type checker passes.'

function planAt(current: number): PlanData {
  return {
    title: 'Plan: migrate to Base UI',
    steps: STEPS.map((title, index) => ({
      title,
      status: index < current ? 'done' : index === current ? 'running' : 'pending',
    })),
  }
}

function transcript(): ChatMessage[] {
  return [
    { id: 'user-0', role: 'user', parts: [{ type: 'text', text: QUESTION }] },
    {
      id: 'assistant-0',
      role: 'assistant',
      parts: [
        { type: 'data-plan', id: 'plan', data: planAt(STEPS.length) },
        { type: 'text', text: ANSWER },
      ],
    },
  ]
}

const messages = ref<ChatMessage[]>(transcript())
const status = ref<'ready' | 'submitted' | 'streaming'>('ready')
const busy = computed(() => status.value !== 'ready')

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

function getPlan(message: ChatMessage) {
  return message.parts.find((part): part is PlanPart => part.type === 'data-plan')?.data
}

function isStreaming(message: ChatMessage) {
  return busy.value && message === messages.value.at(-1)
}

function countDone(plan: PlanData) {
  return plan.steps.filter(step => step.status === 'done').length
}

async function replay() {
  const id = ++run
  messages.value = [{ id: `user-${id}`, role: 'user', parts: [{ type: 'text', text: QUESTION }] }]
  status.value = 'submitted'
  await sleep(300)

  const message = reactive<ChatMessage>({ id: `assistant-${id}`, role: 'assistant', parts: [] })
  messages.value.push(message)
  status.value = 'streaming'

  // A data part with the same id replaces the previous one in place.
  const plan = reactive<PlanPart>({ type: 'data-plan', id: 'plan', data: planAt(0) })
  message.parts.push(plan)
  for (let index = 1; index <= STEPS.length; index++) {
    await sleep(1200)
    plan.data = planAt(index)
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

const [DefinePlanRow, PlanRow] = createReusableTemplate<{
  plan: PlanData
  streaming: boolean
}>()
</script>

<template>
  <DefinePlanRow v-slot="{ plan, streaming }">
    <TraceCollapsible default-open>
      <TraceCollapsibleTrigger>
        <TraceLine :status="streaming && countDone(plan) < plan.steps.length ? 'running' : undefined">
          <TraceIcon>
            <RouteIcon />
          </TraceIcon>
          <TraceTitle>{{ plan.title }}</TraceTitle>
          <TraceDescription>
            {{ countDone(plan) }} of {{ plan.steps.length }} done
          </TraceDescription>
        </TraceLine>
      </TraceCollapsibleTrigger>
      <TraceCollapsibleContent>
        <Trace>
          <TraceLine
            v-for="step in plan.steps"
            :key="step.title"
            :status="step.status === 'pending'
              ? 'pending'
              : streaming && step.status === 'running'
                ? 'running'
                : undefined"
          >
            <TraceIcon>
              <CircleCheckIcon v-if="step.status === 'done'" />
              <CircleDotIcon v-else-if="step.status === 'running'" />
              <CircleIcon v-else />
            </TraceIcon>
            <TraceTitle>{{ step.title }}</TraceTitle>
          </TraceLine>
        </Trace>
      </TraceCollapsibleContent>
    </TraceCollapsible>
  </DefinePlanRow>

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
          <Trace v-if="getPlan(message)">
            <PlanRow :plan="getPlan(message)!" :streaming="isStreaming(message)" />
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
