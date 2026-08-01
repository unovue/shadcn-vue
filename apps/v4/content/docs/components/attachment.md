---
title: Attachment
description: Displays a file or image attachment with media, metadata, upload state, and actions.
component: true
new: true
---

::component-preview
---
name: AttachmentDemo
---
::

The `Attachment` component displays a file or image attachment, its media, name, and metadata, with optional actions and upload state. Use it for files and images in chat composers, message threads, and upload lists.


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
npx shadcn-vue@latest add attachment
```

::

::::tabs-content{value="manual"}
  :::steps
    ::step
    Copy and paste the [GitHub source code](https://github.com/unovue/shadcn-vue/tree/dev/apps/v4/registry/bases/reka/ui/attachment) into your project.
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
import { FileTextIcon, XIcon } from '@lucide/vue'
import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
} from '@/components/ui/attachment'
</script>

<template>
  <Attachment>
    <AttachmentMedia>
      <FileTextIcon />
    </AttachmentMedia>
    <AttachmentContent>
      <AttachmentTitle>sales-dashboard.pdf</AttachmentTitle>
      <AttachmentDescription>PDF · 2.4 MB</AttachmentDescription>
    </AttachmentContent>
    <AttachmentActions>
      <AttachmentAction aria-label="Remove sales-dashboard.pdf">
        <XIcon />
      </AttachmentAction>
    </AttachmentActions>
  </Attachment>
</template>
```

## Composition

Use the following composition to build an attachment:

```text
Attachment
├── AttachmentMedia
├── AttachmentContent
│   ├── AttachmentTitle
│   └── AttachmentDescription
├── AttachmentActions
│   └── AttachmentAction
└── AttachmentTrigger
```

Use `AttachmentGroup` to lay out multiple attachments in a scrollable row:

```text
AttachmentGroup
├── Attachment
└── Attachment
```

## Features

- Icon and image media through `AttachmentMedia`
- Upload states: `idle`, `uploading`, `processing`, `error`, and `done` with built-in styling and a shimmer while in progress
- Three sizes and horizontal or vertical orientation
- A full-card `AttachmentTrigger` that opens a link or dialog while the actions stay independently clickable
- Scrollable, snapping `AttachmentGroup` with an edge fade
- Customizable styling through the Vue `class` attribute on every part

## Examples

### Image

Set `variant="image"` on `AttachmentMedia` and render an `<img>` inside it. Use `orientation="vertical"` to stack the media above the content.

::component-preview
---
name: AttachmentImageDemo
---
::

### States

Set `state` to reflect the upload lifecycle. `uploading` and `processing` shimmer the title, and `error` switches to a destructive treatment.

::component-preview
---
name: AttachmentStatesDemo
---
::

### Sizes

Use `size` to switch between `default`, `sm`, and `xs`.

::component-preview
---
name: AttachmentSizesDemo
---
::

### Group

Wrap attachments in `AttachmentGroup` to lay them out in a horizontally scrollable, snapping row with an edge fade.


::component-preview
---
name: AttachmentGroupDemo
---
::

### Trigger

Add an `AttachmentTrigger` to make the whole card open a link or dialog. It fills the card behind the actions, so the actions stay clickable.

::component-preview
---
name: AttachmentTriggerDemo
---
::

```vue showLineNumbers
<template>
  <Dialog>
    <Attachment>
      <!-- media, content, actions -->
      <DialogTrigger as-child>
        <AttachmentTrigger aria-label="Preview research-summary.pdf" />
      </DialogTrigger>
    </Attachment>
    <DialogContent>
      <!-- ... -->
    </DialogContent>
  </Dialog>
</template>
```

## Accessibility

`AttachmentAction` renders a `Button`, and `AttachmentTrigger` renders a real `<button>` (or your element via `as-child`). Follow the guidance below so both are operable and announced.

### Label icon-only actions

`AttachmentAction` is usually icon-only, so give each one an `aria-label` describing the action and its target.

```vue showLineNumbers
<template>
  <AttachmentAction aria-label="Remove sales-dashboard.pdf">
    <XIcon />
  </AttachmentAction>
</template>
```

### Label the trigger

`AttachmentTrigger` covers the card with no text of its own, so give it an `aria-label` for what activating it does.

```vue showLineNumbers
<template>
  <AttachmentTrigger as-child>
    <a
      :href="url"
      target="_blank"
      rel="noreferrer"
      aria-label="Open workspace.png"
    />
  </AttachmentTrigger>
</template>
```

