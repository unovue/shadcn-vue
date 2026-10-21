---
title: Terminal
description: Displays a command the agent runs, with its output as it streams.
component: true
new: true
---

::component-preview
---
name: TerminalDemo
class: style-rhea
previewClass: h-auto
---
::

Terminal is a shell command the agent runs, such as a lint, a test run or a build. The line shows the command, and its output streams in underneath while it runs.

Terminal is built with `Trace` with a `TraceCollapsible` for each command.

## Installation

Terminal is built with the [Trace](/docs/components/trace) and [Code Block](/docs/components/code-block) components.

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
import { TerminalIcon } from '@lucide/vue'
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

defineProps<{ output: string }>()
</script>

<template>
  <Trace>
    <TraceCollapsible>
      <TraceCollapsibleTrigger>
        <TraceLine>
          <TraceIcon>
            <TerminalIcon />
          </TraceIcon>
          <TraceTitle>Ran pnpm build</TraceTitle>
        </TraceLine>
      </TraceCollapsibleTrigger>
      <TraceCollapsibleContent>
        <CodeBlock size="sm">
          <CodeBlockContent wrap class="max-h-64">
            {{ output }}
          </CodeBlockContent>
        </CodeBlock>
      </TraceCollapsibleContent>
    </TraceCollapsible>
  </Trace>
</template>
```

## Exit Code

A command that exits with any code other than `0` failed. Set `status="error"`.

::component-preview
---
name: TerminalErrorDemo
class: style-rhea
previewClass: h-auto
---
::

| Command                  | `status`    | Title                        |
| ------------------------ | ----------- | ---------------------------- |
| Running                  | `"running"` | Running pnpm build           |
| Exited with `0`          | none        | Ran pnpm build               |
| Exited with another code | `"error"`   | pnpm lint exited with code 1 |

The command is a tool call, so its states map the same way as in [Tool](/docs/ai-elements/tool#states).

## Open While Running

Open the line once the first output arrives, so the output is visible while the command runs. Leave it open or closed after that, as in [Trace](/docs/components/trace#open-state).

## AI SDK

A tool result arrives only once the command exits. To stream the output while it runs, write it from the tool as a data part with the tool call's id. The AI SDK replaces a data part that has the same id, so the output grows in place.

```ts showLineNumbers
writer.write({
  type: 'data-terminal',
  id: toolCallId,
  data: { output },
})
```

On the client, find the data part that matches each tool part.

```ts showLineNumbers
function getOutput(message: ChatMessage, toolCallId: string) {
  for (const part of message.parts) {
    if (part.type === 'data-terminal' && part.id === toolCallId) {
      return part.data.output
    }
  }

  return ''
}
```

## Migrating from AI Elements Vue

If you added Terminal from [AI Elements Vue](https://www.ai-elements-vue.com), your project has a `components/ai-elements/terminal/` folder. Paste this prompt into your coding agent to rebuild it on Trace and Code Block. Every export keeps its name and props, so the code that uses it keeps working.

```txt
Migrate components/ai-elements/terminal/ from AI Elements Vue to the shadcn-vue Trace and Code Block components.

Keep every export, with the same name and props, so the code that imports it keeps working. Only change how each part renders.

1. Install the components: npx shadcn-vue@latest add trace code-block
2. Read https://www.shadcn-vue.com/docs/ai-elements/terminal and build Terminal the same way.
3. Rebuild each part:
   - Import CodeBlock and CodeBlockContent from @/components/ui/code-block, not from ../code-block.
   - Terminal renders a Trace with a TraceCollapsible. Keep output, isStreaming, autoScroll and the clear event.
   - TerminalHeader renders a TraceCollapsibleTrigger with a TraceLine. Set status="running" while isStreaming is true.
   - TerminalTitle renders a TraceIcon with a TerminalIcon and a TraceTitle, like "Ran pnpm build".
   - TerminalContent renders a TraceCollapsibleContent with a CodeBlock with size="sm", and a CodeBlockContent with wrap and class="max-h-64" for the output.
   - Open the line once output arrives while the command runs.
   - Buttons cannot sit inside a trigger. Render TerminalStatus, TerminalActions and the copy and clear buttons next to the TraceCollapsibleTrigger, not inside it.
4. Remove the ANSI renderer from the dependencies if nothing else uses it.
5. Remove the imports the files no longer use.
6. Run vue-tsc and fix any errors.
```

## API Reference

See [Trace](/docs/components/trace#api-reference).
