<script setup lang="ts">
import {
  CheckIcon,
  CircleDashedIcon,
  FileCodeIcon,
  FlaskConicalIcon,
  XIcon,
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

interface Test {
  name: string
  status: 'passed' | 'failed' | 'skipped'
  error?: string
}

interface ToolPart {
  toolCallId: string
  state: 'input-available' | 'output-available' | 'output-error'
  input: { command: string }
  output?: { suites: { name: string, tests: Test[] }[] }
}

const QUESTION = 'Run the checkout tests.'
const ANSWER
  = 'One test failed. The payment client does not retry a declined card, so the second charge attempt never happens.'

const OUTPUT: NonNullable<ToolPart['output']> = {
  suites: [
    {
      name: 'cart.test.ts',
      tests: [
        { name: 'adds an item', status: 'passed' },
        { name: 'removes an item', status: 'passed' },
        { name: 'applies a discount code', status: 'passed' },
      ],
    },
    {
      name: 'payment.test.ts',
      tests: [
        { name: 'charges the saved card', status: 'passed' },
        {
          name: 'retries a declined card',
          status: 'failed',
          error: `Expected 2 charge attempts, received 1

  at Object.<anonymous> (src/payment.test.ts:58:22)`,
        },
      ],
    },
  ],
}

const part = ref<ToolPart | undefined>({
  toolCallId: 'tests',
  state: 'output-available',
  input: { command: 'pnpm test checkout' },
  output: OUTPUT,
})
const text = ref(ANSWER)
const busy = ref(false)

function countTests(tests: Test[]) {
  return {
    total: tests.length,
    failed: tests.filter(test => test.status === 'failed').length,
    skipped: tests.filter(test => test.status === 'skipped').length,
  }
}

function formatCounts({ total, failed, skipped }: ReturnType<typeof countTests>) {
  return [
    `${total} tests`,
    failed > 0 && `${failed} failed`,
    skipped > 0 && `${skipped} skipped`,
  ]
    .filter(Boolean)
    .join(', ')
}

const suites = computed(() =>
  (part.value?.output?.suites ?? []).map(suite => ({
    ...suite,
    counts: countTests(suite.tests),
  })),
)
const summary = computed(() =>
  countTests(suites.value.flatMap(suite => suite.tests)),
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
  text.value = ''

  part.value = {
    toolCallId: 'tests',
    state: 'input-available',
    input: { command: 'pnpm test checkout' },
  }
  if (!(await wait(1500, id)))
    return
  part.value = { ...part.value, state: 'output-available', output: OUTPUT }

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
    <Message v-if="part || text">
      <MessageContent class="gap-4">
        <Trace v-if="part">
          <TraceCollapsible
            v-if="part.state === 'output-available'"
            :default-open="summary.failed > 0"
            :unmount-on-hide="false"
          >
            <TraceCollapsibleTrigger>
              <TraceLine :status="summary.failed > 0 ? 'error' : undefined">
                <TraceIcon>
                  <FlaskConicalIcon />
                </TraceIcon>
                <TraceTitle>Ran {{ formatCounts(summary) }}</TraceTitle>
              </TraceLine>
            </TraceCollapsibleTrigger>
            <TraceCollapsibleContent>
              <Trace>
                <TraceCollapsible
                  v-for="suite in suites"
                  :key="suite.name"
                  :default-open="suite.counts.failed > 0"
                  :unmount-on-hide="false"
                >
                  <TraceCollapsibleTrigger>
                    <TraceLine :status="suite.counts.failed > 0 ? 'error' : undefined">
                      <TraceIcon>
                        <FileCodeIcon />
                      </TraceIcon>
                      <TraceTitle>
                        {{ suite.name }}, {{ formatCounts(suite.counts) }}
                      </TraceTitle>
                    </TraceLine>
                  </TraceCollapsibleTrigger>
                  <TraceCollapsibleContent>
                    <Trace>
                      <template v-for="test in suite.tests" :key="test.name">
                        <TraceCollapsible v-if="test.status === 'failed'" default-open>
                          <TraceCollapsibleTrigger>
                            <TraceLine status="error">
                              <TraceIcon>
                                <XIcon />
                              </TraceIcon>
                              <TraceTitle>{{ test.name }}</TraceTitle>
                            </TraceLine>
                          </TraceCollapsibleTrigger>
                          <TraceCollapsibleContent>
                            <CodeBlock size="sm">
                              <CodeBlockContent wrap class="max-h-64">
                                {{ test.error }}
                              </CodeBlockContent>
                            </CodeBlock>
                          </TraceCollapsibleContent>
                        </TraceCollapsible>
                        <TraceLine v-else>
                          <TraceIcon>
                            <CircleDashedIcon v-if="test.status === 'skipped'" />
                            <CheckIcon v-else />
                          </TraceIcon>
                          <TraceTitle>
                            {{ test.status === 'skipped' ? `Skipped ${test.name}` : test.name }}
                          </TraceTitle>
                        </TraceLine>
                      </template>
                    </Trace>
                  </TraceCollapsibleContent>
                </TraceCollapsible>
              </Trace>
            </TraceCollapsibleContent>
          </TraceCollapsible>
          <TraceLine
            v-else
            :status="busy && part.state !== 'output-error' ? 'running' : 'error'"
          >
            <TraceIcon>
              <FlaskConicalIcon />
            </TraceIcon>
            <TraceTitle>
              {{ busy && part.state !== 'output-error' ? 'Running' : 'Failed to run' }} {{ part.input.command }}
            </TraceTitle>
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
