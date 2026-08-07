---
title: Message Scroller
description: A scroll container for chat transcripts that anchors turns, follows streamed replies, restores prepended history, and jumps to messages.
component: true
---

::component-preview
---
name: MessageScrollerDemo
class: "style-luma rounded-[34px] sm:rounded-4xl"
previewClass: h-auto theme-green bg-surface dark:bg-background p-4 min-[480px]:p-8 min-[560px]:p-10 sm:px-10 sm:py-16
---
::

## MessageScroller

A great streaming chat scroller has to juggle a lot at once: pin to the live edge while a reply streams, but never fight a reader who scrolls up; anchor each new turn near the top with a peek of the previous exchange; preserve position when older history loads above; and expose commands to jump anywhere in the thread. `MessageScroller` owns those hard parts so your message list doesn't have to.

It does **not** own your messages, AI state, transport, or model — it is a headless scroll container you compose around your own rows.

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
npx shadcn-vue@latest add message-scroller
```

::

::::tabs-content{value="manual"}
  :::steps
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
<script setup lang="ts">
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from '@/components/ui/message-scroller'
</script>

<template>
  <MessageScrollerProvider auto-scroll default-scroll-position="last-anchor">
    <MessageScroller>
      <MessageScrollerViewport>
        <MessageScrollerContent>
          <MessageScrollerItem
            v-for="message in messages"
            :key="message.id"
            :message-id="message.id"
            :scroll-anchor="message.role === 'user'"
          >
            <!-- Message / Bubble / Marker goes here -->
          </MessageScrollerItem>
        </MessageScrollerContent>
      </MessageScrollerViewport>
      <MessageScrollerButton direction="end" />
    </MessageScroller>
  </MessageScrollerProvider>
</template>
```

The provider must have a constrained height (or a height-bounded parent) so the viewport can scroll.

## Composition

```text
MessageScrollerProvider
└── MessageScroller
    ├── MessageScrollerViewport
    │   └── MessageScrollerContent
    │       └── MessageScrollerItem
    └── MessageScrollerButton
```

## Core Concepts

### Anchoring Turns

A turn is the part of the conversation that starts a new exchange — usually the user's message and the assistant reply that follows. An *anchor* is the row the viewport should treat as the start of that turn. Mark that row with `scrollAnchor`. When a new anchor is appended, the viewport moves it near the top and keeps a peek of the previous item above it, so the new turn does not feel detached from its context.

```vue
<MessageScrollerItem
  :message-id="message.id"
  :scroll-anchor="message.role === 'user'"
>
  <!-- ... -->
</MessageScrollerItem>
```

Scroll anchors are not tied to message role. You can turn any row into an anchor: a user message, a system marker, a handoff event, or anything else that starts a meaningful turn.

::component-preview
---
name: MessageScrollerAnchoringDemo
class: "style-luma rounded-[34px] sm:rounded-4xl"
previewClass: h-auto theme-green bg-surface dark:bg-background p-4 min-[480px]:p-8 min-[560px]:p-10 sm:px-10 sm:py-16
---
::

### Group Chat

In a group chat, the turn boundary is often the message that asks the model to respond, or a marker like "Marcus joined the chat". Typing indicators and history controls usually should not anchor. Because anchoring is role-independent, you can anchor a marker just as easily as a message.

::component-preview
---
name: MessageScrollerGroupChatDemo
class: "style-luma rounded-[34px] sm:rounded-4xl"
previewClass: h-auto theme-green bg-surface dark:bg-background p-4 min-[480px]:p-8 min-[560px]:p-10 sm:px-10 sm:py-16
---
::

### Keeping Context Visible

When a new turn starts, it should still feel like part of the same continuous thread. `scrollPreviousItemPeek` keeps a slice of the previous item visible above the anchor, so the reader keeps their context instead of feeling like the conversation restarted on a blank page.

