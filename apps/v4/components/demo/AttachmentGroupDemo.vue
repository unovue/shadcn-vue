<script setup lang="ts">
import type { LucideIcon } from '@lucide/vue'
import { FileCodeIcon, FileTextIcon, TableIcon, XIcon } from '@lucide/vue'
import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
} from '@/registry/new-york-v4/ui/attachment'

interface Item {
  name: string
  meta: string
  icon?: LucideIcon
  src?: string
}
const items: Item[] = [
  { name: 'briefing-notes.pdf', meta: 'PDF · 1.4 MB', icon: FileTextIcon },
  {
    name: 'workspace.png',
    meta: 'PNG · 820 KB',
    src: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&auto=format&fit=crop&q=80',
  },
  { name: 'customers.csv', meta: 'CSV · 18 KB', icon: TableIcon },
  { name: 'renderer.vue', meta: 'Vue · 12 KB', icon: FileCodeIcon },
]
</script>

<template>
  <div class="mx-auto w-full max-w-sm py-12">
    <AttachmentGroup class="w-full">
      <template v-for="item in items" :key="item.name">
        <Attachment class="w-64">
          <AttachmentMedia v-if="item.src" variant="image">
            <img :src="item.src" :alt="item.name">
          </AttachmentMedia>

          <AttachmentMedia v-if="item.icon">
            <component :is="item.icon" />
          </AttachmentMedia>

          <AttachmentContent>
            <AttachmentTitle>{{ item.name }}</AttachmentTitle>
            <AttachmentDescription>{{ item.meta }}</AttachmentDescription>
          </AttachmentContent>
          <AttachmentActions>
            <AttachmentAction :aria-label="`Remove ${item.name}`">
              <XIcon />
            </AttachmentAction>
          </AttachmentActions>
        </Attachment>
      </template>
    </AttachmentGroup>
  </div>
</template>
