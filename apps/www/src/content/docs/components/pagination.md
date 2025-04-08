---
title: Pagination
description: Displays data in paged format and provides navigation between pages.
source: apps/www/src/registry/default/ui/pagination
primitive: https://www.reka-ui.com/docs/components/pagination.html
---

<ComponentPreview name="PaginationDemo" />

## Installation

```bash
npx shadcn-vue@latest add pagination
```

## Usage

```vue
<script setup lang="ts">
import {
  Button,
} from '@/components/ui/button'

import {
  Pagination,
  PaginationEllipsis,
  PaginationFirst,
  PaginationLast,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
</script>

<template>
  <Pagination v-slot="{ page }" :items-per-page="10" :total="100" :sibling-count="1" show-edges :default-page="2">
    <PaginationContent v-slot="{ items }" class="flex items-center gap-1">
      <PaginationFirst />
      <PaginationPrevious />

      <template v-for="(item, index) in items">
        <PaginationItem v-if="item.type === 'page'" :key="index" :value="item.value" as-child>
          <Button class="w-10 h-10 p-0" :variant="item.value === page ? 'default' : 'outline'">
            {{ item.value }}
          </Button>
        </PaginationItem>
        <PaginationEllipsis v-else :key="item.type" :index="index" />
      </template>

      <PaginationNext />
      <PaginationLast />
    </PaginationContent>
  </Pagination>
</template>
```
