<script setup lang="ts">
import { NuxtLink } from '#components'
import { useMediaQuery } from '@vueuse/core'
import { ref } from 'vue'
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/registry/new-york-v4/ui/breadcrumb'
import { Button } from '@/registry/new-york-v4/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/registry/new-york-v4/ui/drawer'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/registry/new-york-v4/ui/dropdown-menu'

const items = [
  { href: '#', label: 'Home' },
  { href: '#', label: 'Documentation' },
  { href: '#', label: 'Building Your Application' },
  { href: '#', label: 'Data Fetching' },
  { label: 'Caching and Revalidating' },
]

const ITEMS_TO_DISPLAY = 3

const open = ref(false)
const isDesktop = useMediaQuery('(min-width: 768px)')
</script>

<template>
  <Breadcrumb>
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink as-child>
          <NuxtLink :to="items[0]?.href || '/'">
            {{ items[0].label }}
          </NuxtLink>
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <template v-if="items.length > ITEMS_TO_DISPLAY">
        <BreadcrumbItem>
          <template v-if="isDesktop">
            <DropdownMenu v-model:open="open">
              <DropdownMenuTrigger
                class="flex items-center gap-1"
                aria-label="Toggle menu"
              >
                <BreadcrumbEllipsis class="size-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem
                  v-for="(item, index) in items.slice(1, -2)"
                  :key="index"
                >
                  <NuxtLink :to="item.href || '#'">
                    {{ item.label }}
                  </NuxtLink>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </template>
          <template v-else>
            <Drawer v-model:open="open">
              <DrawerTrigger aria-label="Toggle Menu">
                <BreadcrumbEllipsis class="h-4 w-4" />
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader class="text-left">
                  <DrawerTitle>Navigate to</DrawerTitle>
                  <DrawerDescription>
                    Select a page to navigate to.
                  </DrawerDescription>
                </DrawerHeader>
                <div class="grid gap-1 px-4">
                  <NuxtLink
                    v-for="(item, index) in items.slice(1, -2)"
                    :key="index"
                    :to="item.href || '#'"
                    class="py-1 text-sm"
                  >
                    {{ item.label }}
                  </NuxtLink>
                </div>
                <DrawerFooter class="pt-4">
                  <DrawerClose as-child>
                    <Button variant="outline">
                      Close
                    </Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </template>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
      </template>
      <BreadcrumbItem
        v-for="(item, index) in items.slice(-ITEMS_TO_DISPLAY + 1)"
        :key="index"
      >
        <template v-if="item.href">
          <BreadcrumbLink
            as-child
            class="max-w-20 truncate md:max-w-none"
          >
            <NuxtLink :to="item.href">
              {{ item.label }}
            </NuxtLink>
          </BreadcrumbLink>
          <BreadcrumbSeparator />
        </template>
        <template v-else>
          <BreadcrumbPage class="max-w-20 truncate md:max-w-none">
            {{ item.label }}
          </BreadcrumbPage>
        </template>
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumb>
</template>
