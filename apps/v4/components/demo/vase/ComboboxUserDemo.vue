<script setup lang="ts">
import { CheckIcon, ChevronsUpDownIcon, PlusCircleIcon } from '@lucide/vue'
import { ref } from 'vue'
import { Avatar, AvatarFallback, AvatarImage } from '@/styles/vase-vega/ui/avatar'
import { Button } from '@/styles/vase-vega/ui/button'
import {
  Combobox,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxItemIndicator,
  ComboboxList,
  ComboboxSeparator,
  ComboboxTrigger,
  ComboboxViewport,
} from '@/styles/vase-vega/ui/combobox'

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

const createUser = { id: 'create', username: 'Create user' }
const groups = [
  { items: users },
  { items: [createUser] },
]

const selectedUser = ref<(typeof users)[number]>()
</script>

<template>
  <Combobox
    :model-value="selectedUser"
    :items="groups"
    @update:model-value="(user) => selectedUser = user === createUser ? undefined : user ?? undefined"
  >
    <ComboboxTrigger>
      <template #element="{ props, elementRef }">
        <Button
          v-bind="props"
          :ref="elementRef"
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
      </template>
    </ComboboxTrigger>

    <ComboboxList>
      <ComboboxInput placeholder="Search user..." />
      <ComboboxEmpty>No user found.</ComboboxEmpty>
      <ComboboxViewport>
        <template #item="{ item: group, index }">
          <ComboboxGroup>
            <ComboboxItem
              v-for="user in group.items"
              :key="user.id"
              :value="user"
            >
              <template v-if="user === createUser">
                <PlusCircleIcon />
                {{ user.username }}
              </template>
              <template v-else>
                <Avatar class="size-5">
                  <AvatarImage :src="`https://github.com/${user.username}.png`" />
                  <AvatarFallback>{{ user.username[0] }}</AvatarFallback>
                </Avatar>
                {{ user.username }}
                <ComboboxItemIndicator>
                  <CheckIcon />
                </ComboboxItemIndicator>
              </template>
            </ComboboxItem>
          </ComboboxGroup>
          <ComboboxSeparator v-if="index < groups.length - 1" />
        </template>
      </ComboboxViewport>
    </ComboboxList>
  </Combobox>
</template>
