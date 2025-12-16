<script setup lang="ts">
import { ref } from "vue"
import IconPlaceholder from "@/components/IconPlaceholder.vue"
import { Example } from "@/registry/bases/reka/components/example"
import { Button } from "@/registry/bases/reka/ui/button"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/registry/bases/reka/ui/command"

const open = ref(false)
</script>

<template>
  <Example title="Many Groups & Items">
    <div class="flex flex-col gap-4">
      <Button
        variant="outline"
        class="w-fit"
        @click="open = true"
      >
        Open Menu
      </Button>
      <CommandDialog v-model:open="open">
        <Command>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Navigation">
              <CommandItem value="home">
                <IconPlaceholder
                  lucide="HomeIcon"
                  tabler="IconHome"
                  hugeicons="HomeIcon"
                />
                <span>Home</span>
                <CommandShortcut>⌘H</CommandShortcut>
              </CommandItem>
              <CommandItem value="inbox">
                <IconPlaceholder
                  lucide="InboxIcon"
                  tabler="IconInbox"
                  hugeicons="InboxIcon"
                />
                <span>Inbox</span>
                <CommandShortcut>⌘I</CommandShortcut>
              </CommandItem>
              <CommandItem value="documents">
                <IconPlaceholder
                  lucide="FileTextIcon"
                  tabler="IconFileText"
                  hugeicons="File02Icon"
                />
                <span>Documents</span>
                <CommandShortcut>⌘D</CommandShortcut>
              </CommandItem>
              <CommandItem value="folders">
                <IconPlaceholder
                  lucide="FolderIcon"
                  tabler="IconFolder"
                  hugeicons="FolderIcon"
                />
                <span>Folders</span>
                <CommandShortcut>⌘F</CommandShortcut>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Actions">
              <CommandItem value="new-file">
                <IconPlaceholder
                  lucide="PlusIcon"
                  tabler="IconPlus"
                  hugeicons="PlusSignIcon"
                />
                <span>New File</span>
                <CommandShortcut>⌘N</CommandShortcut>
              </CommandItem>
              <CommandItem value="new-folder">
                <IconPlaceholder
                  lucide="FolderPlusIcon"
                  tabler="IconFolderPlus"
                  hugeicons="FolderAddIcon"
                />
                <span>New Folder</span>
                <CommandShortcut>⇧⌘N</CommandShortcut>
              </CommandItem>
              <CommandItem value="copy">
                <IconPlaceholder
                  lucide="CopyIcon"
                  tabler="IconCopy"
                  hugeicons="CopyIcon"
                />
                <span>Copy</span>
                <CommandShortcut>⌘C</CommandShortcut>
              </CommandItem>
              <CommandItem value="cut">
                <IconPlaceholder
                  lucide="ScissorsIcon"
                  tabler="IconCut"
                  hugeicons="ScissorIcon"
                />
                <span>Cut</span>
                <CommandShortcut>⌘X</CommandShortcut>
              </CommandItem>
              <CommandItem value="paste">
                <IconPlaceholder
                  lucide="ClipboardPasteIcon"
                  tabler="IconClipboard"
                  hugeicons="ClipboardIcon"
                />
                <span>Paste</span>
                <CommandShortcut>⌘V</CommandShortcut>
              </CommandItem>
              <CommandItem value="delete">
                <IconPlaceholder
                  lucide="TrashIcon"
                  tabler="IconTrash"
                  hugeicons="DeleteIcon"
                />
                <span>Delete</span>
                <CommandShortcut>⌫</CommandShortcut>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="View">
              <CommandItem value="grid-view">
                <IconPlaceholder
                  lucide="LayoutGridIcon"
                  tabler="IconLayoutGrid"
                  hugeicons="GridIcon"
                />
                <span>Grid View</span>
              </CommandItem>
              <CommandItem value="list-view">
                <IconPlaceholder
                  lucide="ListIcon"
                  tabler="IconList"
                  hugeicons="Menu05Icon"
                />
                <span>List View</span>
              </CommandItem>
              <CommandItem value="zoom-in">
                <IconPlaceholder
                  lucide="ZoomInIcon"
                  tabler="IconZoomIn"
                  hugeicons="ZoomInAreaIcon"
                />
                <span>Zoom In</span>
                <CommandShortcut>⌘+</CommandShortcut>
              </CommandItem>
              <CommandItem value="zoom-out">
                <IconPlaceholder
                  lucide="ZoomOutIcon"
                  tabler="IconZoomOut"
                  hugeicons="ZoomOutAreaIcon"
                />
                <span>Zoom Out</span>
                <CommandShortcut>⌘-</CommandShortcut>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Account">
              <CommandItem value="profile">
                <IconPlaceholder
                  lucide="UserIcon"
                  tabler="IconUser"
                  hugeicons="UserIcon"
                />
                <span>Profile</span>
                <CommandShortcut>⌘P</CommandShortcut>
              </CommandItem>
              <CommandItem value="billing">
                <IconPlaceholder
                  lucide="CreditCardIcon"
                  tabler="IconCreditCard"
                  hugeicons="CreditCardIcon"
                />
                <span>Billing</span>
                <CommandShortcut>⌘B</CommandShortcut>
              </CommandItem>
              <CommandItem value="settings">
                <IconPlaceholder
                  lucide="SettingsIcon"
                  tabler="IconSettings"
                  hugeicons="SettingsIcon"
                />
                <span>Settings</span>
                <CommandShortcut>⌘S</CommandShortcut>
              </CommandItem>
              <CommandItem value="notifications">
                <IconPlaceholder
                  lucide="BellIcon"
                  tabler="IconBell"
                  hugeicons="NotificationIcon"
                />
                <span>Notifications</span>
              </CommandItem>
              <CommandItem value="help">
                <IconPlaceholder
                  lucide="HelpCircleIcon"
                  tabler="IconHelpCircle"
                  hugeicons="HelpCircleIcon"
                />
                <span>Help & Support</span>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Tools">
              <CommandItem value="calculator">
                <IconPlaceholder
                  lucide="CalculatorIcon"
                  tabler="IconCalculator"
                  hugeicons="CalculatorIcon"
                />
                <span>Calculator</span>
              </CommandItem>
              <CommandItem value="calendar">
                <IconPlaceholder
                  lucide="CalendarIcon"
                  tabler="IconCalendar"
                  hugeicons="CalendarIcon"
                />
                <span>Calendar</span>
              </CommandItem>
              <CommandItem value="image-editor">
                <IconPlaceholder
                  lucide="ImageIcon"
                  tabler="IconPhoto"
                  hugeicons="ImageIcon"
                />
                <span>Image Editor</span>
              </CommandItem>
              <CommandItem value="code-editor">
                <IconPlaceholder
                  lucide="CodeIcon"
                  tabler="IconCode"
                  hugeicons="CodeIcon"
                />
                <span>Code Editor</span>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </div>
  </Example>
</template>
