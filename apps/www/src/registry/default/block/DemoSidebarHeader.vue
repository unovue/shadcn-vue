<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/registry/default/ui/dropdown-menu'

import {
  Sidebar,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/registry/default/ui/sidebar'
import { ChevronDown } from 'lucide-vue-next'
</script>

<template>
  <SidebarProvider>
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger as-child>
                <SidebarMenuButton class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                  Select Workspace
                  <ChevronDown class="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent class="w-[--reka-popper-anchor-width]">
                <DropdownMenuItem>
                  <span>Acme Inc</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Acme Corp.</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
    </Sidebar>
    <SidebarInset>
      <header class="flex items-center justify-between px-4 h-12">
        <SidebarTrigger />
      </header>
    </SidebarInset>
  </SidebarProvider>
</template>
