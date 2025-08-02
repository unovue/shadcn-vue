<script setup lang="ts">
import type { Component, HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { Tabs, TabsList, TabsTrigger } from '@/registry/new-york-v4/ui/tabs'

const props = withDefaults(defineProps<{
  component: string | Component
  class?: HTMLAttributes['class']
  hideCode?: boolean
  align?: 'center' | 'start' | 'end'
}>(), {
  align: 'center',
})

const tab = ref<'preview' | 'code'>('preview')
</script>

<template>
  <div
    :class="cn('group relative mt-4 mb-12 flex flex-col gap-2', props.class)"
  >
    <Tabs v-model="tab" class="relative mr-auto w-full">
      <div class="flex items-center justify-between">
        <TabsList v-if="!hideCode" class="justify-start gap-4 rounded-none bg-transparent px-2 md:px-0">
          <TabsTrigger
            value="preview"
            class="text-muted-foreground data-[state=active]:text-foreground px-0 text-base data-[state=active]:shadow-none dark:data-[state=active]:border-transparent dark:data-[state=active]:bg-transparent"
          >
            Preview
          </TabsTrigger>
          <TabsTrigger
            value="code"
            class="text-muted-foreground data-[state=active]:text-foreground px-0 text-base data-[state=active]:shadow-none dark:data-[state=active]:border-transparent dark:data-[state=active]:bg-transparent"
          >
            Code
          </TabsTrigger>
        </TabsList>
      </div>
    </Tabs>
    <div :data-tab="tab" class="data-[tab=code]:border-code relative rounded-lg border md:-mx-1">
      <div
        data-slot="preview"
        :data-active="tab === 'preview'"
        class="invisible data-[active=true]:visible"
      >
        <div
          :data-align="align"
          :class="cn(
            'preview flex h-[450px] w-full justify-center p-10 data-[align=center]:items-center data-[align=end]:items-end data-[align=start]:items-start',
          )"
        >
          <component :is="component" />
        </div>
      </div>
      <div
        data-slot="code"
        :data-active="tab === 'code'"
        class="absolute inset-0 hidden overflow-hidden data-[active=true]:block **:[figure]:!m-0 **:[pre]:h-[450px]"
      >
        <slot /> <!-- {{source}} -->
      </div>
    </div>
  </div>
</template>
