<script setup lang="ts">
import type { Component } from 'vue'
import {
  IconDots,
  IconFolder,
  IconShare3,
  IconTrash,
} from '@tabler/icons-vue'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/registry/new-york-v4/ui/dropdown-menu'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/registry/new-york-v4/ui/sidebar'

interface DocumentItem {
  name: string
  url: string
  icon: Component
}

defineProps<{
  items: DocumentItem[]
}>()

const { isMobile } = useSidebar()
</script>

<template>
  <SidebarGroup class="group-data-[collapsible=icon]:hidden">
    <SidebarGroupLabel>Documents</SidebarGroupLabel>
    <SidebarMenu>
      <SidebarMenuItem
        v-for="item in items"
        :key="item.name"
      >
        <SidebarMenuButton as-child>
          <a :href="item.url">
            <component :is="item.icon" />
            <span>{{ item.name }}</span>
          </a>
        </SidebarMenuButton>
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <SidebarMenuAction
              show-on-hover
              class="data-[state=open]:bg-accent rounded-sm"
            >
              <IconDots />
              <span class="sr-only">More</span>
            </SidebarMenuAction>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            class="w-24 rounded-lg"
            :side="isMobile ? 'bottom' : 'right'"
            :align="isMobile ? 'end' : 'start'"
          >
            <DropdownMenuItem>
              <IconFolder />
              <span>Open</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <IconShare3 />
              <span>Share</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">
              <IconTrash />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <SidebarMenuButton class="text-sidebar-foreground/70">
          <IconDots class="text-sidebar-foreground/70" />
          <span>More</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  </SidebarGroup>
</template>
