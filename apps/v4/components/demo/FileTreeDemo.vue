<script setup lang="ts">
import { ChevronRightIcon, FileIcon, FolderIcon } from '@lucide/vue'
import { createReusableTemplate } from '@vueuse/core'
import { ref } from 'vue'
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

// Each node renders its children with the same template.
const [DefineNode, ReuseNode] = createReusableTemplate<{ node: FileNode }>()
</script>

<template>
  <DefineNode v-slot="{ node }">
    <Collapsible v-if="node.type === 'folder'" default-open>
      <CollapsibleTrigger as-child>
        <Button
          variant="ghost"
          size="sm"
          class="w-full justify-start font-normal aria-expanded:bg-transparent aria-expanded:hover:bg-muted dark:aria-expanded:hover:bg-muted/50"
        >
          <ChevronRightIcon class="transition-transform group-data-[state=open]/button:rotate-90" />
          <FolderIcon />
          {{ node.name }}
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div class="ml-4 flex flex-col">
          <ReuseNode v-for="child in node.children" :key="child.path" :node="child" />
        </div>
      </CollapsibleContent>
    </Collapsible>
    <Button
      v-else
      variant="ghost"
      size="sm"
      :class="`w-full justify-start font-normal ${selected === node.path ? 'bg-accent text-accent-foreground' : ''}`"
      :aria-current="selected === node.path ? 'true' : undefined"
      @click="selected = node.path"
    >
      <FileIcon />
      {{ node.name }}
    </Button>
  </DefineNode>
  <div class="flex w-full max-w-xs flex-col py-6 text-sm">
    <ReuseNode v-for="file in files" :key="file.path" :node="file" />
  </div>
</template>
