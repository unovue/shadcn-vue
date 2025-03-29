<script lang="ts">
export const description = 'Collapsible nested sidebars.'
export const iframeHeight = '800px'
</script>

<script setup lang="ts">
import AppSidebar from '@/registry/new-york-v4/blocks/Sidebar09/components/AppSidebar.vue'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/registry/new-york-v4/ui/breadcrumb'
import { Separator } from '@/registry/new-york-v4/ui/separator'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/registry/new-york-v4/ui/sidebar'
</script>

<template>
  <SidebarProvider
    :style="{
      '--sidebar-width': '350px',
    }"
  >
    <AppSidebar />
    <SidebarInset>
      <header class="bg-background sticky top-0 flex shrink-0 items-center gap-2 border-b p-4">
        <SidebarTrigger class="-ml-1" />
        <Separator
          orientation="vertical"
          class="mr-2 data-[orientation=vertical]:h-4"
        />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem class="hidden md:block">
              <BreadcrumbLink href="#">
                All Inboxes
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator class="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>Inbox</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <div class="flex flex-1 flex-col gap-4 p-4">
        <div
          v-for="index in 24"
          :key="index"
          class="aspect-video h-12 w-full rounded-lg bg-muted/50"
        />
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>
