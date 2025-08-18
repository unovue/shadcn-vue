<script setup lang="ts">
import type {
  ColumnDef,
  ColumnFiltersState,
  OnChangeFn,
  PaginationState,
  SortingState,
  VisibilityState,
} from "@tanstack/vue-table"
import {
  FlexRender,
  getCoreRowModel,
  useVueTable,
} from "@tanstack/vue-table"
import { ArrowUpDown, ChevronDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Loader2, RefreshCcw } from "lucide-vue-next"

import { computed, h, ref, watch } from "vue"
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

export interface ServerProduct {
  id: string
  name: string
  category: string
  price: number
  stock: number
  status: "available" | "discontinued" | "out-of-stock"
  supplier: string
  createdAt: string
}

export interface ServerResponse {
  data: ServerProduct[]
  totalCount: number
  page: number
  pageSize: number
  totalPages: number
}

// Simulate server data
const generateServerProducts = (count: number): ServerProduct[] => {
  const categories = ["Electronics", "Clothing", "Books", "Home & Garden", "Sports", "Toys", "Health", "Beauty", "Automotive", "Office"]
  const suppliers = ["Supplier A", "Supplier B", "Supplier C", "Supplier D", "Supplier E"]
  const statuses: ServerProduct['status'][] = ["available", "discontinued", "out-of-stock"]
  
  return Array.from({ length: count }, (_, i) => ({
    id: `server-prod-${i + 1}`,
    name: `Server Product ${i + 1}`,
    category: categories[i % categories.length],
    price: Math.floor(Math.random() * 1000) + 10,
    stock: Math.floor(Math.random() * 500),
    status: statuses[Math.floor(Math.random() * statuses.length)],
    supplier: suppliers[i % suppliers.length],
    createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
  }))
}

// Mock server data (500 total records)
const serverData = generateServerProducts(500)

// Simulate API call with delay
async function fetchProducts(params: {
  page: number
  pageSize: number
  search?: string
  sortField?: string
  sortOrder?: 'asc' | 'desc'
  categoryFilter?: string
}): Promise<ServerResponse> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800))

  let filteredData = [...serverData]

  // Apply search filter
  if (params.search) {
    filteredData = filteredData.filter(product =>
      product.name.toLowerCase().includes(params.search!.toLowerCase()) ||
      product.category.toLowerCase().includes(params.search!.toLowerCase()) ||
      product.supplier.toLowerCase().includes(params.search!.toLowerCase())
    )
  }

  // Apply category filter
  if (params.categoryFilter) {
    filteredData = filteredData.filter(product => product.category === params.categoryFilter)
  }

  // Apply sorting
  if (params.sortField && params.sortOrder) {
    filteredData.sort((a, b) => {
      const aVal = a[params.sortField as keyof ServerProduct]
      const bVal = b[params.sortField as keyof ServerProduct]
      
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return params.sortOrder === 'asc' 
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal)
      }
      
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return params.sortOrder === 'asc' 
          ? aVal - bVal
          : bVal - aVal
      }
      
      return 0
    })
  }

  const totalCount = filteredData.length
  const totalPages = Math.ceil(totalCount / params.pageSize)
  const startIndex = (params.page - 1) * params.pageSize
  const endIndex = startIndex + params.pageSize
  const data = filteredData.slice(startIndex, endIndex)

  return {
    data,
    totalCount,
    page: params.page,
    pageSize: params.pageSize,
    totalPages,
  }
}

// Component state
const loading = ref(false)
const data = ref<ServerProduct[]>([])
const totalCount = ref(0)
const totalPages = ref(0)

// Table state
const sorting = ref<SortingState>([])
const columnFilters = ref<ColumnFiltersState>([])
const columnVisibility = ref<VisibilityState>({})
const rowSelection = ref({})
const pagination = ref<PaginationState>({
  pageIndex: 0,
  pageSize: 10,
})

// Filters
const globalFilter = ref("")
const categoryFilter = ref("")

// Load data function
async function loadData() {
  loading.value = true
  try {
    const params = {
      page: pagination.value.pageIndex + 1,
      pageSize: pagination.value.pageSize,
      search: globalFilter.value,
      categoryFilter: categoryFilter.value,
      sortField: sorting.value[0]?.id,
      sortOrder: sorting.value[0]?.desc ? 'desc' as const : 'asc' as const,
    }
    
    const response = await fetchProducts(params)
    data.value = response.data
    totalCount.value = response.totalCount
    totalPages.value = response.totalPages
  } catch (error) {
    console.error('Failed to load data:', error)
  } finally {
    loading.value = false
  }
}

// Debounced search
let searchTimeout: NodeJS.Timeout
watch(globalFilter, (newValue) => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    pagination.value.pageIndex = 0 // Reset to first page when searching
    loadData()
  }, 500)
})

watch(categoryFilter, () => {
  pagination.value.pageIndex = 0 // Reset to first page when filtering
  loadData()
})

// Table column definitions
const columns: ColumnDef<ServerProduct>[] = [
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
        onClick: () => {
          column.toggleSorting(column.getIsSorted() === "asc")
          // Trigger server-side sorting
          setTimeout(() => loadData(), 100)
        },
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
        onClick: () => {
          column.toggleSorting(column.getIsSorted() === "asc")
          setTimeout(() => loadData(), 100)
        },
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
        onClick: () => {
          column.toggleSorting(column.getIsSorted() === "asc")
          setTimeout(() => loadData(), 100)
        },
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
        "available": "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
        "discontinued": "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
        "out-of-stock": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
      }
      return h("span", { 
        class: `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusClasses[status as keyof typeof statusClasses]}` 
      }, status.replace("-", " "))
    },
  },
  {
    accessorKey: "supplier",
    header: "Supplier",
    cell: ({ row }) => h("div", {}, row.getValue("supplier")),
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"))
      return h("div", { class: "text-sm" }, date.toLocaleDateString())
    },
  },
]

