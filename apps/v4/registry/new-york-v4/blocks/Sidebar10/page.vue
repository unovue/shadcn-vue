<script lang="ts">
export const description = 'A sidebar in a popover.'
export const iframeHeight = '800px'
</script>

<script setup lang="ts">
import AppSidebar from '@/registry/new-york-v4/blocks/Sidebar10/components/AppSidebar.vue'
import NavActions from '@/registry/new-york-v4/blocks/Sidebar10/components/NavActions.vue'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from '@/registry/new-york-v4/ui/breadcrumb'
import { Separator } from '@/registry/new-york-v4/ui/separator'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/registry/new-york-v4/ui/sidebar'
</script>

<template>
  <SidebarProvider>
    <AppSidebar />
    <SidebarInset>
      <header class="flex h-14 shrink-0 items-center gap-2">
        <div class="flex flex-1 items-center gap-2 px-3">
          <SidebarTrigger />
          <Separator
            orientation="vertical"
            class="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage class="line-clamp-1">
                  Project Management & Task Tracking
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div class="ml-auto px-3">
          <NavActions />
        </div>
      </header>
      <div class="flex flex-1 flex-col gap-4 px-4 py-10">
        <div class="bg-muted/50 mx-auto h-24 w-full max-w-3xl rounded-xl" />
        <div class="bg-muted/50 mx-auto h-full w-full max-w-3xl rounded-xl" />
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>
