<script setup lang="ts">
import { Calendar } from '@/registry/new-york-v4/ui/calendar'
import {
  SidebarGroup,
  SidebarGroupContent,
} from '@/registry/new-york-v4/ui/sidebar'
</script>

<template>
  <SidebarGroup class="px-0">
    <SidebarGroupContent>
      <Calendar class="[&_[role=gridcell].bg-accent]:bg-sidebar-primary [&_[role=gridcell].bg-accent]:text-sidebar-primary-foreground [&_[role=gridcell]]:w-[33px]" />
    </SidebarGroupContent>
  </SidebarGroup>
</template>
