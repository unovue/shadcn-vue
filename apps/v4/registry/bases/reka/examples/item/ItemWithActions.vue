<script setup lang="ts">
import IconPlaceholder from "@/components/IconPlaceholder.vue"
import { Button } from "@/registry/bases/reka/ui/button"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/registry/bases/reka/ui/item"
import { Example } from "~/registry/bases/reka/components/example"
</script>

<template>
  <Example title="Item with Actions">
    <ItemGroup class="w-full max-w-md">
      <Item>
        <ItemMedia>
          <IconPlaceholder
            lucide="FileIcon"
            tabler="IconFile"
            hugeicons="File02Icon"
          />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Document.pdf</ItemTitle>
          <ItemDescription>Updated 2 hours ago</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant="ghost" size="sm">
            <IconPlaceholder
              lucide="DownloadIcon"
              tabler="IconDownload"
              hugeicons="Download01Icon"
            />
          </Button>
          <Button variant="ghost" size="sm">
            <IconPlaceholder
              lucide="TrashIcon"
              tabler="IconTrash"
              hugeicons="Delete02Icon"
            />
          </Button>
        </ItemActions>
      </Item>

      <Item>
        <ItemMedia>
          <IconPlaceholder
            lucide="ImageIcon"
            tabler="IconPhoto"
            hugeicons="Image01Icon"
          />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Screenshot.png</ItemTitle>
          <ItemDescription>Updated yesterday</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant="ghost" size="sm">
            <IconPlaceholder
              lucide="EyeIcon"
              tabler="IconEye"
              hugeicons="View01Icon"
            />
          </Button>
          <Button variant="ghost" size="sm">
            <IconPlaceholder
              lucide="Share2Icon"
              tabler="IconShare"
              hugeicons="Share01Icon"
            />
          </Button>
        </ItemActions>
      </Item>

      <Item>
        <ItemMedia>
          <IconPlaceholder
            lucide="VideoIcon"
            tabler="IconVideo"
            hugeicons="Video01Icon"
          />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Presentation.mp4</ItemTitle>
          <ItemDescription>Updated last week</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant="ghost" size="sm">
            <IconPlaceholder
              lucide="PlayIcon"
              tabler="IconPlayerPlay"
              hugeicons="Play01Icon"
            />
          </Button>
          <Button variant="ghost" size="sm">
            <IconPlaceholder
              lucide="MoreHorizontalIcon"
              tabler="IconDots"
              hugeicons="MoreHorizontalIcon"
            />
          </Button>
        </ItemActions>
      </Item>
    </ItemGroup>
  </Example>
</template>
