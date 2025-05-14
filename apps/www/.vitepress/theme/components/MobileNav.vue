<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/registry/new-york/ui/button'

import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from '@/registry/new-york/ui/drawer'
import { docsConfig } from '../config/docs'

const open = ref(false)
</script>

<template>
  <Drawer v-model:open="open">
    <DrawerTrigger as-child>
      <Button
        variant="ghost"
        class="-ml-2 mr-2 h-8 w-8 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          class="!size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 9h16.5m-16.5 6.75h16.5"
          />
        </svg>
        <span class="sr-only">Toggle Menu</span>
      </Button>
    </DrawerTrigger>
    <DrawerContent class="max-h-[60svh] p-0">
      <div class="overflow-auto p-6">
        <div class="flex flex-col space-y-3">
          <template v-for="item in docsConfig.mainNav">
            <a
              v-if="item.href"
              :key="item.href"
              :href="item.href"
              @click="open = false"
            >
              {{ item.title }}
            </a>
          </template>
        </div>
        <div class="flex flex-col space-y-2">
          <div v-for="(items, index) in docsConfig.sidebarNav" :key="index" class="flex flex-col space-y-3 pt-6">
            <h4 class="font-medium">
              {{ items.title }}
            </h4>
            <template v-for="item in items.items" :key="item.href">
              <a
                v-if="item.href"
                :href="item.href"
                class="text-muted-foreground"
                @click="open = false"
              >
                {{ item.title }}
                <span v-if="item.label" class="ml-2 rounded-md bg-[#adfa1d] px-1.5 py-0.5 text-xs leading-none text-[#000000] no-underline group-hover:no-underline">
                  {{ item.label }}
                </span>
              </a>
              <span v-else>{{ item.title }}</span>
            </template>
          </div>
        </div>
      </div>
    </DrawerContent>
  </Drawer>
</template>
