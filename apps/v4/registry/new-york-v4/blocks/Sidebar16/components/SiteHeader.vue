<script setup lang="ts">
import { SidebarIcon } from 'lucide-vue-next'

import SearchForm from '@/registry/new-york-v4/blocks/Sidebar16/components/SearchForm.vue'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/registry/new-york-v4/ui/breadcrumb'
import { Button } from '@/registry/new-york-v4/ui/button'
import { Separator } from '@/registry/new-york-v4/ui/separator'
import { useSidebar } from '@/registry/new-york-v4/ui/sidebar'

const { toggleSidebar } = useSidebar()
</script>

<template>
  <header class="bg-background sticky top-0 z-50 flex w-full items-center border-b">
    <div class="flex h-(--header-height) w-full items-center gap-2 px-4">
      <Button
        class="h-8 w-8"
        variant="ghost"
        size="icon"
        @click="toggleSidebar"
      >
        <SidebarIcon />
      </Button>
      <Separator orientation="vertical" class="mr-2 h-4" />
      <Breadcrumb class="hidden sm:block">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">
              Building Your Application
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Data Fetching</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <SearchForm class="w-full sm:ml-auto sm:w-auto" />
    </div>
  </header>
</template>
