<script setup lang="ts">
import type { RegistryItem } from 'shadcn-vue/schema'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/registry/new-york-v4/ui/command'

const props = defineProps<{
  items?: Pick<RegistryItem, 'name' | 'title' | 'type'>[]
}>()

const { open } = useActionMenu()
const params = useDesignSystemSearchParams()

function handleSelect(name: string) {
  params.item.value = name
  open.value = false
}

function handleKeyDown(event: KeyboardEvent) {
  if ((event.key === 'k' || event.key === 'p') && (event.metaKey || event.ctrlKey)) {
    event.preventDefault()
    open.value = true
  }
}

onMounted(() => window.addEventListener('keydown', handleKeyDown))
onUnmounted(() => window.removeEventListener('keydown', handleKeyDown))
</script>

<template>
  <CommandDialog :open="open" @update:open="open = $event">
    <CommandInput placeholder="Search..." />
    <CommandList>
      <CommandEmpty>No items found.</CommandEmpty>
      <CommandGroup>
        <CommandItem
          v-for="item in items"
          :key="item.name"
          :value="`${item.title} ${item.name}`"
          :data-checked="item.name === params.item.value"
          class="px-2"
          @select="handleSelect(item.name)"
        >
          {{ item.title }}
        </CommandItem>
      </CommandGroup>
    </CommandList>
  </CommandDialog>
</template>
