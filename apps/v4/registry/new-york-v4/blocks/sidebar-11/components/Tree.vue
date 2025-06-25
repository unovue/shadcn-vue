<script setup lang="ts">
import { ChevronRight, File, Folder } from 'lucide-vue-next'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/registry/new-york-v4/ui/collapsible'
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
} from '@/registry/new-york-v4/ui/sidebar'

const props = defineProps<{
  item: string | any[]
}>()

const [name, ...items] = Array.isArray(props.item) ? props.item : [props.item]
</script>

<template>
  <SidebarMenuButton
    v-if="!items.length"
    :is-active="name === 'button.tsx'"
    class="data-[active=true]:bg-transparent"
  >
    <File />
    {{ name }}
  </SidebarMenuButton>

  <SidebarMenuItem v-else>
    <Collapsible
      class="group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90"
      :default-open="name === 'components' || name === 'ui'"
    >
      <CollapsibleTrigger as-child>
        <SidebarMenuButton>
          <ChevronRight class="transition-transform" />
          <Folder />
          {{ name }}
        </SidebarMenuButton>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <SidebarMenuSub>
          <Tree v-for="(subItem, index) in items" :key="index" :item="subItem" />
        </SidebarMenuSub>
      </CollapsibleContent>
    </Collapsible>
  </SidebarMenuItem>
</template>
