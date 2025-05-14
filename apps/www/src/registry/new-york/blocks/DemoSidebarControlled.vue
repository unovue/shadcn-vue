<script setup lang="ts">
import {
  Frame,
  LifeBuoy,
  Map,
  PanelLeftClose,
  PanelLeftOpen,
  PieChart,
  Send,
} from 'lucide-vue-next'

import { ref } from 'vue'
import { Button } from '@/registry/new-york/ui/button'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from '@/registry/new-york/ui/sidebar'

const projects = [
  {
    name: 'Design Engineering',
    url: '#',
    icon: Frame,
  },
  {
    name: 'Sales & Marketing',
    url: '#',
    icon: PieChart,
  },
  {
    name: 'Travel',
    url: '#',
    icon: Map,
  },
  {
    name: 'Support',
    url: '#',
    icon: LifeBuoy,
  },
  {
    name: 'Feedback',
    url: '#',
    icon: Send,
  },
]

const open = ref(true)
</script>

<template>
  <SidebarProvider v-model:open="open">
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Projects</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem v-for="project in projects" :key="project.name">
                <SidebarMenuButton as-child>
                  <a :href="project.url">
                    <component :is="project.icon" />
                    <span>{{ project.name }}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
    <SidebarInset>
      <header class="flex items-center h-12 px-4 justify-between">
        <Button
          size="sm"
          variant="ghost"
          @click="open = !open"
        >
          <PanelLeftClose v-if="open" />
          <PanelLeftOpen v-else />
          <span>{{ open ? 'Close' : 'Open' }} Sidebar</span>
        </Button>
      </header>
    </SidebarInset>
  </SidebarProvider>
</template>
