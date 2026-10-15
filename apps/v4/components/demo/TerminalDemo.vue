<script setup lang="ts">
import { TerminalIcon } from '@lucide/vue'
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

interface ToolPart {
  toolCallId: string
  state: 'input-available' | 'output-available' | 'output-error'
  input: { command: string }
  output?: { exitCode: number }
  errorText?: string
}

const QUESTION = 'Run the checks, then build the app.'
const ANSWER = 'Lint and tests pass, and the build compiled both routes.'

const COMMANDS = [
  {
    id: 'lint',
    command: 'pnpm lint',
    output: ['> acme-chat@0.1.0 lint', '> eslint .'],
  },
  {
    id: 'test',
    command: 'pnpm test',
    output: [
      '> acme-chat@0.1.0 test',
      '> vitest run',
      '',
      ' ✓ utils/ai.test.ts (6 tests) 41ms',
      ' ✓ components/Chat.test.ts (9 tests) 212ms',
      '',
      ' Test Files  2 passed (2)',
      '      Tests  15 passed (15)',
    ],
  },
  {
    id: 'build',
    command: 'pnpm build',
    output: [
      '> acme-chat@0.1.0 build',
      '> nuxt build',
      '',
      'Nuxt 4.2.0 with Nitro 2.12.0',
      'ℹ Building client...',
      '✔ Client built in 4210ms',
      'ℹ Building server...',
      '✔ Server built in 1180ms',
      '',
      '✔ Generated public .output/public',
      '├─ .output/server/chunks/routes/index.mjs (1.9 kB)',
      '└─ .output/server/chunks/routes/api/chat.post.mjs (141 B)',
    ],
  },
]

function finalTools(): ToolPart[] {
  return COMMANDS.map(({ id, command }) => ({
    toolCallId: id,
    state: 'output-available',
    input: { command },
    output: { exitCode: 0 },
  }))
}

function finalOutputs() {
  return Object.fromEntries(COMMANDS.map(({ id, output }) => [id, output.join('\n')]))
}

const tools = ref<ToolPart[]>(finalTools())
// The data-terminal parts, keyed by the tool call id.
const outputs = ref<Record<string, string>>(finalOutputs())
const text = ref(ANSWER)
const busy = ref(false)
// Open the last command when the transcript is not streaming.
const openState = ref<Record<string, boolean>>({ build: true })

function getTitle(part: ToolPart, running: boolean) {
  const command = part.input.command

  if (part.state === 'output-available') {
    return part.output?.exitCode === 0
      ? `Ran ${command}`
      : `${command} exited with code ${part.output?.exitCode}`
  }

  return running ? `Running ${command}` : `Failed to run ${command}`
}

const rows = computed(() =>
  tools.value.map((part) => {
    const output = outputs.value[part.toolCallId] ?? ''
    const running = busy.value && part.state === 'input-available'
    const failed
      = !running
        && (part.state !== 'output-available' || part.output?.exitCode !== 0)

    return {
      id: part.toolCallId,
      title: getTitle(part, running),
      status: running ? 'running' as const : failed ? 'error' as const : undefined,
      open: openState.value[part.toolCallId] ?? (running && output.length > 0),
      output: part.state === 'output-error' ? part.errorText : output,
    }
  }),
)

let run = 0
const timers = new Set<ReturnType<typeof setTimeout>>()

function wait(ms: number, id: number) {
  return new Promise<boolean>((resolve) => {
    const timer = setTimeout(() => {
      timers.delete(timer)
      resolve(id === run)
    }, ms)
    timers.add(timer)
  })
}

async function replay() {
  const id = ++run
  busy.value = true
  tools.value = []
  outputs.value = {}
  text.value = ''
  openState.value = {}

  for (const { id: toolCallId, command, output } of COMMANDS) {
    tools.value.push({ toolCallId, state: 'input-available', input: { command } })

    // The tool streams its output as a data part with the tool call's id.
    for (let index = 0; index < output.length; index++) {
      outputs.value[toolCallId] = output.slice(0, index + 1).join('\n')
      if (!(await wait(200, id)))
        return
    }

    const part = tools.value.find(tool => tool.toolCallId === toolCallId)!
    part.state = 'output-available'
    part.output = { exitCode: 0 }
  }

  for (const word of ANSWER.split(/(?<= )/)) {
    if (!(await wait(20, id)))
      return
    text.value += word
  }

  busy.value = false
}

onBeforeUnmount(() => {
  run++
  timers.forEach(clearTimeout)
})
</script>

<template>
  <div class="flex min-h-72 w-full max-w-sm flex-col gap-4 py-6 text-sm">
    <Message align="end">
      <MessageContent>
        <Bubble align="end" variant="muted">
          <BubbleContent>{{ QUESTION }}</BubbleContent>
        </Bubble>
      </MessageContent>
    </Message>
    <Message v-if="rows.length > 0 || text">
      <MessageContent class="gap-4">
        <Trace v-if="rows.length > 0">
          <TraceCollapsible
            v-for="row in rows"
            :key="row.id"
            :open="row.open"
            @update:open="openState[row.id] = $event"
          >
            <TraceCollapsibleTrigger>
              <TraceLine :status="row.status">
                <TraceIcon>
                  <TerminalIcon />
                </TraceIcon>
                <TraceTitle>{{ row.title }}</TraceTitle>
              </TraceLine>
            </TraceCollapsibleTrigger>
            <TraceCollapsibleContent>
              <CodeBlock size="sm">
                <CodeBlockContent wrap class="max-h-64">
                  {{ row.output }}
                </CodeBlockContent>
              </CodeBlock>
            </TraceCollapsibleContent>
          </TraceCollapsible>
        </Trace>
        <p v-if="text">
          {{ text }}
        </p>
      </MessageContent>
    </Message>
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
