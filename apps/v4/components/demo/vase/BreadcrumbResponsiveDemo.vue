<script setup lang="ts">
import { NuxtLink } from '#components'
import { useMediaQuery, useMounted } from '@vueuse/core'
import { computed, ref } from 'vue'
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/styles/vase-vega/ui/breadcrumb'
import { Button } from '@/styles/vase-vega/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/styles/vase-vega/ui/drawer'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/styles/vase-vega/ui/dropdown-menu'

const items = [
  { href: '#', label: 'Home' },
  { href: '#', label: 'Documentation' },
  { href: '#', label: 'Building Your Application' },
  { href: '#', label: 'Data Fetching' },
  { label: 'Caching and Revalidating' },
]

const ITEMS_TO_DISPLAY = 3

const open = ref(false)
const isMounted = useMounted()
const matchesDesktop = useMediaQuery('(min-width: 768px)')
// The server cannot read the viewport, so the server and the first render of the browser both show the menu of the desktop.
const isDesktop = computed(() => !isMounted.value || matchesDesktop.value)
</script>

<template>
  <Breadcrumb>
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink :as="NuxtLink" :to="items[0]?.href || '/'">
          {{ items[0]?.label }}
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <template v-if="items.length > ITEMS_TO_DISPLAY">
        <BreadcrumbItem>
          <template v-if="isDesktop">
            <DropdownMenu>
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
                  <DrawerClose>
                    <template #element="{ props, elementRef }">
                      <Button v-bind="props" :ref="elementRef" variant="outline">
                        Close
                      </Button>
                    </template>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </template>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
      </template>
      <template v-for="(item, index) in items.slice(-ITEMS_TO_DISPLAY + 1)" :key="index">
        <BreadcrumbItem>
          <BreadcrumbLink
            v-if="item.href"
            class="max-w-20 truncate md:max-w-none"
            :as="NuxtLink"
            :to="item.href"
          >
            {{ item.label }}
          </BreadcrumbLink>
          <BreadcrumbPage v-else class="max-w-20 truncate md:max-w-none">
            {{ item.label }}
          </BreadcrumbPage>
        </BreadcrumbItem>
        <BreadcrumbSeparator v-if="item.href" />
      </template>
    </BreadcrumbList>
  </Breadcrumb>
</template>
