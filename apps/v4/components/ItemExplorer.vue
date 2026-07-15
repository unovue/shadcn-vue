<script setup lang="ts">
import type { RegistryItem } from 'shadcn-vue/schema'
import type { Base } from '~/registry/bases'
import { ChevronRightIcon } from '@lucide/vue'
import { cn } from '@/lib/utils'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/registry/new-york-v4/ui/collapsible'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/registry/new-york-v4/ui/sidebar'
import { groupItemsByType } from '~/lib/create'

const props = defineProps<{
  base: Base['name']
  items: Pick<RegistryItem, 'name' | 'title' | 'type'>[]
}>()

const params = useDesignSystemSearchParams()

const groupedItems = computed(() => {
  return groupItemsByType(props.items)
})

const currentItem = computed(() => {
  return props.items.find(item => item.name === params.item.value) ?? null
})
</script>

<template>
  <Sidebar
    class="sticky z-30 hidden h-[calc(100svh-var(--header-height)-2rem)] overscroll-none bg-transparent xl:flex"
    collapsible="none"
  >
    <SidebarContent class="no-scrollbar -mx-1 overflow-x-hidden">
      <Collapsible
        v-for="group in groupedItems"
        :key="group.type"
        default-open
        class="group/collapsible"
      >
        <SidebarGroup class="px-1 py-0">
          <CollapsibleTrigger class="flex w-full items-center gap-1 py-1.5 text-[0.8rem] font-medium [&[data-state=open]>svg]:rotate-90">
            <ChevronRightIcon class="text-muted-foreground size-3.5 transition-transform" />
            <span>{{ group.title }}</span>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <SidebarGroupContent>
              <SidebarMenu class="border-border/50 relative ml-1.5 border-l pl-2">
                <SidebarMenuItem v-for="(item, index) in group.items" :key="item.name" class="relative">
                  <div
                    :class="cn(
                      'border-border/50 absolute top-1/2 -left-2 h-px w-2 border-t',
                      index === group.items.length - 1 && 'bg-sidebar',
                    )"
                  />
                  <div v-if="index === group.items.length - 1" class="bg-sidebar absolute top-1/2 -bottom-1 -left-2.5 w-1" />
                  <SidebarMenuButton
                    class="data-[active=true]:bg-accent data-[active=true]:border-accent 3xl:fixed:w-full 3xl:fixed:max-w-48 relative h-[26px] w-fit cursor-pointer overflow-visible border border-transparent text-[0.8rem] font-normal after:absolute after:inset-x-0 after:-inset-y-1 after:-z-0 after:rounded-md"
                    :data-active="item.name === currentItem?.name"
                    :is-active="item.name === currentItem?.name"
                    @click="() => {
                      params.item.value = item.name
                    }"
                  >
                    {{ item.title }}
                    <span class="absolute inset-0 flex w-(--sidebar-width) bg-transparent" />
                  </SidebarMenuButton>
                  <a
                    :href="`/preview/${item.name}`"
                    prefetch
                    class="sr-only"
                    :tab-index="-1"
                  >
                    {{ item.title }}
                  </a>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </CollapsibleContent>
        </SidebarGroup>
      </Collapsible>
    </SidebarContent>
  </Sidebar>
</template>
