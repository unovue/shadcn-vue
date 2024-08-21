<script lang="ts" setup>
import { useMediaQuery } from '@vueuse/core'
import { computed, ref } from 'vue'
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/lib/registry/new-york/ui/breadcrumb'
import { Button } from '@/lib/registry/new-york/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/lib/registry/new-york/ui/drawer'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/lib/registry/new-york/ui/dropdown-menu'

const isDesktop = useMediaQuery('(min-width: 768px)')
const isOpen = ref(false)
const items = ref([
  { href: '#', label: 'Home' },
  { href: '#', label: 'Documentation' },
  { href: '#', label: 'Building Your Application' },
  { href: '#', label: 'Data Fetching' },
  { label: 'Caching and Revalidating' },
])

const itemsToDisplay = 3
const firstLabel = computed(() => items.value[0]?.label)

const allButLastTwoItems = computed(() => items.value.slice(1, -2))
const remainingItems = computed(() => items.value.slice(-itemsToDisplay + 1))
</script>

<template>
  <Breadcrumb>
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink href="{items[0].href}">
          {{ firstLabel }}
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <template v-if="items.length > itemsToDisplay">
        <BreadcrumbItem>
          <DropdownMenu v-if="isDesktop" v-model:open="isOpen">
            <DropdownMenuTrigger
              class="flex items-center gap-1"
              aria-label="Toggle menu"
            >
              <BreadcrumbEllipsis class="size-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem v-for="item of allButLastTwoItems" :key="item.label">
                <a :href="item.href || '#'">
                  {{ item.label }}
                </a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Drawer v-else v-model:open="isOpen">
            <DrawerTrigger aria-label="Toggle Menu">
              <BreadcrumbEllipsis class="size-4" />
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader class="text-left">
                <DrawerTitle>Navigate to</DrawerTitle>
                <DrawerDescription>
                  Select a page to navigate to.
                </DrawerDescription>
              </DrawerHeader>
              <div class="grid gap-1 px-4">
                <a
                  v-for="item of allButLastTwoItems"
                  :key="item.label"
                  :href="item.href"
                  class="py-1 text-sm"
                >
                  {{ item.label }}
                </a>
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
        </BreadcrumbItem>
        <BreadcrumbSeparator />
      </template>
      <BreadcrumbItem v-for=" item of remainingItems" :key="item.label">
        <template v-if="item.href">
          <BreadcrumbLink
            as-child
            class="max-w-20 truncate md:max-w-none"
          >
            <a :href="item.href">
              {{ item.label }}
            </a>
          </BreadcrumbLink>
          <BreadcrumbSeparator />
        </template>
        <BreadcrumbPage v-else class="max-w-20 truncate md:max-w-none">
          {{ item.label }}
        </BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumb>
</template>
