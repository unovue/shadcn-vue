---
title: Chat
description: The thread. Message Scroller keeps your place while the reply streams.
component: true
new: true
---

::component-preview
---
name: ChatDemo
class: style-rhea rounded-[34px] sm:rounded-4xl
previewClass: h-auto theme-blue p-4 min-[480px]:p-8 min-[560px]:p-10 sm:px-10 sm:pt-16 sm:pb-8
---
::

Chat is the thread of a conversation with the agent. Each turn is a [Message](/docs/ai-elements/message) inside [Message Scroller](/docs/components/message-scroller). The person's message is the scroll anchor, so a new question settles near the top and the reply streams in under it. The field is a [Prompt Input](/docs/ai-elements/prompt-input).

## Installation

Chat is built with the [Message Scroller](/docs/components/message-scroller), [Message](/docs/components/message), [Bubble](/docs/components/bubble), and [Input Group](/docs/components/input-group) components.

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
npx shadcn-vue@latest add message-scroller message bubble input-group
```

::

::::tabs-content{value="manual"}
  :::steps
    ::step
    Install the required shadcn-vue dependencies:
    ::

    ```bash
    npx shadcn-vue@latest add message bubble input-group
    ```

    ::step
    Copy and paste the [GitHub source code](https://github.com/unovue/shadcn-vue/tree/dev/apps/v4/registry/bases/reka/ui/message-scroller) into your project.
    ::

    ::step
    Update the import paths to match your project setup.
    ::
  :::
::::

:::::

## Usage

```vue showLineNumbers
<template>
  <MessageScrollerProvider auto-scroll>
    <MessageScroller>
      <MessageScrollerViewport>
        <MessageScrollerContent>
          <MessageScrollerItem :message-id="id" scroll-anchor>
            <Message align="end">
              <MessageContent>
                <Bubble align="end" variant="muted">
                  <BubbleContent>{{ text }}</BubbleContent>
                </Bubble>
              </MessageContent>
            </Message>
          </MessageScrollerItem>
        </MessageScrollerContent>
      </MessageScrollerViewport>
      <MessageScrollerButton />
    </MessageScroller>
  </MessageScrollerProvider>
</template>
```

`scroll-anchor` goes on the person's turn. `auto-scroll` follows the reply while the person stays at the live edge.

See [Message Scroller](/docs/components/message-scroller).

## AI SDK

Render `chat.messages` from the [AI SDK](https://ai-sdk.dev/docs/getting-started/nuxt) `Chat` class. Each message is a `MessageScrollerItem` keyed by its `id`, and the person's messages are the scroll anchors.

```vue showLineNumbers
<script setup lang="ts">
import { Chat } from '@ai-sdk/vue'

const chat = new Chat({})
</script>

<template>
  <MessageScrollerProvider auto-scroll>
    <MessageScroller>
      <MessageScrollerViewport>
        <MessageScrollerContent :aria-busy="chat.status === 'streaming'">
          <MessageScrollerItem
            v-for="message in chat.messages"
            :key="message.id"
            :message-id="message.id"
            :scroll-anchor="message.role === 'user'"
          >
            <!-- Render the message -->
          </MessageScrollerItem>
        </MessageScrollerContent>
      </MessageScrollerViewport>
      <MessageScrollerButton />
    </MessageScroller>
  </MessageScrollerProvider>
</template>
```

## Markdown

The agent's reply streams as markdown. Render it with [Comark](https://comark.dev) (`@comark/vue`) and route fenced code to a [Code Block](/docs/components/code-block#markdown) with a custom `pre` component, the same way as in [Message](/docs/ai-elements/message#markdown). Pass `streaming` only to the reply that is still streaming.

```vue showLineNumbers
<script setup lang="ts">
import { Markdown } from '@comark/vue'
import MarkdownCodeBlock from './MarkdownCodeBlock.vue'
</script>

<template>
  <Message>
    <MessageContent>
      <Markdown
        class="typeset"
        :value="getText(message)"
        :components="{ pre: MarkdownCodeBlock }"
        :streaming="chat.status === 'streaming' && message === chat.messages.at(-1)"
      />
    </MessageContent>
  </Message>
</template>
```

## Migrating from AI Elements Vue

If you added Conversation from [AI Elements Vue](https://www.ai-elements-vue.com), your project has a `components/ai-elements/conversation/` folder. Paste this prompt into your coding agent to rebuild it on Message Scroller. Every export keeps its name and props, so the code that uses it keeps working.

```txt
Migrate components/ai-elements/conversation/ from AI Elements Vue to the shadcn-vue Message Scroller component.

Keep every export, with the same name and props, so the code that imports it keeps working. Only change how each part renders.

1. Install Message Scroller: npx shadcn-vue@latest add message-scroller
2. Read https://www.shadcn-vue.com/docs/ai-elements/chat and build Chat the same way.
3. Rebuild each part:
   - Conversation renders a MessageScrollerProvider with auto-scroll and a MessageScroller, instead of StickToBottom.
   - ConversationContent renders a MessageScrollerViewport and a MessageScrollerContent.
   - ConversationScrollButton renders a MessageScrollerButton.
   - Keep ConversationEmptyState, ConversationDownload and messagesToMarkdown as they are.
4. In the code that renders the thread, wrap each message in a MessageScrollerItem with its message-id, and set scroll-anchor on the person's messages. This is the only change outside the folder.
5. Remove vue-stick-to-bottom from the dependencies.
6. Remove the imports the files no longer use.
7. Run vue-tsc and fix any errors.
```
