---
title: Bubble
description: Displays conversational content in a message bubble. Supports variants, alignment, grouping, reactions, and collapsible content.
component: true
---

::component-preview
---
name: BubbleDemo
previewClass: h-auto theme-blue
---
::

The `Bubble` component displays framed conversational content. Use it for chat text, short structured output, quoted replies, suggestions, and reactions.

For full-featured chat interfaces, use the [`Message`](/docs/components/message) component. `Bubble` is intentionally scoped to the bubble surface. Place avatars, names, timestamps, metadata, and message-level actions in [`Message`](/docs/components/message).


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
npx shadcn-vue@latest add bubble
```

::

::::tabs-content{value="manual"}
  :::steps
    ::step
    Copy and paste the [GitHub source code](https://github.com/unovue/shadcn-vue/tree/dev/apps/v4/registry/new-york-v4/ui/bubble) into your project.
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
import { Bubble, BubbleContent, BubbleReactions } from '@/components/ui/bubble'
</script>

<template>
  <Bubble>
    <BubbleContent>
      I checked the registry output and removed the stale route.
    </BubbleContent>
    <BubbleReactions>
      <span>👍</span>
    </BubbleReactions>
  </Bubble>
</template>
```

## Composition

Use the following composition to build a bubble:

```text
Bubble
├── BubbleContent
└── BubbleReactions
```

Use `BubbleGroup` to group consecutive bubbles from the same sender:

```text
BubbleGroup
├── Bubble
│   └── BubbleContent
└── Bubble
    └── BubbleContent
```

## Features

- Seven visual variants, from a strong primary bubble to unframed ghost content
- Start and end alignment for sender and receiver bubbles
- Reactions that anchor to the bubble edge with configurable side and alignment
- Bubbles size to their content, up to 80% of the container width
- Polymorphic content via `as` or `as-child` for link and button bubbles
- Customizable styling through the `class` prop on every part

## Examples

### Variants

Use `variant` to change the visual treatment of the bubble.

::component-preview
---
name: BubbleVariantsDemo
previewClass: h-auto theme-blue
---
::

| Variant       | Description                                            |
| ------------- | ------------------------------------------------------ |
| `default`     | A strong primary bubble, usually for the current user. |
| `secondary`   | The standard neutral bubble for conversation content.  |
| `muted`       | A lower-emphasis bubble for quiet supporting content.  |
| `tinted`      | A subtle primary-tinted bubble.                        |
| `outline`     | A bordered bubble for secondary or rich content.       |
| `ghost`       | Unframed content for assistant text or rich content.   |
| `destructive` | A destructive bubble for error or failed actions.      |

A bubble sizes to its content, up to 80% of the container width. The `ghost` variant removes the max-width so assistant text and rich content can span the full row.

### Alignment

Use `align` on `Bubble` to align the bubble to the start or end of the conversation.

::component-preview
---
name: BubbleAlignmentDemo
previewClass: h-auto theme-blue
---
::

| align   | Description                                        |
| ------- | -------------------------------------------------- |
| `start` | Align the bubble to the start of the conversation. |
| `end`   | Align the bubble to the end of the conversation.   |

**Note:** When building chat interfaces, you probably want to set `align` on the `Message` component itself. Bubbles inside `MessageContent` automatically follow the message alignment.

### Bubble Group

Use `BubbleGroup` to group consecutive bubbles from the same sender. Note the `align` prop should be set on the `Bubble` component itself, not the `BubbleGroup` component.

```text
BubbleGroup
├── Bubble
│   └── BubbleContent
└── Bubble
    └── BubbleContent
```

::component-preview
---
name: BubbleGroupDemo
previewClass: h-auto theme-blue
---
::

### Links and Buttons

Use `as-child` to merge `BubbleContent` styling and attributes onto a link or button passed through its default slot.

::component-preview
---
name: BubbleLinksAndButtonsDemo
previewClass: h-auto theme-blue
---
::

```vue showLineNumbers
<script setup lang="ts">
import { Bubble, BubbleContent } from '@/components/ui/bubble'
</script>

<template>
  <Bubble variant="muted">
    <BubbleContent as-child>
      <button type="button">Click here</button>
    </BubbleContent>
  </Bubble>
</template>
```

### Reactions

Use `BubbleReactions` for bubble reactions. You can use it to display reactions or quick action buttons. Use `side` and `align` to position the row — `side="top"` anchors it to the upper edge. Reactions overlap the bubble edge, so leave vertical space between rows — the examples below use a larger `gap` for this reason.

::component-preview
---
name: BubbleReactionsDemo
previewClass: h-auto theme-blue
---
::

### Show More / Collapsible

Long bubble content can be composed with [`Collapsible`](/docs/components/collapsible) to allow for a show more or show less interaction. Use the `CollapsibleTrigger` component to trigger the collapsible content.

