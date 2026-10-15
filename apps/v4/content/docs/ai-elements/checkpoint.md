---
title: Checkpoint
description: Marks a point in the conversation you can return to.
component: true
new: true
---

::component-preview
---
name: CheckpointDemo
class: style-rhea
previewClass: h-auto
---
::

Checkpoint is a point in the conversation you can return to. It is a [Marker](/docs/components/marker) after a turn, with a Restore button. Restore keeps that turn and drops every message after it.

## Installation

Checkpoint is built with the [Marker](/docs/components/marker) and [Button](/docs/components/button) components.

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
npx shadcn-vue@latest add marker button
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
    Copy and paste the [GitHub source code](https://github.com/unovue/shadcn-vue/tree/dev/apps/v4/registry/bases/reka/ui/marker) into your project.
    ::

    ::step
    Update the import paths to match your project setup.
    ::
  :::
::::

:::::

## Usage

Render a marker after the turn, with a button that restores it.

```vue showLineNumbers
<template>
  <Marker variant="separator">
    <MarkerContent class="inline-flex items-center gap-2">
      {{ label }}
      <Button size="xs" variant="outline" @click="restore">
        Restore
      </Button>
    </MarkerContent>
  </Marker>
</template>
```

See [Marker](/docs/components/marker#separator).

## AI SDK

Restore replaces the thread with the messages up to and including that turn. Every later turn is removed. Send a new message to continue from there.

```ts showLineNumbers
const index = chat.messages.findIndex(message => message.id === messageId)
chat.messages = chat.messages.slice(0, index + 1)
```

Stream the checkpoint as a data part on the agent's turn. Send the same `id` again only when you mean to update that checkpoint.

```ts showLineNumbers title="server/api/chat.post.ts"
const stream = createUIMessageStream({
  execute: async ({ writer }) => {
    writer.write({
      type: 'data-checkpoint',
      id: 'rename',
      data: { label: 'Button renamed' },
    })
  },
})
```

```ts showLineNumbers
const checkpoint = message.parts.find(part => part.type === 'data-checkpoint')
```

## Migrating from AI Elements Vue

If you added Checkpoint from [AI Elements Vue](https://www.ai-elements-vue.com), your project has a `components/ai-elements/checkpoint/` folder. Paste this prompt into your coding agent to rebuild it on Marker and Button. Every export keeps its name and props, so the code that uses it keeps working.

```txt
Migrate components/ai-elements/checkpoint/ from AI Elements Vue to the shadcn-vue Marker and Button components.

Keep every export, with the same name and props, so the code that imports it keeps working. Only change how each part renders.

1. Install the components: npx shadcn-vue@latest add marker button
2. Read https://www.shadcn-vue.com/docs/ai-elements/checkpoint and build Checkpoint the same way.
3. Rebuild each part:
   - Checkpoint renders a Marker with variant="separator" and a MarkerContent, instead of a Separator.
   - CheckpointIcon renders a MarkerIcon.
   - CheckpointTrigger renders a Button with size="xs" and variant="outline", like "Restore". Keep its tooltip prop on the Tooltip.
4. Remove the imports the files no longer use.
5. Run vue-tsc and fix any errors.
```
