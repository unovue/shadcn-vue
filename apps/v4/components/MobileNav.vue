<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { Button } from '@/registry/new-york-v4/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/registry/new-york-v4/ui/popover'
import { showMcpDocs } from '~/lib/flag'

const props = defineProps<{
  class?: HTMLAttributes['class']
  tree: ContentNavigationItem[]
  items: { href: string, label: string }[]
}>()
const router = useRouter()
const open = ref(false)

const TOP_LEVEL_SECTIONS = [
  { name: 'Get Started', href: '/docs/introduction' },
  {
    name: 'Components',
    href: '/docs/components',
  },
  {
    name: 'Registry',
    href: '/docs/registry',
  },
  {
    name: 'MCP Server',
    href: '/docs/mcp',
  },
  {
    name: 'Forms',
    href: '/docs/forms',
  },
  {
    name: 'Changelog',
    href: '/docs/changelog',
  },
]

function handleNavigate(path: string) {
  router.push(path)
  open.value = false
}
</script>

<template>
  <Popover v-model:open="open">
    <PopoverTrigger as-child>
      <Button
        variant="ghost"
        :class="cn(
          'extend-touch-target h-8 touch-manipulation items-center justify-start gap-2.5 !p-0 hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 active:bg-transparent dark:hover:bg-transparent',
          props.class,
        )"
      >
        <div class="relative flex h-8 w-4 items-center justify-center">
          <div class="relative size-4">
            <span
              :class="cn(
                'bg-foreground absolute left-0 block h-0.5 w-4 transition-all duration-100',
                open ? 'top-[0.4rem] -rotate-45' : 'top-1',
              )"
            />
            <span
              :class="cn(
                'bg-foreground absolute left-0 block h-0.5 w-4 transition-all duration-100',
                open ? 'top-[0.4rem] rotate-45' : 'top-2.5',
              )"
            />
          </div>
          <span class="sr-only">Toggle Menu</span>
        </div>
        <span class="flex h-8 items-center text-lg leading-none font-medium">
          Menu
        </span>
      </Button>
    </PopoverTrigger>

    <PopoverContent
      class="bg-background/90 no-scrollbar h-(--reka-popper-available-height) w-(--reka-popper-available-width) overflow-y-auto rounded-none border-none p-0 shadow-none backdrop-blur duration-100"
      align="start"
      side="bottom"
      :align-offset="-16"
      :side-offset="14"
    >
      <div class="flex flex-col gap-12 overflow-auto px-6 py-6">
        <div class="flex flex-col gap-4">
          <div class="text-muted-foreground text-sm font-medium">
            Menu
          </div>
          <div class="flex flex-col gap-3">
            <NuxtLink class="text-2xl font-medium" to="/" @click="handleNavigate('/')">
              Home
            </NuxtLink>
            <NuxtLink v-for="(item, index) in items" :key="index" class="text-2xl font-medium" :to="item.href" @click="handleNavigate(item.href)">
              {{ item.label }}
            </NuxtLink>
          </div>
        </div>
        <div class="flex flex-col gap-4">
          <div class="text-muted-foreground text-sm font-medium">
            Sections
          </div>
          <div class="flex flex-col gap-3">
            <NuxtLink
              v-for="{ name, href } in TOP_LEVEL_SECTIONS"
              v-show="!(!showMcpDocs && href.includes('/mcp'))"
              :key="name"
              :to="href"
              class="text-2xl font-medium"
              @click="handleNavigate(href)"
            >
              {{ name }}
            </NuxtLink>
          </div>
        </div>
        <div class="flex flex-col gap-8">
          <template v-for="(group, index) in tree[0]?.children" :key="index">
            <div class="flex flex-col gap-4">
              <div class="text-muted-foreground text-sm font-medium">
                {{ group.title }}
              </div>
              <div class="flex flex-col gap-3">
                <NuxtLink v-for="item in group.children" :key="item.path" class="flex items-center gap-2 text-2xl font-medium" :to="item.path" @click="handleNavigate(item.path)">
                  {{ item.title }}
                  <span v-if="item.new" class="flex size-2 rounded-full bg-green-500" />
                </NuxtLink>
              </div>
            </div>
          </template>
        </div>
      </div>
    </PopoverContent>
  </Popover>
</template>
