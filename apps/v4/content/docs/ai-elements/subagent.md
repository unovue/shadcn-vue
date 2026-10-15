---
title: Subagent
description: Displays a subagent run, with its tool calls and result.
component: true
new: true
---

::component-preview
---
name: SubagentDemo
class: style-rhea
previewClass: h-auto
---
::

Subagent is a line for work the agent hands to a subagent. The run is the title, like "Ran the research agent". Open it for the tool calls the subagent made and what it found.

Subagent is built with `Trace` with a `TraceCollapsible` for the run and a nested `Trace` for its tool calls.

## Installation

Subagent is built with the [Trace](/docs/components/trace), [Code Block](/docs/components/code-block) and [Badge](/docs/components/badge) components.

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
    <TraceCollapsible :unmount-on-hide="false">
      <TraceCollapsibleTrigger>
        <TraceLine>
          <TraceIcon>
            <CircleCheckIcon />
          </TraceIcon>
          <TraceTitle>Ran the research agent</TraceTitle>
        </TraceLine>
      </TraceCollapsibleTrigger>
      <TraceCollapsibleContent class="flex flex-col gap-3">
        <Trace>
          <TraceLine>
            <TraceIcon>
              <CircleCheckIcon />
            </TraceIcon>
            <TraceTitle>Ran grep -rn cacheKey scripts</TraceTitle>
          </TraceLine>
        </Trace>
        <p>The cache is keyed on the commit SHA.</p>
      </TraceCollapsibleContent>
    </TraceCollapsible>
  </Trace>
</template>
```

## Running

While the subagent runs, the line has `status="running"` and its content shows the tool calls so far. Add the result when the subagent finishes.

::component-preview
---
name: SubagentRunningDemo
class: style-rhea
previewClass: h-auto
---
::

## Details

Put the task the subagent was given at the top of the content, with its model and tools as [Badge](/docs/components/badge) items. Show how long it ran in a `TraceDescription` after the title.

::component-preview
---
name: SubagentDetailsDemo
class: style-rhea
previewClass: h-auto
---
::

## AI SDK

With the AI SDK, a subagent is a tool whose `execute` yields the subagent's `UIMessage` as it streams. Render the tool part as the line and `part.output.parts` as the nested `Trace`. Map each nested tool part as in [Tool](/docs/ai-elements/tool#states).

Each yield is a preliminary output: the part is `output-available` with `preliminary: true`. The final output replaces it, so check `preliminary` before you show "Ran".

| Tool part state                                         | `TraceLine` status                 | Title           |
| ------------------------------------------------------- | ---------------------------------- | --------------- |
| `input-streaming`, `input-available`                    | `"running"` while the chat streams | Running …       |
| `output-available` with `preliminary: true`             | `"running"` while the chat streams | Running …       |
| `output-available`                                      | none                               | Ran …           |
| `output-error`, or a running state after the chat stops | `"error"`                          | Failed to run … |

## Migrating from AI Elements Vue

If you added Agent from [AI Elements Vue](https://www.ai-elements-vue.com), your project has a `components/ai-elements/agent/` folder. Paste this prompt into your coding agent to rebuild it on Trace, Code Block and Badge. Every export keeps its name and props, so the code that uses it keeps working.

```txt
Migrate components/ai-elements/agent/ from AI Elements Vue to the shadcn-vue Trace, Code Block and Badge components.

Keep every export, with the same name and props, so the code that imports it keeps working. Only change how each part renders.

1. Install the components: npx shadcn-vue@latest add trace code-block badge
2. Read https://www.shadcn-vue.com/docs/ai-elements/subagent and build Subagent the same way.
3. Rebuild each part:
   - Import CodeBlock and CodeBlockContent from @/components/ui/code-block, not from ../code-block.
   - Agent renders a Trace with a TraceCollapsible.
   - AgentHeader renders a TraceCollapsibleTrigger with a TraceLine, a TraceIcon and a TraceTitle with the name, like "Ran the research agent". Show model in a Badge.
   - AgentContent renders a TraceCollapsibleContent, with :unmount-on-hide="false" on the TraceCollapsible.
   - AgentTools renders a Trace, and AgentTool a TraceLine for each tool call, instead of an Accordion.
   - Keep AgentInstructions and AgentOutput, with AgentOutput on CodeBlock.
4. Remove the imports the files no longer use.
5. Run vue-tsc and fix any errors.
```

## API Reference

See [Trace](/docs/components/trace#api-reference).
