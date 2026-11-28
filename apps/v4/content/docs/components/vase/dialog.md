---
title: Dialog
description: A window overlaid on either the primary window or another dialog window, rendering the content underneath inert.
component: true
links:
  doc: https://vase-ui.com/components/dialog
  api: https://vase-ui.com/components/dialog#api-reference
---

::component-preview
---
name: DialogDemo
description: A dialog with a form.
---
::

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
npx shadcn-vue@latest add dialog
```

::

::::tabs-content{value="manual"}
  :::steps
    ::step
    Install the following dependencies:
    ::

    ```bash
    npm install @vase-ui/vue
    ```

    ::step
    Copy and paste the [GitHub source code](https://github.com/unovue/shadcn-vue/tree/dev/apps/v4/styles/vase-vega/ui/dialog) into your project.
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
</script>

<template>
  <Dialog>
    <DialogTrigger>Open</DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Are you absolutely sure?</DialogTitle>
        <DialogDescription>
          This action cannot be undone. This will permanently delete your account
          and remove your data from our servers.
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  </Dialog>
</template>
```

## Example

### Custom close button

::component-preview
---
name: DialogCloseButton
---
::

### Dialog with form

To keep field value after `Dialog` unmounts

::component-preview
---
name: DialogForm
---
::

### Responsive Modal (Dialog & Drawer)

Use a `Drawer` component for smaller viewport sizes and a `Dialog` component otherwise. This can be further made reusable by using slots for various parts of the modal.

::component-preview
---
name: DialogResponsive
---
::

## Notes

To open a `Dialog` from a `Context Menu` or `Dropdown Menu`, bind the open state of the `Dialog` with `v-model:open`. Set it to `true` in a `click` listener on the menu item.

```vue showLineNumbers title="components/ExampleDialogContext.vue" {4, 13, 18}
<script setup lang="ts">
import { ref } from 'vue'

const open = ref(false)
</script>

<template>
  <ContextMenu>
    <ContextMenuTrigger>Right click</ContextMenuTrigger>
    <ContextMenuContent>
      <ContextMenuItem>Open</ContextMenuItem>
      <ContextMenuItem>Download</ContextMenuItem>
      <ContextMenuItem @click="open = true">
        <span>Delete</span>
      </ContextMenuItem>
    </ContextMenuContent>
  </ContextMenu>
  <Dialog v-model:open="open">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Are you absolutely sure?</DialogTitle>
        <DialogDescription>
          This action cannot be undone. Are you sure you want to permanently
          delete this file from our servers?
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button type="submit">
          Confirm
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
```
