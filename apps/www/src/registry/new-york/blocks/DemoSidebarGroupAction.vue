<script setup lang="ts">
import {
  Frame,
  Map,
  PieChart,
  Plus,
} from 'lucide-vue-next'
import { toast, Toaster } from 'vue-sonner'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from '@/registry/new-york/ui/sidebar'
</script>

<template>
  <SidebarProvider>
    <Toaster
      position="bottom-left"
      :toast-options="{
        class: 'ml-[160px]',
      }"
    />
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Projects</SidebarGroupLabel>
          <SidebarGroupAction
            title="Add Project"
            @click="() => toast('You clicked the group action!')"
          >
            <Plus /> <span class="sr-only">Add Project</span>
          </SidebarGroupAction>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton as-child>
                  <a href="#">
                    <Frame />
                    <span>Design Engineering</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton as-child>
                  <a href="#">
                    <PieChart />
                    <span>Sales & Marketing</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton as-child>
                  <a href="#">
                    <Map />
                    <span>Travel</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  </SidebarProvider>
</template>
