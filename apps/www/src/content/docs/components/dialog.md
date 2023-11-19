---
title: Dialog
description: A window overlaid on either the primary window or another dialog window, rendering the content underneath inert.
source: apps/www/src/lib/registry/default/ui/dialog 
primitive: https://www.radix-vue.com/components/dialog.html
---

<script setup>
import { useConfigStore } from '@/stores/config'

const { codeConfig } = useConfigStore()
</script>


<ComponentPreview name="DialogDemo" /> 
 
 ## Installation
```bash
npx shadcn-vue@latest add dialog
```

## Usage

```vue-vue
<script setup lang="ts">
import {
  {{codeConfig.prefix}}Dialog,
  {{codeConfig.prefix}}DialogContent,
  {{codeConfig.prefix}}DialogDescription,
  {{codeConfig.prefix}}DialogFooter,
  {{codeConfig.prefix}}DialogHeader,
  {{codeConfig.prefix}}DialogTitle,
  {{codeConfig.prefix}}DialogTrigger,
} from '{{codeConfig.aliases.components}}/ui/dialog'
</script>

<template>
  <{{codeConfig.prefix}}Dialog>
    <{{codeConfig.prefix}}DialogTrigger>
      Edit Profile
    </{{codeConfig.prefix}}DialogTrigger>
    <{{codeConfig.prefix}}DialogContent>
      <{{codeConfig.prefix}}DialogHeader>
        <{{codeConfig.prefix}}DialogTitle>Edit profile</{{codeConfig.prefix}}DialogTitle>
        <{{codeConfig.prefix}}DialogDescription>
          Make changes to your profile here. Click save when you're done.
        </{{codeConfig.prefix}}DialogDescription>
      </{{codeConfig.prefix}}DialogHeader>

      <{{codeConfig.prefix}}DialogFooter>
        Save changes
      </{{codeConfig.prefix}}DialogFooter>
    </{{codeConfig.prefix}}DialogContent>
  </{{codeConfig.prefix}}Dialog>
</template>
```

## Examples 

### Custom close button

<ComponentPreview name="DialogCustomCloseButton" /> 

## Notes

To activate the `Dialog` component from within a `Context Menu` or `Dropdown Menu`, you must encase the `Context Menu` or `Dropdown Menu` component in the `Dialog` component. For more information, refer to the linked issue [here](https://github.com/radix-ui/primitives/issues/1836).


```js:line-numbers showLineNumber{14-25}
<Dialog>
  <ContextMenu>
    <ContextMenuTrigger>Right click</ContextMenuTrigger>
    <ContextMenuContent>
      <ContextMenuItem>Open</ContextMenuItem>
      <ContextMenuItem>Download</ContextMenuItem>
      <DialogTrigger asChild>
        <ContextMenuItem>
          <span>Delete</span>
        </ContextMenuItem>
      </DialogTrigger>
    </ContextMenuContent>
  </ContextMenu>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you sure absolutely sure?</DialogTitle>
      <DialogDescription>
        This action cannot be undone. Are you sure you want to permanently
        delete this file from our servers?
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button type="submit">Confirm</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```
