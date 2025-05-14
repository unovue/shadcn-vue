<script setup lang="ts">
import { File } from 'lucide-vue-next'
import Tree from '@/registry/default/blocks/Sidebar11/components/Tree.vue'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  type SidebarProps,
  SidebarRail,
} from '@/registry/default/ui/sidebar'

const props = defineProps<SidebarProps>()

// This is sample data.
const data = {
  changes: [
    {
      file: 'README.md',
      state: 'M',
    },
    {
      file: 'api/hello/route.ts',
      state: 'U',
    },
    {
      file: 'app/layout.tsx',
      state: 'M',
    },
  ],
  tree: [
    [
      'app',
      [
        'api',
        ['hello', ['route.ts']],
        'page.tsx',
        'layout.tsx',
        ['blog', ['page.tsx']],
      ],
    ],
    [
      'components',
      ['ui', 'button.tsx', 'card.tsx'],
      'header.tsx',
      'footer.tsx',
    ],
    ['lib', ['util.ts']],
    ['public', 'favicon.ico', 'vercel.svg'],
    '.eslintrc.json',
    '.gitignore',
    'next.config.js',
    'tailwind.config.js',
    'package.json',
    'README.md',
  ],
}
</script>

<template>
  <Sidebar v-bind="props">
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Changes</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem v-for="(item, index) in data.changes" :key="index">
              <SidebarMenuButton>
                <File />
                {{ item.file }}
              </SidebarMenuButton>
              <SidebarMenuBadge>{{ item.state }}</SidebarMenuBadge>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
      <SidebarGroup>
        <SidebarGroupLabel>Files</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <Tree v-for="(item, index) in data.tree" :key="index" :item="item" />
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
    <SidebarRail />
  </Sidebar>
</template>
