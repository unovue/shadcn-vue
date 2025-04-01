<script setup lang="ts">
import Calendars from '@/registry/new-york/blocks/Sidebar15/components/Calendars.vue'

import DatePicker from '@/registry/new-york/blocks/Sidebar15/components/DatePicker.vue'
import NavUser from '@/registry/new-york/blocks/Sidebar15/components/NavUser.vue'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  type SidebarProps,
  SidebarSeparator,
} from '@/registry/new-york/ui/sidebar'
import { Plus } from 'lucide-vue-next'

const props = withDefaults(defineProps<SidebarProps>(), {
  collapsible: 'none',
})

// This is sample data.
const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  calendars: [
    {
      name: 'My Calendars',
      items: ['Personal', 'Work', 'Family'],
    },
    {
      name: 'Favorites',
      items: ['Holidays', 'Birthdays'],
    },
    {
      name: 'Other',
      items: ['Travel', 'Reminders', 'Deadlines'],
    },
  ],
}
</script>

<template>
  <Sidebar
    class="sticky hidden lg:flex top-0 h-svh border-l"
    v-bind="props"
  >
    <SidebarHeader class="h-16 border-b border-sidebar-border">
      <NavUser :user="data.user" />
    </SidebarHeader>
    <SidebarContent>
      <DatePicker />
      <SidebarSeparator class="mx-0" />
      <Calendars :calendars="data.calendars" />
    </SidebarContent>
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <Plus />
            <span>New Calendar</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  </Sidebar>
</template>
