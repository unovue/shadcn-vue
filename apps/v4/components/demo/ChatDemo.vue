<script setup lang="ts">
import {
  ArrowUpIcon,
  CircleCheckIcon,
  GlobeIcon,
  LoaderCircleIcon,
  MessageCircleDashedIcon,
  PaperclipIcon,
  PlusIcon,
  RotateCwIcon,
  TelescopeIcon,
  TerminalIcon,
} from '@lucide/vue'
import { createReusableTemplate, promiseTimeout, tryOnScopeDispose } from '@vueuse/core'
import { computed, reactive, ref } from 'vue'
import Markdown from '@/components/Markdown.vue'
import { Bubble, BubbleContent } from '@/registry/bases/reka/ui/bubble'
import { Button } from '@/registry/bases/reka/ui/button'
import { CodeBlock, CodeBlockContent } from '@/registry/bases/reka/ui/code-block'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/registry/bases/reka/ui/dropdown-menu'
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/registry/bases/reka/ui/empty'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from '@/registry/bases/reka/ui/input-group'
import { Message, MessageContent } from '@/registry/bases/reka/ui/message'
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from '@/registry/bases/reka/ui/message-scroller'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/registry/bases/reka/ui/tooltip'
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from '@/registry/bases/reka/ui/trace'

// The parts of an agent turn, shaped like AI SDK UI message parts.
type ChatPart
  = | { type: 'reasoning', text: string, state: 'streaming' | 'done' }
    | {
      type: 'tool-runCommand'
      state: 'input-available' | 'output-available' | 'output-error'
      input: { command: string }
      output?: { stdout: string }
      errorText?: string
    }
    | { type: 'text', text: string }

interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  parts: ChatPart[]
}

// A scripted agent turn. Each step streams into the message in order.
type Step
  = | { type: 'reasoning', text: string }
    | { type: 'sleep', ms: number }
    | { type: 'tool', command: string, ms: number, stdout: string }
    | { type: 'text', text: string }

const script: { user: string, steps: Step[] }[] = [
  {
    user: 'Add a dark mode toggle to the settings page.',
    steps: [
      {
        type: 'reasoning',
        text: 'I need to know how themes are set up before I add a toggle. If @nuxtjs/color-mode is already installed, the toggle only has to set colorMode.preference.',
      },
      { type: 'sleep', ms: 400 },
      {
        type: 'tool',
        command: 'rg -l colorMode nuxt.config.ts app',
        ms: 800,
        stdout: 'nuxt.config.ts',
      },
      { type: 'sleep', ms: 500 },
      {
        type: 'text',
        text: `@nuxtjs/color-mode is already set up in \`nuxt.config.ts\`, so the toggle only has to set \`colorMode.preference\`.

**Changes**

- Added \`components/ModeToggle.vue\` with a Light and Dark option.
- Put \`<ModeToggle />\` next to the Appearance heading in \`pages/settings.vue\`.

\`\`\`ts
const colorMode = useColorMode()
\`\`\`
`,
      },
    ],
  },
  {
    user: 'Make it follow the system setting by default.',
    steps: [
      {
        type: 'reasoning',
        text: 'The default theme lives in the colorMode options. I should check what it is set to now.',
      },
      { type: 'sleep', ms: 400 },
      {
        type: 'tool',
        command: 'rg -n preference nuxt.config.ts',
        ms: 800,
        stdout: '12:    preference: \'light\',',
      },
      { type: 'sleep', ms: 500 },
      {
        type: 'text',
        text: `It was set to \`light\`. I updated the \`colorMode\` options in \`nuxt.config.ts\`:

\`\`\`ts
colorMode: { classSuffix: '', preference: 'system' },
\`\`\`

New visitors now get the theme from their OS. The toggle also has a **System** option, so anyone who picked Light or Dark can switch back.
`,
      },
    ],
  },
  {
    user: 'Run the build before I ship it.',
    steps: [
      {
        type: 'tool',
        command: 'pnpm build',
        ms: 1600,
        stdout:
          'Nuxt 4.0.0 with Nitro 2.12.0\n\n✓ Client built in 4.2s\n✓ Server built in 1.8s\n✓ Prerendered 12 routes',
      },
      { type: 'sleep', ms: 500 },
      {
        type: 'text',
        text: `The build passes, so it is ready to ship.

- Built the client in **4.2s**.
- No build or type errors.
- Prerendered all **12** routes.
`,
      },
    ],
  },
]

const fallback = 'This demo only knows the scripted turns. Press reset to start over.'

