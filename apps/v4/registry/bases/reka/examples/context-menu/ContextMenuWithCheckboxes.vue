<script setup lang="ts">
import { ref } from "vue"
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuTrigger,
} from "@/registry/bases/reka/ui/context-menu"
import { Example } from "~/registry/bases/reka/components/example"

const showBookmarksBar = ref(true)
const showFullUrls = ref(false)
const showDeveloperTools = ref(false)
</script>

<template>
  <Example title="With Checkboxes">
    <ContextMenu>
      <ContextMenuTrigger class="flex aspect-[2/0.5] w-full items-center justify-center rounded-lg border text-sm">
        Right click here
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuGroup>
          <ContextMenuCheckboxItem
            :model-value="showBookmarksBar"
            @update:model-value="showBookmarksBar = $event"
          >
            Show Bookmarks Bar
          </ContextMenuCheckboxItem>
          <ContextMenuCheckboxItem
            :model-value="showFullUrls"
            @update:model-value="showFullUrls = $event"
          >
            Show Full URLs
          </ContextMenuCheckboxItem>
          <ContextMenuCheckboxItem
            :model-value="showDeveloperTools"
            @update:model-value="showDeveloperTools = $event"
          >
            Show Developer Tools
          </ContextMenuCheckboxItem>
        </ContextMenuGroup>
      </ContextMenuContent>
    </ContextMenu>
  </Example>
</template>
