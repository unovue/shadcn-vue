---
title: Stack Trace
description: Displays a failed tool call and its stack frames.
component: true
new: true
---

::component-preview
---
name: StackTraceDemo
class: style-rhea
previewClass: h-auto
---
::

Stack Trace is a line for a tool call that failed. The error is the title, like "Failed: TypeError". Open it for the stack frames, which can link to the file and line.

Stack Trace is built with `Trace` with a `TraceCollapsible` for the frames.

## Installation

Stack Trace is built with the [Trace](/docs/components/trace) and [Code Block](/docs/components/code-block) components.

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
import { CircleXIcon } from '@lucide/vue'
import { computed } from 'vue'
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from '@/components/ui/trace'

const props = defineProps<{ stack: string }>()

const lines = computed(() => props.stack.split('\n').map(line => line.trim()))
const error = computed(() => lines.value[0])
const frames = computed(() => lines.value.slice(1))
</script>

<template>
  <Trace>
    <TraceCollapsible>
      <TraceCollapsibleTrigger>
        <TraceLine status="error">
          <TraceIcon>
            <CircleXIcon />
          </TraceIcon>
          <TraceTitle>Failed: {{ error }}</TraceTitle>
        </TraceLine>
      </TraceCollapsibleTrigger>
      <TraceCollapsibleContent>
        <div class="flex flex-col gap-2 rounded-md bg-muted p-3 font-mono text-xs">
          <p class="text-destructive">
            {{ error }}
          </p>
          <ol>
            <li
              v-for="(frame, index) in frames"
              :key="index"
              :class="frame.includes('node_modules') ? undefined : 'text-foreground'"
            >
              {{ frame }}
            </li>
          </ol>
        </div>
      </TraceCollapsibleContent>
    </TraceCollapsible>
  </Trace>
</template>
```

The title truncates, so repeat the full error at the top of the content. Frames from `node_modules` stay muted, so your own frames stand out.

## Frame Links

Turn your own frames into links that open the file at the line. Fold the framework frames into a collapsible line of their own, so the frames you can fix come first.

::component-preview
---
name: StackTraceFramesDemo
class: style-rhea
previewClass: h-auto
---
::

## AI SDK

When a tool throws, its part is `output-error`. By default `errorText` is only the error message, with no frames. Return `error.stack` from `onError` in `toUIMessageStreamResponse` to send them.

```ts showLineNumbers title="server/api/chat.post.ts"
return result.toUIMessageStreamResponse({
  onError: error =>
    error instanceof Error ? (error.stack ?? error.message) : String(error),
})
```

A stack shows file paths from your server, so only send it in development.

```vue showLineNumbers
<script setup lang="ts">
const [error, ...frames] = part.errorText
  .split('\n')
  .map(line => line.trim())
</script>

<template>
  <TraceCollapsible v-if="part.state === 'output-error'">
    …
  </TraceCollapsible>
</template>
```

Map the other tool states as in [Tool](/docs/ai-elements/tool#states).

## Migrating from AI Elements Vue

If you added Stack Trace from [AI Elements Vue](https://www.ai-elements-vue.com), your project has a `components/ai-elements/stack-trace/` folder. Paste this prompt into your coding agent to rebuild it on Trace. Every export keeps its name and props, so the code that uses it keeps working.

```txt
Migrate components/ai-elements/stack-trace/ from AI Elements Vue to the shadcn-vue Trace component.

Keep every export, with the same name and props, so the code that imports it keeps working. Only change how each part renders.

1. Install Trace: npx shadcn-vue@latest add trace
2. Read https://www.shadcn-vue.com/docs/ai-elements/stack-trace and build Stack Trace the same way.
3. Rebuild each part:
   - StackTrace renders a Trace with a TraceCollapsible. Keep trace, open, defaultOpen, the update:open and filePathClick events, and the parsing.
   - StackTraceHeader renders a TraceCollapsibleTrigger with a TraceLine with status="error" and a TraceIcon.
   - StackTraceError renders a TraceTitle, like "Failed: TypeError: …". Keep StackTraceErrorType and StackTraceErrorMessage as spans inside it.
   - StackTraceContent renders a TraceCollapsibleContent.
   - StackTraceFrames renders the frames as a list in a muted, monospace block. Dim the frames from node_modules, and keep the file path buttons.
   - StackTraceExpandButton renders nothing, since the whole line opens the frames.
   - Buttons cannot sit inside a trigger. Render StackTraceActions and StackTraceCopyButton next to the TraceCollapsibleTrigger, not inside it.
4. Remove the imports the files no longer use.
5. Run vue-tsc and fix any errors.
```

## API Reference

See [Trace](/docs/components/trace#api-reference).
