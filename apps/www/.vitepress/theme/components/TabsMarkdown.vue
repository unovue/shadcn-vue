<script setup lang="ts">
import { Tabs, TabsList, TabsTrigger } from '@/lib/registry/default/ui/tabs'
import { computed, useSlots } from 'vue'

const slots = useSlots()

const tabs = computed(() => slots.default?.()?.map(i => i?.props?.title as string) ?? [])
</script>

<template>
  <Tabs :default-value="tabs[0]" class="relative mr-auto w-full">
    <div class="flex items-center justify-between">
      <TabsList class="w-full justify-start rounded-none border-b bg-transparent p-0">
        <TabsTrigger v-for="tab in tabs" :key="tab" :value="tab" class="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none">
          {{ tab }}
        </TabsTrigger>
      </TabsList>
    </div>

    <slot />
  </Tabs>
</template>
