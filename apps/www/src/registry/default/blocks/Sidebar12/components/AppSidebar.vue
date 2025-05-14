<script setup lang="ts">
import { Plus } from 'lucide-vue-next'

import Calendars from '@/registry/default/blocks/Sidebar12/components/Calendars.vue'
import DatePicker from '@/registry/default/blocks/Sidebar12/components/DatePicker.vue'
import NavUser from '@/registry/default/blocks/Sidebar12/components/NavUser.vue'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  type SidebarProps,
  SidebarRail,
  SidebarSeparator,
} from '@/registry/default/ui/sidebar'

const props = defineProps<SidebarProps>()
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
  <Sidebar v-bind="props">
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
    <SidebarRail />
  </Sidebar>
</template>
