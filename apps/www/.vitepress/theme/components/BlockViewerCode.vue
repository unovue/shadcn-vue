<script setup lang="ts">
import type { Block } from '@/registry/schema'
import type { FileTree } from './BlockViewerFileTree.vue'
import { File } from 'lucide-vue-next'
import { computed, onBeforeMount, ref } from 'vue'
import { highlight } from '../config/shiki'
import BlockCopyCodeButton from './BlockCopyCodeButton.vue'
import BlockViewerFileTree from './BlockViewerFileTree.vue'

const props = defineProps<{
  item: Block
}>()

const activeFile = ref<FileTree>()

const cacheCodes = ref<Map<string, string>>(new Map<string, string>())
const activeCode = computed(() => cacheCodes.value.get(activeFile.value?.path ?? ''))

onBeforeMount(async () => {
  for (const file of (props.item.files ?? [])) {
    const raw = await file.raw()
    const highlighted = highlight(raw, 'vue')
    cacheCodes.value.set(file.target || file.path.split(`${props.item.name}/`)[1], highlighted)
  }
})
</script>

<template>
  <div class="mr-[14px] flex h-[--height] overflow-hidden rounded-xl bg-zinc-950 text-white group-data-[view=preview]/block-view-wrapper:hidden">
    <div class="w-[280px]">
      <BlockViewerFileTree v-model="activeFile" :item />
    </div>
    <div class="flex min-w-0 flex-1 flex-col">
      <div class="flex h-12 flex-shrink-0 items-center gap-2 border-b border-zinc-700 bg-zinc-900 px-4 text-sm font-medium">
        <File class="size-4" />
        {{ activeFile?.path }}
        <div class="ml-auto flex items-center gap-2">
          <BlockCopyCodeButton :code="activeCode" />
        </div>
      </div>
      <div :key="activeFile?.path" data-line-codeblock class="relative flex-1 overflow-hidden after:absolute after:inset-y-0 after:left-0 after:w-10 after:bg-zinc-950 [&_.line:before]:sticky [&_.line:before]:left-2 [&_.line:before]:z-10 [&_.line:before]:translate-y-[-1px] [&_.line:before]:pr-1 [&_pre]:h-[--height] [&_pre]:overflow-auto [&_pre]:!bg-transparent [&_pre]:pb-20 [&_pre]:pt-4 [&_pre]:font-mono [&_pre]:text-sm [&_pre]:leading-relaxed" v-html="activeCode" />
    </div>
  </div>
</template>

<style>
[data-line-codeblock] code {
    display: grid;
    min-width: 100%;
    overflow-wrap: break-word;
    border-radius: 0;
    border-width: 0;
    background-color: transparent;
    padding: 0;
    counter-reset: line;
    -webkit-box-decoration-break: clone;
    box-decoration-break: clone;
}

[data-line-codeblock] .line:before {
    font-size: .75rem;
    line-height: 1rem;
    color: hsla(0, 0%, 98%, .4);
    counter-increment: line;
    content: counter(line);
    display: inline-block;
    width: 1.8rem;
    margin-right: 1.4rem;
    text-align: right;
}
</style>
