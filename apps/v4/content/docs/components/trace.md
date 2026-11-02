---
title: Trace
description: The building block for reasoning, tool calls, sources and more.
component: true
new: true
---

::component-preview
---
name: TraceDemo
class: style-rhea
previewClass: h-auto
---
::

`Trace` is a list of lines. Each line has an icon, a title, and an optional description and status. A line can expand to show more detail, link to a page, or open a dialog or sheet.

Every line has the same shape, so reasoning, tool calls, sources and plans built from `Trace` look and behave the same.

Use `Trace` for the steps an agent takes, like calling a tool, running a subagent or editing a file. Use [Message](/docs/components/message) for its reply, and [Marker](/docs/components/marker) for notes and dividers between turns.

## Built with Trace

Every pattern below is a composition of `Trace` parts. See [AI Elements](/docs/ai-elements) for examples and code.

| Pattern                                                | Shows                                                            |
| ------------------------------------------------------ | ---------------------------------------------------------------- |
| [Chain of Thought](/docs/ai-elements/chain-of-thought) | A summary that expands into the steps behind it.                 |
| [Plan](/docs/ai-elements/plan)                         | The steps the agent plans to take, and how far it has got.       |
| [Queue](/docs/ai-elements/queue)                       | The agent's todo list, split into what is left and what is done. |
| [Reasoning](/docs/ai-elements/reasoning)               | The agent's thinking as it streams.                              |
| [Sources](/docs/ai-elements/sources)                   | The links the agent used for a reply.                            |
| [Stack Trace](/docs/ai-elements/stack-trace)           | A failed tool call and its stack frames.                         |
| [Subagent](/docs/ai-elements/subagent)                 | A subagent run, with its tool calls and result.                  |
| [Task](/docs/ai-elements/task)                         | The steps the agent takes, as it takes them.                     |
| [Terminal](/docs/ai-elements/terminal)                 | A command the agent runs, with its output as it streams.         |
| [Test Results](/docs/ai-elements/test-results)         | A test run by the agent, with its suites and failures.           |
| [Tool](/docs/ai-elements/tool)                         | A tool call the agent makes, from input to output.               |

## Installation

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

Use a `TraceLine` for a single step:

```vue showLineNumbers
<script setup lang="ts">
import { SearchIcon } from '@lucide/vue'
import { Trace, TraceIcon, TraceLine, TraceTitle } from '@/components/ui/trace'
</script>

<template>
  <Trace>
    <TraceLine>
      <TraceIcon>
        <SearchIcon />
      </TraceIcon>
      <TraceTitle>Searched for minimumReleaseAge</TraceTitle>
    </TraceLine>
  </Trace>
</template>
```

Wrap the line in a `TraceCollapsible` to show more detail when it expands:

```vue showLineNumbers
<script setup lang="ts">
import { TerminalIcon } from '@lucide/vue'
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
            <TerminalIcon />
          </TraceIcon>
          <TraceTitle>Ran node --version</TraceTitle>
        </TraceLine>
      </TraceCollapsibleTrigger>
      <TraceCollapsibleContent>v24.18.0</TraceCollapsibleContent>
    </TraceCollapsible>
  </Trace>
</template>
```

## Composition

Use the following composition to build a trace line:

```text
Trace
└── TraceLine
    ├── TraceIcon
    ├── TraceTitle
    ├── TraceDescription
    └── TraceIcon
```

Wrap the line in a `TraceCollapsible` to show more detail when it expands:

```text
Trace
└── TraceCollapsible
    ├── TraceCollapsibleTrigger
    │   └── TraceLine
    └── TraceCollapsibleContent
```

`TraceLine` is always the line. To make a line do something, wrap it in that thing's trigger.

## Features

- One row for reasoning, tool calls, sources, plans and tasks
- Rows that expand, link out, or open a dialog, sheet, drawer or popover
- `running`, `error` and `pending` states, with a shimmer while running
- Nested rows, so a summary expands into steps and a step into its output
- Works with reasoning, tool and source parts from the AI SDK
- Keyboard and screen reader support from the trigger that wraps each row
- Customizable styling through the `class` prop on every part

## Trace Line

Use a `TraceLine` on its own for a step with no detail to show. It reads as plain text.

::component-preview
---
name: TraceStaticDemo
class: style-rhea
previewClass: h-auto
---
::

## Status

Set `status` on `TraceLine` when a step is running, has failed or hasn't started yet.

::component-preview
---
name: TraceStatusDemo
class: style-rhea
previewClass: h-auto
---
::

