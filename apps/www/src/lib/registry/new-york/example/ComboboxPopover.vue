<script setup lang="ts">
import { Button } from '@/lib/registry/new-york/ui/button'

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/lib/registry/new-york/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/lib/registry/new-york/ui/popover'
import { ref } from 'vue'

interface Status {
  value: string
  label: string
}

const statuses: Status[] = [
  {
    value: 'backlog',
    label: 'Backlog',
  },
  {
    value: 'todo',
    label: 'Todo',
  },
  {
    value: 'in progress',
    label: 'In Progress',
  },
  {
    value: 'done',
    label: 'Done',
  },
  {
    value: 'canceled',
    label: 'Canceled',
  },
]

const open = ref(false)
const selectedStatus = ref<Status>()
</script>

<template>
  <div class="flex items-center space-x-4">
    <p class="text-sm text-muted-foreground">
      Status
    </p>
    <Popover v-model:open="open">
      <PopoverTrigger as-child>
        <Button
          variant="outline"
          size="sm"
          class="w-[150px] justify-start"
        >
          <template v-if="selectedStatus">
            {{ selectedStatus?.label }}
          </template>
          <template v-else>
            + Set status
          </template>
        </Button>
      </PopoverTrigger>
      <PopoverContent class="p-0" side="right" align="start">
        <Command>
          <CommandInput placeholder="Change status..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              <CommandItem
                v-for="status in statuses"
                :key="status.value"
                :value="status.value"
                @select="() => {
                  selectedStatus = status
                  open = false
                }"
              >
                {{ status.label }}
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  </div>
</template>
