<script setup lang="ts">
import { Button } from "@/registry/bases/reka/ui/button"
import { Input } from "@/registry/bases/reka/ui/input"
</script>

<template>
  <div class="flex w-full gap-2">
    <Input type="search" placeholder="Search..." class="flex-1" />
    <Button>Search</Button>
  </div>
</template>