| Status      | Use for                                                                       |
| ----------- | ----------------------------------------------------------------------------- |
| none        | Work that is done: "Ran pnpm install".                                        |
| `"error"`   | Work that failed. Say so in the title: "Failed to run pnpm lint".             |
| `"running"` | Work in progress. Write the title in the present tense: "Running pnpm build". |
| `"pending"` | Work that has not started, such as a plan step: "Run pnpm test".              |

## Description

Put secondary text such as a diff stat, a duration or a count in a `TraceDescription` after the `TraceTitle`. It does not truncate.

::component-preview
---
name: TraceDescriptionDemo
class: style-rhea
previewClass: h-auto
---
::

## Collapsible

Wrap the line in a `TraceCollapsible` to show more detail when it expands. Put the `TraceLine` inside `TraceCollapsibleTrigger` and the detail in `TraceCollapsibleContent`.

::component-preview
---
name: TraceCollapsibleDemo
class: style-rhea
previewClass: h-auto
---
::

## Open State

Rows start closed. Use `default-open` on `TraceCollapsible` to start open, or `v-model:open` to control a row.

::component-preview
---
name: TraceOpenDemo
class: style-rhea
previewClass: h-auto
---
::

To open a row while it streams and let the reader's click win, pass `open ?? running`.

```vue showLineNumbers
<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{ text: string, running: boolean }>()

const open = ref<boolean>()
</script>

<template>
  <TraceCollapsible
    :open="open ?? props.running"
    @update:open="open = $event"
  >
    <TraceCollapsibleTrigger>
      <TraceLine :status="props.running ? 'running' : undefined">
        …
      </TraceLine>
    </TraceCollapsibleTrigger>
    <TraceCollapsibleContent>{{ props.text }}</TraceCollapsibleContent>
  </TraceCollapsible>
</template>
```

## Link

Wrap the `TraceLine` in an anchor. For a new tab, use an arrow-up-right icon and sr-only "(opens in a new tab)".

::component-preview
---
name: TraceLinkDemo
class: style-rhea
previewClass: h-auto
---
::

```vue showLineNumbers
<template>
  <a href="https://docs.astro.build" target="_blank" rel="noreferrer">
    <TraceLine>
      <TraceTitle>
        Install Astro
        <span class="sr-only"> (opens in a new tab)</span>
      </TraceTitle>
      <TraceIcon>
        <ArrowUpRightIcon />
      </TraceIcon>
    </TraceLine>
  </a>
</template>
```

## Dialog

Wrap the `TraceLine` in the dialog's trigger. The dialog owns its open state, Escape and focus return.

::component-preview
---
name: TraceDialogDemo
class: style-rhea
previewClass: h-auto
---
::

```vue showLineNumbers
<template>
  <Dialog>
    <DialogTrigger as-child>
      <button type="button">
        <TraceLine>
          <TraceTitle>Searched the web for cache keys</TraceTitle>
          <TraceIcon>
            <ChevronRightIcon />
          </TraceIcon>
        </TraceLine>
      </button>
    </DialogTrigger>
    <DialogContent>…</DialogContent>
  </Dialog>
</template>
```

## Sheet

The same shape as the dialog. Drawer and Popover work the same way.

::component-preview
---
name: TraceSheetDemo
class: style-rhea
previewClass: h-auto
---
::

## Group

Put rows that sit next to each other in a `Trace`. It also styles any trigger or link that wraps a `TraceLine`.

::component-preview
---
name: TraceGroupDemo
class: style-rhea
previewClass: h-auto
---
::

## Sources

A collapsible row whose detail is a `Trace` of link rows.

::component-preview
---
name: TraceSourcesDemo
class: style-rhea
previewClass: h-auto
---
::

See [Sources](/docs/ai-elements/sources) for more examples.

## Chain of Thought

A chain of thought is a collapsible row with step rows inside. Set the parent's status and title from its children.

::component-preview
---
name: TraceStepsDemo
class: style-rhea
previewClass: h-auto
---
::

See [Chain of Thought](/docs/ai-elements/chain-of-thought) and [Task](/docs/ai-elements/task) for more examples.

## Commit

