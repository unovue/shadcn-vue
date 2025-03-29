<script setup lang="ts">
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/registry/default/ui/collapsible'

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from '@/registry/default/ui/sidebar'
import { Check, ChevronRight } from 'lucide-vue-next'

const props = defineProps<{
  calendars: {
    name: string
    items: string[]
  }[]
}>()
</script>

<template>
  <template v-for="(calendar, index) in calendars" :key="calendar.name">
    <SidebarGroup class="py-0">
      <Collapsible
        :default-open="index === 0"
        class="group/collapsible"
      >
        <SidebarGroupLabel
          as-child
          class="group/label w-full text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          <CollapsibleTrigger>
            {{ calendar.name }}
            <ChevronRight class="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
          </CollapsibleTrigger>
        </SidebarGroupLabel>
        <CollapsibleContent>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem v-for="(item, index) in calendar.items" :key="item">
                <SidebarMenuButton>
                  <div
                    :data-active="index < 2"
                    class="group/calendar-item flex aspect-square size-4 shrink-0 items-center justify-center rounded-sm border border-sidebar-border text-sidebar-primary-foreground data-[active=true]:border-sidebar-primary data-[active=true]:bg-sidebar-primary"
                  >
                    <Check class="hidden size-3 group-data-[active=true]/calendar-item:block" />
                  </div>
                  {{ item }}
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </CollapsibleContent>
      </Collapsible>
    </SidebarGroup>
    <SidebarSeparator class="mx-0" />
  </template>
</template>
