---
title: Plan
description: Displays the steps the agent plans to take, and how far it has got.
component: true
new: true
---

::component-preview
---
name: PlanDemo
class: style-rhea
previewClass: h-auto
---
::

Plan is the list of steps the agent decides on before it starts, such as the steps of a migration. Each step is done, running or pending, and the title counts how many are done.

Plan is built with `Trace` with a `TraceCollapsible` for the plan.

When the steps are not known up front, use [Task](/docs/ai-elements/task#task-or-plan) instead.

## Installation

Plan is built with the [Trace](/docs/components/trace) component.

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
import {
  CircleCheckIcon,
  CircleDotIcon,
  CircleIcon,
  RouteIcon,
} from '@lucide/vue'
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceDescription,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from '@/components/ui/trace'
</script>

<template>
  <Trace>
    <TraceCollapsible default-open>
      <TraceCollapsibleTrigger>
        <TraceLine status="running">
          <TraceIcon>
            <RouteIcon />
          </TraceIcon>
          <TraceTitle>Plan: migrate to Base UI</TraceTitle>
          <TraceDescription>2 of 5 done</TraceDescription>
        </TraceLine>
      </TraceCollapsibleTrigger>
      <TraceCollapsibleContent>
        <Trace>
          <TraceLine>
            <TraceIcon>
              <CircleCheckIcon />
            </TraceIcon>
            <TraceTitle>Replace the Radix imports</TraceTitle>
          </TraceLine>
          <TraceLine status="running">
            <TraceIcon>
              <CircleDotIcon />
            </TraceIcon>
            <TraceTitle>Rename asChild to render</TraceTitle>
          </TraceLine>
          <TraceLine status="pending">
            <TraceIcon>
              <CircleIcon />
            </TraceIcon>
            <TraceTitle>Run the type checker</TraceTitle>
          </TraceLine>
        </Trace>
      </TraceCollapsibleContent>
    </TraceCollapsible>
  </Trace>
</template>
```

## Details

Put a description above the steps, inside `TraceCollapsibleContent`.

::component-preview
---
name: PlanDescriptionDemo
class: style-rhea
previewClass: h-auto
---
::

## AI SDK

Stream the plan as a data part with a fixed `id`. The AI SDK replaces a data part with the same `id`, so it updates in place.

```ts showLineNumbers title="server/api/chat.post.ts"
const stream = createUIMessageStream({
  execute: async ({ writer }) => {
    writer.write({ type: 'data-plan', id: 'plan', data: { title, steps } })
  },
})
```

```ts showLineNumbers
const plan = computed(() =>
  props.message.parts.find(part => part.type === 'data-plan'),
)
```

## Migrating from AI Elements Vue

If you added Plan from [AI Elements Vue](https://www.ai-elements-vue.com), your project has a `components/ai-elements/plan/` folder. Paste this prompt into your coding agent to rebuild it on Trace. Every export keeps its name and props, so the code that uses it keeps working.

```txt
Migrate components/ai-elements/plan/ from AI Elements Vue to the shadcn-vue Trace component.

Keep every export, with the same name, props and emits, so the code that imports it keeps working. Only change how each part renders.

1. Install Trace: npx shadcn-vue@latest add trace
2. Read https://www.shadcn-vue.com/docs/ai-elements/plan and build Plan the same way.
3. Rebuild each part:
   - Plan.vue renders a Trace with a TraceCollapsible, instead of a Card. Provide isStreaming to the other parts.
   - PlanHeader.vue renders a TraceCollapsibleTrigger with a TraceLine. Set status="running" on the TraceLine while isStreaming is true, instead of the Shimmer.
   - PlanTitle.vue renders a TraceTitle, and PlanDescription.vue a TraceDescription, like "2 of 4 done".
   - PlanContent.vue renders a TraceCollapsibleContent with a Trace for the steps.
   - PlanTrigger.vue renders only its slot, since the whole line opens the plan.
   - Buttons cannot sit inside a trigger. Render PlanAction.vue next to the TraceCollapsibleTrigger, not inside it.
   - Keep PlanFooter.vue as a plain container.
4. Remove the imports the files no longer use.
5. Run vue-tsc and fix any errors.
```

## API Reference

See [Trace](/docs/components/trace#api-reference).
