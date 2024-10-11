<script setup lang="ts">
import { useConfigStore } from '@/stores/config'
import { CircleHelp, Info, Monitor, Smartphone, Tablet } from 'lucide-vue-next'
import MagicString from 'magic-string'
import { codeToHtml } from 'shiki'
import { reactive, ref, watch } from 'vue'
import { compileScript, parse, walk } from 'vue/compiler-sfc'
import { cssVariables } from '../config/shiki'
import BlockCopyButton from './BlockCopyButton.vue'
import Spinner from './Spinner.vue'
import StyleSwitcher from './StyleSwitcher.vue'

// import { V0Button } from '@/components/v0-button'
import { Badge } from '@/lib/registry/new-york/ui/badge'
import { Popover, PopoverContent, PopoverTrigger } from '@/lib/registry/new-york/ui/popover'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/lib/registry/new-york/ui/resizable'
import { Separator } from '@/lib/registry/new-york/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/lib/registry/new-york/ui/tabs'
import { ToggleGroup, ToggleGroupItem } from '@/lib/registry/new-york/ui/toggle-group'

const props = defineProps<{
  name: string
}>()

const { style, codeConfig } = useConfigStore()

const isLoading = ref(true)
const tabValue = ref('preview')
const resizableRef = ref<InstanceType<typeof ResizablePanel>>()

const rawString = ref('')
const codeHtml = ref('')
const metadata = reactive({
  description: null as string | null,
  iframeHeight: null as string | null,
  containerClass: null as string | null,
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
  s.replaceAll(`@/lib/registry/${style.value}`, codeConfig.value.componentsPath)
  s.replaceAll(`@/lib/utils`, codeConfig.value.utilsPath)
  return s.toString()
}

watch([style, codeConfig], async () => {
  try {
    const baseRawString = await import(`../../../src/lib/registry/${style.value}/block/${props.name}.vue?raw`).then(res => res.default.trim())
    rawString.value = transformImportPath(removeScript(baseRawString))

    if (!metadata.description) {
      const { descriptor } = parse(baseRawString)
      const ast = compileScript(descriptor, { id: '' })
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

    codeHtml.value = await codeToHtml(rawString.value, {
      lang: 'vue',
      theme: cssVariables,
    })
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
    class="relative grid w-full scroll-m-20 gap-4"
    :style=" {
      '--container-height': metadata.iframeHeight ?? '600px',
    }"
  >
    <div class="flex flex-col items-center gap-4 sm:flex-row">
      <div class="flex items-center gap-2">
        <TabsList class="hidden sm:flex">
          <TabsTrigger value="preview">
            Preview
          </TabsTrigger>
          <TabsTrigger value="code">
            Code
          </TabsTrigger>
        </TabsList>
        <div class="hidden items-center gap-2 sm:flex">
          <Separator
            orientation="vertical"
            class="mx-2 hidden h-4 md:flex"
          />
          <div class="flex items-center gap-2">
            <a :href="`#${name}`">
              <Badge variant="outline">{{ name }}</Badge>
            </a>
            <Popover>
              <PopoverTrigger class="hidden text-muted-foreground hover:text-foreground sm:flex">
                <Info class="h-3.5 w-3.5" />
                <span class="sr-only">Block description</span>
              </PopoverTrigger>
              <PopoverContent
                side="right"
                :side-offset="10"
                class="text-sm"
              >
                {{ metadata.description }}
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
      <div class="flex items-center gap-2 pr-[14px] sm:ml-auto">
        <div class="hidden h-[28px] items-center gap-1.5 rounded-md border p-[2px] shadow-sm md:flex">
          <ToggleGroup
            type="single"
            default-value="100"
            @update:model-value="(value) => {
              resizableRef?.resize(parseInt(value))
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
          </ToggleGroup>
        </div>
        <Separator
          orientation="vertical"
          class="mx-2 hidden h-4 md:flex"
        />
        <StyleSwitcher class="h-7" />
        <Popover>
          <PopoverTrigger class="hidden text-muted-foreground hover:text-foreground sm:flex">
            <CircleHelp class="h-3.5 w-3.5" />
            <span class="sr-only">Block description</span>
          </PopoverTrigger>
          <PopoverContent
            side="top"
            :side-offset="20"
            class="space-y-3 rounded-[0.5rem] text-sm"
          >
            <p class="font-medium">
              What is the difference between the New York and Default style?
            </p>
            <p>
              A style comes with its own set of components, animations,
              icons and more.
            </p>
            <p>
              The <span class="font-medium">Default</span> style has
              larger inputs, uses lucide-vue-next for icons and
              tailwindcss-animate for animations.
            </p>
            <p>
              The <span class="font-medium">New York</span> style ships
              with smaller buttons and inputs. It also uses shadows on cards
              and buttons.
            </p>
          </PopoverContent>
        </Popover>
        <Separator orientation="vertical" class="mx-2 h-4" />
        <BlockCopyButton :code="rawString" />
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
      class="relative after:absolute after:inset-0 after:right-3 after:z-0 after:rounded-lg after:bg-muted h-[--container-height] px-0"
    >
      <ResizablePanelGroup id="block-resizable" direction="horizontal" class="relative z-10">
        <ResizablePanel
          id="block-resizable-panel-1"
          ref="resizableRef"
          class="relative rounded-lg border bg-background transition-all "
          :default-size="100"
          :min-size="30"
        >
          <div v-if="isLoading" class="flex items-center justify-center h-full">
            <Spinner />
          </div>
          <iframe
            v-show="!isLoading"
            :src="`/blocks/renderer#name=${name}&style=${style}&containerClass=${encodeURIComponent(metadata.containerClass ?? '')}`"
            class="relative z-20 w-full bg-background h-[--container-height]"
            @load="isLoading = false"
          />
        </ResizablePanel>
        <ResizableHandle id="block-resizable-handle" class="relative hidden w-3 bg-transparent p-0 after:absolute after:right-0 after:top-1/2 after:h-8 after:w-[6px] after:-translate-y-1/2 after:translate-x-[-1px] after:rounded-full after:bg-border after:transition-all after:hover:h-10 sm:block" />
        <ResizablePanel id="block-resizable-panel-2" :default-size="0" :min-size="0" />
      </ResizablePanelGroup>
    </TabsContent>
    <TabsContent value="code" class="h-[--container-height]">
      <div
        class="language-vue !h-full !max-h-[none] !mt-0"
        v-html="codeHtml"
      />
    </TabsContent>
  </Tabs>
</template>
