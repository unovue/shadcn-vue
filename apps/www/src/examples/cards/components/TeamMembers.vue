<script setup lang="ts">
import { ref } from 'vue'
import ChevronDownIcon from '~icons/radix-icons/chevron-down'

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/lib/registry/new-york/ui/avatar'
import { Button } from '@/lib/registry/new-york/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/lib/registry/new-york/ui/card'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/lib/registry/new-york/ui/command'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/lib/registry/new-york/ui/popover'

const sofiaRole = ref('Owner')
const jacksonRole = ref('Member')
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Team Members</CardTitle>
      <CardDescription>
        Invite your team members to collaborate.
      </CardDescription>
    </CardHeader>
    <CardContent class="grid gap-6">
      <div class="flex items-center justify-between space-x-4">
        <div class="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src="/avatars/01.png" />
            <AvatarFallback>OM</AvatarFallback>
          </Avatar>
          <div>
            <p class="text-sm font-medium leading-none">
              Sofia Davis
            </p>
            <p class="text-sm text-muted-foreground">
              m@example.com
            </p>
          </div>
        </div>
        <Popover>
          <PopoverTrigger as-child>
            <Button variant="outline" class="ml-auto">
              {{ sofiaRole }}
              <ChevronDownIcon class="ml-2 size-4 text-muted-foreground" />
            </Button>
          </PopoverTrigger>
          <PopoverContent class="p-0" align="end">
            <Command v-model="sofiaRole">
              <CommandInput placeholder="Select new role..." />
              <CommandList>
                <CommandEmpty>No roles found.</CommandEmpty>
                <CommandGroup>
                  <CommandItem value="Viewer" class="space-y-1 flex flex-col items-start px-4 py-2">
                    <p>Viewer</p>
                    <p class="text-sm text-muted-foreground">
                      Can view and comment.
                    </p>
                  </CommandItem>
                  <CommandItem value="Developer" class="space-y-1 flex flex-col items-start px-4 py-2">
                    <p>Developer</p>
                    <p class="text-sm text-muted-foreground">
                      Can view, comment and edit.
                    </p>
                  </CommandItem>
                  <CommandItem value="Billing" class="space-y-1 flex flex-col items-start px-4 py-2">
                    <p>Billing</p>
                    <p class="text-sm text-muted-foreground">
                      Can view, comment and manage billing.
                    </p>
                  </CommandItem>
                  <CommandItem value="Owner" class="space-y-1 flex flex-col items-start px-4 py-2">
                    <p>Owner</p>
                    <p class="text-sm text-muted-foreground">
                      Admin-level access to all resources.
                    </p>
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      <div class="flex items-center justify-between space-x-4">
        <div class="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src="/avatars/02.png" />
            <AvatarFallback>JL</AvatarFallback>
          </Avatar>
          <div>
            <p class="text-sm font-medium leading-none">
              Jackson Lee
            </p>
            <p class="text-sm text-muted-foreground">
              p@example.com
            </p>
          </div>
        </div>
        <Popover>
          <PopoverTrigger as-child>
            <Button variant="outline" class="ml-auto">
              {{ jacksonRole }}
              <ChevronDownIcon class="ml-2 size-4 text-muted-foreground" />
            </Button>
          </PopoverTrigger>
          <PopoverContent class="p-0" align="end">
            <Command v-model="jacksonRole">
              <CommandInput placeholder="Select new role..." />
              <CommandList>
                <CommandEmpty>No roles found.</CommandEmpty>
                <CommandGroup>
                  <CommandItem value="Viewer" class="space-y-1 flex flex-col items-start px-4 py-2">
                    <p>Viewer</p>
                    <p class="text-sm text-muted-foreground">
                      Can view and comment.
                    </p>
                  </CommandItem>
                  <CommandItem value="Developer" class="space-y-1 flex flex-col items-start px-4 py-2">
                    <p>Developer</p>
                    <p class="text-sm text-muted-foreground">
                      Can view, comment and edit.
                    </p>
                  </CommandItem>
                  <CommandItem value="Billing" class="space-y-1 flex flex-col items-start px-4 py-2">
                    <p>Billing</p>
                    <p class="text-sm text-muted-foreground">
                      Can view, comment and manage billing.
                    </p>
                  </CommandItem>
                  <CommandItem value="Owner" class="space-y-1 flex flex-col items-start px-4 py-2">
                    <p>Owner</p>
                    <p class="text-sm text-muted-foreground">
                      Admin-level access to all resources.
                    </p>
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </CardContent>
  </Card>
</template>
