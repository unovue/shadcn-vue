<script setup lang="ts">
import type {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
} from "@tanstack/vue-table"
import {
  FlexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useVueTable,
} from "@tanstack/vue-table"
import { 
  ArrowUpDown, 
  ChevronDown, 
  Edit, 
  Eye, 
  MoreHorizontal, 
  Plus, 
  Trash2,
  AlertTriangle
} from "lucide-vue-next"

import { computed, h, ref } from "vue"
import { valueUpdater } from "@/lib/utils"
import { Badge } from "@/registry/new-york/ui/badge"
import { Button } from "@/registry/new-york/ui/button"
import { Checkbox } from "@/registry/new-york/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/registry/new-york/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/registry/new-york/ui/dropdown-menu"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/registry/new-york/ui/form"
import { Input } from "@/registry/new-york/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/new-york/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/registry/new-york/ui/table"
import { Textarea } from "@/registry/new-york/ui/textarea"
import { useToast } from "@/registry/new-york/ui/toast"

export interface Customer {
  id: string
  name: string
  email: string
  company: string
  role: string
  status: "active" | "inactive" | "pending"
  lastContact: string
  value: number
}

// Sample data
const initialData: Customer[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    company: "Acme Corp",
    role: "CEO",
    status: "active",
    lastContact: "2024-01-15",
    value: 150000,
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@techstart.com",
    company: "TechStart Inc",
    role: "CTO",
    status: "pending",
    lastContact: "2024-01-12",
    value: 75000,
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob@innovate.co",
    company: "Innovate Co",
    role: "VP Engineering",
    status: "active",
    lastContact: "2024-01-10",
    value: 120000,
  },
  {
    id: "4",
    name: "Alice Brown",
    email: "alice@futuretech.io",
    company: "FutureTech",
    role: "Product Manager",
    status: "inactive",
    lastContact: "2024-01-08",
    value: 90000,
  },
  {
    id: "5",
    name: "Charlie Wilson",
    email: "charlie@digitalwave.com",
    company: "DigitalWave",
    role: "Director",
    status: "active",
    lastContact: "2024-01-14",
    value: 200000,
  },
]

const data = ref<Customer[]>([...initialData])

// Dialog states
const viewDialogOpen = ref(false)
const editDialogOpen = ref(false)
const deleteDialogOpen = ref(false)
const createDialogOpen = ref(false)
const selectedCustomer = ref<Customer | null>(null)

// Form state
const formData = ref<Partial<Customer>>({})

const { toast } = useToast()

// CRUD Actions
function viewCustomer(customer: Customer) {
  selectedCustomer.value = customer
  viewDialogOpen.value = true
}

function editCustomer(customer: Customer) {
  selectedCustomer.value = customer
  formData.value = { ...customer }
  editDialogOpen.value = true
}

function deleteCustomer(customer: Customer) {
  selectedCustomer.value = customer
  deleteDialogOpen.value = true
}

function createCustomer() {
  formData.value = {
    name: "",
    email: "",
    company: "",
    role: "",
    status: "pending" as const,
    lastContact: new Date().toISOString().split('T')[0],
    value: 0,
  }
  createDialogOpen.value = true
}

function handleCreate() {
  const newCustomer: Customer = {
    ...formData.value as Customer,
    id: Date.now().toString(),
  }
  data.value.unshift(newCustomer)
  createDialogOpen.value = false
  toast({
    title: "Customer created",
    description: `${newCustomer.name} has been added successfully.`,
  })
}

function handleUpdate() {
  if (selectedCustomer.value) {
    const index = data.value.findIndex(c => c.id === selectedCustomer.value!.id)
    if (index !== -1) {
      data.value[index] = { ...formData.value as Customer }
      editDialogOpen.value = false
      toast({
        title: "Customer updated",
        description: `${formData.value.name} has been updated successfully.`,
      })
    }
  }
}

function handleDelete() {
  if (selectedCustomer.value) {
    data.value = data.value.filter(c => c.id !== selectedCustomer.value!.id)
    deleteDialogOpen.value = false
    toast({
      title: "Customer deleted",
      description: `${selectedCustomer.value.name} has been removed.`,
    })
  }
}

function bulkDelete() {
  const selectedRows = table.getFilteredSelectedRowModel().rows
  const selectedIds = selectedRows.map(row => row.original.id)
  data.value = data.value.filter(c => !selectedIds.includes(c.id))
  table.resetRowSelection()
  toast({
    title: "Customers deleted",
    description: `${selectedRows.length} customer(s) have been removed.`,
  })
}

