<script setup lang="ts">
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from '@/registry/default/ui/sidebar'

import { Frame, LifeBuoy, Map, PieChart, Send } from 'lucide-vue-next'

const projects = [
  {
    name: 'Design Engineering',
    url: '#',
    icon: Frame,
    badge: '24',
  },
  {
    name: 'Sales & Marketing',
    url: '#',
    icon: PieChart,
    badge: '12',
  },
  {
    name: 'Travel',
    url: '#',
    icon: Map,
    badge: '3',
  },
  {
    name: 'Support',
    url: '#',
    icon: LifeBuoy,
    badge: '21',
  },
  {
    name: 'Feedback',
    url: '#',
    icon: Send,
    badge: '8',
  },
]
</script>

<template>
  <SidebarProvider>
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Projects</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem v-for="project in projects" :key="project.name">
                <SidebarMenuButton
                  as-child
                  class="group-has-[[data-state=open]]/menu-item:bg-sidebar-accent"
                >
                  <a :href="project.url">
                    <component :is="project.icon" />
                    <span>{{ project.name }}</span>
                  </a>
                </SidebarMenuButton>
                <SidebarMenuBadge>{{ project.badge }}</SidebarMenuBadge>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  </SidebarProvider>
</template>
