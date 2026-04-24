<script setup lang="ts">
import type { RegistryItem } from 'shadcn-vue/schema'
import { ChevronDownIcon, SearchIcon } from 'lucide-vue-next'
import { Button } from '@/registry/new-york-v4/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/registry/new-york-v4/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/registry/new-york-v4/ui/popover'
import { groupItemsByType } from '~/lib/create'

const props = defineProps<{
  items: Pick<RegistryItem, 'name' | 'title' | 'type'>[]
}>()

const params = useDesignSystemSearchParams()
const open = ref(false)

const groupedItems = computed(() => groupItemsByType(props.items))

const currentItem = computed(() => {
  return props.items.find(item => item.name === params.item.value) ?? null
})

function selectItem(itemName: string) {
  params.item.value = itemName
  open.value = false
}
</script>

<template>
  <Popover v-model:open="open">
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        role="combobox"
        :aria-expanded="open"
        class="w-[200px] justify-between xl:hidden"
      >
        <span class="truncate">{{ currentItem?.title ?? 'Select item...' }}</span>
        <ChevronDownIcon class="ml-2 size-4 shrink-0 opacity-50" />
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-[250px] p-0" align="start">
      <Command>
        <CommandInput placeholder="Search items..." />
        <CommandList class="max-h-[300px]">
          <CommandEmpty>No items found.</CommandEmpty>
          <CommandGroup
            v-for="group in groupedItems"
            :key="group.type"
            :heading="group.title"
          >
            <CommandItem
              v-for="item in group.items"
              :key="item.name"
              :value="item.name"
              @select="selectItem(item.name)"
            >
              <SearchIcon
                class="mr-2 size-4"
                :class="[
                  currentItem?.name === item.name ? 'opacity-100' : 'opacity-0',
                ]"
              />
              {{ item.title }}
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
</template>
