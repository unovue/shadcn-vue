<script setup lang="ts">
import { FileCodeIcon, LayersIcon, TerminalIcon } from '@lucide/vue'
import { onBeforeUnmount, ref } from 'vue'
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

type ToolPart
  = | { toolCallId: string, state: 'input-available', input: { command: string } }
    | {
      toolCallId: string
      state: 'output-available'
      input: { command: string }
      output: { stdout: string }
    }
    | {
      toolCallId: string
      state: 'output-error'
      input: { command: string }
      errorText: string
      error: ReturnType<typeof parseStack>
    }

const QUESTION = 'Reset the database and seed it.'
const ANSWER
  = 'The migrations ran, but the seed failed in seedUsers. One fixture has no profile, so profile.email is undefined.'

const STACK = `TypeError: Cannot read properties of undefined (reading 'email')
    at seedUsers (prisma/seed.ts:27:34)
    at main (prisma/seed.ts:51:9)
    at Module._compile (node:internal/modules/cjs/loader:1554:14)
    at Object.transformer (node_modules/tsx/dist/register.cjs:3:1104)
    at Module.load (node:internal/modules/cjs/loader:1289:32)
    at process.processTicksAndRejections (node:internal/process/task_queues:105:5)`

const RESET_OUTPUT = `Database reset successful

The following migrations have been applied:

migrations/
  └─ 20260912_init/
  └─ 20260920_add_profiles/`

function parseFrame(line: string) {
  const match = line.match(/^at (.+) \((.+):(\d+):(\d+)\)$/)

  return {
    line,
    name: match?.[1],
    file: match?.[2],
    lineNumber: match?.[3],
    internal: line.includes('node_modules') || line.includes('node:'),
  }
}

function parseStack(stack: string) {
  const [error, ...lines] = stack.split('\n').map(line => line.trim())
  const frames = lines.map(parseFrame)

  return {
    error,
    appFrames: frames.filter(frame => !frame.internal),
    internalFrames: frames.filter(frame => frame.internal),
  }
}

function finalTools(): ToolPart[] {
  return [
    {
      toolCallId: 'reset',
      state: 'output-available',
      input: { command: 'pnpm prisma migrate reset --skip-seed' },
      output: { stdout: RESET_OUTPUT },
    },
    {
      toolCallId: 'seed',
      state: 'output-error',
      input: { command: 'pnpm prisma db seed' },
      errorText: STACK,
      error: parseStack(STACK),
    },
  ]
}

const tools = ref<ToolPart[]>(finalTools())
const text = ref(ANSWER)
const busy = ref(false)

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
  text.value = ''

  const [reset, seed] = finalTools()

  tools.value = [{ toolCallId: reset!.toolCallId, state: 'input-available', input: reset!.input }]
  if (!(await wait(900, id)))
    return
  tools.value = [reset!]

  tools.value = [reset!, { toolCallId: seed!.toolCallId, state: 'input-available', input: seed!.input }]
  if (!(await wait(1200, id)))
    return
  tools.value = [reset!, seed!]

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
    <Message v-if="tools.length > 0 || text">
      <MessageContent class="gap-4">
        <Trace v-if="tools.length > 0">
          <template v-for="part in tools" :key="part.toolCallId">
            <TraceCollapsible v-if="part.state === 'output-error'" default-open>
              <TraceCollapsibleTrigger>
                <TraceLine status="error">
                  <TraceIcon>
                    <TerminalIcon />
                  </TraceIcon>
                  <TraceTitle>Failed: {{ part.error.error }}</TraceTitle>
                </TraceLine>
              </TraceCollapsibleTrigger>
              <TraceCollapsibleContent class="flex flex-col gap-2">
                <p class="font-mono text-xs text-destructive">
                  {{ part.error.error }}
                </p>
                <Trace>
                  <a
                    v-for="frame in part.error.appFrames"
                    :key="frame.line"
                    :href="`#${frame.file}:${frame.lineNumber}`"
                  >
                    <TraceLine>
                      <TraceIcon>
                        <FileCodeIcon />
                      </TraceIcon>
                      <TraceTitle>
                        {{ frame.name }} in {{ frame.file }}:{{ frame.lineNumber }}
                      </TraceTitle>
                    </TraceLine>
                  </a>
                  <TraceCollapsible>
                    <TraceCollapsibleTrigger>
                      <TraceLine>
                        <TraceIcon>
                          <LayersIcon />
                        </TraceIcon>
                        <TraceTitle>
                          {{ part.error.internalFrames.length }} framework frames
                        </TraceTitle>
                      </TraceLine>
                    </TraceCollapsibleTrigger>
                    <TraceCollapsibleContent>
                      <ol class="flex flex-col gap-1 overflow-x-auto rounded-md bg-muted p-3 font-mono text-xs">
                        <li
                          v-for="frame in part.error.internalFrames"
                          :key="frame.line"
                          class="whitespace-nowrap"
                        >
                          {{ frame.line }}
                        </li>
                      </ol>
                    </TraceCollapsibleContent>
                  </TraceCollapsible>
                </Trace>
              </TraceCollapsibleContent>
            </TraceCollapsible>
            <TraceCollapsible v-else-if="part.state === 'output-available'">
              <TraceCollapsibleTrigger>
                <TraceLine>
                  <TraceIcon>
                    <TerminalIcon />
                  </TraceIcon>
                  <TraceTitle>Ran {{ part.input.command }}</TraceTitle>
                </TraceLine>
              </TraceCollapsibleTrigger>
              <TraceCollapsibleContent>
                <CodeBlock size="sm">
                  <CodeBlockContent wrap class="max-h-64">
                    {{ part.output.stdout }}
                  </CodeBlockContent>
                </CodeBlock>
              </TraceCollapsibleContent>
            </TraceCollapsible>
            <TraceLine v-else :status="busy ? 'running' : 'error'">
              <TraceIcon>
                <TerminalIcon />
              </TraceIcon>
              <TraceTitle>
                {{ busy ? 'Running' : 'Failed to run' }} {{ part.input.command }}
              </TraceTitle>
            </TraceLine>
          </template>
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
