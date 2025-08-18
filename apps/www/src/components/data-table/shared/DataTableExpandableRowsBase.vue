<script setup lang="ts" generic="TData extends Record<string, unknown>">
import type {
  ColumnDef,
  ColumnFiltersState,
  ExpandedState,
  SortingState,
  VisibilityState,
} from "@tanstack/vue-table"
import {
  FlexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useVueTable,
} from "@tanstack/vue-table"
import { 
  ArrowUpDown, 
  ChevronDown, 
  ChevronRight, 
  Eye, 
  Package,
  User,
  Calendar,
  DollarSign,
  MapPin,
  Phone
} from "lucide-vue-next"

import { h, ref } from "vue"
import { valueUpdater } from "@/lib/utils"
import type { Order, OrderItem, ShippingInfo, PaymentInfo } from "./types"
import { generateOrders } from "./types"
import type { ExpandableRowsUIComponents } from "./ui-components"

const props = defineProps<{
  data?: TData[]
  columns?: ColumnDef<TData>[]
  uiComponents: ExpandableRowsUIComponents
}>()

const { 
  Badge,
  Button, 
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Checkbox, 
  DropdownMenu, 
  DropdownMenuCheckboxItem, 
  DropdownMenuContent, 
  DropdownMenuTrigger,
  Input,
  Separator,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} = props.uiComponents

// Use provided data or generate default orders
const data = (props.data || generateOrders()) as TData[]

const defaultColumns: ColumnDef<TData>[] = [
  {
    id: "expand",
    header: "",
    cell: ({ row }) => {
      return h(Button, {
        variant: "ghost",
        size: "sm",
        onClick: () => row.toggleExpanded(),
        class: "p-0 w-8 h-8",
      }, () => [
        h(row.getIsExpanded() ? ChevronDown : ChevronRight, { class: "h-4 w-4" })
      ])
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "select",
    header: ({ table }) => h(Checkbox, {
      "modelValue": table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate"),
      "onUpdate:modelValue": (value: boolean) => table.toggleAllPageRowsSelected(!!value),
      "ariaLabel": "Select all",
    }),
    cell: ({ row }) => h(Checkbox, {
      "modelValue": row.getIsSelected(),
      "onUpdate:modelValue": (value: boolean) => row.toggleSelected(!!value),
      "ariaLabel": "Select row",
    }),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => {
      return h(Button, {
        variant: "ghost",
        onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
      }, () => ["Order ID", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })])
    },
    cell: ({ row }) => h("div", { class: "font-medium" }, row.getValue("id")),
  },
  {
    accessorKey: "customerName",
    header: ({ column }) => {
      return h(Button, {
        variant: "ghost",
        onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
      }, () => ["Customer", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })])
    },
cell: ({ row }) => {
      const order = row.original as Record<string, unknown>
      return h("div", {}, [
        h("div", { class: "font-medium" }, order.customerName as string),
        h("div", { class: "text-sm text-muted-foreground" }, order.customerEmail as string),
      ])
    },
  },
  {
    accessorKey: "orderDate",
    header: ({ column }) => {
      return h(Button, {
        variant: "ghost",
        onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
      }, () => ["Date", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })])
    },
cell: ({ row }) => {
      const date = new Date(row.getValue("orderDate") as string)
      return h("div", { class: "text-sm" }, date.toLocaleDateString())
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      const statusClasses = {
        "pending": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
        "processing": "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
        "shipped": "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400",
        "delivered": "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
        "cancelled": "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
      }
      return h("span", { 
        class: `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusClasses[status as keyof typeof statusClasses]}` 
      }, status)
    },
  },
  {
    accessorKey: "total",
    header: ({ column }) => {
      return h(Button, {
        variant: "ghost",
        onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
      }, () => ["Total", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })])
    },
