<script setup lang="ts">
import type { Row } from '@tanstack/vue-table'
import { computed } from 'vue'
import { labels } from '../data/data'
import { taskSchema } from '../data/schema'
import { type Task } from '../data/schema'
import DotsHorizontalIcon from '~icons/radix-icons/dots-horizontal'

import { Button } from '@/lib/registry/new-york/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/lib/registry/new-york/ui/dropdown-menu'

interface DataTableRowActionsProps {
  row: Row<Task>
}
const props = defineProps<DataTableRowActionsProps>()

const task = computed(() => taskSchema.parse(props.row.original))
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button
        variant="ghost"
        class="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
      >
        <DotsHorizontalIcon class="h-4 w-4" />
        <span class="sr-only">Open menu</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" class="w-[160px]">
      <DropdownMenuItem>Edit</DropdownMenuItem>
      <DropdownMenuItem>Make a copy</DropdownMenuItem>
      <DropdownMenuItem>Favorite</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuSub>
        <DropdownMenuSubTrigger>Labels</DropdownMenuSubTrigger>
        <DropdownMenuSubContent>
          <DropdownMenuRadioGroup :value="task.label">
            <DropdownMenuRadioItem v-for="label in labels" :key="label.value" :value="label.value">
              {{ label.label }}
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuSubContent>
      </DropdownMenuSub>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        Delete
        <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
