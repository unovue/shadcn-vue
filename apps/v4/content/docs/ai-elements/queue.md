---
title: Queue
description: Displays the agent's todo list, split into what is left and what is done.
component: true
new: true
---

::component-preview
---
name: QueueDemo
class: style-rhea
previewClass: h-auto
---
::

Queue is the agent's todo list. Todos sit in two sections, To do and Completed, and the icon on each todo shows its status. The agent updates the list as it works, so a todo moves from one section to the other when it is done.

Queue is built with `Trace` with a `TraceCollapsible` for each section.

## Installation

Queue is built with the [Trace](/docs/components/trace) component.

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
import { CircleCheckIcon, CircleIcon, ListChecksIcon, ListTodoIcon } from '@lucide/vue'
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
    <TraceCollapsible default-open>
      <TraceCollapsibleTrigger>
        <TraceLine>
          <TraceIcon>
            <ListTodoIcon />
          </TraceIcon>
          <TraceTitle>2 to do</TraceTitle>
        </TraceLine>
      </TraceCollapsibleTrigger>
      <TraceCollapsibleContent>
        <Trace>
          <TraceLine>
            <TraceIcon>
              <CircleIcon />
            </TraceIcon>
            <TraceTitle>Update the registry snapshots</TraceTitle>
          </TraceLine>
          <TraceLine>
            <TraceIcon>
              <CircleIcon />
            </TraceIcon>
            <TraceTitle>Add tests for the combobox</TraceTitle>
          </TraceLine>
        </Trace>
      </TraceCollapsibleContent>
    </TraceCollapsible>
    <TraceCollapsible>
      <TraceCollapsibleTrigger>
        <TraceLine>
          <TraceIcon>
            <ListChecksIcon />
          </TraceIcon>
          <TraceTitle>1 completed</TraceTitle>
        </TraceLine>
      </TraceCollapsibleTrigger>
      <TraceCollapsibleContent>
        <Trace>
          <TraceLine>
            <TraceIcon>
              <CircleCheckIcon />
            </TraceIcon>
            <TraceTitle>Add a changeset</TraceTitle>
          </TraceLine>
        </Trace>
      </TraceCollapsibleContent>
    </TraceCollapsible>
  </Trace>
</template>
```

## Descriptions

A todo with a description is a `TraceCollapsible` that opens to show it. A todo without one stays a `TraceLine`.

::component-preview
---
name: QueueDescriptionsDemo
class: style-rhea
previewClass: h-auto
---
::

```vue showLineNumbers
<template>
  <TraceCollapsible>
    <TraceCollapsibleTrigger>
      <TraceLine>
        <TraceIcon>
          <CircleIcon />
        </TraceIcon>
        <TraceTitle>Fix the focus ring on the select trigger</TraceTitle>
      </TraceLine>
    </TraceCollapsibleTrigger>
    <TraceCollapsibleContent>
      It is clipped by overflow-hidden on the field.
    </TraceCollapsibleContent>
  </TraceCollapsible>
</template>
```

## AI SDK

The agent writes its todos with a tool, `writeTodos` in this example. Each call sends the whole list, so render the last call and skip one whose input is still streaming.

```ts showLineNumbers
const todos = message.parts
  .filter(part => part.type === 'tool-writeTodos')
  .filter(part => part.state !== 'input-streaming')
  .at(-1)
  ?.input
  ?.todos
```

Map each todo status to a section, an icon and a `TraceLine` status. Set `"running"` on the todo in progress only while the chat streams, so its title stops shimmering when the agent stops.

| Todo status   | Section   | Icon              | `TraceLine` status                 |
| ------------- | --------- | ----------------- | ---------------------------------- |
| `pending`     | To do     | `CircleIcon`      | none                               |
| `in_progress` | To do     | `CircleDotIcon`   | `"running"` while the chat streams |
| `completed`   | Completed | `CircleCheckIcon` | none                               |

## Migrating from AI Elements Vue

If you added Queue from [AI Elements Vue](https://www.ai-elements-vue.com), your project has a `components/ai-elements/queue/` folder. Paste this prompt into your coding agent to rebuild it on Trace. Every export keeps its name and props, so the code that uses it keeps working.

```txt
Migrate components/ai-elements/queue/ from AI Elements Vue to the shadcn-vue Trace component.

Keep every export, with the same name and props, so the code that imports it keeps working. Only change how each part renders.

1. Install Trace: npx shadcn-vue@latest add trace
2. Read https://www.shadcn-vue.com/docs/ai-elements/queue and build Queue the same way.
3. Rebuild each part:
   - Queue renders a Trace.
   - QueueSection, QueueSectionTrigger and QueueSectionContent render TraceCollapsible, TraceCollapsibleTrigger and TraceCollapsibleContent.
   - QueueSectionLabel renders a TraceLine with a TraceIcon and a TraceTitle, like "2 to do".
   - QueueList renders a Trace. Drop the ScrollArea.
   - QueueItem renders a TraceLine. QueueItemIndicator renders a TraceIcon, QueueItemContent a TraceTitle, and QueueItemDescription a TraceDescription.
   - Keep QueueItemActions, QueueItemAction and the attachment parts as they are.
4. Remove the imports the files no longer use.
5. Run vue-tsc and fix any errors.
```

## API Reference

See [Trace](/docs/components/trace#api-reference).
