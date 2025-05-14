<script setup lang="ts">
import { CalendarIcon } from 'lucide-vue-next'

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/registry/new-york-v4/ui/avatar'
import { Button } from '@/registry/new-york-v4/ui/button'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/registry/new-york-v4/ui/hover-card'
</script>

<template>
  <HoverCard>
    <HoverCardTrigger as-child>
      <Button variant="link">
        @nextjs
      </Button>
    </HoverCardTrigger>
    <HoverCardContent class="w-80" side="right">
      <div class="flex justify-between gap-4">
        <Avatar>
          <AvatarImage src="https://github.com/vercel.png" />
          <AvatarFallback>VC</AvatarFallback>
        </Avatar>
        <div class="flex flex-col gap-1">
          <h4 class="text-sm font-semibold">
            @nextjs
          </h4>
          <p class="text-sm">
            The React Framework - created and maintained by @vercel.
          </p>
          <div class="mt-1 flex items-center gap-2">
            <CalendarIcon class="text-muted-foreground size-4" />
            <span class="text-muted-foreground text-xs">
              Joined December 2021
            </span>
          </div>
        </div>
      </div>
    </HoverCardContent>
  </HoverCard>
</template>
