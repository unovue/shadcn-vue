<script setup lang="ts">
import IconPlaceholder from "@/components/IconPlaceholder.vue"
import {
  Menubar,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/registry/bases/reka/ui/menubar"
</script>

<template>
  <Menubar>
    <MenubarMenu>
      <MenubarTrigger>File</MenubarTrigger>
      <MenubarContent>
        <MenubarGroup>
          <MenubarItem>
            <IconPlaceholder
              lucide="FileIcon"
              tabler="IconFile"
              hugeicons="FileIcon"
            />
            New File <MenubarShortcut>⌘N</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            <IconPlaceholder
              lucide="FolderIcon"
              tabler="IconFolder"
              hugeicons="FolderIcon"
            />
            Open Folder
          </MenubarItem>
        </MenubarGroup>
        <MenubarSeparator />
        <MenubarGroup>
          <MenubarItem>
            <IconPlaceholder
              lucide="SaveIcon"
              tabler="IconDeviceFloppy"
              hugeicons="FloppyDiskIcon"
            />
            Save <MenubarShortcut>⌘S</MenubarShortcut>
          </MenubarItem>
        </MenubarGroup>
      </MenubarContent>
    </MenubarMenu>
    <MenubarMenu>
      <MenubarTrigger>More</MenubarTrigger>
      <MenubarContent>
        <MenubarGroup>
          <MenubarItem>
            <IconPlaceholder
              lucide="CircleDashedIcon"
              tabler="IconCircleDashed"
              hugeicons="DashedLineCircleIcon"
            />
            Settings
          </MenubarItem>
          <MenubarItem>
            <IconPlaceholder
              lucide="CircleDashedIcon"
              tabler="IconCircleDashed"
              hugeicons="DashedLineCircleIcon"
            />
            Help
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem variant="destructive">
            <IconPlaceholder
              lucide="CircleDashedIcon"
              tabler="IconCircleDashed"
              hugeicons="DashedLineCircleIcon"
            />
            Delete
          </MenubarItem>
        </MenubarGroup>
      </MenubarContent>
    </MenubarMenu>
  </Menubar>
</template>
