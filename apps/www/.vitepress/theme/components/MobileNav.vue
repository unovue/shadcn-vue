<script setup lang="ts">
import { ref } from 'vue'
import { docsConfig } from '../config/docs'
import Logo from './Logo.vue'
import { Sheet, SheetContent, SheetTrigger } from '@/lib/registry/default/ui/sheet'
import { Button } from '@/lib/registry/default/ui/button'
import { ScrollArea } from '@/lib/registry/default/ui/scroll-area'
import ViewVerticalIcon from '~icons/radix-icons/view-vertical'

const open = ref(false)
</script>

<template>
  <Sheet v-model:open="open">
    <SheetTrigger as-child>
      <Button
        variant="ghost"
        class="mr-2 px-2 text-base flex-shrink-0 hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
      >
        <ViewVerticalIcon class="h-5 w-5" />
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
            <h4 class="font-medium">
              {{ items.title }}
            </h4>

            <a
              v-for="item in items.items" :key="item.href"
              :href="item.href"
              class="text-muted-foreground"
              @click="open = false"
            >
              {{ item.title }}
            </a>
          </div>
        </div>
      </ScrollArea>
    </SheetContent>
  </Sheet>
</template>
