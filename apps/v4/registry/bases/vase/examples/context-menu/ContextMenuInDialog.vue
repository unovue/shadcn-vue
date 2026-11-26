<script setup lang="ts">
import IconPlaceholder from "@/components/IconPlaceholder.vue"
import { Button } from "@/registry/bases/vase/ui/button"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/registry/bases/vase/ui/context-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/bases/vase/ui/dialog"
import { Example } from "~/registry/bases/vase/components/example"
</script>

<template>
  <Example title="In Dialog">
    <Dialog>
      <DialogTrigger>
        <template #element="{ props, elementRef }">
          <Button v-bind="props" :ref="elementRef" variant="outline">
            Open Dialog
          </Button>
        </template>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Context Menu Example</DialogTitle>
          <DialogDescription>
            Right click on the area below to see the context menu.
          </DialogDescription>
        </DialogHeader>
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
                  phosphor="CopyIcon"
                  remixicon="RiFileCopyLine"
                />
                Copy
              </ContextMenuItem>
              <ContextMenuItem>
                <IconPlaceholder
                  lucide="ScissorsIcon"
                  tabler="IconCut"
                  hugeicons="ScissorIcon"
                  phosphor="ScissorsIcon"
                  remixicon="RiScissorsCutLine"
                />
                Cut
              </ContextMenuItem>
              <ContextMenuItem>
                <IconPlaceholder
                  lucide="ClipboardPasteIcon"
                  tabler="IconClipboard"
                  hugeicons="ClipboardIcon"
                  phosphor="ClipboardIcon"
                  remixicon="RiClipboardLine"
                />
                Paste
              </ContextMenuItem>
            </ContextMenuGroup>
            <ContextMenuSeparator />
            <ContextMenuSub>
              <ContextMenuSubTrigger>More Options</ContextMenuSubTrigger>
              <ContextMenuSubContent>
                <ContextMenuGroup>
                  <ContextMenuItem>Save Page...</ContextMenuItem>
                  <ContextMenuItem>Create Shortcut...</ContextMenuItem>
                  <ContextMenuItem>Name Window...</ContextMenuItem>
                </ContextMenuGroup>
                <ContextMenuSeparator />
                <ContextMenuGroup>
                  <ContextMenuItem>Developer Tools</ContextMenuItem>
                </ContextMenuGroup>
              </ContextMenuSubContent>
            </ContextMenuSub>
            <ContextMenuSeparator />
            <ContextMenuGroup>
              <ContextMenuItem variant="destructive">
                <IconPlaceholder
                  lucide="TrashIcon"
                  tabler="IconTrash"
                  hugeicons="DeleteIcon"
                  phosphor="TrashIcon"
                  remixicon="RiDeleteBinLine"
                />
                Delete
              </ContextMenuItem>
            </ContextMenuGroup>
          </ContextMenuContent>
        </ContextMenu>
      </DialogContent>
    </Dialog>
  </Example>
</template>
