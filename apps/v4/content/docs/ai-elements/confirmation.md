---
title: Confirmation
description: Asks for approval before a tool runs.
component: true
new: true
---

::component-preview
---
name: ConfirmationDemo
class: style-rhea
previewClass: h-auto
---
::

Confirmation asks the person for a yes or no before a tool runs. The question is an [Item](/docs/components/item) with Deny and Approve buttons. Once the person answers, the call becomes a [Tool](/docs/ai-elements/tool) line.

## Installation

Confirmation is built with the [Item](/docs/components/item) and [Button](/docs/components/button) components.

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
npx shadcn-vue@latest add item button
```

::

::::tabs-content{value="manual"}
  :::steps
    ::step
    Install the required shadcn-vue dependencies:
    ::

    ```bash
    npx shadcn-vue@latest add button
    ```

    ::step
    Copy and paste the [GitHub source code](https://github.com/unovue/shadcn-vue/tree/dev/apps/v4/registry/bases/reka/ui/item) into your project.
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
import { Button } from '@/components/ui/button'
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from '@/components/ui/item'
</script>

<template>
  <Item variant="outline" size="sm">
    <ItemMedia variant="icon">
      <TerminalIcon />
    </ItemMedia>
    <ItemContent>
      <ItemTitle>Run {{ part.input.command }}?</ItemTitle>
      <ItemDescription>The command runs in this project.</ItemDescription>
    </ItemContent>
    <ItemActions>
      <Button size="sm" variant="outline" @click="deny">
        Deny
      </Button>
      <Button size="sm" @click="approve">
        Approve
      </Button>
    </ItemActions>
  </Item>
</template>
```

## AI SDK

While the part is `approval-requested`, answer with the approval id. Pass `sendAutomaticallyWhen: lastAssistantMessageIsCompleteWithApprovalResponses` so the chat continues once every approval has an answer.

```ts showLineNumbers
chat.addToolApprovalResponse({
  id: part.approval.id,
  approved: true,
})
```

```ts showLineNumbers
import { Chat } from '@ai-sdk/vue'
import { lastAssistantMessageIsCompleteWithApprovalResponses } from 'ai'

const chat = new Chat({
  sendAutomaticallyWhen: lastAssistantMessageIsCompleteWithApprovalResponses,
})
```

Approve streams the tool output. Deny streams `output-denied`. Either way, the part becomes a Tool line.

See [Tool](/docs/ai-elements/tool#approval).

## Migrating from AI Elements Vue

If you added Confirmation from [AI Elements Vue](https://www.ai-elements-vue.com), your project has a `components/ai-elements/confirmation/` folder. Paste this prompt into your coding agent to rebuild it on Item and Button. Every export keeps its name and props, so the code that uses it keeps working.

```txt
Migrate components/ai-elements/confirmation/ from AI Elements Vue to the shadcn-vue Item and Button components.

Keep every export, with the same name, props and emits, so the code that imports it keeps working. Only change how each part renders.

1. Install the components: npx shadcn-vue@latest add item button
2. Read https://www.shadcn-vue.com/docs/ai-elements/confirmation and build Confirmation the same way.
3. Rebuild each part:
   - Confirmation.vue renders an Item with variant="outline" and size="sm", instead of an Alert. Keep the approval and state props and the context they provide.
   - ConfirmationTitle.vue renders an ItemContent with an ItemTitle.
   - ConfirmationActions.vue renders an ItemActions.
   - ConfirmationAction.vue renders a Button with size="sm".
   - Keep ConfirmationRequest.vue, ConfirmationAccepted.vue and ConfirmationRejected.vue as they are.
4. Remove the imports the files no longer use.
5. Run vue-tsc and fix any errors.
```
