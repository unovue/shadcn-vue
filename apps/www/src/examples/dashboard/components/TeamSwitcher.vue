<script setup lang="ts">
import { ref } from 'vue'
import CaretSortIcon from '~icons/radix-icons/caret-sort'

import { cn } from '@/lib/utils'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/lib/registry/default/ui/avatar'
import { Button } from '@/lib/registry/default/ui/button'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/lib/registry/default/ui/dialog'
import { Input } from '@/lib/registry/default/ui/input'
import { Label } from '@/lib/registry/default/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/lib/registry/default/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/lib/registry/default/ui/select'

const groups = [
  {
    label: 'Personal Account',
    teams: [
      {
        label: 'Alicia Koch',
        value: 'personal',
      },
    ],
  },
  {
    label: 'Teams',
    teams: [
      {
        label: 'Acme Inc.',
        value: 'acme-inc',
      },
      {
        label: 'Monsters Inc.',
        value: 'monsters',
      },
    ],
  },
]

type Team = (typeof groups)[number]['teams'][number]

const open = ref(false)
const showNewTeamDialog = ref(false)
const selectedTeam = ref<Team>(groups[0].teams[0])
</script>

<template>
  <Dialog v-model:open="showNewTeamDialog">
    <Popover v-model:open="open">
      <PopoverTrigger as-child>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded="open"
          aria-label="Select a team"
          :class="cn('w-[200px] justify-between', $attrs.class ?? '')"
        >
          <Avatar class="mr-2 h-5 w-5">
            <AvatarImage
              :src="`https://avatar.vercel.sh/${selectedTeam.value}.png`"
              :alt="selectedTeam.label"
            />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
          {{ selectedTeam.label }}
          <CaretSortIcon class="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent class="w-[200px] p-0">
        <!-- <Command>
            <CommandList>
              <CommandInput placeholder="Search team..." />
              <CommandEmpty>No team found.</CommandEmpty>
              {groups.map((group) => (
                <CommandGroup key={group.label} heading={group.label}>
                  {group.teams.map((team) => (
                    <CommandItem
                      key={team.value}
                      onSelect={() => {
                        setSelectedTeam(team)
                        setOpen(false)
                      }}
                      class="text-sm"
                    >
                      <Avatar class="mr-2 h-5 w-5">
                        <AvatarImage
                          src={`https://avatar.vercel.sh/${team.value}.png`}
                          alt={team.label}
                          class="grayscale"
                        />
                        <AvatarFallback>SC</AvatarFallback>
                      </Avatar>
                      {team.label}
                      <CheckIcon
                        class={cn(
                          "ml-auto h-4 w-4",
                          selectedTeam.value === team.value
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              ))}
            </CommandList>
            <CommandSeparator />
            <CommandList>
              <CommandGroup>
                <DialogTrigger asChild>
                  <CommandItem
                    onSelect={() => {
                      setOpen(false)
                      setShowNewTeamDialog(true)
                    }}
                  >
                    <PlusCircledIcon class="mr-2 h-5 w-5" />
                    Create Team
                  </CommandItem>
                </DialogTrigger>
              </CommandGroup>
            </CommandList>
          </Command> -->
      </PopoverContent>
    </Popover>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Create team</DialogTitle>
        <DialogDescription>
          Add a new team to manage products and customers.
        </DialogDescription>
      </DialogHeader>
      <div>
        <div class="space-y-4 py-2 pb-4">
          <div class="space-y-2">
            <Label for="name">Team name</Label>
            <Input id="name" placeholder="Acme Inc." />
          </div>
          <div class="space-y-2">
            <Label for="plan">Subscription plan</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select a plan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="free">
                  <span class="font-medium">Free</span> -
                  <span class="text-muted-foreground">
                    Trial for two weeks
                  </span>
                </SelectItem>
                <SelectItem value="pro">
                  <span class="font-medium">Pro</span> -
                  <span class="text-muted-foreground">
                    $9/month per user
                  </span>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" @click="showNewTeamDialog = false">
          Cancel
        </Button>
        <Button type="submit">
          Continue
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
