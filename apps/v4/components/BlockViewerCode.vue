<script setup lang="ts">
import { useBlockViewer } from './BlockViewer.vue'
import { getIconForLanguageExtension } from './Icons'

const { activeFile, highlightedFiles } = useBlockViewer()

const file = computed(() => {
  return highlightedFiles?.find(file => file.target === activeFile.value)
})

const language = computed(() => file.value?.path.split('.').pop() ?? 'vue')
</script>

<template>
  <div v-if="file" class="bg-code text-code-foreground mr-[14px] flex overflow-hidden rounded-xl border group-data-[view=preview]/block-view-wrapper:hidden md:h-(--height)">
    <div class="w-72">
      <BlockViewerFileTree />
    </div>
    <figure
      data-pretty-code-figure=""
      class="!mx-0 mt-0 flex min-w-0 flex-1 flex-col rounded-xl border-none"
    >
      <figcaption
        class="text-code-foreground [&_svg]:text-code-foreground flex h-12 shrink-0 items-center gap-2 border-b px-4 py-2 [&_svg]:size-4 [&_svg]:opacity-70"
        :data-language="language"
      >
        <component :is="getIconForLanguageExtension(language)" />
        {{ file.target }}
        <div class="ml-auto flex items-center gap-2">
          <CopyButton :value="file.content" />
        </div>
      </figcaption>
      <div
        :key="file?.path"
        class="no-scrollbar overflow-y-auto"
        v-html="file.highlightedContent ?? ''"
      />
    </figure>
  </div>
</template>
