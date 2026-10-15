---
title: Task
description: Displays the steps the agent takes, as it takes them.
component: true
new: true
---

::component-preview
---
name: TaskDemo
class: style-rhea
previewClass: h-auto
---
::

Task is a piece of work the agent is doing, such as finding the project files or updating a page. Each step, like a search, a read or an edit, appears under the task when the agent takes it.

Task is built with `Trace` with a `TraceCollapsible` for each task.

## Task or Plan

Both are a list of steps under a collapsible line. The difference is when the steps are known.

Use [Plan](/docs/ai-elements/plan) when the agent decides the steps before it starts. Use Task when the steps come from the work itself, and the agent only knows the next one once it has taken the last.

|               | Plan                                   | Task                                            |
| ------------- | -------------------------------------- | ----------------------------------------------- |
| Steps         | Every step, from the start             | Each step, once the agent takes it              |
| Pending steps | Yes, waiting their turn                | None                                            |
| Title         | The goal, with progress: "2 of 4 done" | What the agent is doing, then what it did       |
| Per reply     | One plan                               | One or more tasks, each closing when it is done |

## Installation

Task is built with the [Trace](/docs/components/trace) component.

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
import { FileTextIcon, SearchIcon } from '@lucide/vue'
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
          <TraceTitle>Found the project files</TraceTitle>
        </TraceLine>
      </TraceCollapsibleTrigger>
      <TraceCollapsibleContent>
        <Trace>
          <TraceLine>
            <TraceIcon>
              <SearchIcon />
            </TraceIcon>
            <TraceTitle>Searched for app/pages/index.vue</TraceTitle>
          </TraceLine>
          <a href="/files/app/pages/index.vue">
            <TraceLine>
              <TraceIcon>
                <FileTextIcon />
              </TraceIcon>
              <TraceTitle>Read app/pages/index.vue</TraceTitle>
            </TraceLine>
          </a>
        </Trace>
      </TraceCollapsibleContent>
    </TraceCollapsible>
  </Trace>
</template>
```

## Status

Set the task's status from its steps. Write the title in the present tense while the task runs, and in the past tense once it is done.

| Steps                   | `status`    | Title                              |
| ----------------------- | ----------- | ---------------------------------- |
| A step is still running | `"running"` | Updating the page metadata         |
| A step failed           | `"error"`   | Failed to update the page metadata |
| Every step is done      | none        | Updated the page metadata          |

Put several tasks in one `Trace`. Keep the running task open, and close each task once it is done.

## AI SDK

Stream each task as a data part with its own `id`. The AI SDK replaces a data part with the same `id`, so writing a task again with a new step updates it in place.

```ts showLineNumbers title="server/api/chat.post.ts"
const stream = createUIMessageStream({
  execute: async ({ writer }) => {
    writer.write({ type: 'data-task', id: 'update', data: { title, steps } })
  },
})
```

```ts showLineNumbers
const tasks = message.parts.filter(part => part.type === 'data-task')
```

## Migrating from AI Elements Vue

If you added Task from [AI Elements Vue](https://www.ai-elements-vue.com), your project has a `components/ai-elements/task/` folder. Paste this prompt into your coding agent to rebuild it on Trace. Every export keeps its name and props, so the code that uses it keeps working.

```txt
Migrate components/ai-elements/task/ from AI Elements Vue to the shadcn-vue Trace component.

Keep every export, with the same name and props, so the code that imports it keeps working. Only change how each part renders.

1. Install Trace: npx shadcn-vue@latest add trace
2. Read https://www.shadcn-vue.com/docs/ai-elements/task and build Task the same way.
3. Rebuild each part:
   - Task renders a Trace with a TraceCollapsible.
   - TaskTrigger renders a TraceCollapsibleTrigger with a TraceLine and a TraceTitle with title.
   - TaskContent renders a TraceCollapsibleContent, with :unmount-on-hide="false" on the TraceCollapsible, and a Trace for the steps.
   - TaskItem renders a TraceLine with a TraceTitle.
   - Keep TaskItemFile as it is.
4. Remove the imports the files no longer use.
5. Run vue-tsc and fix any errors.
```

## API Reference

See [Trace](/docs/components/trace#api-reference).