::component-preview
---
name: BubbleCollapsibleDemo
previewClass: h-auto theme-blue
---
::

### Tooltip

Wrap a bubble in a [`Tooltip`](/docs/components/tooltip) to reveal metadata on hover, such as when a message was read.

::component-preview
---
name: BubbleTooltipDemo
previewClass: h-auto theme-blue
---
::

### Popover

Pair a bubble with a [`Popover`](/docs/components/popover) to surface more information on demand, such as the full error message for a failed action.

::component-preview
---
name: BubblePopoverDemo
previewClass: h-auto theme-blue
---
::

## Accessibility

`Bubble` renders the presentational message surface. Keep conversation-level semantics on the surrounding container and follow the guidelines below.

### Labeling Reactions

Reactions render as a row of emoji. A screen reader reads each glyph with no context, and counters like `+8` are announced as "plus eight". Group the row as a single image with a descriptive `aria-label` so it announces once. `role="img"` also hides the individual emoji from assistive tech, so no `aria-hidden` is needed.

```vue showLineNumbers
<BubbleReactions role="img" aria-label="Reactions: thumbs up, fire, and 8 more">
  <span>👍</span>
  <span>🔥</span>
  <span>+8</span>
</BubbleReactions>
```

When reactions are interactive, render buttons instead and give icon-only buttons an `aria-label`.

```vue showLineNumbers
<BubbleReactions>
  <Button aria-label="Thumbs up" variant="secondary" size="icon-xs">
    <ThumbsUpIcon />
  </Button>
</BubbleReactions>
```

### Interactive Bubbles

When a bubble is clickable, pass a real `<button>` or `<a>` through `BubbleContent` with `as-child` so it is focusable and exposes the correct role. `BubbleContent` ships a visible focus ring for interactive elements, and the accessible name comes from the bubble text. No extra label is needed.

```vue showLineNumbers
<Bubble variant="muted" align="end">
  <BubbleContent as-child>
    <button type="button" @click="onReply">
      I forgot my password
    </button>
  </BubbleContent>
</Bubble>
```

### Meaning Beyond Color

Bubble variants signal role and tone with color. Pair them with text, alignment, or icons so meaning is not conveyed by color alone. For a `destructive` bubble, keep the error context in the message text rather than relying on the color treatment.

## API Reference

All Bubble parts render a `<div>` by default. Use `as` to choose another element, or `as-child` to merge the component's attributes and styles onto the single element or component in its default slot.

### Bubble

The root bubble wrapper.

| Prop       | Type                                                                                       | Default     | Description                                                     |
| ---------- | ------------------------------------------------------------------------------------------ | ----------- | --------------------------------------------------------------- |
| `variant`  | `"default" \| "secondary" \| "muted" \| "tinted" \| "outline" \| "ghost" \| "destructive"` | `"default"` | The bubble visual treatment.                                    |
| `align`    | `"start" \| "end"`                                                                         | `"start"`   | The inline alignment of the bubble.                             |
| `as`       | `string \| Component`                                                                       | `"div"`     | The element or component to render.                             |
| `as-child` | `boolean`                                                                                    | `false`     | Render the default slot as the root and merge props onto it.    |
| `class`    | `string`                                                                                     | -           | Additional classes to apply to the root element.                |

### BubbleContent

The bubble content wrapper.

| Prop       | Type                 | Default | Description                                                  |
| ---------- | -------------------- | ------- | ------------------------------------------------------------ |
| `as`       | `string \| Component` | `"div"` | The element or component to render.                          |
| `as-child` | `boolean`            | `false` | Render the default slot as the root and merge props onto it. |
| `class`    | `string`             | -       | Additional classes to apply to the content element.          |

### BubbleReactions

Displays overlapped reactions for a bubble.

| Prop       | Type                 | Default    | Description                                                  |
| ---------- | -------------------- | ---------- | ------------------------------------------------------------ |
| `side`     | `"top" \| "bottom"` | `"bottom"` | The side of the bubble to anchor the reactions.              |
| `align`    | `"start" \| "end"`  | `"end"`    | The inline alignment of the reactions.                       |
| `as`       | `string \| Component` | `"div"`    | The element or component to render.                          |
| `as-child` | `boolean`            | `false`    | Render the default slot as the root and merge props onto it. |
| `class`    | `string`             | -          | Additional classes to apply to the reaction row.             |

### BubbleGroup

Groups consecutive bubbles from the same sender.

| Prop       | Type                 | Default | Description                                                  |
| ---------- | -------------------- | ------- | ------------------------------------------------------------ |
| `as`       | `string \| Component` | `"div"` | The element or component to render.                          |
| `as-child` | `boolean`            | `false` | Render the default slot as the root and merge props onto it. |
| `class`    | `string`             | -       | Additional classes to apply to the group root.               |
