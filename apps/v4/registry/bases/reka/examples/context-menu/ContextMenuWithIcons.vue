<script setup lang="ts">
import IconPlaceholder from "@/components/IconPlaceholder.vue"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/registry/bases/reka/ui/context-menu"
import { Example } from "~/registry/bases/reka/components/example"
</script>

<template>
  <Example title="With Icons">
    <ContextMenu>
      <ContextMenuTrigger class="flex aspect-[2/0.5] w-full items-center justify-center rounded-lg border text-sm">
        Right click here
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuGroup>
          <ContextMenuItem>
            <IconPlaceholder
              lucide="CopyIcon"
              tabler="IconCopy"
              hugeicons="CopyIcon"
            />
            Copy
          </ContextMenuItem>
          <ContextMenuItem>
            <IconPlaceholder
              lucide="ScissorsIcon"
              tabler="IconCut"
              hugeicons="ScissorIcon"
            />
            Cut
          </ContextMenuItem>
          <ContextMenuItem>
            <IconPlaceholder
              lucide="ClipboardPasteIcon"
              tabler="IconClipboard"
              hugeicons="ClipboardIcon"
            />
            Paste
          </ContextMenuItem>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuGroup>
          <ContextMenuItem variant="destructive">
            <IconPlaceholder
              lucide="TrashIcon"
              tabler="IconTrash"
              hugeicons="DeleteIcon"
            />
            Delete
          </ContextMenuItem>
        </ContextMenuGroup>
      </ContextMenuContent>
    </ContextMenu>
  </Example>
</template>
