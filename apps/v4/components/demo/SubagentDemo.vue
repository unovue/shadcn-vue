<script setup lang="ts">
import {
  CircleAlertIcon,
  CircleCheckIcon,
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

type SubagentPart
  = | { type: 'text', text: string }
    | {
      type: 'tool-runCommand'
      toolCallId: string
      state: 'input-available'
      input: { command: string }
    }
    | {
      type: 'tool-runCommand'
      toolCallId: string
      state: 'output-available'
      input: { command: string }
      output: { stdout: string }
    }

interface AgentPart {
  state: 'input-available' | 'output-available' | 'output-error'
  preliminary?: boolean
  output?: { parts: SubagentPart[] }
}

const QUESTION = 'Why does image optimization rerun on every deploy?'
const REPORT
  = 'The cache is keyed on the commit SHA, so every deploy misses it and optimizes all 1,240 images again.'
const ANSWER
  = 'Image optimization reruns because its cache is keyed on the commit SHA, which changes on every deploy. Key the cache on a hash of public/images instead, and unchanged images will be skipped.'

const steps = [
  {
    command: 'grep -rn cacheKey scripts',
    stdout:
      'scripts/optimize-images.ts:14:  const cacheKey = process.env.COMMIT_SHA',
  },
  {
    command: 'sed -n 13,15p scripts/optimize-images.ts',
    stdout:
      'const cacheDir = ".nuxt/cache/images"\nconst cacheKey = process.env.COMMIT_SHA\nconst cached = await restoreCache(cacheDir, cacheKey)',
  },
  {
    command: 'ls public/images | wc -l',
    stdout: '1240',
  },
]

function getSubagentParts(done: number, report?: string): SubagentPart[] {
  const parts: SubagentPart[] = steps.slice(0, done).map((step, index) => ({
    type: 'tool-runCommand',
    toolCallId: `step-${index}`,
    state: 'output-available',
    input: { command: step.command },
    output: { stdout: step.stdout },
  }))

  if (done < steps.length) {
    parts.push({
      type: 'tool-runCommand',
      toolCallId: `step-${done}`,
      state: 'input-available',
      input: { command: steps[done]!.command },
    })
  }

  if (report)
    parts.push({ type: 'text', text: report })

  return parts
}

const agent = ref<AgentPart | undefined>({
  state: 'output-available',
  output: { parts: getSubagentParts(steps.length, REPORT) },
})
const text = ref(ANSWER)
const busy = ref(false)

const row = computed(() => {
  const part = agent.value
  if (!part)
    return undefined

  const done = part.state === 'output-available' && !part.preliminary
  const running = !done && part.state !== 'output-error' && busy.value
  const parts = part.state === 'output-available' ? part.output?.parts ?? [] : []
  const report = parts
    .map(agentPart => (agentPart.type === 'text' ? agentPart.text : ''))
    .join('')

  return {
    done,
    running,
    status: done ? undefined : running ? 'running' as const : 'error' as const,
    title: `${done ? 'Ran' : running ? 'Running' : 'Failed to run'} the research subagent`,
    steps: parts.filter(agentPart => agentPart.type === 'tool-runCommand'),
    hasParts: parts.length > 0,
    report,
  }
})

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
  agent.value = undefined
  text.value = ''

  agent.value = { state: 'input-available' }
  if (!(await wait(600, id)))
    return

  for (let index = 0; index < steps.length; index++) {
    agent.value = {
      state: 'output-available',
      preliminary: true,
      output: { parts: getSubagentParts(index) },
    }
    if (!(await wait(1000, id)))
      return
  }

  agent.value = {
    state: 'output-available',
    output: { parts: getSubagentParts(steps.length, REPORT) },
  }
  if (!(await wait(400, id)))
    return

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
    <Message v-if="row || text">
      <MessageContent class="gap-4">
        <Trace v-if="row">
          <TraceCollapsible
            v-if="row.hasParts"
            default-open
            :unmount-on-hide="false"
          >
            <TraceCollapsibleTrigger>
              <TraceLine :status="row.status">
                <TraceIcon>
                  <CircleCheckIcon v-if="row.done" />
                  <LoaderCircleIcon v-else-if="row.running" class="animate-spin" />
                  <CircleAlertIcon v-else />
                </TraceIcon>
                <TraceTitle>{{ row.title }}</TraceTitle>
              </TraceLine>
            </TraceCollapsibleTrigger>
            <TraceCollapsibleContent class="flex flex-col gap-3">
              <Trace>
                <template v-for="step in row.steps" :key="step.toolCallId">
                  <TraceCollapsible v-if="step.state === 'output-available'">
                    <TraceCollapsibleTrigger>
                      <TraceLine>
                        <TraceIcon>
                          <CircleCheckIcon />
                        </TraceIcon>
                        <TraceTitle>Ran {{ step.input.command }}</TraceTitle>
                      </TraceLine>
                    </TraceCollapsibleTrigger>
                    <TraceCollapsibleContent>
                      <CodeBlock size="sm">
                        <CodeBlockContent wrap class="max-h-64">
                          {{ step.output.stdout }}
                        </CodeBlockContent>
                      </CodeBlock>
                    </TraceCollapsibleContent>
                  </TraceCollapsible>
                  <TraceLine v-else :status="row.running ? 'running' : 'error'">
                    <TraceIcon>
                      <LoaderCircleIcon v-if="row.running" class="animate-spin" />
                      <CircleAlertIcon v-else />
                    </TraceIcon>
                    <TraceTitle>
                      {{ row.running ? 'Running' : 'Failed to run' }} {{ step.input.command }}
                    </TraceTitle>
                  </TraceLine>
                </template>
              </Trace>
              <p v-if="row.report">
                {{ row.report }}
              </p>
            </TraceCollapsibleContent>
          </TraceCollapsible>
          <TraceLine v-else :status="row.status">
            <TraceIcon>
              <CircleCheckIcon v-if="row.done" />
              <LoaderCircleIcon v-else-if="row.running" class="animate-spin" />
              <CircleAlertIcon v-else />
            </TraceIcon>
            <TraceTitle>{{ row.title }}</TraceTitle>
          </TraceLine>
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
