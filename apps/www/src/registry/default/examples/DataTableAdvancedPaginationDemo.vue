<script setup lang="ts">
import type {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  PaginationState,
} from "@tanstack/vue-table"
import {
  FlexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useVueTable,
} from "@tanstack/vue-table"
import { ArrowUpDown, ChevronDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-vue-next"

import { computed, h, ref } from "vue"
import { valueUpdater } from "@/lib/utils"
import { Button } from "@/registry/default/ui/button"
import { Checkbox } from "@/registry/default/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/registry/default/ui/dropdown-menu"
import { Input } from "@/registry/default/ui/input"
import { Label } from "@/registry/default/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/default/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/registry/default/ui/table"

export interface Product {
  id: string
  name: string
  category: string
  price: number
  stock: number
  status: "in-stock" | "low-stock" | "out-of-stock"
  description: string
}

// Generate sample data for pagination demo
const generateProducts = (count: number): Product[] => {
  const categories = ["Electronics", "Clothing", "Books", "Home & Garden", "Sports", "Toys"]
  const statuses: Product['status'][] = ["in-stock", "low-stock", "out-of-stock"]
  
  return Array.from({ length: count }, (_, i) => ({
    id: `prod-${i + 1}`,
    name: `Product ${i + 1}`,
    category: categories[i % categories.length],
    price: Math.floor(Math.random() * 500) + 10,
    stock: Math.floor(Math.random() * 100),
    status: statuses[Math.floor(Math.random() * statuses.length)],
    description: `This is a sample description for Product ${i + 1}`,
  }))
}

const data = generateProducts(100) // Generate 100 products for pagination demo

const columns: ColumnDef<Product>[] = [
  {
    id: "select",
    header: ({ table }) => h(Checkbox, {
      "modelValue": table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate"),
      "onUpdate:modelValue": value => table.toggleAllPageRowsSelected(!!value),
      "ariaLabel": "Select all",
    }),
    cell: ({ row }) => h(Checkbox, {
      "modelValue": row.getIsSelected(),
      "onUpdate:modelValue": value => row.toggleSelected(!!value),
      "ariaLabel": "Select row",
    }),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return h(Button, {
        variant: "ghost",
        onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
      }, () => ["Name", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })])
    },
    cell: ({ row }) => h("div", { class: "font-medium" }, row.getValue("name")),
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => h("div", { class: "capitalize" }, row.getValue("category")),
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return h(Button, {
        variant: "ghost",
        onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
      }, () => ["Price", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })])
    },
    cell: ({ row }) => {
      const price = Number.parseFloat(row.getValue("price"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price)
      return h("div", { class: "text-right font-medium" }, formatted)
    },
  },
  {
    accessorKey: "stock",
    header: ({ column }) => {
      return h(Button, {
        variant: "ghost",
        onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
      }, () => ["Stock", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })])
    },
    cell: ({ row }) => h("div", { class: "text-center" }, row.getValue("stock")),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      const statusClasses = {
        "in-stock": "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
        "low-stock": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
        "out-of-stock": "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
      }
      return h("span", { 
        class: `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusClasses[status as keyof typeof statusClasses]}` 
      }, status.replace("-", " "))
    },
  },
]

const sorting = ref<SortingState>([])
const columnFilters = ref<ColumnFiltersState>([])
const columnVisibility = ref<VisibilityState>({})
const rowSelection = ref({})
const pagination = ref<PaginationState>({
  pageIndex: 0,
  pageSize: 10,
})

const table = useVueTable({
  data,
  columns,
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  onSortingChange: updaterOrValue => valueUpdater(updaterOrValue, sorting),
  onColumnFiltersChange: updaterOrValue => valueUpdater(updaterOrValue, columnFilters),
  onColumnVisibilityChange: updaterOrValue => valueUpdater(updaterOrValue, columnVisibility),
  onRowSelectionChange: updaterOrValue => valueUpdater(updaterOrValue, rowSelection),
  onPaginationChange: updaterOrValue => valueUpdater(updaterOrValue, pagination),
  state: {
    get sorting() { return sorting.value },
    get columnFilters() { return columnFilters.value },
    get columnVisibility() { return columnVisibility.value },
    get rowSelection() { return rowSelection.value },
    get pagination() { return pagination.value },
  },
})

const totalPages = computed(() => table.getPageCount())
const currentPage = computed(() => table.getState().pagination.pageIndex + 1)
const pageSize = computed(() => table.getState().pagination.pageSize)
const totalRows = computed(() => table.getFilteredRowModel().rows.length)
const selectedRows = computed(() => table.getFilteredSelectedRowModel().rows.length)

const pageSizeOptions = [5, 10, 20, 30, 50, 100]
</script>

