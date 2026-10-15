<script setup lang="ts">
import type { Component, PropType } from 'vue'
import { ChevronRightIcon, FileIcon, FolderIcon } from '@lucide/vue'
import { defineComponent, h, ref } from 'vue'
import { Button } from '@/registry/bases/reka/ui/button'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/registry/bases/reka/ui/collapsible'

type FileNode
  = | { type: 'file', name: string, path: string }
    | { type: 'folder', name: string, path: string, children: FileNode[] }

const files: FileNode[] = [
  {
    type: 'folder',
    name: 'app',
    path: 'app',
    children: [
      { type: 'file', name: 'app.vue', path: 'app/app.vue' },
      { type: 'file', name: 'error.vue', path: 'app/error.vue' },
    ],
  },
  {
    type: 'folder',
    name: 'components',
    path: 'components',
    children: [
      {
        type: 'folder',
        name: 'ui',
        path: 'components/ui',
        children: [
          {
            type: 'file',
            name: 'Button.vue',
            path: 'components/ui/Button.vue',
          },
        ],
      },
      {
        type: 'file',
        name: 'LoginForm.vue',
        path: 'components/LoginForm.vue',
      },
    ],
  },
]

const selected = ref('components/ui/Button.vue')

const FileTreeNode: Component = defineComponent({
  name: 'FileTreeNode',
  props: {
    node: { type: Object as PropType<FileNode>, required: true },
  },
  setup(props) {
    return () => {
      const node = props.node

      if (node.type === 'folder') {
        return h(Collapsible, { defaultOpen: true }, () => [
          h(CollapsibleTrigger, { asChild: true }, () =>
            h(
              Button,
              {
                variant: 'ghost',
                size: 'sm',
                class: 'w-full justify-start font-normal aria-expanded:bg-transparent aria-expanded:hover:bg-muted dark:aria-expanded:hover:bg-muted/50',
              },
              () => [
                h(ChevronRightIcon, { class: 'transition-transform group-data-[state=open]/button:rotate-90' }),
                h(FolderIcon),
                node.name,
              ],
            )),
          h(CollapsibleContent, null, () =>
            h('div', { class: 'ml-4 flex flex-col' }, node.children.map(child =>
              h(FileTreeNode, { key: child.path, node: child }),
            ))),
        ])
      }

      const isSelected = selected.value === node.path

      return h(
        Button,
        {
          'variant': 'ghost',
          'size': 'sm',
          'class': `w-full justify-start font-normal ${isSelected ? 'bg-accent text-accent-foreground' : ''}`,
          'aria-current': isSelected ? 'true' : undefined,
          'onClick': () => {
            selected.value = node.path
          },
        },
        () => [h(FileIcon), node.name],
      )
    }
  },
})
</script>

<template>
  <div class="flex w-full max-w-xs flex-col py-6 text-sm">
    <FileTreeNode v-for="file in files" :key="file.path" :node="file" />
  </div>
</template>
