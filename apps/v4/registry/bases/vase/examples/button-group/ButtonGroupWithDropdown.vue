<script setup lang="ts">
import IconPlaceholder from "@/components/IconPlaceholder.vue"
import { Button } from "@/registry/bases/vase/ui/button"
import { ButtonGroup } from "@/registry/bases/vase/ui/button-group"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/registry/bases/vase/ui/dropdown-menu"
import { Example } from "~/registry/bases/vase/components/example"
</script>

<template>
  <Example title="With Dropdown">
    <div class="flex flex-col gap-4">
      <ButtonGroup>
        <Button variant="outline">
          Update
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <template #element="{ props, elementRef }">
              <Button v-bind="props" :ref="elementRef" variant="outline" size="icon">
                <IconPlaceholder
                  lucide="ChevronDownIcon"
                  tabler="IconChevronDown"
                  hugeicons="ArrowDown01Icon"
                  phosphor="CaretDownIcon"
                  remixicon="RiArrowDownSLine"
                />
              </Button>
            </template>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Disable</DropdownMenuItem>
            <DropdownMenuItem variant="destructive">
              Uninstall
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="outline">
          Follow
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <template #element="{ props, elementRef }">
              <Button v-bind="props" :ref="elementRef" variant="outline" size="icon">
                <IconPlaceholder
                  lucide="ChevronDownIcon"
                  tabler="IconChevronDown"
                  hugeicons="ArrowDown01Icon"
                  phosphor="CaretDownIcon"
                  remixicon="RiArrowDownSLine"
                />
              </Button>
            </template>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" class="w-50">
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <IconPlaceholder
                  lucide="VolumeOffIcon"
                  tabler="IconVolume"
                  hugeicons="VolumeOffIcon"
                  phosphor="SpeakerSlashIcon"
                  remixicon="RiVolumeMuteLine"
                />
                Mute Conversation
              </DropdownMenuItem>
              <DropdownMenuItem>
                <IconPlaceholder
                  lucide="CheckIcon"
                  tabler="IconCheck"
                  hugeicons="Tick02Icon"
                  phosphor="CheckIcon"
                  remixicon="RiCheckLine"
                />
                Mark as Read
              </DropdownMenuItem>
              <DropdownMenuItem>
                <IconPlaceholder
                  lucide="AlertTriangleIcon"
                  tabler="IconAlertTriangle"
                  hugeicons="AlertCircleIcon"
                  phosphor="WarningIcon"
                  remixicon="RiAlertLine"
                />
                Report Conversation
              </DropdownMenuItem>
              <DropdownMenuItem>
                <IconPlaceholder
                  lucide="UserRoundXIcon"
                  tabler="IconUserX"
                  hugeicons="UserRemove01Icon"
                  phosphor="UserMinusIcon"
                  remixicon="RiUserUnfollowLine"
                />
                Block User
              </DropdownMenuItem>
              <DropdownMenuItem>
                <IconPlaceholder
                  lucide="ShareIcon"
                  tabler="IconShare"
                  hugeicons="Share03Icon"
                  phosphor="ShareIcon"
                  remixicon="RiShareLine"
                />
                Share Conversation
              </DropdownMenuItem>
              <DropdownMenuItem>
                <IconPlaceholder
                  lucide="CopyIcon"
                  tabler="IconCopy"
                  hugeicons="Copy01Icon"
                  phosphor="CopyIcon"
                  remixicon="RiFileCopyLine"
                />
                Copy Conversation
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem variant="destructive">
                <IconPlaceholder
                  lucide="TrashIcon"
                  tabler="IconTrash"
                  hugeicons="Delete02Icon"
                  phosphor="TrashIcon"
                  remixicon="RiDeleteBinLine"
                />
                Delete Conversation
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </ButtonGroup>
    </div>
  </Example>
</template>
