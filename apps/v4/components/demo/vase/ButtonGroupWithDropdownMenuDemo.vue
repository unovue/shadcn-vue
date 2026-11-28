<script setup lang="ts">
import { AlertTriangleIcon, CheckIcon, ChevronDownIcon, CopyIcon, ShareIcon, TrashIcon, UserRoundXIcon, VolumeOffIcon } from '@lucide/vue'
import { Button } from '@/styles/vase-vega/ui/button'
import { ButtonGroup } from '@/styles/vase-vega/ui/button-group'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/styles/vase-vega/ui/dropdown-menu'
</script>

<template>
  <ButtonGroup>
    <Button variant="outline">
      Follow
    </Button>
    <DropdownMenu>
      <DropdownMenuTrigger>
        <template #element="{ props, elementRef }">
          <Button v-bind="props" :ref="elementRef" variant="outline" size="icon">
            <ChevronDownIcon />
          </Button>
        </template>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" class="[--radius:1rem]">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <VolumeOffIcon />
            Mute Conversation
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CheckIcon />
            Mark as Read
          </DropdownMenuItem>
          <DropdownMenuItem>
            <AlertTriangleIcon />
            Report Conversation
          </DropdownMenuItem>
          <DropdownMenuItem>
            <UserRoundXIcon />
            Block User
          </DropdownMenuItem>
          <DropdownMenuItem>
            <ShareIcon />
            Share Conversation
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CopyIcon />
            Copy Conversation
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem variant="destructive">
            <TrashIcon />
            Delete Conversation
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  </ButtonGroup>
</template>