::component-preview
---
name: MessageScrollerPreviousContextDemo
class: "style-luma rounded-[34px] sm:rounded-4xl"
previewClass: h-auto theme-green bg-surface dark:bg-background p-4 min-[480px]:p-8 min-[560px]:p-10 sm:px-10 sm:py-16
---
::

### Following the Live Edge

When the reader is at the live edge, `autoScroll` keeps streamed replies in view as they grow. Scrolling away from the live edge — by wheel, touch, keyboard, or dragging the scrollbar — releases the view, so new chunks arrive without moving the reader. `autoScroll` composes with turn anchoring: when a new turn anchors near the top, the view stays put while the reply streams into the room below it.

::component-preview
---
name: MessageScrollerStreamingDemo
class: "style-luma rounded-[34px] sm:rounded-4xl"
previewClass: h-auto theme-green bg-surface dark:bg-background p-4 min-[480px]:p-8 min-[560px]:p-10 sm:px-10 sm:py-16
---
::

### Opening Saved Threads

Reopening a saved thread at the absolute end often drops the reader in without enough context. A better default is `"last-anchor"`: show the last meaningful turn, like the user's latest message, with the reply below it.

::component-preview
---
name: MessageScrollerOpeningPositionDemo
class: "style-luma rounded-[34px] sm:rounded-4xl"
previewClass: h-auto theme-green bg-surface dark:bg-background p-4 min-[480px]:p-8 min-[560px]:p-10 sm:px-10 sm:py-16
---
::

### Loading Earlier Messages

Loading earlier messages should not move the conversation the reader is already looking at. When older rows are prepended above the current transcript, `MessageScrollerViewport` preserves the visible row so the reader stays in the same place while history loads above them. This is enabled by default through `preserveScrollOnPrepend`.

::component-preview
---
name: MessageScrollerLoadHistoryDemo
class: "style-luma rounded-[34px] sm:rounded-4xl"
previewClass: h-auto theme-green bg-surface dark:bg-background p-4 min-[480px]:p-8 min-[560px]:p-10 sm:px-10 sm:py-16
---
::

### Animating New Messages

A common chat pattern is to animate the user's message when it is sent, then let the assistant reply stream into a regular row below it. Keep `messageId` and `scrollAnchor` on the animated item and use transform and opacity for the entrance — avoid animating height, margin, or padding, which can fight the scroller's positioning.

::component-preview
---
name: MessageScrollerAnimationDemo
class: "style-luma rounded-[34px] sm:rounded-4xl"
previewClass: h-auto theme-green bg-surface dark:bg-background p-4 min-[480px]:p-8 min-[560px]:p-10 sm:px-10 sm:py-16
---
::

### Jumping to Messages

Search results, permalinks, outline items, and toolbar buttons often need to drive the transcript from outside the message list. Use `useMessageScroller` for those controls — the composables read from `MessageScrollerProvider`, so they work in any component inside the provider.

```vue
<script setup lang="ts">
import { useMessageScroller } from '@/components/ui/message-scroller'

const { scrollToMessage, scrollToEnd, scrollToStart } = useMessageScroller()
</script>
```

::component-preview
---
name: MessageScrollerCommandsDemo
class: "style-luma rounded-[34px] sm:rounded-4xl"
previewClass: h-auto theme-green bg-surface dark:bg-background p-4 min-[480px]:p-8 min-[560px]:p-10 sm:px-10 sm:py-16
---
::

### Tracking the Reader's Position

Use `useMessageScrollerVisibility` to track the reader's position — a table-of-contents or jump menu that highlights the current anchored turn. `currentAnchorId` answers "where am I" and stays set after that anchor scrolls above the viewport; `visibleMessageIds` answers "what is on screen", in document order.

::component-preview
---
name: MessageScrollerVisibilityDemo
class: "style-luma rounded-[34px] sm:rounded-4xl"
previewClass: h-auto theme-green bg-surface dark:bg-background p-4 min-[480px]:p-8 min-[560px]:p-10 sm:px-10 sm:py-16
---
::

