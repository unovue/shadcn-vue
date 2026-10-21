<script setup lang="ts">
import { CircleCheckIcon, LoaderCircleIcon, TerminalIcon } from '@lucide/vue'
import { promiseTimeout, tryOnScopeDispose } from '@vueuse/core'
import { computed, reactive, ref } from 'vue'
import { Bubble, BubbleContent } from '@/registry/bases/reka/ui/bubble'
import { Button } from '@/registry/bases/reka/ui/button'
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from '@/registry/bases/reka/ui/item'
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
  state: 'approval-requested' | 'approval-responded' | 'output-available' | 'output-denied'
  input: { command: string }
  approval: { id: string, approved?: boolean }
}

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
  parts: (ToolPart | ReasoningPart | TextPart)[]
}

const QUESTION = 'Clean up the build folder.'
const REASONING = 'The build output lives in dist. Deleting it cannot be undone, so I should ask before I run the command.'

const messages = ref<ChatMessage[]>([])
const status = ref<'ready' | 'submitted' | 'streaming'>('ready')
const busy = computed(() => status.value !== 'ready')

// The open state of each reasoning line, once the person opens or closes it.
const openState = ref<Record<string, boolean | undefined>>({})

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

function isDenied(part: ToolPart) {
  return part.state === 'output-denied'
    || (part.state === 'approval-responded' && !part.approval.approved)
}

async function send() {
  messages.value = [{ id: 'user', role: 'user', parts: [{ type: 'text', text: QUESTION }] }]
  openState.value = {}
  status.value = 'submitted'
  if (!(await sleep(600)))
    return

  const message = reactive<ChatMessage>({ id: 'assistant', role: 'assistant', parts: [] })
  messages.value.push(message)
  status.value = 'streaming'

  const reasoning = reactive<ReasoningPart>({ type: 'reasoning', text: '', state: 'streaming' })
  message.parts.push(reasoning)
  if (!(await streamInto(reasoning, REASONING, 20)))
    return
  reasoning.state = 'done'
  if (!(await sleep(400)))
    return

  message.parts.push({
    type: 'tool-runCommand',
    toolCallId: 'call-runCommand',
    state: 'approval-requested',
    input: { command: 'rm -rf dist' },
    approval: { id: 'approval-runCommand' },
  })
  status.value = 'ready'
}

// Answers the approval, then continues the chat, like
// `sendAutomaticallyWhen: lastAssistantMessageIsCompleteWithApprovalResponses`.
async function respond(part: ToolPart, approved: boolean) {
  const message = messages.value.at(-1)!
  part.state = 'approval-responded'
  part.approval.approved = approved
  status.value = 'submitted'
  if (!(await sleep(600)))
    return

  status.value = 'streaming'
  part.state = approved ? 'output-available' : 'output-denied'

  const reply = approved ? 'Removed the dist folder.' : 'Okay, I left the dist folder in place.'
  const text = reactive<TextPart>({ type: 'text', text: '' })
  message.parts.push(text)
  if (!(await streamInto(text, reply, 20)))
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
            <Trace v-else-if="part.type === 'reasoning'">
              <TraceCollapsible
                :open="openState[`${message.id}-${index}`] ?? part.state === 'streaming'"
                @update:open="openState[`${message.id}-${index}`] = $event"
              >
                <TraceCollapsibleTrigger>
                  <TraceLine :status="part.state === 'streaming' ? 'running' : undefined">
                    <TraceIcon>
                      <LoaderCircleIcon v-if="part.state === 'streaming'" class="animate-spin" />
                      <CircleCheckIcon v-else />
                    </TraceIcon>
                    <TraceTitle>{{ part.state === 'streaming' ? 'Thinking' : 'Thought' }}</TraceTitle>
                  </TraceLine>
                </TraceCollapsibleTrigger>
                <TraceCollapsibleContent class="whitespace-pre-wrap">
                  {{ part.text }}
                </TraceCollapsibleContent>
              </TraceCollapsible>
            </Trace>
            <!-- A pending approval is a prompt, not activity, so it sits outside Trace. -->
            <Item v-else-if="part.state === 'approval-requested'" variant="outline" size="sm">
              <ItemMedia variant="icon">
                <TerminalIcon />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Run {{ part.input.command }}?</ItemTitle>
                <ItemDescription>
                  The command runs in this project.
                </ItemDescription>
              </ItemContent>
              <ItemActions>
                <Button size="sm" variant="outline" @click="respond(part, false)">
                  Deny
                </Button>
                <Button size="sm" @click="respond(part, true)">
                  Approve
                </Button>
              </ItemActions>
            </Item>
            <Trace v-else>
              <TraceLine
                :status="!isDenied(part) && part.state !== 'output-available' ? 'running' : undefined"
              >
                <TraceIcon>
                  <TerminalIcon />
                </TraceIcon>
                <TraceTitle>
                  {{ isDenied(part) ? 'Denied' : part.state === 'output-available' ? 'Ran' : 'Running' }}
                  {{ part.input.command }}
                </TraceTitle>
              </TraceLine>
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