const table = useVueTable({
  get data() { return data.value },
  columns,
  getCoreRowModel: getCoreRowModel(),
  manualPagination: true,
  manualSorting: true,
  pageCount: totalPages.value,
  onSortingChange: updaterOrValue => valueUpdater(updaterOrValue, sorting),
  onColumnFiltersChange: updaterOrValue => valueUpdater(updaterOrValue, columnFilters),
  onColumnVisibilityChange: updaterOrValue => valueUpdater(updaterOrValue, columnVisibility),
  onRowSelectionChange: updaterOrValue => valueUpdater(updaterOrValue, rowSelection),
  onPaginationChange: updaterOrValue => {
    valueUpdater(updaterOrValue, pagination)
    setTimeout(() => loadData(), 100)
  },
  state: {
    get sorting() { return sorting.value },
    get columnFilters() { return columnFilters.value },
    get columnVisibility() { return columnVisibility.value },
    get rowSelection() { return rowSelection.value },
    get pagination() { return pagination.value },
  },
})

const currentPage = computed(() => pagination.value.pageIndex + 1)
const pageSize = computed(() => pagination.value.pageSize)
const selectedRows = computed(() => table.getSelectedRowModel().rows.length)

const pageSizeOptions = [5, 10, 20, 30, 50]

const categories = ["Electronics", "Clothing", "Books", "Home & Garden", "Sports", "Toys", "Health", "Beauty", "Automotive", "Office"]

// Load initial data
loadData()
</script>

<template>
  <div class="w-full space-y-4">
    <div class="flex items-center justify-between">
      <div>
        <h3 class="text-lg font-medium">Server-Side Data Table</h3>
        <p class="text-sm text-muted-foreground">
          Server-side pagination, sorting, and filtering with API integration simulation.
        </p>
      </div>
      <Button variant="outline" size="sm" @click="loadData" :disabled="loading">
        <RefreshCcw class="mr-2 h-4 w-4" :class="{ 'animate-spin': loading }" />
        Refresh
      </Button>
    </div>

    <!-- Search and Filter Controls -->
    <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div class="flex flex-1 gap-2">
        <div class="relative max-w-xs">
          <Input
            placeholder="Search products..."
            :model-value="globalFilter"
            @update:model-value="globalFilter = $event"
          />
          <Loader2 v-if="loading" class="absolute right-3 top-3 h-4 w-4 animate-spin" />
        </div>
        <Select v-model="categoryFilter">
          <SelectTrigger class="w-48">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Categories</SelectItem>
            <SelectItem v-for="category in categories" :key="category" :value="category">
              {{ category }}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button variant="outline" size="sm">
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
          <template v-if="!loading && table.getRowModel().rows?.length">
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
          
          <!-- Loading State -->
          <TableRow v-if="loading">
            <TableCell :colspan="columns.length" class="h-24 text-center">
              <div class="flex items-center justify-center space-x-2">
                <Loader2 class="h-4 w-4 animate-spin" />
                <span>Loading products...</span>
              </div>
            </TableCell>
          </TableRow>
          
          <!-- Empty State -->
          <TableRow v-if="!loading && !table.getRowModel().rows?.length">
            <TableCell :colspan="columns.length" class="h-24 text-center">
              No products found.
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>

    <!-- Enhanced Server-Side Pagination Controls -->
    <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <!-- Selection and Data Info -->
      <div class="flex items-center gap-4 text-sm text-muted-foreground">
        <span>
          {{ selectedRows }} of {{ data.length }} row(s) selected
        </span>
        <span>•</span>
        <span>
          {{ totalCount.toLocaleString() }} total products
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
          @update:model-value="(value) => {
            table.setPageSize(Number(value))
            pagination.pageIndex = 0
          }"
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
          :disabled="loading || !table.getCanPreviousPage()"
          @click="table.setPageIndex(0)"
        >
          <ChevronsLeft class="h-4 w-4" />
          <span class="sr-only">Go to first page</span>
        </Button>
        <Button
          variant="outline"
          size="sm"
          :disabled="loading || !table.getCanPreviousPage()"
          @click="table.previousPage()"
        >
          <ChevronLeft class="h-4 w-4" />
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          :disabled="loading || !table.getCanNextPage()"
          @click="table.nextPage()"
        >
          Next
          <ChevronRight class="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          :disabled="loading || !table.getCanNextPage()"
          @click="table.setPageIndex(table.getPageCount() - 1)"
        >
          <ChevronsRight class="h-4 w-4" />
          <span class="sr-only">Go to last page</span>
        </Button>
      </div>
    </div>

    <!-- Server Information Panel -->
    <div class="rounded-lg border bg-muted/50 p-4">
      <h4 class="text-sm font-medium mb-2">Server-Side Features</h4>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
        <div>
          <span class="text-muted-foreground">Pagination:</span>
          <div class="font-medium">Server-side with {{ pageSize }} items per page</div>
        </div>
        <div>
          <span class="text-muted-foreground">Sorting:</span>
          <div class="font-medium">
            {{ sorting.length > 0 
              ? `${sorting[0].id} (${sorting[0].desc ? 'desc' : 'asc'})` 
              : 'None' }}
          </div>
        </div>
        <div>
          <span class="text-muted-foreground">Filtering:</span>
          <div class="font-medium">
            {{ globalFilter || categoryFilter ? 'Active' : 'None' }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>