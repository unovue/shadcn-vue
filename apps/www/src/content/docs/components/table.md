---
title: Table
description: A responsive table component.
---

<script setup>
import { useConfigStore } from '@/stores/config'

const { codeConfig } = useConfigStore()
</script>


<ComponentPreview name="TableDemo" /> 


## Installation

```bash
npx shadcn-vue@latest add table
```

## Usage

```vue-vue
<script setup lang="ts">
import {
  {{codeConfig.prefix}}Table,
  {{codeConfig.prefix}}TableBody,
  {{codeConfig.prefix}}TableCaption,
  {{codeConfig.prefix}}TableCell,
  {{codeConfig.prefix}}TableHead,
  {{codeConfig.prefix}}TableHeader,
  {{codeConfig.prefix}}TableRow,
} from '{{codeConfig.aliases.components}}/ui/table'
</script>

<template>
  <{{codeConfig.prefix}}Table>
    <{{codeConfig.prefix}}TableCaption>A list of your recent invoices.</{{codeConfig.prefix}}TableCaption>
    <{{codeConfig.prefix}}TableHeader>
      <{{codeConfig.prefix}}TableRow>
        <{{codeConfig.prefix}}TableHead class="w-[100px]">
          Invoice
        </{{codeConfig.prefix}}TableHead>
        <{{codeConfig.prefix}}TableHead>Status</{{codeConfig.prefix}}TableHead>
        <{{codeConfig.prefix}}TableHead>Method</{{codeConfig.prefix}}TableHead>
        <{{codeConfig.prefix}}TableHead class="text-right">
          Amount
        </{{codeConfig.prefix}}TableHead>
      </{{codeConfig.prefix}}TableRow>
    </{{codeConfig.prefix}}TableHeader>
    <{{codeConfig.prefix}}TableBody>
      <{{codeConfig.prefix}}TableRow>
        <{{codeConfig.prefix}}TableCell class="font-medium">
          INV001
        </{{codeConfig.prefix}}TableCell>
        <{{codeConfig.prefix}}TableCell>Paid</{{codeConfig.prefix}}TableCell>
        <{{codeConfig.prefix}}TableCell>Credit Card</{{codeConfig.prefix}}TableCell>
        <{{codeConfig.prefix}}TableCell class="text-right">
          $250.00
        </{{codeConfig.prefix}}TableCell>
      </{{codeConfig.prefix}}TableRow>
    </{{codeConfig.prefix}}TableBody>
  </{{codeConfig.prefix}}Table>
</template>
```

## Data Table

You can use the `<Table />` component to build more complex data tables. Combine it with [@tanstack/vue-table](https://tanstack.com/table/v8) to create tables with sorting, filtering and pagination.

See the [Data Table](/docs/components/data-table) documentation for more information.

You can also see an example of a data table in the [Tasks](/examples/tasks) demo.
