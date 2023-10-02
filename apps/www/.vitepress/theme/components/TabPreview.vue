<script setup lang="ts">
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/lib/registry/default/ui/tabs'

const props = withDefaults(defineProps<{
  name: string
  names?: string[]
  align?: 'center' | 'start' | 'end'
  sfcTsCode?: string
  sfcTsHtml?: string
}>(), {
  align: 'center',
  names: () => ['CLI', 'Manual'],
})
</script>

<template>
  <div>
    <Tabs :default-value="props.name" class="relative mr-auto w-full">
      <div class="flex items-center justify-between pb-3">
        <TabsList class="w-full justify-start rounded-none border-b bg-transparent p-0">
          <TabsTrigger
            v-for="(tab, index) in props.names"
            :key="index"
            :value="tab"
            class="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
          >
            {{ tab }}
          </TabsTrigger>
        </TabsList>
      </div>
      <TabsContent v-for="(tab, index) in props.names" :key="index" :value="tab" class="relative space-y-10">
        <slot :name="tab" />
      </TabsContent>
    </Tabs>
  </div>
</template>
