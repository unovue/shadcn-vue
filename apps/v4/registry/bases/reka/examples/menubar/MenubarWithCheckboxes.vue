<script setup lang="ts">
import { ref } from "vue"
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/registry/bases/reka/ui/menubar"

const showBookmarksBar = ref(false)
const showFullUrls = ref(true)
const strikethrough = ref(true)
const code = ref(false)
const superscript = ref(false)
</script>

<template>
  <Menubar>
    <MenubarMenu>
      <MenubarTrigger>View</MenubarTrigger>
      <MenubarContent class="w-64">
        <MenubarGroup>
          <MenubarCheckboxItem v-model="showBookmarksBar">
            Always Show Bookmarks Bar
          </MenubarCheckboxItem>
          <MenubarCheckboxItem v-model="showFullUrls">
            Always Show Full URLs
          </MenubarCheckboxItem>
        </MenubarGroup>
        <MenubarSeparator />
        <MenubarGroup>
          <MenubarItem :inset="true">
            Reload <MenubarShortcut>⌘R</MenubarShortcut>
          </MenubarItem>
          <MenubarItem :disabled="true" :inset="true">
            Force Reload <MenubarShortcut>⇧⌘R</MenubarShortcut>
          </MenubarItem>
        </MenubarGroup>
      </MenubarContent>
    </MenubarMenu>
    <MenubarMenu>
      <MenubarTrigger>Format</MenubarTrigger>
      <MenubarContent>
        <MenubarCheckboxItem v-model="strikethrough">
          Strikethrough
        </MenubarCheckboxItem>
        <MenubarCheckboxItem v-model="code">
          Code
        </MenubarCheckboxItem>
        <MenubarCheckboxItem v-model="superscript">
          Superscript
        </MenubarCheckboxItem>
      </MenubarContent>
    </MenubarMenu>
  </Menubar>
</template>
