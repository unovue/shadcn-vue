<script setup lang="ts">
import type { Block } from '@/registry/schema'
import Button from '@/registry/new-york/ui/button/Button.vue'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/registry/new-york/ui/resizable'
import { Separator } from '@/registry/new-york/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/registry/new-york/ui/tabs'
import { ToggleGroup, ToggleGroupItem } from '@/registry/new-york/ui/toggle-group'
import { useConfigStore } from '@/stores/config'

import { useClipboard } from '@vueuse/core'
import { Check, Fullscreen, Monitor, Smartphone, Tablet, Terminal } from 'lucide-vue-next'
import MagicString from 'magic-string'
import { computed, reactive, ref, watch } from 'vue'
import { compileScript, parse, walk } from 'vue/compiler-sfc'
import { Index } from '../../../__registry__/block'
import { highlight } from '../config/shiki'
import BlockPreview from './BlockPreview.vue'
import BlockViewerCode from './BlockViewerCode.vue'

const props = defineProps<{
  name: string
}>()

const { style, codeConfig } = useConfigStore()
const { copied, copy } = useClipboard()

const isLoading = ref(true)
const tabValue = ref('preview')
const resizableRef = ref<InstanceType<typeof ResizablePanel>>()
const componentRegistry = ref<Block>()

const rawString = ref('')
const codeHtml = ref('')
const metadata = reactive({
  description: null as string | null,
  iframeHeight: null as string | null,
  containerClass: null as string | null,
})

const iframeURL = computed(() => {
  // @ts-expect-error env available in import.meta
  if (import.meta.env.SSR)
    return ''

  const url = new URL(`${window.location.origin}/block-renderer`)
  url.searchParams.append('name', props.name)
  url.searchParams.append('styles', 'new-york')
  url.searchParams.append('containerClass', metadata.containerClass ?? '')

  return url.href
})

function removeScript(code: string) {
  const s = new MagicString(code)
  const scriptTagRegex = /<script\s+lang="ts"\s*>[\s\S]+?<\/script>/g
  let match
  // eslint-disable-next-line no-cond-assign
  while ((match = scriptTagRegex.exec(code)) !== null) {
    const start = match.index
    const end = match.index + match[0].length
    s.overwrite(start, end, '') // Replace the script tag with an empty string
  }
  return s.trimStart().toString()
}

function transformImportPath(code: string) {
  const s = new MagicString(code)
  s.replaceAll(`@/registry/${style.value}`, codeConfig.value.componentsPath)
  s.replaceAll(`@/lib/utils`, codeConfig.value.utilsPath)
  return s.toString()
}

watch([style, codeConfig], async () => {
  try {
    const styleIndex = Index[style.value]
    componentRegistry.value = styleIndex[props.name]
    if (!componentRegistry.value)
      return

    const rawString = await componentRegistry.value.raw()
    if (!metadata.description) {
      const { descriptor } = parse(rawString)
      const ast = compileScript(descriptor, { id: 'id' })
      walk(ast.scriptAst, {
        enter(node: any) {
          const declaration = node.declaration
          // Check if the declaration is a variable declaration
          if (declaration?.type === 'VariableDeclaration') {
            // Extract variable names and their values
            declaration.declarations.forEach((decl: any) => {
              // @ts-expect-error ignore missing type
              metadata[decl.id.name] = decl.init ? decl.init.value : null
            })
          }
        },
      })
    }

    codeHtml.value = highlight(removeScript(rawString), 'vue')
  }
  catch (err) {
    console.error(err)
  }
}, { immediate: true, deep: true })
</script>