### Reading Scroll State

Use `useMessageScrollerScrollable` when you need scroll state in JavaScript, such as a status indicator or a custom "jump to latest" control. It reports which edges the viewport can still scroll toward.

::component-preview
---
name: MessageScrollerScrollableDemo
class: "style-luma rounded-[34px] sm:rounded-4xl"
previewClass: h-auto theme-green bg-surface dark:bg-background p-4 min-[480px]:p-8 min-[560px]:p-10 sm:px-10 sm:py-16
---
::

## API Reference

### MessageScrollerProvider

Owns the scroll state and behavior. Provide it via `provide`/`inject` and expose the scroll composables to descendants.

| Prop                     | Type                                  | Default        | Description                                                            |
| ------------------------ | ------------------------------------- | -------------- | -------------------------------------------------------------------- |
| `autoScroll`             | `boolean`                             | `false`        | Follow the live edge while the reader is pinned to the bottom.        |
| `defaultScrollPosition`  | `'start' \| 'end' \| 'last-anchor'`   | `'end'`        | Opening position for the transcript.                                  |
| `scrollEdgeThreshold`    | `number`                              | `8`            | Distance in px from an edge before it is considered scrollable.       |
| `scrollPreviousItemPeek` | `number`                              | `64`           | Amount in px of the previous turn kept visible when anchoring.        |
| `scrollMargin`           | `number`                              | `0`            | Extra offset in px applied when scrolling to an element.              |

### MessageScrollerViewport

| Prop                       | Type      | Default | Description                                             |
| -------------------------- | --------- | ------- | ------------------------------------------------------- |
| `preserveScrollOnPrepend`  | `boolean` | `true`  | Keep the current view when messages are added above.    |

Rendered as a `role="region"`, `aria-label="Messages"`, focusable (`tabindex="0"`) native scroll container.

### MessageScrollerItem

| Prop           | Type      | Default | Description                                      |
| -------------- | --------- | ------- | ------------------------------------------------ |
| `messageId`    | `string`  | —       | Stable id used for anchoring, visibility, jumps. |
| `scrollAnchor` | `boolean` | `false` | Marks this row as the start of a turn.           |

### MessageScrollerButton

| Prop        | Type                  | Default   | Description                              |
| ----------- | --------------------- | --------- | ---------------------------------------- |
| `direction` | `'start' \| 'end'`    | `'end'`   | Direction the button scrolls toward.     |
| `behavior`  | `ScrollBehavior`      | `'smooth'`| Scroll behavior for the jump.            |
| `variant`   | `ButtonVariants`      | `'secondary'` | Button variant.                      |
| `size`      | `ButtonVariants`      | `'icon-sm'`   | Button size.                         |

Exposes `data-active` for styling and becomes `inert` with `tabindex="-1"` when there is nothing to scroll toward.

### Composables

#### useMessageScroller()

```ts
const { scrollToMessage, scrollToEnd, scrollToStart } = useMessageScroller()
```

- `scrollToMessage(id, options?)` — scroll to the item with the matching `messageId`. Returns `true` if handled (queued if the item is not mounted yet), `false` if the id is missing after rows have mounted.
- `scrollToEnd(options?)` / `scrollToStart(options?)` — scroll to the live edge or the top.

#### useMessageScrollerVisibility()

```ts
const visibility = useMessageScrollerVisibility()
// visibility.value.currentAnchorId, visibility.value.visibleMessageIds
```

Tracking only runs while something subscribes, and rows need a `messageId` to participate.

#### useMessageScrollerScrollable()

```ts
const scrollable = useMessageScrollerScrollable()
// scrollable.value.start, scrollable.value.end
```

Reports which edges the viewport can still scroll toward. For styling the scroller itself, prefer the `data-scrollable` attribute.
