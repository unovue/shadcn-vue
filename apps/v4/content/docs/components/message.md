---
title: Message
description: Displays a message in a conversation, with optional avatar, header, footer, and alignment.
component: true
new: true
---

::component-preview
---
name: MessageDemo
class: theme-blue
---
::

The `Message` component lays out a single message in a conversation. It handles the avatar, alignment, header, and footer around the message surface.

For AI apps, you can render reasoning steps, tool calls and assistant messages using the `Message` component.

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
npx shadcn-vue@latest add message
```

::

::::tabs-content{value="manual"}
  :::steps
    ::step
    Copy and paste the [GitHub source code](https://github.com/unovue/shadcn-vue/tree/dev/apps/v4/registry/new-york-v4/ui/message) into your project.
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bubble, BubbleContent } from "@/components/ui/bubble"
import { Message, MessageAvatar, MessageContent } from "@/components/ui/message"
</script>

<template>
  <Message>
    <MessageAvatar>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </MessageAvatar>
    <MessageContent>
      <Bubble>
        <BubbleContent>How can I help you today?</BubbleContent>
      </Bubble>
    </MessageContent>
  </Message>
</template>
```


**Note:** `Message` owns the row layout—avatar, alignment, header, and footer.
Render the visible message surface inside it with
[`Bubble`](/docs/components/bubble).

## Composition

Use the following composition to build a message:

```text
Message
├── MessageAvatar
└── MessageContent
    ├── MessageHeader
    ├── Bubble
    └── MessageFooter
```

Use `MessageGroup` to stack consecutive messages from the same sender:

```text
MessageGroup
├── Message
└── Message
```

## Features

- Start and end alignment for sender and receiver rows via the `align` prop
- Avatar slot that anchors to the bottom of the message and stays clear of the footer
- Header and footer slots for sender names, status, and message actions
- Footer follows the message side; actions stay aligned on `align="end"` rows
- Group wrapper for stacking consecutive messages from the same sender
- Polymorphic wrappers via `as` or `as-child`
- Customizable styling through the `class` prop on every part

## Examples

### Avatar

Use `MessageAvatar` to render an avatar next to the message. Set `align="end"` on the message to align the avatar to the end of the message.

::component-preview
---
name: MessageAvatarDemo
class: theme-blue
---
::

| align   | Description                                         |
| ------- | --------------------------------------------------- |
| `start` | Align the message to the start of the conversation. |
| `end`   | Align the message to the end of the conversation.   |

### Group

Use `MessageGroup` to stack consecutive messages from the same sender. Render an empty `MessageAvatar` on the earlier messages to keep them aligned with the avatar on the last one.

::component-preview
---
name: MessageGroupDemo
class: theme-blue
---
::

### Header and Footer

Use `MessageHeader` for a sender name and `MessageFooter` for metadata such as a delivery or read status.

::component-preview
---
name: MessageHeaderAndFooterDemo
class: theme-blue
---
::

### Actions

Place message-level actions in `MessageFooter`, such as copy, retry, or feedback buttons.

::component-preview
---
name: MessageActionsDemo
class: theme-blue
---
::

## Accessibility

`Message` is a presentational layout wrapper. Accessibility comes from the content you place inside it.

### Label icon-only actions

Action buttons in `MessageFooter` are usually icon-only, so give each one an `aria-label`.

```vue showLineNumbers
<MessageFooter>
  <Button variant="ghost" size="icon" aria-label="Copy">
    <CopyIcon />
  </Button>
</MessageFooter>
```

### Status updates

For in-progress messages, use a [`Marker`](/docs/components/marker) with `role="status"` so assistive tech announces the update as it appears.

```vue showLineNumbers
<Message>
  <Marker role="status">
    <MarkerIcon>
      <Spinner />
    </MarkerIcon>
    <MarkerContent>Checking the logs...</MarkerContent>
  </Marker>
</Message>
```

## API Reference

All Message parts render a `<div>` by default. Use `as` to choose another element, or `as-child` to merge the component's attributes and styles onto the single element or component in its default slot.

### Message

The message row wrapper.

| Prop       | Type                 | Default   | Description                                                  |
| ---------- | -------------------- | --------- | ------------------------------------------------------------ |
| `align`    | `"start" \| "end"` | `"start"` | The alignment of the message in the conversation.            |
| `as`       | `string \| Component` | `"div"`   | The element or component to render.                          |
| `as-child` | `boolean`            | `false`   | Render the default slot as the root and merge props onto it. |
| `class`    | `string`             | -         | Additional classes to apply to the row.                      |

### MessageGroup

Groups consecutive messages from the same sender.

| Prop       | Type                 | Default | Description                                                  |
| ---------- | -------------------- | ------- | ------------------------------------------------------------ |
| `as`       | `string \| Component` | `"div"` | The element or component to render.                          |
| `as-child` | `boolean`            | `false` | Render the default slot as the root and merge props onto it. |
| `class`    | `string`             | -       | Additional classes to apply to the group root.               |

### MessageAvatar

The avatar slot, aligned to the bottom of the message. When the message has a `MessageFooter`, the avatar shifts up to stay aligned with the message surface instead of the footer.

| Prop       | Type                 | Default | Description                                                  |
| ---------- | -------------------- | ------- | ------------------------------------------------------------ |
| `as`       | `string \| Component` | `"div"` | The element or component to render.                          |
| `as-child` | `boolean`            | `false` | Render the default slot as the root and merge props onto it. |
| `class`    | `string`             | -       | Additional classes to apply to the avatar wrapper.           |

### MessageContent

Wraps the header, message surface, and footer.

| Prop       | Type                 | Default | Description                                                  |
| ---------- | -------------------- | ------- | ------------------------------------------------------------ |
| `as`       | `string \| Component` | `"div"` | The element or component to render.                          |
| `as-child` | `boolean`            | `false` | Render the default slot as the root and merge props onto it. |
| `class`    | `string`             | -       | Additional classes to apply to the content wrapper.          |

### MessageHeader

Displays content above the message, such as a sender name. Aligns to the message side.

| Prop       | Type                 | Default | Description                                                  |
| ---------- | -------------------- | ------- | ------------------------------------------------------------ |
| `as`       | `string \| Component` | `"div"` | The element or component to render.                          |
| `as-child` | `boolean`            | `false` | Render the default slot as the root and merge props onto it. |
| `class`    | `string`             | -       | Additional classes to apply to the header.                   |

### MessageFooter

Displays content below the message, such as status or actions. Aligns to the message side.

| Prop       | Type                 | Default | Description                                                  |
| ---------- | -------------------- | ------- | ------------------------------------------------------------ |
| `as`       | `string \| Component` | `"div"` | The element or component to render.                          |
| `as-child` | `boolean`            | `false` | Render the default slot as the root and merge props onto it. |
| `class`    | `string`             | -       | Additional classes to apply to the footer.                   |
