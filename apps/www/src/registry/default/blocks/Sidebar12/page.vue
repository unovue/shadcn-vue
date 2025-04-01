<script lang="ts">
export const description = 'A sidebar with a calendar.'
export const iframeHeight = '800px'
</script>

<script setup lang="ts">
import AppSidebar from '@/registry/default/blocks/Sidebar12/components/AppSidebar.vue'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from '@/registry/default/ui/breadcrumb'
import { Separator } from '@/registry/default/ui/separator'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/registry/default/ui/sidebar'
</script>

<template>
  <SidebarProvider>
    <AppSidebar />
    <SidebarInset>
      <header class="sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">
        <SidebarTrigger class="-ml-1" />
        <Separator orientation="vertical" class="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>October 2024</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <div class="flex flex-1 flex-col gap-4 p-4">
        <div class="grid auto-rows-min gap-4 md:grid-cols-5">
          <div v-for="i in 20" :key="i" class="aspect-square rounded-xl bg-muted/50" />
        </div>
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>
