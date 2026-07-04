<script setup lang="ts">
import { CheckIcon, ChevronsUpDownIcon, PlusCircleIcon } from '@lucide/vue'
import { ref } from 'vue'
import { Avatar, AvatarFallback, AvatarImage } from '@/registry/new-york-v4/ui/avatar'
import { Button } from '@/registry/new-york-v4/ui/button'
import {
  Combobox,
  ComboboxAnchor,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxItemIndicator,
  ComboboxList,
  ComboboxSeparator,
  ComboboxTrigger,
} from '@/registry/new-york-v4/ui/combobox'

const users = [
  {
    id: '1',
    username: 'shadcn',
  },
  {
    id: '2',
    username: 'leerob',
  },
  {
    id: '3',
    username: 'evilrabbit',
  },
]

const selectedUser = ref<(typeof users)[number]>()
</script>

<template>
  <Combobox v-model="selectedUser" by="username">
    <ComboboxAnchor as-child>
      <ComboboxTrigger as-child>
        <Button
          variant="outline"
          class="w-[200px] justify-between"
        >
          <template v-if="selectedUser">
            <div class="flex items-center gap-2">
              <Avatar class="size-5">
                <AvatarImage :src="`https://github.com/${selectedUser.username}.png`" />
                <AvatarFallback>{{ selectedUser.username[0] }}</AvatarFallback>
              </Avatar>
              {{ selectedUser.username }}
            </div>
          </template>
          <template v-else>
            Select user...
          </template>
          <ChevronsUpDownIcon class="opacity-50" />
        </Button>
      </ComboboxTrigger>
    </ComboboxAnchor>

    <ComboboxList>
      <ComboboxInput placeholder="Search user..." />
      <ComboboxEmpty>No user found.</ComboboxEmpty>
      <ComboboxGroup>
        <ComboboxItem
          v-for="user in users"
          :key="user.id"
          :value="user"
        >
          <Avatar class="size-5">
            <AvatarImage :src="`https://github.com/${user.username}.png`" />
            <AvatarFallback>{{ user.username[0] }}</AvatarFallback>
          </Avatar>
          {{ user.username }}
          <ComboboxItemIndicator>
            <CheckIcon />
          </ComboboxItemIndicator>
        </ComboboxItem>
      </ComboboxGroup>
      <ComboboxSeparator />
      <ComboboxGroup>
        <ComboboxItem :value="null">
          <PlusCircleIcon />
          Create user
        </ComboboxItem>
      </ComboboxGroup>
    </ComboboxList>
  </Combobox>
</template>