const messages = ref<ChatMessage[]>([])
const status = ref<'ready' | 'submitted' | 'streaming'>('ready')
const draft = ref<string | null>(null)
const formRef = ref<HTMLFormElement | null>(null)
// Open state of each reasoning row, set once the person toggles it.
const reasoningOpen = reactive<Record<string, boolean | undefined>>({})

const busy = computed(() => status.value !== 'ready')
const sentCount = computed(() => messages.value.filter(message => message.role === 'user').length)
const nextMessage = computed(() => script[sentCount.value]?.user ?? null)
const text = computed({
  get: () => draft.value ?? nextMessage.value ?? '',
  set: (value: string) => {
    draft.value = value
  },
})
const canSend = computed(() => text.value.trim().length > 0 && !busy.value)

// Simulated streaming. Reset and unmount bump `run`, so a running script
// stops at its next wait.
let run = 0
tryOnScopeDispose(() => run++)

async function sleep(ms: number, id: number) {
  await promiseTimeout(ms)
  return id === run
}

async function stream(value: string, write: (text: string) => void, id: number) {
  for (let cursor = 0; cursor < value.length;) {
    cursor = Math.min(value.length, cursor + 3)
    write(value.slice(0, cursor))
    if (!(await sleep(16, id)))
      return false
  }
  return true
}

async function respond(steps: Step[]) {
  const id = run
  status.value = 'submitted'
  if (!(await sleep(600, id)))
    return

  messages.value.push({ id: `assistant-${Date.now()}`, role: 'assistant', parts: [] })
  const message = messages.value.at(-1)!
  status.value = 'streaming'

  for (const step of steps) {
    if (step.type === 'sleep') {
      if (!(await sleep(step.ms, id)))
        return
    }
    else if (step.type === 'reasoning') {
      message.parts.push({ type: 'reasoning', text: '', state: 'streaming' })
      const part = message.parts.at(-1) as Extract<ChatPart, { type: 'reasoning' }>
      if (!(await stream(step.text, (value) => {
        part.text = value
      }, id))) {
        return
      }
      part.state = 'done'
    }
    else if (step.type === 'tool') {
      message.parts.push({
        type: 'tool-runCommand',
        state: 'input-available',
        input: { command: step.command },
      })
      const part = message.parts.at(-1) as Extract<ChatPart, { type: 'tool-runCommand' }>
      if (!(await sleep(step.ms, id)))
        return
      part.output = { stdout: step.stdout }
      part.state = 'output-available'
    }
    else {
      message.parts.push({ type: 'text', text: '' })
      const part = message.parts.at(-1) as Extract<ChatPart, { type: 'text' }>
      if (!(await stream(step.text, (value) => {
        part.text = value
      }, id))) {
        return
      }
    }
  }

  status.value = 'ready'
}

function onSubmit() {
  if (!canSend.value)
    return

  const turn = draft.value === null ? script[sentCount.value] : undefined
  messages.value.push({
    id: `user-${Date.now()}`,
    role: 'user',
    parts: [{ type: 'text', text: text.value.trim() }],
  })
  draft.value = null
  respond(turn?.steps ?? [{ type: 'text', text: fallback }])
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault()
    formRef.value?.requestSubmit()
  }
}

function reset() {
  run++
  messages.value = []
  draft.value = null
  status.value = 'ready'
  for (const key in reasoningOpen)
    delete reasoningOpen[key]
}

function getMessageText(message: ChatMessage) {
  return message.parts
    .map(part => (part.type === 'text' ? part.text : ''))
    .join('')
}

type ToolPart = Extract<ChatPart, { type: 'tool-runCommand' }>

const [DefineReasoningRow, ReasoningRow] = createReusableTemplate<{
  id: string
  text: string
  running: boolean
}>()
const [DefineToolRow, ToolRow] = createReusableTemplate<{
  part: ToolPart
  streaming: boolean
}>()

function getSteps(message: ChatMessage) {
  return message.parts.filter(
    part => part.type === 'reasoning' || part.type === 'tool-runCommand',
  ) as Exclude<ChatPart, { type: 'text' }>[]
}
</script>

