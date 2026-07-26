<script setup lang="ts">
import { ref } from "vue"
import IconPlaceholder from "@/components/IconPlaceholder.vue"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/bases/reka/ui/avatar"
import { Button } from "@/registry/bases/reka/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/bases/reka/ui/card"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/registry/bases/reka/ui/tooltip"

const users = [
  "shadcn",
  "maxleiter",
  "evilrabbit",
  "pranathip",
  "jorgezreik",
  "shuding",
  "rauchg",
]

const selectedUsers = ref<string[]>([users[0]!])
</script>

<template>
  <Card class="w-full max-w-sm" size="sm">
    <CardHeader class="border-b">
      <CardTitle class="text-sm">
        Assign Issue
      </CardTitle>
      <CardDescription class="text-sm">
        Select users to assign to this issue.
      </CardDescription>
      <CardAction>
        <Tooltip>
          <TooltipTrigger :as-child="true">
            <Button variant="outline" size="icon-xs">
              <IconPlaceholder
                lucide="PlusIcon"
                tabler="IconPlus"
                hugeicons="PlusSignIcon"
                phosphor="PlusIcon"
                remixicon="RiAddLine"
              />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Add user</TooltipContent>
        </Tooltip>
      </CardAction>
    </CardHeader>
    <CardContent>
      <div class="flex flex-wrap gap-2 rounded-md border px-2 py-1.5 min-h-9">
        <div
          v-for="username in selectedUsers"
          :key="username"
          class="flex items-center gap-1 rounded-md bg-secondary px-2 py-0.5 text-sm"
        >
          <Avatar class="size-4">
            <AvatarImage
              :src="`https://github.com/${username}.png`"
              :alt="username"
            />
            <AvatarFallback>{{ username.charAt(0) }}</AvatarFallback>
          </Avatar>
          {{ username }}
        </div>
      </div>
      <div class="mt-2 flex flex-col gap-1">
        <div
          v-for="username in users"
          :key="username"
          class="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-accent"
          @click="selectedUsers.includes(username)
            ? selectedUsers = selectedUsers.filter(u => u !== username)
            : selectedUsers = [...selectedUsers, username]"
        >
          <Avatar class="size-5">
            <AvatarImage
              :src="`https://github.com/${username}.png`"
              :alt="username"
            />
            <AvatarFallback>{{ username.charAt(0) }}</AvatarFallback>
          </Avatar>
          {{ username }}
          <IconPlaceholder
            v-if="selectedUsers.includes(username)"
            lucide="CheckIcon"
            tabler="IconCheck"
            hugeicons="Tick02Icon"
            phosphor="CheckIcon"
            remixicon="RiCheckLine"
            class="ml-auto size-4"
          />
        </div>
      </div>
    </CardContent>
  </Card>
</template>
