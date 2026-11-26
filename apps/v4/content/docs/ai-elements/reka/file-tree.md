---
title: File Tree
description: The files the agent changed, as a folder tree.
component: true
new: true
---

::component-preview
---
name: FileTreeDemo
class: style-rhea
previewClass: h-auto
---
::

File Tree is the files the agent changed, shown as folders you can open. A folder is a [Collapsible](/docs/components/collapsible). A file is a [Button](/docs/components/button). For a single file the agent read or edited, use a [Tool](/docs/ai-elements/tool) line instead.

## Installation

File Tree is built with the [Collapsible](/docs/components/collapsible) and [Button](/docs/components/button) components.

:::::code-tabs

:::tabs-list

  ::tabs-trigger{value="cli"}
  CLI
  ::

  ::tabs-trigger{value="manual"}
  Manual
  ::

:::

::tabs-content{value="cli"}

```bash
npx shadcn-vue@latest add collapsible button
```

::

::::tabs-content{value="manual"}
  :::steps
    ::step
    Install the required shadcn-vue dependencies:
    ::

    ```bash
    npx shadcn-vue@latest add collapsible button
    ```

    ::step
    Copy and paste the [GitHub source code](https://github.com/unovue/shadcn-vue/tree/dev/apps/v4/registry/bases/reka/ui/collapsible) into your project.
    ::

    ::step
    Update the import paths to match your project setup.
    ::
  :::
::::

:::::

## Usage

Render nodes recursively. Nest each folder's children in its `CollapsibleContent`. A component can render itself by its file name, so `FileTreeNode.vue` renders `<FileTreeNode>` for each child.

```vue showLineNumbers title="FileTreeNode.vue"
<script setup lang="ts">
import { ChevronRightIcon, FileIcon, FolderIcon } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'

type FileNode
  = | { type: 'file', name: string, path: string }
    | { type: 'folder', name: string, path: string, children: FileNode[] }

defineProps<{ node: FileNode }>()
const emit = defineEmits<{ select: [path: string] }>()
</script>

<template>
  <Collapsible v-if="node.type === 'folder'" default-open>
    <CollapsibleTrigger as-child>
      <Button variant="ghost" size="sm" class="w-full justify-start">
        <ChevronRightIcon class="transition-transform group-data-[state=open]/button:rotate-90" />
        <FolderIcon />
        {{ node.name }}
      </Button>
    </CollapsibleTrigger>
    <CollapsibleContent>
      <div class="ml-4 flex flex-col">
        <FileTreeNode
          v-for="child in node.children"
          :key="child.path"
          :node="child"
          @select="emit('select', $event)"
        />
      </div>
    </CollapsibleContent>
  </Collapsible>
  <Button
    v-else
    variant="ghost"
    size="sm"
    class="w-full justify-start"
    @click="emit('select', node.path)"
  >
    <FileIcon />
    {{ node.name }}
  </Button>
</template>
```

See [Collapsible](/docs/components/collapsible).

## Migrating from AI Elements Vue

If you added File Tree from [AI Elements Vue](https://www.ai-elements-vue.com), your project has a `components/ai-elements/file-tree/` folder. Paste this prompt into your coding agent to rebuild it on Collapsible and Button. Every export keeps its name and props, so the code that uses it keeps working.

```txt
Migrate components/ai-elements/file-tree/ from AI Elements Vue to the shadcn-vue Collapsible and Button components.

Keep every export, with the same name and props, so the code that imports it keeps working. Only change how each part renders.

1. Install the components: npx shadcn-vue@latest add collapsible button
2. Read https://www.shadcn-vue.com/docs/ai-elements/file-tree and build File Tree the same way.
3. Rebuild each part:
   - FileTreeFolder renders a Collapsible. Its trigger is a CollapsibleTrigger with as-child around a Button with variant="ghost", size="sm" and class="w-full justify-start", and its children go in a CollapsibleContent.
   - FileTreeFile renders a Button with variant="ghost" and size="sm" that emits select with its path. If a file has FileTreeActions, render them next to the Button, not inside it.
   - Keep FileTree with its expanded and selection state, and keep FileTreeIcon, FileTreeName and FileTreeActions as they are.
4. Remove the imports the files no longer use.
5. Run vue-tsc and fix any errors.
```
