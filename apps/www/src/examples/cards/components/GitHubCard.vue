<script setup lang="ts">
import ChevronDownIcon from '~icons/radix-icons/chevron-down'
import CircleIcon from '~icons/radix-icons/circle'
import PlusIcon from '~icons/radix-icons/plus'
import StarIcon from '~icons/radix-icons/star'

import { Button } from '@/lib/registry/new-york/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/lib/registry/new-york/ui/card'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/lib/registry/new-york/ui/dropdown-menu'
import { Separator } from '@/lib/registry/new-york/ui/separator'
</script>

<template>
  <Card>
    <CardHeader class="grid grid-cols-[minmax(0,1fr)_110px] items-start gap-4 space-y-0">
      <div class="space-y-1">
        <CardTitle>shadcn/ui</CardTitle>
        <CardDescription>
          Beautifully designed components built with Radix UI and Tailwind
          CSS.
        </CardDescription>
      </div>
      <div class="flex items-center space-x-1 rounded-md bg-secondary text-secondary-foreground">
        <Button variant="secondary" class="px-3 shadow-none">
          <StarIcon class="mr-2 size-4" />
          Star
        </Button>
        <Separator orientation="vertical" class="h-5" />
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button variant="secondary" class="px-2 shadow-none">
              <ChevronDownIcon class="size-4 text-secondary-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            :align-offset="-5"
            class="w-[200px]"
          >
            <DropdownMenuLabel>Suggested Lists</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem checked>
              Future Ideas
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>My Stack</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>Inspiration</DropdownMenuCheckboxItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <PlusIcon class="mr-2 size-4" /> Create List
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </CardHeader>
    <CardContent>
      <div class="flex space-x-4 text-sm text-muted-foreground">
        <div class="flex items-center">
          <CircleIcon class="mr-1 size-3 fill-sky-400 text-sky-400" />
          TypeScript
        </div>
        <div class="flex items-center">
          <StarIcon class="mr-1 size-3" />
          20k
        </div>
        <div>Updated April 2023</div>
      </div>
    </CardContent>
  </Card>
</template>
