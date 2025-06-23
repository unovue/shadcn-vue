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
  PaginationList,
  PaginationEllipsis,
  PaginationListItem,
  PaginationNext,
  PaginationPrev,
} from '@/registry/default/ui/pagination'
</script>

<template>
  <Pagination v-slot="{ page }" :items-per-page="10" :total="30" :default-page="2">
    <PaginationList v-slot="{ items }">
      <PaginationPrev />

      <template v-for="(item, index) in items" :key="index">
        <PaginationListItem
          v-if="item.type === 'page'"
          :value="item.value"
          :is-active="item.value === page"
        >
          {{ item.value }}
        </PaginationListItem>
      </template>

      <PaginationEllipsis :index="4" />

      <PaginationNext />
    </PaginationList>
  </Pagination>
</template>
```
