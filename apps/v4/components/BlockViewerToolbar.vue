<script setup lang="ts">
import { useClipboard } from '@vueuse/core'
import {
  Check,
  Fullscreen,
  Monitor,
  RotateCw,
  Smartphone,
  Tablet,
  Terminal,
} from 'lucide-vue-next'
import { Button } from '@/registry/new-york-v4/ui/button'
import { Separator } from '@/registry/new-york-v4/ui/separator'
import { Tabs, TabsList, TabsTrigger } from '@/registry/new-york-v4/ui/tabs'

import {
  ToggleGroup,
  ToggleGroupItem,
} from '@/registry/new-york-v4/ui/toggle-group'
import { useBlockViewer } from './BlockViewer.vue'

const { view, item, iframeKey, resizablePanelRef }
  = useBlockViewer()

const { copy, copied } = useClipboard()
</script>

<template>
  <div class="hidden w-full items-center gap-2 pl-2 md:pr-6 lg:flex">
    <Tabs v-model="view">
      <TabsList class="grid h-8 grid-cols-2 items-center rounded-md p-1 *:data-[slot=tabs-trigger]:h-6 *:data-[slot=tabs-trigger]:rounded-sm *:data-[slot=tabs-trigger]:px-2 *:data-[slot=tabs-trigger]:text-xs">
        <TabsTrigger value="preview">
          Preview
        </TabsTrigger>
        <TabsTrigger value="code">
          Code
        </TabsTrigger>
      </TabsList>
    </Tabs>
    <Separator orientation="vertical" class="mx-2 !h-4" />
    <a
      :href="`#${item.name}`"
      class="flex-1 text-center text-sm font-medium underline-offset-2 hover:underline md:flex-auto md:text-left"
    >
      {{ item.description?.replace(/\.$/, "") }}
    </a>
    <div class="ml-auto flex items-center gap-2">
      <div class="h-8 items-center gap-1.5 rounded-md border p-1 shadow-none">
        <ToggleGroup
          type="single"
          :default-value="100"
          class="gap-1 *:data-[slot=toggle-group-item]:!size-6 *:data-[slot=toggle-group-item]:!rounded-sm"
          @update:model-value="(value) => {
            view = 'preview'
            if (resizablePanelRef) {
              resizablePanelRef.resize(value as number)
            }
          }"
        >
          <ToggleGroupItem value="100" title="Desktop">
            <Monitor />
          </ToggleGroupItem>
          <ToggleGroupItem value="60" title="Tablet">
            <Tablet />
          </ToggleGroupItem>
          <ToggleGroupItem value="30" title="Mobile">
            <Smartphone />
          </ToggleGroupItem>
          <Separator orientation="vertical" class="!h-4" />
          <Button
            size="icon"
            variant="ghost"
            class="size-6 rounded-sm p-0"
            as-child
            title="Open in New Tab"
          >
            <NuxtLink :to="`/view/${item.name}`" target="_blank">
              <span class="sr-only">Open in New Tab</span>
              <Fullscreen />
            </NuxtLink>
          </Button>
          <Separator orientation="vertical" class="!h-4" />
          <Button
            size="icon"
            variant="ghost"
            class="size-6 rounded-sm p-0"
            title="Refresh Preview"

            @click="() => {
              if (iframeKey)
                iframeKey += 1
            }"
          >
            <RotateCw />
            <span class="sr-only">Refresh Preview</span>
          </Button>
        </ToggleGroup>
      </div>
      <Separator orientation="vertical" class="mx-1 !h-4" />
      <Button
        variant="outline"
        class="w-fit gap-1 px-2 shadow-none"
        size="sm"
        @click="() => {
          copy(`npx shadcn-vue@latest add ${item.name}`)

        }"
      >
        <Check v-if="copied" />
        <Terminal v-else />
        <span>npx shadcn-vue add {{ item.name }}</span>
      </Button>
    </div>
  </div>
</template>
