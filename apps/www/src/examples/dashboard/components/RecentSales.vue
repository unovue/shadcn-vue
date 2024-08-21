<script setup lang="ts">
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/lib/registry/new-york/ui/avatar'
</script>

<template>
  <div class="space-y-8">
    <div class="flex items-center">
      <Avatar class="size-9">
        <AvatarImage src="/avatars/01.png" alt="Avatar" />
        <AvatarFallback>OM</AvatarFallback>
      </Avatar>
      <div class="ml-4 space-y-1">
        <p class="text-sm font-medium leading-none">
          Olivia Martin
        </p>
        <p class="text-sm text-muted-foreground">
          olivia.martin@email.com
        </p>
      </div>
      <div class="ml-auto font-medium">
        +$1,999.00
      </div>
    </div>
    <div class="flex items-center">
      <Avatar class="flex size-9 items-center justify-center space-y-0 border">
        <AvatarImage src="/avatars/02.png" alt="Avatar" />
        <AvatarFallback>JL</AvatarFallback>
      </Avatar>
      <div class="ml-4 space-y-1">
        <p class="text-sm font-medium leading-none">
          Jackson Lee
        </p>
        <p class="text-sm text-muted-foreground">
          jackson.lee@email.com
        </p>
      </div>
      <div class="ml-auto font-medium">
        +$39.00
      </div>
    </div>
    <div class="flex items-center">
      <Avatar class="size-9">
        <AvatarImage src="/avatars/03.png" alt="Avatar" />
        <AvatarFallback>IN</AvatarFallback>
      </Avatar>
      <div class="ml-4 space-y-1">
        <p class="text-sm font-medium leading-none">
          Isabella Nguyen
        </p>
        <p class="text-sm text-muted-foreground">
          isabella.nguyen@email.com
        </p>
      </div>
      <div class="ml-auto font-medium">
        +$299.00
      </div>
    </div>
    <div class="flex items-center">
      <Avatar class="size-9">
        <AvatarImage src="/avatars/04.png" alt="Avatar" />
        <AvatarFallback>WK</AvatarFallback>
      </Avatar>
      <div class="ml-4 space-y-1">
        <p class="text-sm font-medium leading-none">
          William Kim
        </p>
        <p class="text-sm text-muted-foreground">
          will@email.com
        </p>
      </div>
      <div class="ml-auto font-medium">
        +$99.00
      </div>
    </div>
    <div class="flex items-center">
      <Avatar class="size-9">
        <AvatarImage src="/avatars/05.png" alt="Avatar" />
        <AvatarFallback>SD</AvatarFallback>
      </Avatar>
      <div class="ml-4 space-y-1">
        <p class="text-sm font-medium leading-none">
          Sofia Davis
        </p>
        <p class="text-sm text-muted-foreground">
          sofia.davis@email.com
        </p>
      </div>
      <div class="ml-auto font-medium">
        +$39.00
      </div>
    </div>
  </div>
</template>
