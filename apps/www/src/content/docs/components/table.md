---
title: Table
description: A responsive table component.
---

<ComponentPreview name="TableDemo" /> 


## Installation

```bash
npx shadcn-vue@latest add table
```

## Usage

```vue
<script setup lang="ts">
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
</script>

<template>
  <Table>
    <TableCaption>A list of your recent invoices.</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead class="w-[100px]">
          Invoice
        </TableHead>
        <TableHead>Status</TableHead>
        <TableHead>Method</TableHead>
        <TableHead class="text-right">
          Amount
        </TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableCell class="font-medium">
          INV001
        </TableCell>
        <TableCell>Paid</TableCell>
        <TableCell>Credit Card</TableCell>
        <TableCell class="text-right">
          $250.00
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>
```

## Data Table

You can use the `<Table />` component to build more complex data tables. Combine it with [@tanstack/vue-table](https://tanstack.com/table/v8) to create tables with sorting, filtering and pagination.

See the [Data Table](/docs/components/data-table) documentation for more information.

You can also see an example of a data table in the [Tasks](/examples/tasks) demo.