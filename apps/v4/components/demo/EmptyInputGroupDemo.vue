<script setup lang="ts">
import { SearchIcon } from 'lucide-vue-next'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from '@/registry/new-york-v4/ui/empty'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/registry/new-york-v4/ui/input-group'
import { Kbd } from '@/registry/new-york-v4/ui/kbd'
</script>

<template>
  <Empty>
    <EmptyHeader>
      <EmptyTitle>404 - Not Found</EmptyTitle>
      <EmptyDescription>
        The page you're looking for doesn't exist. Try searching for what you
        need below.
      </EmptyDescription>
    </EmptyHeader>
    <EmptyContent>
      <InputGroup class="sm:w-3/4">
        <InputGroupInput placeholder="Try searching for pages..." />
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          <Kbd>/</Kbd>
        </InputGroupAddon>
      </InputGroup>
      <EmptyDescription>
        Need help? <a href="#">Contact support</a>
      </EmptyDescription>
    </EmptyContent>
  </Empty>
</template>
