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
import { showMcpDocs } from '~/lib/flag'

const props = defineProps<{
  tree: ContentNavigationItem
}>()

const TOP_LEVEL_SECTIONS = [
  { name: 'Introduction', href: '/docs/introduction' },
  {
    name: 'Components',
    href: '/docs/components',
  },
  {
    name: 'Installation',
    href: '/docs/installation',
  },
  {
    name: 'Theming',
    href: '/docs/theming',
  },
  {
    name: 'CLI',
    href: '/docs/cli',
  },
  {
    name: 'RTL',
    href: '/docs/rtl',
  },
  // {
  //   name: 'Skills',
  //   href: '/docs/skills',
  // },
  {
    name: 'MCP Server',
    href: '/docs/mcp',
  },
  // {
  //   name: 'Registry',
  //   href: '/docs/registry',
  // },
  {
    name: 'Forms',
    href: '/docs/forms',
  },
  {
    name: 'Changelog',
    href: '/docs/changelog',
  },
]
const EXCLUDED_SECTIONS = ['installation', 'dark mode']
const EXCLUDED_PAGES = ['/docs/introduction', '/docs/changelog']

const { path } = toRefs(useRoute())

const filteredSections = computed(() =>
  TOP_LEVEL_SECTIONS.filter(section =>
    showMcpDocs || !section.href.includes('/mcp'),
  ),
)

function isActive(href: string) {
  return href === '/docs'
    ? path.value === href
    : path.value.startsWith(href)
}
</script>

<template>
  <Sidebar
    class="sticky top-[calc(var(--header-height)+0.6rem)] z-30 hidden h-[calc(100svh-10rem)] overscroll-none bg-transparent [--sidebar-menu-width:--spacing(56)] lg:flex"
    collapsible="none"
  >
    <div class="h-9" />
    <div class="absolute top-8 z-10 h-8 w-(--sidebar-menu-width) shrink-0 bg-linear-to-b from-background via-background/80 to-background/50 blur-xs" />
    <div class="absolute top-12 right-2 bottom-0 hidden h-full w-px bg-linear-to-b from-transparent via-border to-transparent lg:flex" />
    <SidebarContent class="mx-auto no-scrollbar w-(--sidebar-menu-width) overflow-x-hidden px-2">
      <SidebarGroup class="pt-6">
        <SidebarGroupLabel class="text-muted-foreground font-medium">
          Sections
        </SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem
              v-for="{ name, href } in filteredSections"
              :key="name"
            >
              <SidebarMenuButton
                as-child
                :is-active="isActive(href)"
                class="relative h-[30px] w-fit overflow-visible border border-transparent text-[0.8rem] font-medium after:absolute after:inset-x-0 after:-inset-y-1 after:z-0 after:rounded-md data-[active=true]:border-accent data-[active=true]:bg-accent 3xl:fixed:w-full 3xl:fixed:max-w-48"
              >
                <NuxtLink :to="href">
                  <span class="absolute inset-0 flex w-(--sidebar-menu-width) bg-transparent" />
                  {{ name }}
                </NuxtLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
      <SidebarGroup v-for="item in tree.children?.filter(section => !EXCLUDED_SECTIONS.includes(section.title.toLocaleLowerCase()))" :key="item.title">
        <SidebarGroupLabel class="text-muted-foreground font-medium">
          {{ item.title }}
        </SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu class="gap-0.5">
            <template
              v-for="childItem in item?.children?.filter(child => !EXCLUDED_PAGES.includes(child.path))"
              :key="String(childItem.url)"
            >
              <SidebarMenuItem>
                <SidebarMenuButton
                  as-child
                  :is-active="childItem?.path === path"
                  class="data-[active=true]:bg-accent data-[active=true]:border-accent 3xl:fixed:w-full 3xl:fixed:max-w-48 relative h-[30px] w-fit overflow-visible border border-transparent text-[0.8rem] font-medium after:absolute after:inset-x-0 after:-inset-y-1 after:z-0 after:rounded-md"
                >
                  <NuxtLink :to="childItem?.path">
                    <span class="absolute inset-0 flex w-(--sidebar-width) bg-transparent" />
                    {{ childItem.title }}
                    <span
                      v-if="childItem.new"
                      class="flex size-2 rounded-full bg-green-500"
                      title="New"
                    />
                  </NuxtLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </template>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
      <div class="from-background via-background/80 to-background/50 sticky -bottom-1 z-10 h-16 shrink-0 bg-gradient-to-t blur-xs" />
    </SidebarContent>
  </Sidebar>
</template>
