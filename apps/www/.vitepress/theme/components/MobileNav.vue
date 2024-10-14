<script setup lang="ts">
import { Button } from '@/lib/registry/default/ui/button'
import { ScrollArea } from '@/lib/registry/default/ui/scroll-area'
import { Sheet, SheetContent, SheetTrigger } from '@/lib/registry/default/ui/sheet'
import { ref } from 'vue'
import { docsConfig } from '../config/docs'
import Logo from './Logo.vue'

const open = ref(false)
</script>

<template>
  <Sheet v-model:open="open">
    <SheetTrigger as-child>
      <Button
        variant="ghost"
        class="mr-2 px-2 text-base flex-shrink-0 hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
      >
        <svg
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
        >
          <path
            d="M3 5H11"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M3 12H16"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M3 19H21"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <span class="sr-only">Toggle Menu</span>
      </Button>
    </SheetTrigger>
    <SheetContent side="left" class="pr-0">
      <Logo @click="open = false" />
      <ScrollArea class="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
        <div class="flex flex-col space-y-3">
          <a
            v-for="item in docsConfig.mainNav"
            :key="item.href"
            :href="item.href"
            @click="open = false"
          >
            {{ item.title }}
          </a>
        </div>
        <div class="flex flex-col space-y-2">
          <div v-for="(items, index) in docsConfig.sidebarNav" :key="index" class="flex flex-col space-y-3 pt-6">
            <div class="flex items-center">
              <h4 class="font-medium">
                {{ items.title }}
              </h4>
              <span v-if="items.label" class="ml-2 rounded-md bg-[#adfa1d] px-1.5 py-0.5 text-xs leading-none text-[#000000] no-underline group-hover:no-underline">
                {{ items.label }}
              </span>
            </div>

            <a
              v-for="item in items.items" :key="item.href"
              :href="item.href"
              class="text-muted-foreground inline-flex items-center"
              @click="open = false"
            >
              {{ item.title }}

              <span v-if="item.label" class="ml-2 rounded-md bg-[#adfa1d] px-1.5 py-0.5 text-xs leading-none text-[#000000] no-underline group-hover:no-underline">
                {{ item.label }}
              </span>
            </a>
          </div>
        </div>
      </ScrollArea>
    </SheetContent>
  </Sheet>
</template>
