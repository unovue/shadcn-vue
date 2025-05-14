<script setup lang="ts">
import { useMediaQuery } from '@vueuse/core'

import { type LucideIcon, MoreHorizontal } from 'lucide-vue-next'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/registry/new-york/ui/dropdown-menu'
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/registry/new-york/ui/sidebar'

defineProps<{
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[]
  }[]
}>()

const isMobile = useMediaQuery('(max-width: 768px)')
</script>

<template>
  <SidebarGroup>
    <SidebarMenu>
      <DropdownMenu v-for="item in items" :key="item.title">
        <SidebarMenuItem>
          <DropdownMenuTrigger as-child>
            <SidebarMenuButton class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
              {{ item.title }} <MoreHorizontal class="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            v-if="item.items?.length"
            :side="isMobile ? 'bottom' : 'right'"
            :align="isMobile ? 'end' : 'start'"
            class="min-w-56 rounded-lg"
          >
            <DropdownMenuItem v-for="childItem in item.items" :key="childItem.title" as-child>
              <a :href="childItem.url">{{ childItem.title }}</a>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </SidebarMenuItem>
      </DropdownMenu>
    </SidebarMenu>
  </SidebarGroup>
</template>
