<script setup lang="ts">
import StyleSwitcher from './StyleSwitcher.vue'
import ComponentLoader from './ComponentLoader.vue'
import Stackblitz from './Stackblitz.vue'
import CodeSandbox from './CodeSandbox.vue'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/lib/registry/default/ui/tabs'
import { useConfigStore } from '@/stores/config'
import { cn } from '@/lib/utils'

defineOptions({
  inheritAttrs: false,
})

withDefaults(defineProps<{
  name: string
  align?: 'center' | 'start' | 'end'
  sfcTsCode?: string
  sfcTsHtml?: string
}>(), { align: 'center' })

const { style } = useConfigStore()
</script>

<template>
  <div
    class="not-docs group relative my-4 flex flex-col space-y-2"
  >
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
        <div class="flex items-center justify-between p-4">
          <StyleSwitcher />

          <div class="flex items-center gap-x-1">
            <Stackblitz :key="style" :style="style" :name="name" :code="decodeURIComponent(sfcTsCode ?? '')" />
            <CodeSandbox :key="style" :style="style" :name="name" :code="decodeURIComponent(sfcTsCode ?? '')" />
          </div>
        </div>
        <div
          :class="cn('preview flex min-h-[350px] w-full justify-center p-10 items-center', {
            'items-center': align === 'center',
            'items-start': align === 'start',
            'items-end': align === 'end',
          })"
        >
          <ComponentLoader v-bind="$attrs" :key="style" :name="name" />
        </div>
      </TabsContent>
      <TabsContent value="code">
        <div v-if="sfcTsHtml" class="language-vue" style="flex: 1;" v-html="decodeURIComponent(sfcTsHtml)" />
        <slot v-else />
      </TabsContent>
    </Tabs>
  </div>
</template>
