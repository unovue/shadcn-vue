---
title: Tool
description: Displays a tool call the agent makes, from input to output.
component: true
new: true
---

::component-preview
---
name: ToolDemo
class: style-rhea
previewClass: h-auto
---
::

Tool is a tool call the agent makes, such as running a command or reading a file. The line follows the call from input to output, including errors and calls that wait for approval.

Tool is built with `Trace` with a `TraceCollapsible` for each call that has output.

## Installation

Tool is built with the [Trace](/docs/components/trace) and [Code Block](/docs/components/code-block) components.

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
</script>

<template>
  <Trace>
    <TraceCollapsible>
      <TraceCollapsibleTrigger>
        <TraceLine>
          <TraceIcon>
            <TerminalIcon />
          </TraceIcon>
          <TraceTitle>Ran git status --short</TraceTitle>
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

## States

Trace does not read tool parts. Map each part's `state` to a `status` and a title.

::component-preview
---
name: ToolStatesDemo
class: style-rhea
previewClass: h-auto
---
::

| Tool part state                                           | `status`                             | Title                                                                |
| --------------------------------------------------------- | ------------------------------------ | -------------------------------------------------------------------- |
| `input-streaming`, `input-available`                      | `"running"` while the chat streams   | Running …                                                            |
| `input-streaming`, `input-available` after the chat stops | `"error"`                            | Failed to run …                                                      |
| `approval-requested`                                      | -                                    | Not a line. An `Item` outside `Trace` with Approve and Deny buttons. |
| `approval-responded`                                      | `"running"` if approved, none if not | Running … if approved, Denied … if not                               |
| `output-available`                                        | none                                 | Ran …                                                                |
| `output-error`                                            | `"error"`                            | Failed to run …                                                      |
| `output-denied`                                           | none                                 | Denied …                                                             |

A tool is a plain `TraceLine` while it runs, and a `TraceCollapsible` once its output arrives.

```vue showLineNumbers title="components/ToolLine.vue"
<script setup lang="ts">
import { TerminalIcon } from '@lucide/vue'
import { computed } from 'vue'
import { CodeBlock, CodeBlockContent } from '@/components/ui/code-block'
import {
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from '@/components/ui/trace'

const props = defineProps<{
  part: ToolPart
  streaming: boolean
}>()

const command = computed(() => props.part.input?.command)
const denied = computed(
  () =>
    props.part.state === 'output-denied'
    || (props.part.state === 'approval-responded' && !props.part.approval.approved),
)
const failed = computed(() => props.part.state === 'output-error')
</script>

<template>
  <TraceLine v-if="denied">
    <TraceIcon>
      <TerminalIcon />
    </TraceIcon>
    <TraceTitle>Denied {{ command }}</TraceTitle>
  </TraceLine>
  <TraceCollapsible
    v-else-if="part.state === 'output-available' || part.state === 'output-error'"
  >
    <TraceCollapsibleTrigger>
      <TraceLine :status="failed ? 'error' : undefined">
        <TraceIcon>
          <TerminalIcon />
        </TraceIcon>
        <TraceTitle>{{ failed ? 'Failed to run' : 'Ran' }} {{ command }}</TraceTitle>
      </TraceLine>
    </TraceCollapsibleTrigger>
    <TraceCollapsibleContent>
      <CodeBlock size="sm">
        <CodeBlockContent wrap class="max-h-64">
          {{ part.state === 'output-error' ? part.errorText : part.output.stdout }}
        </CodeBlockContent>
      </CodeBlock>
    </TraceCollapsibleContent>
  </TraceCollapsible>
  <TraceLine v-else :status="streaming ? 'running' : 'error'">
    <TraceIcon>
      <TerminalIcon />
    </TraceIcon>
    <TraceTitle>{{ streaming ? 'Running' : 'Failed to run' }} {{ command }}</TraceTitle>
  </TraceLine>
</template>
```

```vue showLineNumbers
<template>
  <Trace>
    <ToolLine
      v-for="part in message.parts.filter(part => part.type === 'tool-runCommand')"
      :key="part.toolCallId"
      :part="part"
      :streaming="streaming"
    />
  </Trace>
</template>
```

A tool that runs on the client stays `input-available` after the chat stops until you call `addToolOutput`. Treat it as waiting, not failed.

## Output in a Sheet

For long output, wrap the `TraceLine` in a `SheetTrigger` and show the output in the sheet.

::component-preview
---
name: ToolSheetDemo
class: style-rhea
previewClass: h-auto
---
::

See [Trace](/docs/components/trace#dialog).

## Approval

A pending approval is a question for the person, not a step the agent took, so it sits outside `Trace` as an `Item`. Once the person answers, the tool goes back to being a line. See [Confirmation](/docs/ai-elements/confirmation).

::component-preview
---
name: ToolApprovalDemo
class: style-rhea
previewClass: h-auto
---
::

```vue showLineNumbers
<template>
  <Item v-if="part.state === 'approval-requested'" variant="outline" size="sm">
    <ItemMedia variant="icon">
      <TerminalIcon />
    </ItemMedia>
    <ItemContent>
      <ItemTitle>Run {{ part.input.command }}?</ItemTitle>
    </ItemContent>
    <ItemActions>
      <Button
        size="sm"
        variant="outline"
        @click="chat.addToolApprovalResponse({ id: part.approval.id, approved: false })"
      >
        Deny
      </Button>
      <Button
        size="sm"
        @click="chat.addToolApprovalResponse({ id: part.approval.id, approved: true })"
      >
        Approve
      </Button>
    </ItemActions>
  </Item>
</template>
```

Pass `sendAutomaticallyWhen: lastAssistantMessageIsCompleteWithApprovalResponses` to the `Chat` so the chat continues once every approval has an answer.

## Migrating from AI Elements Vue

If you added Tool from [AI Elements Vue](https://www.ai-elements-vue.com), your project has a `components/ai-elements/tool/` folder. Paste this prompt into your coding agent to rebuild it on Trace and Code Block. Every export keeps its name and props, so the code that uses it keeps working.

```txt
Migrate components/ai-elements/tool/ from AI Elements Vue to the shadcn-vue Trace and Code Block components.

Keep every export, with the same name, props and emits, so the code that imports it keeps working. Only change how each part renders.

1. Install the components: npx shadcn-vue@latest add trace code-block
2. Read https://www.shadcn-vue.com/docs/ai-elements/tool and build Tool the same way.
3. Rebuild each part:
   - Import CodeBlock and CodeBlockContent from @/components/ui/code-block, not from ../code-block.
   - Tool.vue renders a Trace with a TraceCollapsible.
   - ToolHeader.vue renders a TraceCollapsibleTrigger with a TraceLine, a TraceIcon and a TraceTitle, instead of a status Badge. Map state to the status and title: "running" and "Running …" while the input streams or is available, no status and "Ran …" for output-available, "error" and "Failed to run …" for output-error, and "Denied …" for output-denied.
   - ToolContent.vue renders a TraceCollapsibleContent.
   - ToolInput.vue and ToolOutput.vue render a CodeBlock with size="sm" and a CodeBlockContent. ToolOutput shows errorText when the tool failed.
   - Keep getStatusBadge and the ToolPart type exported, even if nothing renders the badge.
4. Remove the imports the files no longer use.
5. Run vue-tsc and fix any errors.
```

## API Reference

See [Trace](/docs/components/trace#api-reference).
