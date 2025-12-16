<script setup lang="ts">
import IconPlaceholder from "@/components/IconPlaceholder.vue"
import { Button } from "@/registry/bases/reka/ui/button"
import { ButtonGroup } from "@/registry/bases/reka/ui/button-group"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/registry/bases/reka/ui/dropdown-menu"
import { Example } from "~/registry/bases/reka/components/example"
</script>

<template>
  <Example title="With Dropdown">
    <div class="flex flex-col gap-4">
      <ButtonGroup>
        <Button variant="outline">
          Update
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger :as-child="true">
            <Button variant="outline" size="icon">
              <IconPlaceholder
                lucide="ChevronDownIcon"
                tabler="IconChevronDown"
                hugeicons="ArrowDown01Icon"
              />
            </Button>
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
          <DropdownMenuTrigger :as-child="true">
            <Button variant="outline" size="icon">
              <IconPlaceholder
                lucide="ChevronDownIcon"
                tabler="IconChevronDown"
                hugeicons="ArrowDown01Icon"
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" class="w-50">
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <IconPlaceholder
                  lucide="VolumeOffIcon"
                  tabler="IconVolume"
                  hugeicons="VolumeOffIcon"
                />
                Mute Conversation
              </DropdownMenuItem>
              <DropdownMenuItem>
                <IconPlaceholder
                  lucide="CheckIcon"
                  tabler="IconCheck"
                  hugeicons="Tick02Icon"
                />
                Mark as Read
              </DropdownMenuItem>
              <DropdownMenuItem>
                <IconPlaceholder
                  lucide="AlertTriangleIcon"
                  tabler="IconAlertTriangle"
                  hugeicons="AlertCircleIcon"
                />
                Report Conversation
              </DropdownMenuItem>
              <DropdownMenuItem>
                <IconPlaceholder
                  lucide="UserRoundXIcon"
                  tabler="IconUserX"
                  hugeicons="UserRemove01Icon"
                />
                Block User
              </DropdownMenuItem>
              <DropdownMenuItem>
                <IconPlaceholder
                  lucide="ShareIcon"
                  tabler="IconShare"
                  hugeicons="Share03Icon"
                />
                Share Conversation
              </DropdownMenuItem>
              <DropdownMenuItem>
                <IconPlaceholder
                  lucide="CopyIcon"
                  tabler="IconCopy"
                  hugeicons="Copy01Icon"
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
