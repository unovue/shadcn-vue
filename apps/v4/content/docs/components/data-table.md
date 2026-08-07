---
title: Data Table
description: Powerful table and datagrids built using TanStack Table.
component: true
---

::component-preview
---
name: DataTableDemo
description: A data table with sorting, filtering, and pagination.
align: start
previewClass: items-start h-auto px-4 md:px-8
---
::

::vue-school-link{class="mt-6" lesson="data-tables-and-sonner-in-shadcn-vue" placement="top"}
Watch a Vue School video about data tables in shadcn-vue.
::

## Introduction

Every data table or datagrid I've created has been unique. They all behave differently, have specific sorting and filtering requirements, and work with different data sources.

It doesn't make sense to combine all of these variations into a single component. If we do that, we'll lose the flexibility that [headless UI](https://tanstack.com/table/latest/docs/introduction#what-is-headless-ui) provides.

So instead of a data-table component, I thought it would be more helpful to provide a guide on how to build your own.

We'll start with the basic `<Table />` component and build a complex data table from scratch.

::callout{class="mt-4"}

**Tip:** If you find yourself using the same table in multiple places in your app, you can always extract it into a reusable component.

::

## Table of Contents

This guide will show you how to use [TanStack Table](https://tanstack.com/table) and the `<Table />` component to build your own custom data table. We'll cover the following topics:

- [Set up Table Features](#set-up-table-features)
- [Basic Table](#basic-table)
- [Row Actions](#row-actions)
- [Pagination](#pagination)
- [Sorting](#sorting)
- [Filtering](#filtering)
- [Visibility](#visibility)
- [Row Selection](#row-selection)
- [Expanding](#expanding)
- [Reusable Components](#reusable-components)


## Installation

1. Add the `<Table />` component to your project:

```bash
npx shadcn-vue@latest add table
```

2. Add the `@tanstack/vue-table` dependency. This guide uses **TanStack Table v9**:

```bash
npm install @tanstack/vue-table
```



## Prerequisites

We are going to build a table to show recent payments. Here's what our data looks like:

```ts showLineNumbers
interface Payment {
  id: string
  amount: number
  status: 'pending' | 'processing' | 'success' | 'failed'
  email: string
}

export const payments: Payment[] = [
  {
    id: '728ed52f',
    amount: 100,
    status: 'pending',
    email: 'm@example.com',
  },
  {
    id: '489e1d42',
    amount: 125,
    status: 'processing',
    email: 'example@gmail.com',
  },
  // ...
]
```

## Project Structure

Start by creating the following file structure:

```ansi
 components
    └── payments
          ├── columns.ts
          ├── features.ts
          ├── data-table.vue
          ├── data-table-dropdown.vue
└── app.vue
```

I'm using a Nuxt example here but this works for any other Vue framework.

- `columns.ts` It will contain our column definitions.
- `features.ts` It will contain the shared `features` object that tells TanStack Table which behavior to enable.
- `data-table.vue` It will contain our `<DataTable />` component.
- `data-table-dropdown.vue` It will contain our `<DropdownAction />` component.
- `app.vue` This is where we'll fetch data and render our table.

## Set up Table Features

TanStack Table v9 is feature-based: you opt into the behavior you want — sorting, filtering, pagination, and so on — by declaring it with `tableFeatures()`. Anything you don't register is tree-shaken out of your bundle. That includes the built-in filter and sort functions: register the ones your columns rely on under `filterFns` and `sortFns`. Our email filter uses `includesString`, and string columns sort with `alphanumeric` / `text`.

We'll define the `features` object once in `features.ts` and share it between our column definitions and the `<DataTable />` component.

```ts showLineNumbers
// components/payments/features.ts
import {
  columnFilteringFeature,
  columnVisibilityFeature,
  createExpandedRowModel,
  createFilteredRowModel,
  createPaginatedRowModel,
  createSortedRowModel,
  filterFn_includesString,
  rowExpandingFeature,
  rowPaginationFeature,
  rowSelectionFeature,
  rowSortingFeature,
  sortFn_alphanumeric,
  sortFn_text,
  tableFeatures,
} from '@tanstack/vue-table'

// New in v9: declare the features this table uses — anything you don't
// register is tree-shaken out of the bundle.
export const features = tableFeatures({
  columnFilteringFeature,
  columnVisibilityFeature,
  rowExpandingFeature,
  rowPaginationFeature,
  rowSelectionFeature,
  rowSortingFeature,
  expandedRowModel: createExpandedRowModel(),
  filteredRowModel: createFilteredRowModel(),
  paginatedRowModel: createPaginatedRowModel(),
  sortedRowModel: createSortedRowModel(),
  filterFns: { includesString: filterFn_includesString },
  sortFns: { alphanumeric: sortFn_alphanumeric, text: sortFn_text },
})

// Pass this as the first generic argument to `ColumnDef`, `Column`, `Table`,
// and `Row` so each type knows which feature APIs are available.
export type DataTableFeatures = typeof features
```

::callout{class="mt-4"}

**Note:** The core row model is always included, so you never register it yourself. Row models for optional features are created with `create*RowModel()` and registered on the features object — there are no more `get*RowModel` table options.

::

## Basic Table

Let's start by building a basic table.

<Steps>

### Column Definitions

First, we'll define our columns in the `columns.ts` file using a column helper typed with our features.

```ts showLineNumbers
// components/payments/columns.ts
import { createColumnHelper } from '@tanstack/vue-table'
import type { DataTableFeatures } from './features'

// This type defines the shape of our data.
// You can use a Zod schema here if you want.
export interface Payment {
  id: string
  amount: number
  status: 'pending' | 'processing' | 'success' | 'failed'
  email: string
}

// Use `accessor` for data columns and `display` for columns without one.
const columnHelper = createColumnHelper<DataTableFeatures, Payment>()

export const columns = columnHelper.columns([
  columnHelper.accessor('status', {
    header: 'Status',
  }),
  columnHelper.accessor('email', {
    header: 'Email',
  }),
  columnHelper.accessor('amount', {
    header: 'Amount',
  }),
])
```

::callout{class="mt-4"}

**Note:** Columns are where you define the core of what your table
will look like. They define the data that will be displayed, how it will be
formatted, sorted and filtered.

::

### `<DataTable />` component

Next, we'll create a `<DataTable />` component to render our table.

`useTable` must be called during component setup so it can wire itself into Vue's reactivity. From there the table manages its own state: reads like `table.getRowModel()` in your template are reactive, so your markup updates automatically — no refs or change handlers required. We pass `data` and `columns` through getters so the table always reads the current prop values.

```vue
<script setup lang="ts" generic="TData">
import type { ColumnDef } from '@tanstack/vue-table'
import { FlexRender, useTable } from '@tanstack/vue-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { features, type DataTableFeatures } from './features'

const props = defineProps<{
  columns: ColumnDef<DataTableFeatures, TData>[]
  data: TData[]
}>()

const table = useTable({
  features,
  get data() { return props.data },
  get columns() { return props.columns },
})
</script>

<template>
  <div class="border rounded-md">
    <Table>
      <TableHeader>
        <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
          <TableHead v-for="header in headerGroup.headers" :key="header.id">
            <FlexRender v-if="!header.isPlaceholder" :header="header" />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <template v-if="table.getRowModel().rows?.length">
          <TableRow
            v-for="row in table.getRowModel().rows" :key="row.id"
            :data-state="row.getIsSelected() && 'selected'"
          >
            <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
              <FlexRender :cell="cell" />
            </TableCell>
          </TableRow>
        </template>
        <template v-else>
          <TableRow>
            <TableCell :colspan="columns.length" class="h-24 text-center">
              No results.
            </TableCell>
          </TableRow>
        </template>
      </TableBody>
    </Table>
  </div>
</template>
```

`<FlexRender />` takes the `header` or `cell` instance you pass it and renders whatever the column definition provides — a plain string, a render function, or a component.

::callout

**Tip**: If you find yourself using `<DataTable />` in multiple places, this is the component you could make reusable by extracting it to `components/ui/data-table.vue`.

`<DataTable :columns="columns" :data="data" />`

::

::callout{class="mt-4"}

**Controlled state:** because v9 owns table state internally, you won't write refs or `on*Change` handlers for most of this guide. If something outside the table needs to own a state slice (syncing filters to the URL, server-driven pagination, etc.), controlled state still exists — we'll manage the row selection slice externally in the [Row Selection](#row-selection) section. See the [migration guide](https://tanstack.com/table/latest/docs/framework/vue/guide/migrating) for details.

::

### Render the table

Finally, we'll render our table in our index component.

```vue
<script setup lang="ts">
import type { Payment } from './components/payments/columns'
import { onMounted, ref } from 'vue'
import { columns } from './components/payments/columns'
import DataTable from './components/payments/data-table.vue'

const data = ref<Payment[]>([])

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'm@example.com',
    },
    // ...
  ]
}

onMounted(async () => {
  data.value = await getData()
})
</script>

<template>
  <div class="container py-10 mx-auto">
    <DataTable :columns="columns" :data="data" />
  </div>
</template>
```

</Steps>

## Cell Formatting

Let's format the amount cell to display the dollar amount. We'll also align the cell to the right.

<Steps>

### Update columns definition

Update the `header` and `cell` definitions for amount as follows:

```ts
// components/payments/columns.ts
import { h } from 'vue'

export const columns = columnHelper.columns([
  // ...
  columnHelper.accessor('amount', {
    header: () => h('div', { class: 'text-right' }, 'Amount'),
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue('amount'))

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount)

      return h('div', { class: 'text-right font-medium' }, formatted)
    },
  }),
])
```
You can use the same approach to format other cells and headers.
</Steps>

## Row Actions

Let's add row actions to our table. We'll use a `<Dropdown />` component for this.

<Steps>

### Add the following into your `DataTableDropDown.vue` component

```vue
<script setup lang="ts">
import { MoreHorizontal } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

defineProps<{
  payment: {
    id: string
  }
}>()

function copy(id: string) {
  navigator.clipboard.writeText(id)
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" class="w-8 h-8 p-0">
        <span class="sr-only">Open menu</span>
        <MoreHorizontal class="w-4 h-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuLabel>Actions</DropdownMenuLabel>
      <DropdownMenuItem @click="copy(payment.id)">
        Copy payment ID
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem>View customer</DropdownMenuItem>
      <DropdownMenuItem>View payment details</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
```

### Update columns definition

Update our columns definition to add a new `actions` column. The `actions` cell returns a `<Dropdown />` component. Because the column doesn't read a data field, we define it with `columnHelper.display`.

```ts
// components/payments/columns.ts
import DropdownAction from '@/components/DataTableDropDown.vue'

export const columns = columnHelper.columns([
  // ...
  columnHelper.display({
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original

      return h('div', { class: 'relative' }, h(DropdownAction, {
        payment,
      }))
    },
  }),
])
```

You can access the row data using `row.original` in the `cell` function. Use this to handle actions for your row eg. use the `id` to make a DELETE call to your API.

</Steps>

## Pagination

Next, we'll add pagination to our table.

<Steps>

### Pagination is already enabled

Because our features object registers `rowPaginationFeature` and `createPaginatedRowModel()`, the table automatically paginates rows into pages of 10 — there's nothing to add to `useTable`. See the [pagination docs](https://tanstack.com/table/latest/docs/framework/vue/guide/pagination) for more information on customizing page size and implementing manual pagination.

### Add pagination controls

We can add pagination controls to our table using the `<Button />` component and the `table.previousPage()`, `table.nextPage()` API methods.

```vue
<script setup lang="ts" generic="TData">
import { Button } from '@/components/ui/button'

// ...the rest of the script stays the same
</script>

<template>
  <div>
    <div class="border rounded-md">
      <Table>
        { // .... }
      </Table>
    </div>
    <div class="flex items-center justify-end py-4 space-x-2">
      <Button
        variant="outline"
        size="sm"
        :disabled="!table.getCanPreviousPage()"
        @click="table.previousPage()"
      >
        Previous
      </Button>
      <Button
        variant="outline"
        size="sm"
        :disabled="!table.getCanNextPage()"
        @click="table.nextPage()"
      >
        Next
      </Button>
    </div>
  </div>
</template>
```

See [Reusable Components](#reusable-components) section for a more advanced pagination component.

### Change the page size

To change the page size, call `table.setPageSize()`. To read the current pagination state — say, for a page indicator — read `table.atoms.pagination.get()`.

```vue
<script setup lang="ts">
import { computed } from 'vue'

// Reactive read — updates whenever the user changes pages.
const pagination = computed(() => table.atoms.pagination.get())
</script>

<template>
  <Button variant="outline" size="sm" @click="table.setPageSize(20)">
    Show 20 rows
  </Button>

  <div class="text-sm text-muted-foreground">
    Page {{ pagination.pageIndex + 1 }} of {{ table.getPageCount() }}
  </div>
</template>
```

::callout{class="mt-4"}

**Note:** Atom reads like `table.atoms.pagination.get()` are reactive inside Vue tracking scopes — a template expression or a `computed`. A bare `.get()` at the top level of `<script setup>` is a one-time snapshot, so wrap script-side reads in `computed()`.

::

</Steps>

## Sorting

Let's make the email column sortable.

The `rowSortingFeature` and sorted row model are already registered in our features object — along with the `alphanumeric` and `text` sort functions that string columns resolve through the default `auto` setting — so there's nothing to change in `<DataTable />`. We just add the UI.

<Steps>

### Make header cell sortable

We can update the `email` header cell to add sorting controls.

```ts showLineNumbers {2-3,8-13}
// components/payments/columns.ts
import { ArrowUpDown } from '@lucide/vue'
import { Button } from '@/components/ui/button'

export const columns = columnHelper.columns([
  // ...
  columnHelper.accessor('email', {
    header: ({ column }) => {
      return h(Button, {
        variant: 'ghost',
        onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
      }, () => ['Email', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })])
    },
    cell: ({ row }) => h('div', { class: 'lowercase' }, row.getValue('email')),
  }),
])
```

This will automatically sort the table (asc and desc) when the user toggles on the header cell. The table owns the sorting state — no wiring required.

</Steps>

## Filtering

Let's add a search input to filter emails in our table.

The `columnFilteringFeature`, filtered row model, and the `includesString` filter function are already registered in our features object, so the only work left is rendering an input.

<Steps>

### Add the search input

```vue
<script setup lang="ts" generic="TData">
import { Input } from '@/components/ui/input'

// ...the rest of the script stays the same
</script>

<template>
  <div>
    <div class="flex items-center py-4">
      <Input
        class="max-w-sm"
        placeholder="Filter emails..."
        :model-value="table.getColumn('email')?.getFilterValue() as string"
        @update:model-value="table.getColumn('email')?.setFilterValue($event)"
      />
    </div>
    <div class="border rounded-md">
      <Table>{ ... }</Table>
    </div>
  </div>
</template>
```

Filtering is now enabled for the `email` column. You can add filters to other columns as well — just remember that string-based filter references only resolve functions you've registered, so if another column needs a different built-in filter, add it to `filterFns` in `features.ts` first. See the [filtering docs](https://tanstack.com/table/latest/docs/framework/vue/guide/column-filtering) for more information on customizing filters.

</Steps>

## Visibility

Adding column visibility is fairly simple using `@tanstack/vue-table` visibility API. The `columnVisibilityFeature` is already registered in our features object, so we only need to add the dropdown.

<Steps>

### Add the column toggle dropdown

```vue
<script setup lang="ts" generic="TData">
import { ChevronDown } from '@lucide/vue'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

// ...the rest of the script stays the same
</script>

<template>
  <div>
    <div class="flex items-center py-4">
      <Input
        class="max-w-sm"
        placeholder="Filter emails..."
        :model-value="table.getColumn('email')?.getFilterValue() as string"
        @update:model-value="table.getColumn('email')?.setFilterValue($event)"
      />
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button variant="outline" class="ml-auto">
            Columns <ChevronDown class="w-4 h-4 ml-2" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuCheckboxItem
            v-for="column in table.getAllColumns().filter((column) => column.getCanHide())"
            :key="column.id"
            class="capitalize"
            :model-value="column.getIsVisible()"
            @update:model-value="(value) => {
              column.toggleVisibility(!!value)
            }"
          >
            {{ column.id }}
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
    <div class="border rounded-md">
      <Table>{ ... }</Table>
    </div>
  </div>
</template>
```

This adds a dropdown menu that you can use to toggle column visibility.

</Steps>

## Row Selection

Next, we're going to add row selection to our table. The `rowSelectionFeature` is already registered in our features object, so the table tracks selection for us — we just render the checkboxes.

<Steps>

### Update column definitions

```ts showLineNumbers {2,5-19}
// components/payments/columns.ts
import { Checkbox } from '@/components/ui/checkbox'

export const columns = columnHelper.columns([
  columnHelper.display({
    id: 'select',
    header: ({ table }) => h(Checkbox, {
      'modelValue': table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate'),
      'onUpdate:modelValue': (value: boolean | 'indeterminate') => table.toggleAllPageRowsSelected(!!value),
      'ariaLabel': 'Select all',
    }),
    cell: ({ row }) => h(Checkbox, {
      'modelValue': row.getIsSelected(),
      'onUpdate:modelValue': (value: boolean | 'indeterminate') => row.toggleSelected(!!value),
      'ariaLabel': 'Select row',
    }),
    enableSorting: false,
    enableHiding: false,
  }),
  // ...
])
```

This adds a checkbox to each row and a checkbox in the header to select all rows.

::callout{class="mt-4"}

**Note:** In v9, `table.getIsSomePageRowsSelected()` returns `true` whenever at least one page row is selected — even when all are. The header checkbox still works because `table.getIsAllPageRowsSelected() || ...` short-circuits to `true` at full selection before the `'indeterminate'` branch is reached.

::

### Manage the selection state externally

The table tracks selection internally by default. To show how a slice can live outside the table — handy when your page needs to read or drive the selection — we'll own just this one slice with a Vue `ref` and leave everything else internal. Expose the current value with a `state` getter, and resolve the updater in the matching callback:

```ts showLineNumbers {2-3,5-7,13-18}
// components/payments/data-table.vue
import type { RowSelectionState } from '@tanstack/vue-table'
import { ref } from 'vue'

// Keep row selection outside the table so the rest of the app can read or update it.
const rowSelection = ref<RowSelectionState>({})

const table = useTable({
  features,
  get data() { return props.data },
  get columns() { return props.columns },
  state: {
    get rowSelection() { return rowSelection.value },
  },
  onRowSelectionChange: (updater) => {
    rowSelection.value = typeof updater === 'function' ? updater(rowSelection.value) : updater
  },
})
```

`rowSelection.value` can now be read or written anywhere in the component, and the table stays in sync.

### Show selected rows

You can show the number of selected rows using the `table.getFilteredSelectedRowModel()` API.

```vue showLineNumbers {8-11}
<template>
  <div>
    <div class="border rounded-md">
        <Table />
    </div>

    <div class="flex items-center justify-end space-x-2 py-4">
      <div class="flex-1 text-sm text-muted-foreground">
        {{ table.getFilteredSelectedRowModel().rows.length }} of
        {{ table.getFilteredRowModel().rows.length }} row(s) selected.
      </div>
      <div class="space-x-2">
        <PaginationButtons />
      </div>
    </div>
  </div>
</template>
```

</Steps>

## Expanding

Let's make rows expandable. The `rowExpandingFeature` and expanded row model are already registered in our features object, so the table tracks expanded state for us — we just add the UI.

<Steps>

### Update `<DataTable>`

Update the `<TableBody>` to render an extra row whenever a row is expanded:

```vue showLineNumbers {3,9-13}
<TableBody>
  <template v-if="table.getRowModel().rows?.length">
    <template v-for="row in table.getRowModel().rows" :key="row.id">
      <TableRow :data-state="row.getIsSelected() && 'selected'">
        <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
          <FlexRender :cell="cell" />
        </TableCell>
      </TableRow>
      <TableRow v-if="row.getIsExpanded()">
        <TableCell :colspan="row.getAllCells().length">
          {{ JSON.stringify(row.original) }}
        </TableCell>
      </TableRow>
    </template>
  </template>
  <template v-else>
    <TableRow>
      <TableCell :colspan="columns.length" class="h-24 text-center">
        No results.
      </TableCell>
    </TableRow>
  </template>
</TableBody>
```

### Add the expand action to the `DataTableDropDown.vue` component

```vue showLineNumbers {12-14,34-36}
<script setup lang="ts">
import { MoreHorizontal } from '@lucide/vue'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'

defineProps<{
  payment: {
    id: string
  }
}>()

defineEmits<{
  (e: 'expand'): void
}>()

function copy(id: string) {
  navigator.clipboard.writeText(id)
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" class="w-8 h-8 p-0">
        <span class="sr-only">Open menu</span>
        <MoreHorizontal class="w-4 h-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuLabel>Actions</DropdownMenuLabel>
      <DropdownMenuItem @click="copy(payment.id)">
        Copy payment ID
      </DropdownMenuItem>
      <DropdownMenuItem @click="$emit('expand')">
        Expand
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem>View customer</DropdownMenuItem>
      <DropdownMenuItem>View payment details</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
```

### Make rows expandable

Now we can update the action cell to add the expand control.

```ts showLineNumbers {12}
// components/payments/columns.ts
export const columns = columnHelper.columns([
  // ...
  columnHelper.display({
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original

      return h('div', { class: 'relative' }, h(DropdownAction, {
        payment,
        onExpand: () => row.toggleExpanded(),
      }))
    },
  }),
])
```

</Steps>

## Reusable Components

Here are some components you can use to build your data tables. This is from the [Tasks](/examples/tasks) demo.

### Column header

Make any column header sortable and hideable.

```vue showLineNumbers
<script setup lang="ts">
import type { Column } from '@tanstack/vue-table'
import { type Task } from '../data/schema'
import type { DataTableFeatures } from '../features'
import ArrowDownIcon from '~icons/radix-icons/arrow-down'
import ArrowUpIcon from '~icons/radix-icons/arrow-up'
import CaretSortIcon from '~icons/radix-icons/caret-sort'
import EyeNoneIcon from '~icons/radix-icons/eye-none'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface DataTableColumnHeaderProps {
  column: Column<DataTableFeatures, Task>
  title: string
}

defineProps<DataTableColumnHeaderProps>()
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<template>
  <div v-if="column.getCanSort()" :class="cn('flex items-center space-x-2', $attrs.class ?? '')">
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button
          variant="ghost"
          size="sm"
          class="-ml-3 h-8 data-[state=open]:bg-accent"
        >
          <span>{{ title }}</span>
          <ArrowDownIcon v-if="column.getIsSorted() === 'desc'" class="w-4 h-4 ml-2" />
          <ArrowUpIcon v-else-if=" column.getIsSorted() === 'asc'" class="w-4 h-4 ml-2" />
          <CaretSortIcon v-else class="w-4 h-4 ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem @click="column.toggleSorting(false)">
          <ArrowUpIcon class="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
          Asc
        </DropdownMenuItem>
        <DropdownMenuItem @click="column.toggleSorting(true)">
          <ArrowDownIcon class="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
          Desc
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem @click="column.toggleVisibility(false)">
          <EyeNoneIcon class="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
          Hide
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>

  <div v-else :class="$attrs.class">
    {{ title }}
  </div>
</template>

```

```ts showLineNumbers
export const columns = columnHelper.columns([
  columnHelper.accessor('email', {
    header: ({ column }) => (
      h(DataTableColumnHeader, {
        column,
        title: 'Email',
      })
    ),
  }),
])
```

### Pagination

Add pagination controls to your table including page size and selection count.

```vue showLineNumbers
<script setup lang="ts">
import { type Table } from '@tanstack/vue-table'
import { computed } from 'vue'
import { type Task } from '../data/schema'
import type { DataTableFeatures } from '../features'
import ChevronLeftIcon from '~icons/radix-icons/chevron-left'
import ChevronRightIcon from '~icons/radix-icons/chevron-right'
import DoubleArrowLeftIcon from '~icons/radix-icons/double-arrow-left'
import DoubleArrowRightIcon from '~icons/radix-icons/double-arrow-right'

import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface DataTablePaginationProps {
  table: Table<DataTableFeatures, Task>
}
const props = defineProps<DataTablePaginationProps>()

// Reactive atom read — a bare `.get()` in script setup is a one-time snapshot.
const pagination = computed(() => props.table.atoms.pagination.get())
</script>

<template>
  <div class="flex items-center justify-between px-2">
    <div class="flex-1 text-sm text-muted-foreground">
      {{ table.getFilteredSelectedRowModel().rows.length }} of
      {{ table.getFilteredRowModel().rows.length }} row(s) selected.
    </div>
    <div class="flex items-center space-x-6 lg:space-x-8">
      <div class="flex items-center space-x-2">
        <p class="text-sm font-medium">
          Rows per page
        </p>
        <Select
          :model-value="`${pagination.pageSize}`"
          @update:model-value="table.setPageSize"
        >
          <SelectTrigger class="h-8 w-[70px]">
            <SelectValue :placeholder="`${pagination.pageSize}`" />
          </SelectTrigger>
          <SelectContent side="top">
            <SelectItem v-for="pageSize in [10, 20, 30, 40, 50]" :key="pageSize" :value="`${pageSize}`">
              {{ pageSize }}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div class="flex w-[100px] items-center justify-center text-sm font-medium">
        Page {{ pagination.pageIndex + 1 }} of
        {{ table.getPageCount() }}
      </div>
      <div class="flex items-center space-x-2">
        <Button
          variant="outline"
          class="hidden w-8 h-8 p-0 lg:flex"
          :disabled="!table.getCanPreviousPage()"
          @click="table.setPageIndex(0)"
        >
          <span class="sr-only">Go to first page</span>
          <DoubleArrowLeftIcon class="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          class="w-8 h-8 p-0"
          :disabled="!table.getCanPreviousPage()"
          @click="table.previousPage()"
        >
          <span class="sr-only">Go to previous page</span>
          <ChevronLeftIcon class="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          class="w-8 h-8 p-0"
          :disabled="!table.getCanNextPage()"
          @click="table.nextPage()"
        >
          <span class="sr-only">Go to next page</span>
          <ChevronRightIcon class="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          class="hidden w-8 h-8 p-0 lg:flex"
          :disabled="!table.getCanNextPage()"
          @click="table.setPageIndex(table.getPageCount() - 1)"
        >
          <span class="sr-only">Go to last page</span>
          <DoubleArrowRightIcon class="w-4 h-4" />
        </Button>
      </div>
    </div>
  </div>
</template>

```

```vue
<DataTablePagination :table="table" />
```

### Column toggle

A component to toggle column visibility.

```vue showLineNumbers
<script setup lang="ts">
import type { Table } from '@tanstack/vue-table'
import { computed } from 'vue'
import { type Task } from '../data/schema'
import type { DataTableFeatures } from '../features'
import MixerHorizontalIcon from '~icons/radix-icons/mixer-horizontal'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface DataTableViewOptionsProps {
  table: Table<DataTableFeatures, Task>
}

const props = defineProps<DataTableViewOptionsProps>()

const columns = computed(() => props.table.getAllColumns()
  .filter(
    column =>
      typeof column.accessorFn !== 'undefined' && column.getCanHide(),
  ))
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button
        variant="outline"
        size="sm"
        class="hidden h-8 ml-auto lg:flex"
      >
        <MixerHorizontalIcon class="w-4 h-4 mr-2" />
        View
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" class="w-[150px]">
      <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
      <DropdownMenuSeparator />

      <DropdownMenuCheckboxItem
        v-for="column in columns"
        :key="column.id"
        class="capitalize"
        :modelValue="column.getIsVisible()"
        @update:modelValue="(value) => column.toggleVisibility(!!value)"
      >
        {{ column.id }}
      </DropdownMenuCheckboxItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
```