cell: ({ row }) => {
      const total = Number.parseFloat(row.getValue("total") as string)
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(total)
      return h("div", { class: "text-right font-medium" }, formatted)
    },
  },
  {
    id: "items",
    header: "Items",
cell: ({ row }) => {
      const order = row.original as Record<string, unknown>
      const items = order.items as OrderItem[]
      return h("div", { class: "text-sm text-muted-foreground" }, `${items.length} item(s)`)
    },
  },
]

const columns = props.columns || defaultColumns

const sorting = ref<SortingState>([])
const columnFilters = ref<ColumnFiltersState>([])
const columnVisibility = ref<VisibilityState>({})
const rowSelection = ref({})
const expanded = ref<ExpandedState>({})

const table = useVueTable({
  data,
  columns,
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  getExpandedRowModel: getExpandedRowModel(),
  onSortingChange: updaterOrValue => valueUpdater(updaterOrValue, sorting),
  onColumnFiltersChange: updaterOrValue => valueUpdater(updaterOrValue, columnFilters),
  onColumnVisibilityChange: updaterOrValue => valueUpdater(updaterOrValue, columnVisibility),
  onRowSelectionChange: updaterOrValue => valueUpdater(updaterOrValue, rowSelection),
  onExpandedChange: updaterOrValue => valueUpdater(updaterOrValue, expanded),
  state: {
    get sorting() { return sorting.value },
    get columnFilters() { return columnFilters.value },
    get columnVisibility() { return columnVisibility.value },
    get rowSelection() { return rowSelection.value },
    get expanded() { return expanded.value },
  },
})
</script>

<template>
  <div class="w-full space-y-4">
    <div>
      <h3 class="text-lg font-medium">Expandable Rows Example</h3>
      <p class="text-sm text-muted-foreground">
        Click the expand button or arrow to view detailed information for each order.
      </p>
    </div>

    <!-- Controls -->
    <div class="flex items-center justify-between">
      <div class="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter orders..."
          :model-value="table.getColumn('customerName')?.getFilterValue() as string"
@update:model-value="(value: string) => table.getColumn('customerName')?.setFilterValue(value)"
          class="max-w-sm"
        />
      </div>
      
      <div class="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          @click="table.toggleAllRowsExpanded()"
        >
          {{ table.getIsAllRowsExpanded() ? 'Collapse All' : 'Expand All' }}
        </Button>
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
            <template v-for="row in table.getRowModel().rows" :key="row.id">
              <!-- Main Row -->
              <TableRow :data-state="row.getIsSelected() && 'selected'">
                <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                  <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
                </TableCell>
              </TableRow>
              
              <!-- Expanded Content Row -->
              <TableRow v-if="row.getIsExpanded()" class="bg-muted/30">
                <TableCell :colspan="row.getAllCells().length" class="p-0">
                  <div class="p-6 border-t">
                    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <!-- Customer Information -->
                      <Card>
                        <CardHeader class="pb-3">
                          <CardTitle class="flex items-center gap-2 text-base">
                            <User class="h-4 w-4" />
                            Customer Information
                          </CardTitle>
                        </CardHeader>
