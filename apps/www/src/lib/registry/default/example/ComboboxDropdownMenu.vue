<script setup lang="ts">
import { ref } from 'vue'
import { Calendar, MoreHorizontal, Tags, Trash, User } from 'lucide-vue-next'

import { Button } from '@/lib/registry/default/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/lib/registry/default/ui/command'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/lib/registry/default/ui/dropdown-menu'

const labels = [
  'feature',
  'bug',
  'enhancement',
  'documentation',
  'design',
  'question',
  'maintenance',
]

const labelRef = ref('feature')
const open = ref(false)
</script>

<template>
  <div class="flex w-full flex-col items-start justify-between rounded-md border px-4 py-3 sm:flex-row sm:items-center">
    <p class="text-sm font-medium leading-none">
      <span class="mr-2 rounded-lg bg-primary px-2 py-1 text-xs text-primary-foreground">
        {{ labelRef }}
      </span>
      <span class="text-muted-foreground">Create a new project</span>
    </p>
    <DropdownMenu v-model:open="open">
      <DropdownMenuTrigger as-child>
        <Button variant="ghost" size="sm">
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" class="w-[200px]">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User class="mr-2 h-4 w-4" />
            Assign to...
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Calendar class="mr-2 h-4 w-4" />
            Set due date...
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Tags class="mr-2 h-4 w-4" />
              Apply label
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent class="p-0">
              <Command>
                <CommandInput
                  placeholder="Filter label..."
                  auto-focus
                />
                <CommandList>
                  <CommandEmpty>No label found.</CommandEmpty>
                  <CommandGroup>
                    <CommandItem
                      v-for="label in labels"
                      :key="label"
                      :value="label"
                      @select="(ev) => {
                        labelRef = ev.detail.value as string
                        open = false
                      }"
                    >
                      {{ label }}
                    </CommandItem>
                  </CommandGroup>
                </CommandList>
              </Command>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuSeparator />
          <DropdownMenuItem class="text-red-600">
            <Trash class="mr-2 h-4 w-4" />
            Delete
            <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</template>
