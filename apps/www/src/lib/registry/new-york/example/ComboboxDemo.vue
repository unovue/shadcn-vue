<script setup lang="ts">
import { ref } from 'vue'
import Check from '~icons/radix-icons/check'
import CaretSort from '~icons/radix-icons/caret-sort'

import { cn } from '@/lib/utils'
import { Button } from '@/lib/registry/default/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/lib/registry/default/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/lib/registry/default/ui/popover'

const frameworks = [
  { value: 'next.js', label: 'Next.js' },
  { value: 'sveltekit', label: 'SvelteKit' },
  { value: 'nuxt.js', label: 'Nuxt.js' },
  { value: 'remix', label: 'Remix' },
  { value: 'astro', label: 'Astro' },
]

const open = ref(false)
const value = ref<typeof frameworks[number]>()

const filterFunction = (list: typeof frameworks, search: string) => list.filter(i => i.value.toLowerCase().includes(search.toLowerCase()))
</script>

<template>
  <Popover v-model:open="open">
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        role="combobox"
        :aria-expanded="open"
        class="w-[200px] justify-between"
      >
        {{ value ? value.label : 'Select framework...' }}
        <CaretSort class="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-[200px] p-0">
      <Command v-model="value" :filter-function="filterFunction">
        <CommandInput class="h-9" placeholder="Search framework..." />
        <CommandEmpty>No framework found.</CommandEmpty>
        <CommandGroup>
          <CommandItem
            v-for="framework in frameworks"
            :key="framework.value"
            :value="framework"
            @select="open = false"
          >
            {{ framework.label }}
            <Check
              :class="cn(
                'ml-auto h-4 w-4',
                value?.value === framework.value ? 'opacity-100' : 'opacity-0',
              )"
            />
          </CommandItem>
        </CommandGroup>
      </Command>
    </PopoverContent>
  </Popover>
</template>
