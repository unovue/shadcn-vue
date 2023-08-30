<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from '@/lib/registry/default/ui/avatar'
</script>

<template>
  <Avatar>
    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
    <AvatarFallback>CN</AvatarFallback>
  </Avatar>
</template>
