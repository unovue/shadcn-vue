<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/registry/new-york-v4/ui/sidebar'

defineProps<{
  tree: ContentNavigationItem
}>()

const { path } = toRefs(useRoute())
</script>

<template>
  <Sidebar
    class="sticky top-[calc(var(--header-height)+1px)] z-30 hidden h-[calc(100svh-var(--header-height)-var(--footer-height))] bg-transparent lg:flex"
    collapsible="none"
  >
    <SidebarContent class="no-scrollbar px-2 pb-12">
      <div class="h-(--top-spacing) shrink-0" />
      <SidebarGroup v-for="item in tree.children" :key="item.title">
        <SidebarGroupLabel class="text-muted-foreground font-medium">
          {{ item.title }}
        </SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu class="gap-0.5">
            <template v-for="childItem in item.children" :key="childItem.url">
              <SidebarMenuItem>
                <SidebarMenuButton
                  as-child
                  :is-active="childItem.path === path"
                  class="data-[active=true]:bg-accent data-[active=true]:border-accent 3xl:fixed:w-full 3xl:fixed:max-w-48 relative h-[30px] w-fit overflow-visible border border-transparent text-[0.8rem] font-medium after:absolute after:inset-x-0 after:-inset-y-1 after:z-0 after:rounded-md"
                >
                  <NuxtLink :to="childItem.path">
                    <span class="absolute inset-0 flex w-(--sidebar-width) bg-transparent" />
                    {{ childItem.title }}
                    <span
                      v-if="childItem.new"
                      class="flex size-2 rounded-full bg-blue-500"
                      title="New"
                    />
                  </NuxtLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </template>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>
</template>
