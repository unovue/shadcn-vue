<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { codeToHtml } from 'shiki'
import MagicString from 'magic-string'
import { useClipboard } from '@vueuse/core'
import { cssVariables } from '../config/shiki'
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

const props = withDefaults(defineProps<{
  name: string
  align?: 'center' | 'start' | 'end'
}>(), { align: 'center' })

const { style, codeConfig } = useConfigStore()

const rawString = ref('')
const codeHtml = ref('')
const transformedRawString = computed(() => transformImportPath(rawString.value))

function transformImportPath(code: string) {
  const s = new MagicString(code)
  s.replaceAll(`@/lib/registry/${style.value}`, codeConfig.value.componentsPath)
  s.replaceAll(`@/lib/utils`, codeConfig.value.utilsPath)
  return s.toString()
}

watch([style, codeConfig], async () => {
  try {
    rawString.value = await import(`../../../src/lib/registry/${style.value}/example/${props.name}.vue?raw`).then(res => res.default.trim())
    codeHtml.value = await codeToHtml(transformedRawString.value, {
      lang: 'vue',
      theme: cssVariables,
    })
  }
  catch (err) {
    console.error(err)
  }
}, { immediate: true, deep: true })

const { copy, copied } = useClipboard()
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
            <Stackblitz :key="style" :style="style" :name="name" :code="rawString" />
            <CodeSandbox :key="style" :style="style" :name="name" :code="rawString" />
          </div>
        </div>
        <div
          :class="cn('preview flex min-h-[350px] w-full justify-center p-10 items-center', {
            'items-center': align === 'center',
            'items-start': align === 'start',
            'items-end': align === 'end',
          })"
        >
          <ComponentLoader v-bind="$attrs" :key="style" :name="name" :type-name="'example'" />
        </div>
      </TabsContent>
      <TabsContent value="code" class="vp-doc">
        <div v-if="codeHtml" class="language-vue" style="flex: 1;">
          <button title="Copy Code" class="copy" :class="{ copied }" @click="copy(transformedRawString)" />

          <div v-html="codeHtml" />
        </div>
        <slot v-else />
      </TabsContent>
    </Tabs>
  </div>
</template>