// Table column definitions with action buttons
const columns: ColumnDef<Customer>[] = [
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
    cell: ({ row }) => {
      const customer = row.original
      return h("div", { class: "font-medium" }, [
        h("div", {}, customer.name),
        h("div", { class: "text-sm text-muted-foreground" }, customer.email),
      ])
    },
  },
  {
    accessorKey: "company",
    header: "Company",
    cell: ({ row }) => {
      const customer = row.original
      return h("div", {}, [
        h("div", { class: "font-medium" }, customer.company),
        h("div", { class: "text-sm text-muted-foreground" }, customer.role),
      ])
    },
  },
  {
    accessorKey: "value",
    header: ({ column }) => {
      return h(Button, {
        variant: "ghost",
        onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
      }, () => ["Value", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })])
    },
    cell: ({ row }) => {
      const value = Number.parseFloat(row.getValue("value"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(value)
      return h("div", { class: "text-right font-medium" }, formatted)
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      const statusClasses = {
        "active": "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
        "inactive": "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400",
        "pending": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
      }
      return h("span", { 
        class: `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusClasses[status as keyof typeof statusClasses]}` 
      }, status)
    },
  },
  {
    accessorKey: "lastContact",
    header: "Last Contact",
    cell: ({ row }) => {
      const date = new Date(row.getValue("lastContact"))
      return h("div", { class: "text-sm" }, date.toLocaleDateString())
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const customer = row.original
      return h("div", { class: "text-right" }, [
        h(Button, {
          variant: "ghost",
          size: "sm",
          onClick: () => viewCustomer(customer),
          class: "mr-1",
        }, () => [h(Eye, { class: "h-4 w-4" })]),
        h(Button, {
          variant: "ghost",
          size: "sm",
          onClick: () => editCustomer(customer),
          class: "mr-1",
        }, () => [h(Edit, { class: "h-4 w-4" })]),
        h(DropdownMenu, {}, () => [
          h(DropdownMenuTrigger, { asChild: true }, () => [
            h(Button, {
              variant: "ghost",
              class: "h-8 w-8 p-0",
            }, () => [
              h("span", { class: "sr-only" }, "Open menu"),
              h(MoreHorizontal, { class: "h-4 w-4" }),
            ])
          ]),
          h(DropdownMenuContent, { align: "end" }, () => [
            h(DropdownMenuLabel, {}, "Actions"),
            h(DropdownMenuItem, { onClick: () => viewCustomer(customer) }, () => [
              h(Eye, { class: "mr-2 h-4 w-4" }),
              "View details"
            ]),
            h(DropdownMenuItem, { onClick: () => editCustomer(customer) }, () => [
              h(Edit, { class: "mr-2 h-4 w-4" }),
              "Edit customer"
            ]),
            h(DropdownMenuSeparator),
            h(DropdownMenuItem, { 
              onClick: () => deleteCustomer(customer),
              class: "text-red-600 focus:text-red-600 dark:text-red-400"
            }, () => [
              h(Trash2, { class: "mr-2 h-4 w-4" }),
              "Delete customer"
            ]),
          ])
        ])
      ])
    },
  },
]

const sorting = ref<SortingState>([])
const columnFilters = ref<ColumnFiltersState>([])
const columnVisibility = ref<VisibilityState>({})
const rowSelection = ref({})

const table = useVueTable({
  get data() { return data.value },
  columns,
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  onSortingChange: updaterOrValue => valueUpdater(updaterOrValue, sorting),
  onColumnFiltersChange: updaterOrValue => valueUpdater(updaterOrValue, columnFilters),
  onColumnVisibilityChange: updaterOrValue => valueUpdater(updaterOrValue, columnVisibility),
  onRowSelectionChange: updaterOrValue => valueUpdater(updaterOrValue, rowSelection),
  state: {
    get sorting() { return sorting.value },
    get columnFilters() { return columnFilters.value },
    get columnVisibility() { return columnVisibility.value },
    get rowSelection() { return rowSelection.value },
  },
})

const selectedRowsCount = computed(() => table.getFilteredSelectedRowModel().rows.length)
</script>