A commit is a collapsible row with a line for each changed file. Say what changed in the title, Added, Edited or Deleted, and put the line counts in the description. Each file opens its diff in a [Sheet](#sheet).

::component-preview
---
name: TraceCommitDemo
class: style-rhea
previewClass: h-auto
---
::

## Whole Turn

Three levels: the turn, a summary, and the rows. Text between steps sits between two `Trace` lists.

::component-preview
---
name: TraceTurnDemo
class: style-rhea
previewClass: h-auto
---
::

## Reasoning

Render a `reasoning` part from the AI SDK. The row is a `TraceLine` until the first text arrives. See [Open State](#open-state).

::component-preview
---
name: TraceThinkingDemo
class: style-rhea
previewClass: h-auto
---
::

See [Reasoning](/docs/ai-elements/reasoning) for more examples.

## Tool

Render tool parts from the AI SDK. Map the tool part as in [Tool](/docs/ai-elements/tool#states).

::component-preview
---
name: TraceToolCallsDemo
class: style-rhea
previewClass: h-auto
---
::

See [Tool](/docs/ai-elements/tool) for more examples.

## Accessibility

`Trace` adds no roles of its own. Each line gets its semantics from the element that wraps it.

- A `TraceLine` on its own is a `span`. It is read as text and is not a tab stop.
- Wrap it in a `TraceCollapsibleTrigger` and it becomes a button with `aria-expanded`. Wrap it in a link, or in the trigger for a dialog or sheet, and it takes the keyboard and focus behavior of that element.
- `TraceIcon` is hidden from assistive tech, so `TraceTitle` is the accessible name. Write it as a sentence that says what happened, like "Edited Trace.vue", not just "Trace.vue".
- When a link opens a new tab, add "(opens in a new tab)" to the title with `sr-only`.
- Status is shown with color and motion, so put it in the title too. Write "Running pnpm build" while it runs and "Failed to run pnpm build" when it errors.
- The shimmer on a running title stops when the reader prefers reduced motion. The title still says what is happening.
- Inside a [Message Scroller](/docs/components/message-scroller), each line is announced once when it is added.
- `TraceCollapsibleContent` mutes its text. If you put a block with a muted background inside it, give the block `text-foreground` so it keeps its contrast. `CodeBlock` sets its own text color.

## API Reference

### Trace

A list of rows. It also styles any trigger or link that wraps a `TraceLine`.

| Prop    | Type     | Default | Description                              |
| ------- | -------- | ------- | ---------------------------------------- |
| `class` | `string` | -       | Additional classes to apply to the list. |

### TraceLine

One line: an icon and a title. It is a span, so it is not a button or a tab stop. Wrap it in a trigger or a link to make it do something.

| Prop     | Type                                | Default | Description                              |
| -------- | ----------------------------------- | ------- | ---------------------------------------- |
| `status` | `"running" \| "error" \| "pending"` | -       | The state of the work the line reports.  |
| `class`  | `string`                            | -       | Additional classes to apply to the line. |

### TraceIcon

A decorative icon slot, hidden from assistive tech. Before the title it names the action; after it, it is the indicator.

| Prop    | Type     | Default | Description                                   |
| ------- | -------- | ------- | --------------------------------------------- |
| `class` | `string` | -       | Additional classes to apply to the icon slot. |

### TraceTitle

One sentence on one line. It truncates and shimmers while the line is running.

| Prop    | Type     | Default | Description                               |
| ------- | -------- | ------- | ----------------------------------------- |
| `class` | `string` | -       | Additional classes to apply to the title. |

### TraceDescription

Secondary text after the title, such as a count or a duration. It does not truncate.

| Prop    | Type     | Default | Description                                     |
| ------- | -------- | ------- | ----------------------------------------------- |
| `class` | `string` | -       | Additional classes to apply to the description. |

### TraceCollapsible

A row that expands. It accepts the props of [`Collapsible`](/docs/components/collapsible).

| Prop / Event      | Type                      | Default | Description                                                                                    |
| ----------------- | ------------------------- | ------- | ---------------------------------------------------------------------------------------------- |
| `open`            | `boolean`                 | -       | The controlled open state. Use with `v-model:open`.                                            |
| `default-open`    | `boolean`                 | `false` | Whether the row starts open.                                                                   |
| `unmount-on-hide` | `boolean`                 | `true`  | Set to `false` to keep the detail mounted while closed, so nested rows keep their open state. |
| `update:open`     | `(open: boolean) => void` | -       | Emitted when the open state changes.                                                           |
| `class`           | `string`                  | -       | Additional classes to apply to the row.                                                        |

### TraceCollapsibleTrigger

The button that opens and closes the row. Put a `TraceLine` inside it. It adds a chevron after the line.

| Prop    | Type     | Default | Description                                 |
| ------- | -------- | ------- | ------------------------------------------- |
| `class` | `string` | -       | Additional classes to apply to the trigger. |

### TraceCollapsibleContent

The detail of a row that expands.

| Prop          | Type      | Default | Description                                                          |
| ------------- | --------- | ------- | -------------------------------------------------------------------- |
| `force-mount` | `boolean` | `false` | Always render the content, for use with your own animation library. |
| `class`       | `string`  | -       | Additional classes to apply to the content.                          |

::callout
  **Note:** To keep the detail mounted while closed, so nested rows keep their
  open state, set `:unmount-on-hide="false"` on the parent `TraceCollapsible`.
::
