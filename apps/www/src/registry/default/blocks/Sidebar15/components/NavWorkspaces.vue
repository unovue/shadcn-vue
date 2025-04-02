<script setup lang="ts">
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/registry/default/ui/collapsible'

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/registry/default/ui/sidebar'
import { ChevronRight, MoreHorizontal, Plus } from 'lucide-vue-next'

defineProps<{
  workspaces: {
    name: string
    emoji: string
    pages: {
      name: string
      emoji: string
    }[]
  }[]
}>()
</script>

<template>
  <SidebarGroup>
    <SidebarGroupLabel>Workspaces</SidebarGroupLabel>
    <SidebarGroupContent>
      <SidebarMenu>
        <Collapsible v-for="workspace in workspaces" :key="workspace.name">
          <SidebarMenuItem>
            <SidebarMenuButton as-child>
              <a href="#">
                <span>{{ workspace.emoji }}</span>
                <span>{{ workspace.name }}</span>
              </a>
            </SidebarMenuButton>
            <CollapsibleTrigger as-child>
              <SidebarMenuAction
                class="left-2 bg-sidebar-accent text-sidebar-accent-foreground data-[state=open]:rotate-90"
                show-on-hover
              >
                <ChevronRight />
              </SidebarMenuAction>
            </CollapsibleTrigger>
            <SidebarMenuAction show-on-hover>
              <Plus />
            </SidebarMenuAction>
            <CollapsibleContent>
              <SidebarMenuSub>
                <SidebarMenuSubItem v-for="page in workspace.pages" :key="page.name">
                  <SidebarMenuSubButton as-child>
                    <a href="#">
                      <span>{{ page.emoji }}</span>
                      <span>{{ page.name }}</span>
                    </a>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>

        <SidebarMenuItem>
          <SidebarMenuButton class="text-sidebar-foreground/70">
            <MoreHorizontal />
            <span>More</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroupContent>
  </SidebarGroup>
</template>
