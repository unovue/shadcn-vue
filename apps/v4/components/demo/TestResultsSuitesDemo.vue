<script setup lang="ts">
import {
  CheckIcon,
  CircleDashedIcon,
  FileCodeIcon,
  FlaskConicalIcon,
  XIcon,
} from '@lucide/vue'
import { CodeBlock, CodeBlockContent } from '@/registry/bases/reka/ui/code-block'
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

const suites: { name: string, tests: Test[] }[] = [
  {
    name: 'auth.test.ts',
    tests: [
      { name: 'logs in with valid credentials', status: 'passed' },
      { name: 'rejects an invalid password', status: 'passed' },
      { name: 'refreshes an expired token', status: 'passed' },
    ],
  },
  {
    name: 'user-api.test.ts',
    tests: [
      { name: 'creates a user', status: 'passed' },
      {
        name: 'updates a user profile',
        status: 'failed',
        error: `Expected status 200, received 500

  at Object.<anonymous> (src/user-api.test.ts:45:12)`,
      },
      { name: 'deletes a user', status: 'skipped' },
    ],
  },
  {
    name: 'db.test.ts',
    tests: [
      { name: 'connects to the database', status: 'passed' },
      {
        name: 'times out a slow query',
        status: 'failed',
        error: `Exceeded timeout of 5000 ms for a test.

  at Object.<anonymous> (src/db.test.ts:22:3)`,
      },
    ],
  },
]

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

const summary = countTests(suites.flatMap(suite => suite.tests))
</script>

<template>
  <Trace class="max-w-sm">
    <TraceCollapsible default-open :unmount-on-hide="false">
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
            :default-open="countTests(suite.tests).failed > 0"
            :unmount-on-hide="false"
          >
            <TraceCollapsibleTrigger>
              <TraceLine :status="countTests(suite.tests).failed > 0 ? 'error' : undefined">
                <TraceIcon>
                  <FileCodeIcon />
                </TraceIcon>
                <TraceTitle>
                  {{ suite.name }}, {{ formatCounts(countTests(suite.tests)) }}
                </TraceTitle>
              </TraceLine>
            </TraceCollapsibleTrigger>
            <TraceCollapsibleContent>
              <Trace>
                <template v-for="test in suite.tests" :key="test.name">
                  <TraceCollapsible v-if="test.status === 'failed'">
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
  </Trace>
</template>