<template>
  <DefineReasoningRow v-slot="{ id, text: reasoning, running }">
    <TraceCollapsible
      :open="reasoningOpen[id] ?? running"
      @update:open="reasoningOpen[id] = $event"
    >
      <TraceCollapsibleTrigger>
        <TraceLine :status="running ? 'running' : undefined">
          <TraceIcon>
            <LoaderCircleIcon v-if="running" class="animate-spin" />
            <CircleCheckIcon v-else />
          </TraceIcon>
          <TraceTitle>{{ running ? 'Thinking' : 'Thought' }}</TraceTitle>
        </TraceLine>
      </TraceCollapsibleTrigger>
      <TraceCollapsibleContent class="whitespace-pre-wrap">
        {{ reasoning }}
      </TraceCollapsibleContent>
    </TraceCollapsible>
  </DefineReasoningRow>

  <DefineToolRow v-slot="{ part, streaming }">
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
    <TraceLine v-else :status="streaming ? 'running' : 'error'">
      <TraceIcon>
        <TerminalIcon />
      </TraceIcon>
      <TraceTitle>
        {{ streaming ? 'Running' : 'Failed to run' }} {{ part.input.command }}
      </TraceTitle>
    </TraceLine>
  </DefineToolRow>

  <MessageScrollerProvider>
    <div class="relative flex w-full flex-col gap-4 [[data-slot=preview]:has(&)]:bg-background [[data-slot=preview]:has(&)>div]:p-0!">
      <div class="flex h-200 w-full flex-col gap-4">
        <div class="flex items-start justify-between gap-4 p-8 pb-4">
          <div class="flex flex-col gap-1">
            <div class="font-medium">
              New Thread
            </div>
            <div class="text-sm text-muted-foreground">
              Ask the agent to change your code.
            </div>
          </div>
          <Tooltip>
            <TooltipTrigger as-child>
              <Button
                variant="outline"
                size="icon"
                aria-label="Reset conversation"
                :disabled="busy"
                @click="reset"
              >
                <RotateCwIcon />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Reset</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <div class="min-h-0 flex-1">
          <Empty v-if="messages.length === 0" class="h-full">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <MessageCircleDashedIcon />
              </EmptyMedia>
              <EmptyTitle>What should we build?</EmptyTitle>
              <EmptyDescription>
                The agent can read your code, run commands and make changes.
                Press send to start.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
          <MessageScroller v-else>
            <MessageScrollerViewport>
              <MessageScrollerContent :aria-busy="busy" class="gap-6 px-8 py-0">
                <template v-for="message in messages" :key="message.id">
                  <MessageScrollerItem
                    v-if="message.role === 'user'"
                    :message-id="message.id"
                    scroll-anchor
                    class="ms-anim-slide-up"
                  >
                    <Message align="end">
                      <MessageContent>
                        <Bubble align="end" variant="muted">
                          <BubbleContent>{{ getMessageText(message) }}</BubbleContent>
                        </Bubble>
                      </MessageContent>
                    </Message>
                  </MessageScrollerItem>
                  <MessageScrollerItem v-else :message-id="message.id">
                    <Message>
                      <MessageContent class="gap-3">
                        <Trace v-if="getSteps(message).length > 0">
                          <template
                            v-for="(part, index) in getSteps(message)"
                            :key="index"
                          >
                            <ReasoningRow
                              v-if="part.type === 'reasoning'"
                              :id="`${message.id}-${index}`"
                              :text="part.text"
                              :running="part.state === 'streaming'"
                            />
                            <ToolRow
                              v-else
                              :part="part"
                              :streaming="busy && message === messages.at(-1)"
                            />
                          </template>
                        </Trace>
                        <Markdown
                          v-if="getMessageText(message)"
                          :value="getMessageText(message)"
                          :streaming="busy && message === messages.at(-1)"
                        />
                      </MessageContent>
                    </Message>
                  </MessageScrollerItem>
                </template>
              </MessageScrollerContent>
            </MessageScrollerViewport>
            <MessageScrollerButton />
          </MessageScroller>
        </div>
        <div class="p-8 pt-0">
          <form ref="formRef" class="w-full" @submit.prevent="onSubmit">
            <InputGroup>
              <InputGroupTextarea
                v-model="text"
                placeholder="Ask the agent..."
                aria-label="Message"
                class="min-h-14"
                @keydown="onKeydown"
              />
              <InputGroupAddon align="block-end" class="pt-1">
                <DropdownMenu>
                  <DropdownMenuTrigger as-child>
                    <InputGroupButton
                      aria-label="Add context"
                      type="button"
                      size="icon-sm"
                      variant="outline"
                    >
                      <PlusIcon />
                    </InputGroupButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" side="top" class="w-44">
                    <DropdownMenuItem>
                      <PaperclipIcon />
                      Add Photos &amp; Files
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <TelescopeIcon />
                      Deep Research
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <GlobeIcon />
                      Web Search
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <InputGroupButton
                  type="submit"
                  variant="default"
                  size="icon-sm"
                  :disabled="!canSend"
                  class="ml-auto"
                >
                  <ArrowUpIcon />
                  <span class="sr-only">Send</span>
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
          </form>
        </div>
      </div>
    </div>
  </MessageScrollerProvider>
</template>
