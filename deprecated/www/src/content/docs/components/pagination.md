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
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/registry/default/ui/pagination'
</script>

<template>
  <Pagination v-slot="{ page }" :items-per-page="10" :total="30" :default-page="2">
    <PaginationContent v-slot="{ items }">
      <PaginationPrevious />

      <template v-for="(item, index) in items" :key="index">
        <PaginationItem
          v-if="item.type === 'page'"
          :value="item.value"
          :is-active="item.value === page"
        >
          {{ item.value }}
        </PaginationItem>
      </template>

      <PaginationEllipsis :index="4" />

      <PaginationNext />
    </PaginationContent>
  </Pagination>
</template>
```
