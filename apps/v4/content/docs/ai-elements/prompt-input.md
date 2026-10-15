---
title: Prompt Input
description: A message field with attachments and a send button.
component: true
new: true
---

::component-preview
---
name: PromptInputDemo
class: style-rhea
previewClass: h-auto
---
::

Prompt Input is the field the person types into to message the agent. It is an [Input Group](/docs/components/input-group) with a textarea, an attach button, the [Model Selector](/docs/ai-elements/model-selector) menus and a send button. Attached files show as [Attachment](/docs/components/attachment) chips above the text.

## Installation

Prompt Input is built with the [Input Group](/docs/components/input-group), [Attachment](/docs/components/attachment) and [Dropdown Menu](/docs/components/dropdown-menu) components.

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
npx shadcn-vue@latest add input-group attachment dropdown-menu
```

::

::::tabs-content{value="manual"}
  :::steps
    ::step
    Install the required shadcn-vue dependencies:
    ::

    ```bash
    npx shadcn-vue@latest add attachment dropdown-menu
    ```

    ::step
    Copy and paste the [GitHub source code](https://github.com/unovue/shadcn-vue/tree/dev/apps/v4/registry/bases/reka/ui/input-group) into your project.
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
import { ArrowUpIcon, PlusIcon } from '@lucide/vue'
import { computed, ref } from 'vue'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from '@/components/ui/input-group'

const text = ref('')
const formRef = ref<HTMLFormElement | null>(null)
const inputRef = ref<HTMLInputElement | null>(null)
const canSend = computed(() => text.value.trim().length > 0)
</script>

<template>
  <form ref="formRef" @submit.prevent="onSubmit">
    <InputGroup>
      <InputGroupTextarea
        v-model="text"
        placeholder="Ask the agent to change your code..."
        class="p-3"
      />
      <InputGroupAddon align="block-end">
        <InputGroupButton
          size="icon-sm"
          variant="outline"
          class="rounded-full"
          aria-label="Attach files"
          @click="inputRef?.click()"
        >
          <PlusIcon />
        </InputGroupButton>
        <InputGroupButton
          type="submit"
          size="icon-sm"
          variant="default"
          class="ml-auto rounded-full"
          :disabled="!canSend"
          aria-label="Send"
        >
          <ArrowUpIcon />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  </form>
</template>
```

## Attachments

The attach button opens a hidden file input. Show each file as an [Attachment](/docs/components/attachment) in an addon with `align="block-start"`, with a button to remove it.

## Model and Effort

Put the two [Model Selector](/docs/ai-elements/model-selector) menus in the `block-end` addon, between the attach and send buttons. Move `ml-auto` from the send button to the first menu trigger, so both menus sit next to the send button.

## Keyboard

Enter sends the message. Shift+Enter adds a new line.

```vue showLineNumbers
<script setup lang="ts">
function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault()
    formRef.value?.requestSubmit()
  }
}
</script>

<template>
  <InputGroupTextarea v-model="text" @keydown="onKeydown" />
</template>
```

## AI SDK

Send the text and the `FileList` from the file input.

```ts showLineNumbers
chat.sendMessage({ text, files })
```

The route streams the reply with `result.toUIMessageStreamResponse()`.

## Migrating from AI Elements Vue

If you added Prompt Input from [AI Elements Vue](https://www.ai-elements-vue.com), your project has a `components/ai-elements/prompt-input/` folder. Paste this prompt into your coding agent to rebuild it on Input Group and Attachment. Every export keeps its name and props, so the code that uses it keeps working.

```txt
Migrate components/ai-elements/prompt-input/ from AI Elements Vue to the shadcn-vue Input Group and Attachment components.

Keep every export, with the same name and props, so the code that imports it keeps working. Only change how each part renders.

1. Install the components: npx shadcn-vue@latest add input-group attachment
2. Read https://www.shadcn-vue.com/docs/ai-elements/prompt-input and build Prompt Input the same way.
3. Rebuild each part:
   - PromptInput already renders an Input Group. Keep the form, the provider, the attachment state and the command parts as they are.
   - PromptInputTextarea renders an InputGroupTextarea with class="p-3".
   - PromptInputActionMenuTrigger renders an InputGroupButton with size="icon-sm", variant="outline" and rounded-full, with a PlusIcon.
   - PromptInputSubmit renders an InputGroupButton with size="icon-sm", variant="default" and rounded-full, with an ArrowUpIcon while idle. Keep the spinner and stop icons for the other statuses.
   - PromptInputHeader shows each attachment as an Attachment with size="sm" and a button to remove it.
   - Keep PromptInputSelect, PromptInputHoverCard and the tab parts as they are.
4. Remove the imports the files no longer use.
5. Run vue-tsc and fix any errors.
```
