---
title: Pagination
description: Displays data in paged format and provides navigation between pages.
source: apps/www/src/lib/registry/default/ui/pagination
primitive: https://www.radix-vue.com/components/pagination.html
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
  PaginationEllipsis,
  PaginationFirst,
  PaginationLast,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev,
} from '@/components/ui/pagination'

import {
  Button,
} from '@/components/ui/button'
</script>

<template>
  <Pagination v-slot="{ page }" :total="100" :sibling-count="1" show-edges :default-page="2">
    <PaginationList v-slot="{ items }" class="flex items-center gap-1">
      <PaginationFirst />
      <PaginationPrev />

      <template v-for="(item, index) in items">
        <PaginationListItem v-if="item.type === 'page'" :key="index" :value="item.value" as-child>
          <Button class="w-10 h-10 p-0" :variant="item.value === page ? 'default' : 'outline'">
            {{ item.value }}
          </Button>
        </PaginationListItem>
        <PaginationEllipsis v-else :key="item.type" :index="index" />
      </template>

      <PaginationNext />
      <PaginationLast />
    </PaginationList>
  </Pagination>
</template>
```
