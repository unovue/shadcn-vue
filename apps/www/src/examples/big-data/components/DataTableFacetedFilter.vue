<script setup lang="ts">
import type { Column } from '@tanstack/vue-table'
import type { Component } from 'vue'
import { computed } from 'vue'
import { useVirtualList } from '@vueuse/core'
import type { Task } from '../data/schema'
import PlusCircledIcon from '~icons/radix-icons/plus-circled'
import CheckIcon from '~icons/radix-icons/check'

import { Badge } from '@/lib/registry/new-york/ui/badge'
import { Button } from '@/lib/registry/new-york/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from '@/lib/registry/new-york/ui/command'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/lib/registry/new-york/ui/popover'
import { Separator } from '@/lib/registry/new-york/ui/separator'
import { cn } from '@/lib/utils'

interface DataTableFacetedFilter {
  column?: Column<Task, any>
  title?: string
  options: {
    label: string
    value: string
    icon?: Component
  }[]
}

const props = defineProps<DataTableFacetedFilter>()

function repeat<T>(array: T[], times: number) {
  return Array.from({ length: times }, () => array).flat()
}
const facets = computed(() => props.column?.getFacetedUniqueValues())
const selectedValues = computed(() => new Set(props.column?.getFilterValue() as string[]))
const options = computed(() => repeat(props.options, 100))

const { list, containerProps, wrapperProps } = useVirtualList(options, {
  itemHeight: 32,
})
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button variant="outline" size="sm" class="h-8 border-dashed">
        <PlusCircledIcon class="mr-2 h-4 w-4" />
        {{ title }}
        <template v-if="selectedValues.size > 0">
          <Separator orientation="vertical" class="mx-2 h-4" />
          <Badge
            variant="secondary"
            class="rounded-sm px-1 font-normal lg:hidden"
          >
            {{ selectedValues.size }}
          </Badge>
          <div class="hidden space-x-1 lg:flex">
            <Badge
              v-if="selectedValues.size > 2"
              variant="secondary"
              class="rounded-sm px-1 font-normal"
            >
              {{ selectedValues.size }} selected
            </Badge>

            <template v-else>
              <Badge
                v-for="option in options
                  .filter((option) => selectedValues.has(option.value))"
                :key="option.value"
                variant="secondary"
                class="rounded-sm px-1 font-normal"
              >
                {{ option.label }}
              </Badge>
            </template>
          </div>
        </template>
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-[200px] p-0" align="start">
      <Command>
        <CommandInput :placeholder="title" />
        <CommandList>
          <CommandEmpty>
            No results found.
          </CommandEmpty>
          <div v-bind="containerProps" class="max-h-52">
            <div v-bind="wrapperProps">
              <CommandGroup>
                <CommandItem
                  v-for="option in list"
                  :key="option.index"
                  style="height: 32px"
                  :value="option.data"
                  @select="() => {
                    const isSelected = selectedValues.has(option.data.value)
                    if (isSelected) {
                      selectedValues.delete(option.data.value)
                    }
                    else {
                      selectedValues.add(option.data.value)
                    }
                    const filterValues = Array.from(selectedValues)
                    column?.setFilterValue(
                      filterValues.length ? filterValues : undefined,
                    )
                  }"
                >
                  <div
                    :class="cn(
                      'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                      selectedValues.has(option.data.value)
                        ? 'bg-primary text-primary-foreground'
                        : 'opacity-50 [&_svg]:invisible',
                    )"
                  >
                    <CheckIcon :class="cn('h-4 w-4')" />
                  </div>
                  <component :is="option.data.icon" v-if="option.data.icon" class="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>{{ option.data.label }}</span>
                  <span v-if="facets?.get(option.data.value)" class="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
                    {{ facets.get(option.data.value) }}
                  </span>
                </CommandItem>
              </CommandGroup>
            </div>
          </div>

          <template v-if="selectedValues.size > 0">
            <CommandSeparator />
            <CommandGroup>
              <CommandItem
                :value="{ label: 'Clear filters' }"
                class="justify-center text-center"
                @select="column?.setFilterValue(undefined)"
              >
                Clear filters
              </CommandItem>
            </CommandGroup>
          </template>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
</template>
