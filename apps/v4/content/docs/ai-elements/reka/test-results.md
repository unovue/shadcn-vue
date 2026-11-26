---
title: Test Results
description: Displays a test run by the agent, with its suites and failures.
component: true
new: true
---

::component-preview
---
name: TestResultsDemo
class: style-rhea
previewClass: h-auto
---
::

Test Results is a test run by the agent. The summary line counts what passed and failed. Open it to see each suite, its tests, and the error for each failure.

Test Results is built with `Trace` with a `TraceCollapsible` for the run and for each suite.

## Installation

Test Results is built with the [Trace](/docs/components/trace) and [Code Block](/docs/components/code-block) components.

:::::code-tabs

:::tabs-list

  ::tabs-trigger{value="cli"}
  CLI
  ::

  ::tabs-trigger{value="manual"}
  Manual
  ::

:::

::tabs-content{value="cli"}

```bash
npx shadcn-vue@latest add trace code-block
```

::

::::tabs-content{value="manual"}
  :::steps
    ::step
    Install the required shadcn-vue dependencies:
    ::

    ```bash
    npx shadcn-vue@latest add collapsible code-block
    ```

    ::step
    Copy and paste the [GitHub source code](https://github.com/unovue/shadcn-vue/tree/dev/apps/v4/registry/bases/reka/ui/trace) into your project.
    ::

    ::step
    Update the import paths to match your project setup.
    ::
  :::
::::

:::::

## Usage

```vue showLineNumbers
<script setup lang="ts">
import { CheckIcon, FlaskConicalIcon, XIcon } from '@lucide/vue'
import { CodeBlock, CodeBlockContent } from '@/components/ui/code-block'
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from '@/components/ui/trace'
</script>

<template>
  <Trace>
    <TraceCollapsible>
      <TraceCollapsibleTrigger>
        <TraceLine status="error">
          <TraceIcon>
            <FlaskConicalIcon />
          </TraceIcon>
          <TraceTitle>Ran 2 tests, 1 failed</TraceTitle>
        </TraceLine>
      </TraceCollapsibleTrigger>
      <TraceCollapsibleContent>
        <Trace>
          <TraceLine>
            <TraceIcon>
              <CheckIcon />
            </TraceIcon>
            <TraceTitle>creates a user</TraceTitle>
          </TraceLine>
          <TraceCollapsible>
            <TraceCollapsibleTrigger>
              <TraceLine status="error">
                <TraceIcon>
                  <XIcon />
                </TraceIcon>
                <TraceTitle>updates a user profile</TraceTitle>
              </TraceLine>
            </TraceCollapsibleTrigger>
            <TraceCollapsibleContent>
              <CodeBlock size="sm">
                <CodeBlockContent wrap class="max-h-64">
                  Expected status 200, received 500
                </CodeBlockContent>
              </CodeBlock>
            </TraceCollapsibleContent>
          </TraceCollapsible>
        </Trace>
      </TraceCollapsibleContent>
    </TraceCollapsible>
  </Trace>
</template>
```

## Suites

Group tests by file. Each suite is a collapsible line with a `Trace` of its tests. Open the suites that have a failure.

::component-preview
---
name: TestResultsSuitesDemo
class: style-rhea
previewClass: h-auto
---
::

```vue showLineNumbers
<template>
  <TraceCollapsible :default-open="failed > 0">
    <TraceCollapsibleTrigger>
      <TraceLine :status="failed > 0 ? 'error' : undefined">
        <TraceIcon>
          <FileCodeIcon />
        </TraceIcon>
        <TraceTitle>user-api.test.ts, 14 tests, 2 failed</TraceTitle>
      </TraceLine>
    </TraceCollapsibleTrigger>
    <TraceCollapsibleContent>
      <Trace>…</Trace>
    </TraceCollapsibleContent>
  </TraceCollapsible>
</template>
```

## AI SDK

Run the tests as a tool and render its output. The tool states map the same way as in [Tool](/docs/ai-elements/tool#states).

```vue showLineNumbers
<script setup lang="ts">
const tests = computed(() => props.part.output.suites.flatMap(suite => suite.tests))
const failed = computed(() => tests.value.filter(test => test.status === 'failed').length)
</script>

<template>
  <TraceCollapsible :default-open="failed > 0">
    <TraceCollapsibleTrigger>
      <TraceLine :status="failed > 0 ? 'error' : undefined">
        <TraceIcon>
          <FlaskConicalIcon />
        </TraceIcon>
        <TraceTitle>
          Ran {{ tests.length }} tests<template v-if="failed > 0">, {{ failed }} failed</template>
        </TraceTitle>
      </TraceLine>
    </TraceCollapsibleTrigger>
    <TraceCollapsibleContent>…</TraceCollapsibleContent>
  </TraceCollapsible>
</template>
```

## Migrating from AI Elements Vue

If you added Test Results from [AI Elements Vue](https://www.ai-elements-vue.com), your project has a `components/ai-elements/test-results/` folder. Paste this prompt into your coding agent to rebuild it on Trace and Code Block. Every export keeps its name and props, so the code that uses it keeps working.

```txt
Migrate components/ai-elements/test-results/ from AI Elements Vue to the shadcn-vue Trace and Code Block components.

Keep every export, with the same name and props, so the code that imports it keeps working. Only change how each part renders.

1. Install the components: npx shadcn-vue@latest add trace code-block
2. Read https://www.shadcn-vue.com/docs/ai-elements/test-results and build Test Results the same way.
3. Rebuild each part:
   - Import CodeBlock and CodeBlockContent from @/components/ui/code-block, not from ../code-block.
   - TestResults renders a Trace with a TraceCollapsible. Keep summary.
   - TestResultsHeader renders a TraceCollapsibleTrigger with a TraceLine, and TestResultsSummary a TraceTitle with the counts, like "Ran 42 tests, 2 failed". Set status="error" when a test failed.
   - TestResultsContent renders a TraceCollapsibleContent with a Trace for the suites.
   - TestSuite renders a TraceCollapsible, open when it has a failure. TestSuiteName renders a TraceCollapsibleTrigger with a TraceLine, and TestSuiteContent a TraceCollapsibleContent with a Trace for the tests.
   - Test renders a TraceLine with a TraceTitle for its name. Set status="error" when it failed.
   - TestError renders a CodeBlock with size="sm", with TestErrorMessage and TestErrorStack in a CodeBlockContent.
   - Keep TestResultsDuration, TestResultsProgress, TestSuiteStats, TestName, TestDuration and TestStatus as they are.
4. Remove the imports the files no longer use.
5. Run vue-tsc and fix any errors.
```

## API Reference

See [Trace](/docs/components/trace#api-reference).
