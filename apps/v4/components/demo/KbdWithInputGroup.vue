<script setup lang="ts">
import { SearchIcon } from 'lucide-vue-next'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/registry/new-york-v4/ui/input-group'
import { Kbd } from '@/registry/new-york-v4/ui/kbd'
</script>

<template>
  <div class="flex w-full max-w-xs flex-col gap-6">
    <InputGroup>
      <InputGroupInput placeholder="Search..." />
      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>
      <InputGroupAddon align="inline-end">
        <Kbd>⌘</Kbd>
        <Kbd>K</Kbd>
      </InputGroupAddon>
    </InputGroup>
  </div>
</template>
