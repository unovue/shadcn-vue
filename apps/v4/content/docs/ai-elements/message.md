---
title: Message
description: One turn. The person's message, and the agent's reply with its actions.
component: true
new: true
---

::component-preview
---
name: MessagePatternDemo
class: style-rhea
previewClass: h-auto
---
::

Use Message for one turn in a thread. The person's text is a [Bubble](/docs/components/bubble) on a [Message](/docs/components/message) with `align="end"`. The agent's reply is markdown on a Message, with actions under it. A thread of these turns is [Chat](/docs/ai-elements/chat).

## Installation

Message is built with the [Message](/docs/components/message), [Bubble](/docs/components/bubble), and [Tooltip](/docs/components/tooltip) components.

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
npx shadcn-vue@latest add message bubble tooltip
```

::

::::tabs-content{value="manual"}
  :::steps
    ::step
    Install the required shadcn-vue dependencies:
    ::

    ```bash
    npx shadcn-vue@latest add bubble tooltip
    ```

    ::step
    Copy and paste the [GitHub source code](https://github.com/unovue/shadcn-vue/tree/dev/apps/v4/registry/bases/reka/ui/message) into your project.
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
import { CopyIcon } from '@lucide/vue'
import { Bubble, BubbleContent } from '@/components/ui/bubble'
import { Button } from '@/components/ui/button'
import { Message, MessageContent, MessageFooter } from '@/components/ui/message'
</script>

<template>
  <Message align="end">
    <MessageContent>
      <Bubble align="end" variant="muted">
        <BubbleContent>How do I add a settings dialog?</BubbleContent>
      </Bubble>
    </MessageContent>
  </Message>
  <Message>
    <MessageContent class="gap-2">
      <p>Install Dialog, then open it from the gear button.</p>
      <MessageFooter>
        <Button variant="ghost" size="icon-sm" aria-label="Copy">
          <CopyIcon />
        </Button>
      </MessageFooter>
    </MessageContent>
  </Message>
</template>
```

See [Message](/docs/components/message).

## Actions

Put actions in `MessageFooter`. It follows the message alignment, so on the person's turn the actions sit on the right. Use ghost icon buttons with a tooltip for each.

- **Copy** writes the reply to the clipboard and swaps to a check for two seconds.
- **Good response** and **Bad response** are toggles. Set `aria-pressed` so screen readers announce the state.
- **Retry** runs the turn again.
- **Edit** on the person's turn puts the text back in the field.

## Markdown

The reply streams as markdown. Render it with [Comark](https://comark.dev) (`@comark/vue`) and route fenced code to a [Code Block](/docs/components/code-block#markdown) with a custom `pre` component, so code in the reply gets line numbers and a copy button. Pass `streaming` while the reply streams, so unfinished syntax is closed as it renders.

```vue showLineNumbers
<script setup lang="ts">
import { Markdown } from '@comark/vue'
import MarkdownCodeBlock from './MarkdownCodeBlock.vue'
</script>

<template>
  <Markdown
    class="typeset"
    :value="text"
    :components="{ pre: MarkdownCodeBlock }"
    :streaming="isStreaming"
  />
</template>
```

## AI SDK

Branch on the message role. The person's turn is the bubble. The agent's turn is the reply, and `chat.regenerate` with the message id runs it again.

```vue showLineNumbers
<script setup lang="ts">
import type { UIMessage } from 'ai'
import { Chat } from '@ai-sdk/vue'
import { Markdown } from '@comark/vue'
import { RefreshCcwIcon } from '@lucide/vue'
import MarkdownCodeBlock from './MarkdownCodeBlock.vue'

const chat = new Chat({})

function getText(message: UIMessage) {
  return message.parts.map(part => (part.type === 'text' ? part.text : '')).join('')
}
</script>

<template>
  <template v-for="message in chat.messages" :key="message.id">
    <Message v-if="message.role === 'user'" align="end">
      <MessageContent>
        <Bubble align="end" variant="muted">
          <BubbleContent>{{ getText(message) }}</BubbleContent>
        </Bubble>
      </MessageContent>
    </Message>
    <Message v-else>
      <MessageContent class="gap-2">
        <Markdown
          class="typeset"
          :value="getText(message)"
          :components="{ pre: MarkdownCodeBlock }"
          :streaming="chat.status === 'streaming' && message === chat.messages.at(-1)"
        />
        <MessageFooter>
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Retry"
            @click="chat.regenerate({ messageId: message.id })"
          >
            <RefreshCcwIcon />
          </Button>
        </MessageFooter>
      </MessageContent>
    </Message>
  </template>
</template>
```

## Migrating from AI Elements Vue

If you added Message from [AI Elements Vue](https://www.ai-elements-vue.com), your project has a `components/ai-elements/message/` folder. Paste this prompt into your coding agent to rebuild it on Message, Bubble and Tooltip. Every export keeps its name and props, so the code that uses it keeps working.

```txt
Migrate components/ai-elements/message/ from AI Elements Vue to the shadcn-vue Message, Bubble and Tooltip components.

Keep every export, with the same name and props, so the code that imports it keeps working. Only change how each part renders.

1. Install the components: npx shadcn-vue@latest add message bubble tooltip
2. Read https://www.shadcn-vue.com/docs/ai-elements/message and build Message the same way.
3. Rebuild each part:
   - This folder exports Message and MessageContent too, so import the shadcn-vue parts under other names, like MessageRoot and MessageBody.
   - Message renders the shadcn-vue Message, with align="end" when from is "user". Pass from down with provide/inject.
   - MessageContent renders the shadcn-vue MessageContent. For the person's messages, wrap the slot in a Bubble with align="end" and variant="muted".
   - MessageActions renders a MessageFooter.
   - MessageAction renders a Button with variant="ghost" and size="icon-sm" in a Tooltip, with its label as the aria-label.
   - Keep MessageResponse on the markdown renderer it already uses, and keep the branch parts and MessageToolbar as they are.
4. Remove the imports the files no longer use.
5. Run vue-tsc and fix any errors.
```
