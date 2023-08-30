<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import Spinner from './Spinner.vue'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/lib/registry/default/ui/tabs'
import { cn } from '@/lib/utils'

const props = withDefaults(defineProps<{
  name: string
  align?: 'center' | 'start' | 'end'
}>(), { align: 'center' })

const Component = defineAsyncComponent({
  loadingComponent: Spinner,
  loader: () => import(`../../../src/lib/registry/default/examples/${props.name}.vue`),
  timeout: 5000,
})
</script>

<template>
  <div class="group relative my-4 flex flex-col space-y-2">
    <Tabs default-value="preview" class="relative mr-auto w-full">
      <div class="flex items-center justify-between pb-3">
        <TabsList class="w-full justify-start rounded-none border-b bg-transparent p-0">
          <TabsTrigger
            value="preview"
            class="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
          >
            Preview
          </TabsTrigger>
          <TabsTrigger
            value="code"
            class="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
          >
            Code
          </TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="preview" class="relative rounded-md border">
        <div
          :class="cn('preview flex min-h-[350px] w-full justify-center p-10', {
            'items-center': align === 'center',
            'items-start': align === 'start',
            'items-end': align === 'end',
          })"
        >
          <Component :is="Component" />
        </div>
      </TabsContent>
      <TabsContent value="code">
        <slot />
      </TabsContent>
    </Tabs>
  </div>
</template>