<template>
  <Tabs
    :id="name"
    v-model="tabValue"
    class="group/block-view-wrapper flex min-w-0 flex-col items-stretch gap-4"
    :style=" {
      '--height': metadata.iframeHeight ?? '930px',
    }"
  >
    <div class="flex flex-col items-center gap-4 sm:flex-row">
      <div class="hidden items-center gap-2 sm:flex">
        <TabsList class="h-7 items-center rounded-md p-0 px-[calc(theme(spacing.1)_-_2px)] py-[theme(spacing.1)]">
          <TabsTrigger class="h-[1.45rem] rounded-sm px-2 text-xs" value="preview">
            Preview
          </TabsTrigger>
          <TabsTrigger class="h-[1.45rem] rounded-sm px-2 text-xs" value="code">
            Code
          </TabsTrigger>
        </TabsList>

        <Separator
          orientation="vertical"
          class="mx-2 hidden h-4 md:flex"
        />
        <div class="text-sm font-medium underline-offset-2 hover:underline">
          <a :href="`#${name}`">{{ metadata.description }}</a>
        </div>
      </div>

      <div class="flex items-center gap-2 pr-[14px] sm:ml-auto">
        <Button
          variant="ghost"
          class="hidden h-7 w-7 rounded-md border bg-transparent shadow-none md:flex lg:w-auto"
          size="sm"
          @click="copy(`npx shadcn-vue@latest add ${name}`)"
        >
          <Check v-if="copied" />
          <Terminal v-else />
          <span class="hidden lg:inline">npx shadcn-vue add {{ name }}</span>
        </Button>
        <Separator
          orientation="vertical"
          class="mx-2 hidden h-4 md:flex"
        />
        <div class="hidden h-7 items-center gap-1.5 rounded-md border p-[2px] shadow-none lg:flex">
          <ToggleGroup
            type="single"
            default-value="100"
            @update:model-value="(value) => {
              resizableRef?.resize(parseInt(value as string))
            }"
          >
            <ToggleGroupItem
              value="100"
              class="h-[22px] w-[22px] rounded-sm p-0"
            >
              <Monitor class="h-3.5 w-3.5" />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="60"
              class="h-[22px] w-[22px] rounded-sm p-0"
            >
              <Tablet class="h-3.5 w-3.5" />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="30"
              class="h-[22px] w-[22px] rounded-sm p-0"
            >
              <Smartphone class="h-3.5 w-3.5" />
            </ToggleGroupItem>
            <Separator orientation="vertical" class="h-4" />
            <Button
              size="icon"
              variant="ghost"
              class="h-[22px] w-[22px] rounded-sm p-0"
              as-child
              title="Open in New Tab"
            >
              <a :href="iframeURL" target="_blank">
                <span class="sr-only">Open in New Tab</span>
                <Fullscreen class="h-3.5 w-3.5" />
              </a>
            </Button>
          </ToggleGroup>
        </div>
        <!-- <BlockCopyButton :code="rawString" /> -->
        <!-- <V0Button
          name="{block.name}"
          description="{block.description" || "Edit in v0"}
          code="{block.code}"
          style="{block.style}"
        /> -->
      </div>
    </div>
    <TabsContent
      v-show="tabValue === 'preview'"
      force-mount
      value="preview"
      class="relative after:absolute after:inset-0 after:right-3 after:z-0 after:rounded-lg after:bg-muted h-[--height] px-0"
    >
      <ResizablePanelGroup id="block-resizable" direction="horizontal" class="relative z-10 bg-background">
        <ResizablePanel
          id="block-resizable-panel-1"
          ref="resizableRef"
          :default-size="100"
          :min-size="30"
          as-child
        >
          <BlockPreview :url="iframeURL" container />
        </ResizablePanel>
        <ResizableHandle id="block-resizable-handle" class="relative hidden w-3 bg-transparent p-0 after:absolute after:right-0 after:top-1/2 after:h-8 after:w-[6px] after:-translate-y-1/2 after:translate-x-[-1px] after:rounded-full after:bg-border after:transition-all after:hover:h-10 sm:block" />
        <ResizablePanel id="block-resizable-panel-2" :default-size="0" :min-size="0" />
      </ResizablePanelGroup>
    </TabsContent>
    <TabsContent value="code" class="h-[--height]">
      <BlockViewerCode v-if="componentRegistry" :item="componentRegistry" />
    </TabsContent>
  </Tabs>
</template>
