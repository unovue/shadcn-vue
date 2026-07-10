---
title: Message Scroller
description: A scroll container for chat transcripts that anchors turns, follows streamed replies, restores prepended history, and jumps to messages.
component: true
new: true
---

::component-preview
---
name: MessageScrollerDemo
class: style-luma
---
::

## Installation

::code-tabs

::tabs-list

  ::tabs-trigger{value="cli"}
  CLI
  ::

  ::tabs-trigger{value="manual"}
  Manual
  ::

::

::tabs-content{value="cli"}

```bash
npx shadcn-vue@latest add message-scroller
```

::

::tabs-content{value="manual"}
  ::steps
    ::step
    Copy and paste the [GitHub source code](https://github.com/unovue/shadcn-vue/tree/dev/apps/v4/registry/bases/reka/ui/message-scroller) into your project.
    ::

    ::step
    Update the import paths to match your project setup.
    ::
  ::
::

::

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
  <MessageScrollerProvider default-scroll-position="end">
    <MessageScroller>
      <MessageScrollerViewport>
        <MessageScrollerContent>
          <MessageScrollerItem
            v-for="message in messages"
            :key="message.id"
            :message-id="message.id"
            :scroll-anchor="message.author === 'me'"
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

## Features

- **Anchored turns** — a new `scroll-anchor` item is pinned near the top of the viewport, keeping a peek of the previous turn visible.
- **Follow the live edge** — with `auto-scroll`, the view follows streamed output only while the reader is already at the bottom; scrolling away releases follow.
- **Prepend preservation** — loading older messages above does not move the current view.
- **Jump to message** — `scrollToMessage(id)` scrolls to any item and can queue a target that has not mounted yet.
- **Scroll controls** — `MessageScrollerButton` fades in only when there is content to scroll toward, and becomes `inert` otherwise.
- **Visibility tracking** — observe the current anchor and visible message ids without re-rendering on every scroll frame.
- Pairs with the [`scroll-fade`](/docs/utils/scroll-fade) utility for edge fades.

## Examples

### Streaming

Set `auto-scroll` to follow streamed replies. The view stays pinned to the bottom while tokens arrive, and releases the moment the reader scrolls up.

::component-preview
---
name: MessageScrollerStreamingDemo
class: style-luma
---
::

### Jump to message

Use the `useMessageScroller` composable to jump to any message by id. `MessageScrollerButton` scrolls to the start or end.

::component-preview
---
name: MessageScrollerJumpDemo
class: style-luma
---
::

```vue showLineNumbers
<script setup lang="ts">
import { useMessageScroller } from '@/components/ui/message-scroller'

const { scrollToMessage, scrollToEnd, scrollToStart } = useMessageScroller()

function focusMessage(id: string) {
  scrollToMessage(id, { align: 'start' })
}
</script>
```

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

- `scrollToMessage(id, options?)` — scroll to the item with the matching `messageId`. Returns `true` if handled (queued if the item is not mounted yet).
- `scrollToEnd(options?)` / `scrollToStart(options?)` — scroll to the live edge or the top.

#### useMessageScrollerVisibility()

```ts
const visibility = useMessageScrollerVisibility()
// visibility.value.currentAnchorId, visibility.value.visibleMessageIds
```

#### useMessageScrollerScrollable()

```ts
const scrollable = useMessageScrollerScrollable()
// scrollable.value.start, scrollable.value.end
```
