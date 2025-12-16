<script setup lang="ts">
import IconPlaceholder from "@/components/IconPlaceholder.vue"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/registry/bases/reka/ui/sidebar"
import { Example } from "~/registry/bases/reka/components/example"

const menuItems = [
  { title: "Home", icon: "HomeIcon", url: "#" },
  { title: "Dashboard", icon: "LayoutDashboardIcon", url: "#" },
  { title: "Settings", icon: "SettingsIcon", url: "#" },
  { title: "Profile", icon: "UserIcon", url: "#" },
]
</script>

<template>
  <Example title="Basic Sidebar">
    <SidebarProvider>
      <div class="flex h-screen w-full">
        <Sidebar>
          <SidebarHeader>
            <div class="flex items-center gap-2 px-2 py-4">
              <IconPlaceholder
                lucide="LayoutDashboardIcon"
                tabler="IconLayoutDashboard"
                hugeicons="LayoutLeftIcon"
              />
              <span class="font-semibold">My App</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem v-for="item in menuItems" :key="item.title">
                    <SidebarMenuButton :as-child="true">
                      <a :href="item.url" class="flex items-center gap-2">
                        <IconPlaceholder
                          :lucide="item.icon"
                          :tabler="`Icon${item.icon.replace('Icon', '')}`"
                          :hugeicons="`${item.icon.replace('Icon', '')}Icon`"
                        />
                        <span>{{ item.title }}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <div class="px-2 py-4 text-sm text-muted-foreground">
              © 2024 My App
            </div>
          </SidebarFooter>
        </Sidebar>
        <main class="flex-1 p-6">
          <SidebarTrigger />
          <div class="mt-4">
            <h1 class="text-2xl font-bold">
              Main Content
            </h1>
            <p class="mt-2 text-muted-foreground">
              This is the main content area.
            </p>
          </div>
        </main>
      </div>
    </SidebarProvider>
  </Example>
</template>