<template>
  <div class="w-full space-y-4">
    <div class="flex items-center justify-between">
      <div>
        <h3 class="text-lg font-medium">CRUD Actions Example</h3>
        <p class="text-sm text-muted-foreground">
          Complete CRUD operations with modals for create, read, update, and delete actions.
        </p>
      </div>
      <Button @click="createCustomer" class="ml-auto">
        <Plus class="mr-2 h-4 w-4" />
        Add Customer
      </Button>
    </div>

    <!-- Toolbar -->
    <div class="flex items-center justify-between">
      <div class="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter customers..."
          :model-value="table.getColumn('name')?.getFilterValue() as string"
          @update:model-value="table.getColumn('name')?.setFilterValue($event)"
          class="max-w-sm"
        />
        <Select
          :model-value="table.getColumn('status')?.getFilterValue() as string"
          @update:model-value="table.getColumn('status')?.setFilterValue($event)"
        >
          <SelectTrigger class="w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div class="flex items-center space-x-2">
        <Button
          v-if="selectedRowsCount > 0"
          variant="destructive"
          size="sm"
          @click="bulkDelete"
        >
          <Trash2 class="mr-2 h-4 w-4" />
          Delete Selected ({{ selectedRowsCount }})
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

    <!-- View Customer Dialog -->
    <Dialog v-model:open="viewDialogOpen">
      <DialogContent class="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Customer Details</DialogTitle>
          <DialogDescription>
            View detailed information about {{ selectedCustomer?.name }}
          </DialogDescription>
        </DialogHeader>
        <div v-if="selectedCustomer" class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="text-sm font-medium">Name</label>
              <p class="text-sm text-muted-foreground">{{ selectedCustomer.name }}</p>
            </div>
            <div>
              <label class="text-sm font-medium">Email</label>
              <p class="text-sm text-muted-foreground">{{ selectedCustomer.email }}</p>
            </div>
            <div>
              <label class="text-sm font-medium">Company</label>
              <p class="text-sm text-muted-foreground">{{ selectedCustomer.company }}</p>
            </div>
            <div>
              <label class="text-sm font-medium">Role</label>
              <p class="text-sm text-muted-foreground">{{ selectedCustomer.role }}</p>
            </div>
            <div>
              <label class="text-sm font-medium">Status</label>
              <Badge :variant="selectedCustomer.status === 'active' ? 'default' : selectedCustomer.status === 'pending' ? 'secondary' : 'outline'">
                {{ selectedCustomer.status }}
              </Badge>
            </div>
            <div>
              <label class="text-sm font-medium">Value</label>
              <p class="text-sm text-muted-foreground">
                {{ new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(selectedCustomer.value) }}
              </p>
            </div>
            <div class="col-span-2">
              <label class="text-sm font-medium">Last Contact</label>
              <p class="text-sm text-muted-foreground">{{ new Date(selectedCustomer.lastContact).toLocaleDateString() }}</p>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" @click="viewDialogOpen = false">Close</Button>
          <Button @click="editCustomer(selectedCustomer!)">Edit Customer</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    <!-- Create/Edit Customer Dialog -->
    <Dialog :open="createDialogOpen || editDialogOpen" @update:open="(value) => { if (!value) { createDialogOpen = false; editDialogOpen = false; } }">
      <DialogContent class="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{{ createDialogOpen ? 'Create' : 'Edit' }} Customer</DialogTitle>
          <DialogDescription>
            {{ createDialogOpen ? 'Add a new customer to your database.' : 'Make changes to the customer information.' }}
          </DialogDescription>
        </DialogHeader>
        <div class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="text-sm font-medium">Name</label>
              <Input v-model="formData.name" placeholder="Enter name" />
            </div>
            <div>
              <label class="text-sm font-medium">Email</label>
              <Input v-model="formData.email" type="email" placeholder="Enter email" />
            </div>
            <div>
              <label class="text-sm font-medium">Company</label>
              <Input v-model="formData.company" placeholder="Enter company" />
            </div>
            <div>
              <label class="text-sm font-medium">Role</label>
              <Input v-model="formData.role" placeholder="Enter role" />
            </div>
            <div>
              <label class="text-sm font-medium">Status</label>
              <Select v-model="formData.status">
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label class="text-sm font-medium">Value</label>
              <Input v-model.number="formData.value" type="number" placeholder="Enter value" />
            </div>
            <div class="col-span-2">
              <label class="text-sm font-medium">Last Contact</label>
              <Input v-model="formData.lastContact" type="date" />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" @click="createDialogOpen = false; editDialogOpen = false">Cancel</Button>
          <Button @click="createDialogOpen ? handleCreate() : handleUpdate()">
            {{ createDialogOpen ? 'Create' : 'Update' }} Customer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    <!-- Delete Confirmation Dialog -->
    <Dialog v-model:open="deleteDialogOpen">
      <DialogContent class="sm:max-w-md">
        <DialogHeader>
          <DialogTitle class="flex items-center gap-2">
            <AlertTriangle class="h-5 w-5 text-red-500" />
            Delete Customer
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to delete {{ selectedCustomer?.name }}? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" @click="deleteDialogOpen = false">Cancel</Button>
          <Button variant="destructive" @click="handleDelete">Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>