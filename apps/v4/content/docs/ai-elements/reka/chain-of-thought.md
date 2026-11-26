---
title: Chain of Thought
description: Displays a summary that expands into the steps an agent took.
component: true
new: true
---

::component-preview
---
name: ChainOfThoughtDemo
class: style-rhea
previewClass: h-auto
---
::

Chain of Thought is a summary line that expands into the steps an agent took. The summary says what happened, like "Researched in 3 steps". The steps sit inside it, each one a line of its own.

Chain of Thought is built with `Trace` with a `TraceCollapsible` for the summary.

## Installation

Chain of Thought is built with the [Trace](/docs/components/trace), [Code Block](/docs/components/code-block) and [Badge](/docs/components/badge) components.

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
npx shadcn-vue@latest add trace code-block badge
```

::

::::tabs-content{value="manual"}
  :::steps
    ::step
    Install the required shadcn-vue dependencies:
    ::

    ```bash
    npx shadcn-vue@latest add collapsible code-block badge
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
import { CircleCheckIcon } from '@lucide/vue'
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
    <TraceCollapsible default-open :unmount-on-hide="false">
      <TraceCollapsibleTrigger>
        <TraceLine>
          <TraceIcon>
            <CircleCheckIcon />
          </TraceIcon>
          <TraceTitle>Researched in 3 steps</TraceTitle>
        </TraceLine>
      </TraceCollapsibleTrigger>
      <TraceCollapsibleContent>
        <Trace>
          <TraceLine>
            <TraceIcon>
              <CircleCheckIcon />
            </TraceIcon>
            <TraceTitle>Read the build log for dpl_8Kx2</TraceTitle>
          </TraceLine>
          <TraceLine>
            <TraceIcon>
              <CircleCheckIcon />
            </TraceIcon>
            <TraceTitle>Searched the web for next.js image cache key</TraceTitle>
          </TraceLine>
          <TraceLine>
            <TraceIcon>
              <CircleCheckIcon />
            </TraceIcon>
            <TraceTitle>Searched the code for cacheKey</TraceTitle>
          </TraceLine>
        </Trace>
      </TraceCollapsibleContent>
    </TraceCollapsible>
  </Trace>
</template>
```

## Steps

Each step is a `TraceLine`. Set its `status` and write the title in the matching tense.

| Step              | `status`    | Title                         |
| ----------------- | ----------- | ----------------------------- |
| Running           | `"running"` | Searching for …               |
| Done, with detail | none        | Searched for …                |
| Done, links out   | none        | Read the Image component docs |
| Failed            | `"error"`   | Failed to search for …        |

Set `:unmount-on-hide="false"` on the summary's `TraceCollapsible`. Steps keep their open state when the summary closes.

## Search Results

When a step runs a web search, show the results as a `Badge` for each hostname in the step's content.

```vue showLineNumbers
<script setup lang="ts">
function getHostname(url: string) {
  return new URL(url).hostname
}
</script>

<template>
  <TraceCollapsibleContent class="flex flex-wrap gap-1.5">
    <Badge v-for="result in results" :key="result.url" variant="secondary">
      {{ getHostname(result.url) }}
    </Badge>
  </TraceCollapsibleContent>
</template>
```

## AI SDK

Render each tool part as a step. `running` is true while tool parts stream and before the reply starts. Set the summary's status and title from the steps. The summary opens while the steps run, as in [Trace](/docs/components/trace#open-state).

```vue showLineNumbers
<script setup lang="ts">
import { computed, ref } from 'vue'

const props = defineProps<{
  steps: StepPart[]
  streaming: boolean
  answering: boolean
}>()

const open = ref<boolean>()
const running = computed(() => props.streaming && !props.answering)
const failed = computed(
  () => props.steps.filter(part => part.state === 'output-error').length,
)
</script>

<template>
  <TraceCollapsible
    :open="open ?? running"
    :unmount-on-hide="false"
    @update:open="open = $event"
  >
    <TraceCollapsibleTrigger>
      <TraceLine :status="running ? 'running' : failed > 0 ? 'error' : undefined">
        <TraceTitle>
          {{ running ? 'Researching' : `Researched in ${steps.length} steps` }}
        </TraceTitle>
      </TraceLine>
    </TraceCollapsibleTrigger>
    <TraceCollapsibleContent>
      <Trace>
        <StepLine
          v-for="part in steps"
          :key="part.toolCallId"
          :part="part"
          :streaming="streaming"
        />
      </Trace>
    </TraceCollapsibleContent>
  </TraceCollapsible>
</template>
```

`StepLine` renders one tool part as a `TraceLine`, as in [Tool](/docs/ai-elements/tool#states).

## Migrating from AI Elements Vue

If you added ChainOfThought from [AI Elements Vue](https://www.ai-elements-vue.com), your project has a `components/ai-elements/chain-of-thought/` folder. Paste this prompt into your coding agent to rebuild it on Trace and Badge. Every export keeps its name and props, so the code that uses it keeps working.

```txt
Migrate components/ai-elements/chain-of-thought/ from AI Elements Vue to the shadcn-vue Trace and Badge components.

Keep every export, with the same name, props and emits, so the code that imports it keeps working. Only change how each part renders.

1. Install the components: npx shadcn-vue@latest add trace badge
2. Read https://www.shadcn-vue.com/docs/ai-elements/chain-of-thought and build Chain of Thought the same way.
3. Rebuild each part:
   - ChainOfThought.vue renders a Trace with a TraceCollapsible. Pass open, defaultOpen and the update:open emit to the TraceCollapsible.
   - ChainOfThoughtHeader.vue renders a TraceCollapsibleTrigger with a TraceLine, a TraceIcon and a TraceTitle, like "Researched in 3 steps".
   - ChainOfThoughtContent.vue renders a TraceCollapsibleContent with a Trace for the steps. Set :unmount-on-hide="false" on the TraceCollapsible so the steps stay mounted.
   - ChainOfThoughtStep.vue renders a TraceLine. Its icon goes in a TraceIcon, its label in a TraceTitle and its description in a TraceDescription. Map status "active" to "running", "pending" to "pending", and "complete" to no status.
   - ChainOfThoughtSearchResults.vue renders a flex-wrap list, and ChainOfThoughtSearchResult.vue a Badge with variant="secondary".
   - Keep ChainOfThoughtImage.vue as it is.
4. Remove the imports the files no longer use.
5. Run vue-tsc and fix any errors.
```

## API Reference

See [Trace](/docs/components/trace#api-reference).