<CardContent class="space-y-3">
                          <div>
                            <p class="text-sm font-medium">{{ (row.original as Record<string, unknown>).customerName }}</p>
                            <p class="text-xs text-muted-foreground">{{ (row.original as Record<string, unknown>).customerEmail }}</p>
                          </div>
                          <div class="flex items-center gap-2">
                            <Phone class="h-3 w-3 text-muted-foreground" />
                            <span class="text-xs">{{ (row.original as Record<string, unknown>).customerPhone }}</span>
                          </div>
                          <div class="flex items-start gap-2">
                            <MapPin class="h-3 w-3 text-muted-foreground mt-0.5" />
                            <span class="text-xs">{{ (row.original as Record<string, unknown>).customerAddress }}</span>
                          </div>
                        </CardContent>
                      </Card>

                      <!-- Order Items -->
                      <Card>
                        <CardHeader class="pb-3">
                          <CardTitle class="flex items-center gap-2 text-base">
                            <Package class="h-4 w-4" />
                            Order Items
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
<div class="space-y-3">
                            <div 
                              v-for="item in ((row.original as Record<string, unknown>).items as OrderItem[])" 
                              :key="item.id"
                              class="flex items-center justify-between pb-2 border-b border-muted last:border-0 last:pb-0"
                            >
                              <div class="flex-1">
                                <p class="text-sm font-medium">{{ item.name }}</p>
                                <p class="text-xs text-muted-foreground">Qty: {{ item.quantity }}</p>
                              </div>
                              <div class="text-right">
                                <p class="text-sm font-medium">
                                  {{ new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(item.price) }}
                                </p>
                              </div>
                            </div>
                            <Separator />
                            <div class="flex items-center justify-between">
                              <p class="text-sm font-medium">Total</p>
                              <p class="text-sm font-bold">
                                {{ new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format((row.original as Record<string, unknown>).total as number) }}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <!-- Shipping & Payment -->
                      <div class="space-y-4">
                        <!-- Shipping Info -->
                        <Card>
                          <CardHeader class="pb-3">
                            <CardTitle class="flex items-center gap-2 text-base">
                              <Package class="h-4 w-4" />
                              Shipping
                            </CardTitle>
                          </CardHeader>
<CardContent class="space-y-2">
                            <div>
                              <p class="text-xs text-muted-foreground">Carrier</p>
                              <p class="text-sm font-medium">{{ ((row.original as Record<string, unknown>).shippingInfo as ShippingInfo).carrier }}</p>
                            </div>
                            <div>
                              <p class="text-xs text-muted-foreground">Tracking</p>
                              <p class="text-sm font-mono">{{ ((row.original as Record<string, unknown>).shippingInfo as ShippingInfo).trackingNumber }}</p>
                            </div>
                            <div>
                              <p class="text-xs text-muted-foreground">Est. Delivery</p>
                              <p class="text-sm">{{ new Date(((row.original as Record<string, unknown>).shippingInfo as ShippingInfo).estimatedDelivery).toLocaleDateString() }}</p>
                            </div>
                          </CardContent>
                        </Card>

                        <!-- Payment Info -->
                        <Card>
                          <CardHeader class="pb-3">
                            <CardTitle class="flex items-center gap-2 text-base">
                              <DollarSign class="h-4 w-4" />
                              Payment
                            </CardTitle>
                          </CardHeader>
<CardContent class="space-y-2">
                            <div>
                              <p class="text-xs text-muted-foreground">Method</p>
                              <p class="text-sm font-medium">
                                {{ ((row.original as Record<string, unknown>).paymentInfo as PaymentInfo).method }}
                                <span v-if="((row.original as Record<string, unknown>).paymentInfo as PaymentInfo).cardLast4" class="text-muted-foreground">
                                  •••• {{ ((row.original as Record<string, unknown>).paymentInfo as PaymentInfo).cardLast4 }}
                                </span>
                              </p>
                            </div>
                            <div>
                              <p class="text-xs text-muted-foreground">Transaction ID</p>
                              <p class="text-sm font-mono">{{ ((row.original as Record<string, unknown>).paymentInfo as PaymentInfo).transactionId }}</p>
                            </div>
                            <div>
                              <p class="text-xs text-muted-foreground">Paid At</p>
                              <p class="text-sm">{{ new Date(((row.original as Record<string, unknown>).paymentInfo as PaymentInfo).paidAt).toLocaleString() }}</p>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            </template>
          </template>
          <TableRow v-else>
            <TableCell :colspan="columns.length" class="h-24 text-center">
              No results.
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>

    <!-- Pagination -->
    <div class="flex items-center justify-end space-x-2 py-4">
      <div class="flex-1 text-sm text-muted-foreground">
        {{ table.getFilteredSelectedRowModel().rows.length }} of
        {{ table.getFilteredRowModel().rows.length }} row(s) selected.
      </div>
      <div class="space-x-2">
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
  </div>
</template>