The trigger sits behind the actions in the stacking order, so an `AttachmentAction` and the `AttachmentTrigger` never trap each other — both remain separately focusable and clickable.

### Keyboard scrolling

An `AttachmentGroup` scrolls horizontally. When its attachments are interactive: a trigger or actions, keyboard users reach off-screen items by tabbing to them. For a row of presentational attachments, make the group itself focusable and scrollable by adding `tabindex="0"`, `role="group"`, and an `aria-label`.

### Meaning beyond color

The `error` state uses a destructive color. Keep the failure reason in `AttachmentDescription` so the state is not conveyed by color alone.

## API Reference

### Attachment

The root attachment container.

| Prop          | Type                                                         | Default        | Description                                       |
| ------------- | ------------------------------------------------------------ | -------------- | ------------------------------------------------- |
| `state`       | `"idle" \| "uploading" \| "processing" \| "error" \| "done"` | `"done"`       | The upload state. Drives styling and the shimmer. |
| `size`        | `"default" \| "sm" \| "xs"`                                  | `"default"`    | The attachment size.                              |
| `orientation` | `"horizontal" \| "vertical"`                                 | `"horizontal"` | Lay the media beside or above the content.        |
| `class`       | `HTMLAttributes["class"]`                                    | -              | Additional classes to apply to the root element.  |

### AttachmentMedia

The media slot for an icon or image preview.

| Prop        | Type                | Default  | Description                                    |
| ----------- | ------------------- | -------- | ---------------------------------------------- |
| `variant`   | `"icon" \| "image"` | `"icon"` | Whether the media holds an icon or an `<img>`. |
| `class`   | `HTMLAttributes["class"]` | -        | Additional classes to apply to the media slot. |

### AttachmentContent

Wraps the title and description.

| Prop        | Type     | Default | Description                                      |
| ----------- | -------- | ------- | ------------------------------------------------ |
| `class` | `HTMLAttributes["class"]` | -       | Additional classes to apply to the content slot. |

### AttachmentTitle

The attachment name. Shimmers while the attachment is `uploading` or `processing`.

| Prop        | Type     | Default | Description                               |
| ----------- | -------- | ------- | ----------------------------------------- |
| `class` | `HTMLAttributes["class"]` | -       | Additional classes to apply to the title. |

### AttachmentDescription

Secondary metadata such as the file type, size, or upload status.

| Prop        | Type     | Default | Description                                     |
| ----------- | -------- | ------- | ----------------------------------------------- |
| `class` | `HTMLAttributes["class"]` | -       | Additional classes to apply to the description. |

### AttachmentActions

A container for one or more actions, aligned to the end of the attachment.

| Prop        | Type     | Default | Description                                 |
| ----------- | -------- | ------- | ------------------------------------------- |
| `class` | `HTMLAttributes["class"]` | -       | Additional classes to apply to the actions. |

### AttachmentAction

An action button. Renders a [`Button`](/docs/components/button) and accepts Vue fallthrough attributes such as `aria-label`.

| Prop       | Type                       | Default     | Description                                  |
| ---------- | -------------------------- | ----------- | -------------------------------------------- |
| `variant`  | `ButtonVariants["variant"]` | `"ghost"`   | The button variant.                          |
| `size`     | `ButtonVariants["size"]`   | `"icon-xs"` | The button size.                             |
| `class`    | `HTMLAttributes["class"]`  | -           | Additional classes to apply to the action.   |

### AttachmentTrigger

A full-card overlay that activates the attachment. Renders a `<button>` by default and accepts Vue fallthrough attributes such as `aria-label`.

| Prop       | Type                             | Default | Description                                  |
| ---------- | -------------------------------- | ------- | -------------------------------------------- |
| `as`       | `PrimitiveProps["as"]`           | `"button"` | Element or component to render.           |
| `as-child` | `boolean`                        | `false` | Render as the child element, such as a link. |
| `class`    | `HTMLAttributes["class"]`        | -       | Additional classes to apply to the trigger.  |

### AttachmentGroup

Lays out attachments in a horizontally scrollable, snapping row.

| Prop        | Type     | Default | Description                               |
| ----------- | -------- | ------- | ----------------------------------------- |
| `class` | `HTMLAttributes["class"]` | -       | Additional classes to apply to the group. |