<template>
  <div class="w-full space-y-4">
    <div>
      <h3 class="text-lg font-medium">Advanced Pagination Example</h3>
      <p class="text-sm text-muted-foreground">
        A comprehensive example with client-side pagination, page size controls, and navigation.
      </p>
    </div>

    <!-- Filters and Controls -->
    <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div class="flex flex-1 gap-2">
        <Input
          class="max-w-xs"
          placeholder="Search products..."
          :model-value="table.getColumn('name')?.getFilterValue() as string"
          @update:model-value="table.getColumn('name')?.setFilterValue($event)"
        />
        <Select
          :model-value="table.getColumn('category')?.getFilterValue() as string"
          @update:model-value="table.getColumn('category')?.setFilterValue($event)"
        >
          <SelectTrigger class="w-40">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Categories</SelectItem>
            <SelectItem value="Electronics">Electronics</SelectItem>
            <SelectItem value="Clothing">Clothing</SelectItem>
            <SelectItem value="Books">Books</SelectItem>
            <SelectItem value="Home & Garden">Home & Garden</SelectItem>
            <SelectItem value="Sports">Sports</SelectItem>
            <SelectItem value="Toys">Toys</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button variant="outline" class="ml-auto">
            Columns <ChevronDown class="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuCheckboxItem
            v-for="column in table.getAllColumns().filter((column) => column.getCanHide())"
            :key="column.id"
            class="capitalize"
            :model-value="column.getIsVisible()"
            @update:model-value="column.toggleVisibility(!!$event)"
          >
            {{ column.id }}
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>

    <!-- Table -->
    <div class="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
            <TableHead v-for="header in headerGroup.headers" :key="header.id">
              <FlexRender v-if="!header.isPlaceholder" :render="header.column.columnDef.header" :props="header.getContext()" />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <template v-if="table.getRowModel().rows?.length">
            <TableRow
              v-for="row in table.getRowModel().rows"
              :key="row.id"
              :data-state="row.getIsSelected() && 'selected'"
            >
              <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
              </TableCell>
            </TableRow>
          </template>
          <TableRow v-else>
            <TableCell :colspan="columns.length" class="h-24 text-center">
              No results.
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>

    <!-- Enhanced Pagination Controls -->
    <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <!-- Selection Info -->
      <div class="flex items-center gap-4 text-sm text-muted-foreground">
        <span>
          {{ selectedRows }} of {{ totalRows }} row(s) selected
        </span>
        <span>•</span>
        <span>
          Page {{ currentPage }} of {{ totalPages }}
        </span>
      </div>

      <!-- Page Size Control -->
      <div class="flex items-center gap-2">
        <Label class="text-sm font-medium">Rows per page:</Label>
        <Select
          :model-value="String(pageSize)"
          @update:model-value="table.setPageSize(Number($event))"
        >
          <SelectTrigger class="w-20">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem
              v-for="size in pageSizeOptions"
              :key="size"
              :value="String(size)"
            >
              {{ size }}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <!-- Navigation Controls -->
      <div class="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          :disabled="!table.getCanPreviousPage()"
          @click="table.setPageIndex(0)"
        >
          <ChevronsLeft class="h-4 w-4" />
          <span class="sr-only">Go to first page</span>
        </Button>
        <Button
          variant="outline"
          size="sm"
          :disabled="!table.getCanPreviousPage()"
          @click="table.previousPage()"
        >
          <ChevronLeft class="h-4 w-4" />
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          :disabled="!table.getCanNextPage()"
          @click="table.nextPage()"
        >
          Next
          <ChevronRight class="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          :disabled="!table.getCanNextPage()"
          @click="table.setPageIndex(table.getPageCount() - 1)"
        >
          <ChevronsRight class="h-4 w-4" />
          <span class="sr-only">Go to last page</span>
        </Button>
      </div>
    </div>

    <!-- Data Summary -->
    <div class="rounded-lg border bg-muted/50 p-4">
      <h4 class="text-sm font-medium mb-2">Table Statistics</h4>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
        <div>
          <span class="text-muted-foreground">Total Products:</span>
          <div class="font-medium">{{ data.length }}</div>
        </div>
        <div>
          <span class="text-muted-foreground">Filtered Results:</span>
          <div class="font-medium">{{ totalRows }}</div>
        </div>
        <div>
          <span class="text-muted-foreground">Current Page:</span>
          <div class="font-medium">{{ currentPage }} / {{ totalPages }}</div>
        </div>
        <div>
          <span class="text-muted-foreground">Selected:</span>
          <div class="font-medium">{{ selectedRows }}</div>
        </div>
      </div>
    </div>
  </div>
</template>