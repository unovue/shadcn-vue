---
title: Reasoning
description: Displays the agent's thinking as it streams.
component: true
new: true
---

::component-preview
---
name: ReasoningDemo
class: style-rhea
previewClass: h-auto
---
::

Reasoning is a line for the agent's thinking. It reads "Thinking" and opens while the model thinks, then reads "Thought" and closes when it is done. The thinking itself sits inside, and the line can show how long it took.

Reasoning is built with `Trace` with a `TraceCollapsible` for the thinking.

## Installation

Reasoning is built with the [Trace](/docs/components/trace) component.

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
npx shadcn-vue@latest add trace
```

::

::::tabs-content{value="manual"}
  :::steps
    ::step
    Install the required shadcn-vue dependencies:
    ::

    ```bash
    npx shadcn-vue@latest add collapsible
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
    <TraceCollapsible>
      <TraceCollapsibleTrigger>
        <TraceLine>
          <TraceIcon>
            <CircleCheckIcon />
          </TraceIcon>
          <TraceTitle>Thought</TraceTitle>
        </TraceLine>
      </TraceCollapsibleTrigger>
      <TraceCollapsibleContent class="whitespace-pre-wrap">
        {{ text }}
      </TraceCollapsibleContent>
    </TraceCollapsible>
  </Trace>
</template>
```

## Duration

The AI SDK does not time reasoning. Measure it on the server, send it as message metadata, and show it in a `TraceDescription` after the title.

::component-preview
---
name: ReasoningDurationDemo
class: style-rhea
previewClass: h-auto
---
::

```vue showLineNumbers
<template>
  <TraceLine>
    <TraceIcon>
      <CircleCheckIcon />
    </TraceIcon>
    <TraceTitle>Thought</TraceTitle>
    <TraceDescription>{{ seconds }}s</TraceDescription>
  </TraceLine>
</template>
```

## AI SDK

Render each `reasoning` part as a line. It starts as a plain `TraceLine` and becomes a `TraceCollapsible` once text arrives, so there is nothing to open before the model has written anything. It opens while the model thinks and closes when it finishes. If the person opens or closes it, their choice wins. See [Open State](/docs/components/trace#open-state).

```vue showLineNumbers title="components/ReasoningLine.vue"
<script setup lang="ts">
import { CircleCheckIcon, LoaderCircleIcon } from '@lucide/vue'
import { ref } from 'vue'
import {
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from '@/components/ui/trace'

defineProps<{
  text: string
  running: boolean
}>()

const open = ref<boolean>()
</script>

<template>
  <TraceLine v-if="text.length === 0" :status="running ? 'running' : undefined">
    <TraceIcon>
      <LoaderCircleIcon v-if="running" class="animate-spin" />
      <CircleCheckIcon v-else />
    </TraceIcon>
    <TraceTitle>{{ running ? 'Thinking' : 'Thought' }}</TraceTitle>
  </TraceLine>
  <TraceCollapsible v-else :open="open ?? running" @update:open="open = $event">
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
      {{ text }}
    </TraceCollapsibleContent>
  </TraceCollapsible>
</template>
```

```vue showLineNumbers
<template>
  <Trace>
    <ReasoningLine
      v-for="(part, index) in message.parts.filter(part => part.type === 'reasoning')"
      :key="index"
      :text="part.text"
      :running="streaming && part.state === 'streaming'"
    />
  </Trace>
</template>
```

Some models send several reasoning parts in one message. Each one is a line in the same `Trace`.

## Migrating from AI Elements Vue

If you added Reasoning from [AI Elements Vue](https://www.ai-elements-vue.com), your project has a `components/ai-elements/reasoning/` folder. Paste this prompt into your coding agent to rebuild it on Trace. Every export keeps its name and props, so the code that uses it keeps working.

```txt
Migrate components/ai-elements/reasoning/ from AI Elements Vue to the shadcn-vue Trace component.

Keep every export, with the same name, props and emits, so the code that imports it keeps working. Only change how each part renders.

1. Install Trace: npx shadcn-vue@latest add trace
2. Read https://www.shadcn-vue.com/docs/ai-elements/reasoning and build Reasoning the same way.
3. Rebuild each part:
   - Reasoning.vue renders a Trace with a TraceCollapsible. Keep isStreaming, open, defaultOpen, the update:open emit and duration, and the reasoning context it provides.
   - ReasoningTrigger.vue renders a TraceCollapsibleTrigger with a TraceLine, a TraceIcon and a TraceTitle. Set status="running" while isStreaming is true, instead of the Shimmer. The title reads "Thinking" while it streams, then the duration, like "Thought for 5s".
   - ReasoningContent.vue renders a TraceCollapsibleContent. Keep the markdown renderer the file already uses for the text.
   - Keep the open behavior: open while it streams, close when it finishes, unless the person opened or closed it.
4. Remove the imports the files no longer use.
5. Run vue-tsc and fix any errors.
```

## API Reference

See [Trace](/docs/components/trace#api-reference).
