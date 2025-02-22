<script lang="ts">
export interface FileTree {
  name: string
  path?: string
  children?: FileTree[]
}
</script>

<script setup lang="ts">
import type { Block } from '@/registry/schema'
import Button from '@/registry/new-york/ui/button/Button.vue'
import { ChevronRight, File, Folder } from 'lucide-vue-next'
import { TreeItem, TreeRoot } from 'reka-ui'
import { computed, ref, watch } from 'vue'

const props = defineProps<{
  item: Block
}>()

const activeFile = defineModel<FileTree>()

// TODO: Improve the getter logics
const flattenFiles = computed(() => {
  const root: FileTree[] = []

  for (const file of props.item.files ?? []) {
    const path = file.target || file.path.split(`${props.item.name}/`)[1]
    const parts = path.split('/')

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i]
      const isFile = i === parts.length - 1
      const newNode: FileTree = isFile
        ? { name: part, path }
        : { name: part, children: [] }

      root.push(newNode)
    }
  }
  return root
})

const treeItem = computed(() => {
  return createFileTreeForRegistryItemFiles([...(props.item.files ?? [])])
})

const expandedKeys = ref<string[]>([])

function createFileTreeForRegistryItemFiles(
  files: Array<{ path: string, target?: string }>,
) {
  const root: FileTree[] = []

  for (const file of files) {
    const path = file.target || file.path.split(`${props.item.name}/`)[1]
    const parts = path.split('/')
    let currentLevel = root

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i]
      const isFile = i === parts.length - 1
      const existingNode = currentLevel.find(node => node.name === part)

      if (existingNode) {
        if (isFile) {
          // Update existing file node with full path
          existingNode.path = path
        }
        else {
          // Move to next level in the tree
          currentLevel = existingNode.children!
        }
      }
      else {
        const newNode: FileTree = isFile
          ? { name: part, path }
          : { name: part, children: [] }

        currentLevel.push(newNode)

        if (!isFile) {
          currentLevel = newNode.children!
        }
      }
    }
  }
  return root
}

watch(flattenFiles, (n) => {
  activeFile.value = n.filter(i => i.path)[0]
  expandedKeys.value = n.map(i => i.name)
}, { immediate: true })
</script>

<template>
  <div class="min-h-full w-full has-[[data-variant=inset]]:bg-sidebar flex   flex-col">
    <div class="flex h-full flex-col w-full flex-1 border-r border-zinc-700 bg-zinc-900 text-white">
      <div class="duration-200 flex shrink-0 items-center font-medium outline-none ease-linear h-12 rounded-none border-b border-zinc-700 px-4 text-sm text-white">
        Files
      </div>
      <TreeRoot
        v-slot="{ flattenItems }"
        v-model="activeFile"
        v-model:expanded="expandedKeys"
        class="list-none select-none"
        :items="treeItem"
        :get-key="(item) => item.name"
      >
        <TreeItem
          v-for="item in flattenItems"
          :key="item._id"
          v-slot="{ isSelected, isExpanded }"
          v-bind="item.bind"
          as-child
          @select="(ev) => {
            if (item.hasChildren || ev.detail.isSelected)
              ev.preventDefault()
          }"
        >
          <Button
            variant="ghost"
            :data-active="isSelected"
            class="flex w-full justify-start whitespace-nowrap rounded-none pl-[--index] hover:bg-zinc-700 hover:text-white focus-visible:bg-zinc-700 focus-visible:text-white active:bg-zinc-700 active:text-white data-[active=true]:bg-zinc-700 data-[active=true]:text-white"
            :style="{ 'padding-left': `${(item.level - 0.25) * 1.5}rem` }"
          >
            <template v-if="item.hasChildren">
              <ChevronRight
                icon="lucide:folder"
                class="h-4 w-4 transition-transform"
                :class="{ 'rotate-90': isExpanded } "
              />
              <Folder class="h-4 w-4" />
            </template>
            <template v-else>
              <ChevronRight
                icon="lucide:folder"
                class="invisible"
              />
              <File class="h-4 w-4" />
            </template>
            <div>
              {{ item.value.name }}
            </div>
          </Button>
        </TreeItem>
      </TreeRoot>
    </div>
  </div>
</template>
