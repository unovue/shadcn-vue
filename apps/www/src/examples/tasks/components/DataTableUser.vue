<script setup lang="ts">
import type { Row } from '@tanstack/vue-table'
import { CheckIcon, Mail } from 'lucide-vue-next'
import { useClipboard } from '@vueuse/core'
import type { Task } from '../data/schema'

import { Avatar, AvatarFallback, AvatarImage } from '@/lib/registry/new-york/ui/avatar'
import { Badge } from '@/lib/registry/new-york/ui/badge'
import { Button } from '@/lib/registry/new-york/ui/button'

const props = defineProps<{
  row: Row<Task>
}>()

const { id, firstName, lastName, email, avatar } = props.row.original.user

const { copy, copied } = useClipboard({ source: email })
</script>

<template>
  <div class="flex justify-between items-center">
    <div class="flex items-center gap-2">
      <Avatar class="h-9 w-9">
        <AvatarImage :src="avatar" alt="User image" />
        <AvatarFallback>{{ firstName.slice(0, 1) }}</AvatarFallback>
      </Avatar>
      <span>{{ `${firstName} ${lastName}` }}</span>
      <Button
        class="h-7 w-7 [&_svg]:size-3.5"
        variant="outline"
        size="icon"
        @click="copy()"
      >
        <span class="sr-only">Copy</span>
        <CheckIcon v-if="copied" />
        <Mail v-else />
      </Button>
    </div>
    <Badge class="mr-2" variant="outline">
      #{{ id }}
    </Badge>
  </div>
</template>
