<script setup lang="ts">
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/registry/bases/reka/ui/avatar"
import { Example } from "~/registry/bases/reka/components/example"
</script>

<template>
  <Example title="Badge">
    <div class="flex flex-wrap items-center gap-2">
      <Avatar size="sm">
        <AvatarImage
          src="https://github.com/jorgezreik.png"
          alt="@jorgezreik"
        />
        <AvatarFallback>JZ</AvatarFallback>
        <AvatarBadge />
      </Avatar>
      <Avatar>
        <AvatarImage
          src="https://github.com/jorgezreik.png"
          alt="@jorgezreik"
        />
        <AvatarFallback>JZ</AvatarFallback>
        <AvatarBadge />
      </Avatar>
      <Avatar size="lg">
        <AvatarImage
          src="https://github.com/jorgezreik.png"
          alt="@jorgezreik"
        />
        <AvatarFallback>JZ</AvatarFallback>
        <AvatarBadge />
      </Avatar>
    </div>
    <div class="flex flex-wrap items-center gap-2">
      <Avatar size="sm">
        <AvatarFallback>JZ</AvatarFallback>
        <AvatarBadge />
      </Avatar>
      <Avatar>
        <AvatarFallback>JZ</AvatarFallback>
        <AvatarBadge />
      </Avatar>
      <Avatar size="lg">
        <AvatarFallback>JZ</AvatarFallback>
        <AvatarBadge />
      </Avatar>
    </div>
  </Example>
</template>
