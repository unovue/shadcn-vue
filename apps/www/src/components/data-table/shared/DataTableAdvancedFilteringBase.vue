<script setup lang="ts" generic="TData, TValue">
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
  getFacetedRowModel,
  getFacetedUniqueValues,
  getPaginationRowModel,
  getSortedRowModel,
  useVueTable,
} from "@tanstack/vue-table"
import { ArrowUpDown, ChevronDown, Filter, X } from "lucide-vue-next"

import { computed, h, ref } from "vue"
import { valueUpdater } from "@/lib/utils"

export interface Employee {
  id: string
  name: string
  email: string
  role: string
  department: string
  salary: number
  experience: number
  status: "active" | "inactive" | "on-leave"
  joinDate: string
}

// Props for UI components - to be injected by style-specific wrappers
interface UIComponents {
  Badge: any
  Button: any
  Checkbox: any
  DropdownMenu: any
  DropdownMenuCheckboxItem: any
  DropdownMenuContent: any
  DropdownMenuTrigger: any
  DropdownMenuSeparator: any
  DropdownMenuLabel: any
  Input: any
  Label: any
  Popover: any
  PopoverContent: any
  PopoverTrigger: any
  Select: any
  SelectContent: any
  SelectItem: any
  SelectTrigger: any
  SelectValue: any
  Slider: any
  Table: any
  TableBody: any
  TableCell: any
  TableHead: any
  TableHeader: any
  TableRow: any
}

const props = defineProps<{
  uiComponents: UIComponents
}>()

const { 
  Badge,
  Button, 
  Checkbox, 
  DropdownMenu, 
  DropdownMenuCheckboxItem, 
  DropdownMenuContent, 
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  Input,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Slider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} = props.uiComponents

// Generate sample employee data
const generateEmployees = (count: number): Employee[] => {
  const roles = ["Software Engineer", "Product Manager", "Designer", "Data Scientist", "DevOps Engineer", "QA Engineer"]
  const departments = ["Engineering", "Product", "Design", "Data", "Operations", "Quality Assurance"]
  const statuses: Employee['status'][] = ["active", "inactive", "on-leave"]
  
  return Array.from({ length: count }, (_, i) => ({
    id: `emp-${i + 1}`,
    name: `Employee ${i + 1}`,
    email: `employee${i + 1}@company.com`,
    role: roles[i % roles.length],
    department: departments[i % departments.length],
    salary: Math.floor(Math.random() * 100000) + 40000,
    experience: Math.floor(Math.random() * 15) + 1,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    joinDate: new Date(2020 + Math.floor(Math.random() * 4), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
  }))
}

const data = generateEmployees(150)

const columns: ColumnDef<Employee>[] = [
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
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => h("div", { class: "lowercase" }, row.getValue("email")),
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => h("div", {}, row.getValue("role")),
    filterFn: (row, id, value: string[]) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "department",
    header: "Department",
    cell: ({ row }) => h("div", {}, row.getValue("department")),
    filterFn: (row, id, value: string[]) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "salary",
    header: ({ column }) => {
      return h(Button, {
        variant: "ghost",
        onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
      }, () => ["Salary", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })])
    },
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue("salary"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)
      return h("div", { class: "text-right font-medium" }, formatted)
    },
    filterFn: (row, id, value: [number, number]) => {
      const [min, max] = value
      const rowValue = row.getValue(id) as number
      return rowValue >= min && rowValue <= max
    },
  },
  {
    accessorKey: "experience",
    header: ({ column }) => {
      return h(Button, {
        variant: "ghost",
        onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
      }, () => ["Experience", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })])
    },
    cell: ({ row }) => h("div", { class: "text-center" }, `${row.getValue("experience")} years`),
    filterFn: (row, id, value: [number, number]) => {
      const [min, max] = value
      const rowValue = row.getValue(id) as number
      return rowValue >= min && rowValue <= max
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
        "on-leave": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
      }
      return h("span", { 
        class: `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusClasses[status as keyof typeof statusClasses]}` 
      }, status.replace("-", " "))
    },
    filterFn: (row, id, value: string[]) => {
      return value.includes(row.getValue(id))
    },
  },
]

const sorting = ref<SortingState>([])
const columnFilters = ref<ColumnFiltersState>([])
const columnVisibility = ref<VisibilityState>({})
const rowSelection = ref({})

// Filter states
const globalFilter = ref("")
const salaryRange = ref([40000, 140000])
const experienceRange = ref([1, 15])

const table = useVueTable({
  data,
  columns,
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  getFacetedRowModel: getFacetedRowModel(),
  getFacetedUniqueValues: getFacetedUniqueValues(),
  onSortingChange: updaterOrValue => valueUpdater(updaterOrValue, sorting),
  onColumnFiltersChange: updaterOrValue => valueUpdater(updaterOrValue, columnFilters),
  onColumnVisibilityChange: updaterOrValue => valueUpdater(updaterOrValue, columnVisibility),
  onRowSelectionChange: updaterOrValue => valueUpdater(updaterOrValue, rowSelection),
  onGlobalFilterChange: updaterOrValue => valueUpdater(updaterOrValue, globalFilter),
  globalFilterFn: "includesString",
  state: {
    get sorting() { return sorting.value },
    get columnFilters() { return columnFilters.value },
    get columnVisibility() { return columnVisibility.value },
    get rowSelection() { return rowSelection.value },
    get globalFilter() { return globalFilter.value },
  },
})

// Get unique values for faceted filters
const uniqueRoles = computed(() => {
  const roleColumn = table.getColumn('role')
  return roleColumn ? Array.from(roleColumn.getFacetedUniqueValues().keys()).sort() : []
})

const uniqueDepartments = computed(() => {
  const deptColumn = table.getColumn('department')
  return deptColumn ? Array.from(deptColumn.getFacetedUniqueValues().keys()).sort() : []
})

const uniqueStatuses = computed(() => {
  const statusColumn = table.getColumn('status')
  return statusColumn ? Array.from(statusColumn.getFacetedUniqueValues().keys()).sort() : []
})

// Active filters
const activeFilters = computed(() => {
  const filters = []
  
  if (globalFilter.value) {
    filters.push({ key: 'global', label: `Search: "${globalFilter.value}"` })
  }
  
  columnFilters.value.forEach(filter => {
    if (filter.id === 'role' && Array.isArray(filter.value) && filter.value.length > 0) {
      filters.push({ key: 'role', label: `Role: ${filter.value.join(', ')}` })
    }
    if (filter.id === 'department' && Array.isArray(filter.value) && filter.value.length > 0) {
      filters.push({ key: 'department', label: `Department: ${filter.value.join(', ')}` })
    }
    if (filter.id === 'status' && Array.isArray(filter.value) && filter.value.length > 0) {
      filters.push({ key: 'status', label: `Status: ${filter.value.join(', ')}` })
    }
    if (filter.id === 'salary' && Array.isArray(filter.value)) {
      const [min, max] = filter.value as number[]
      filters.push({ key: 'salary', label: `Salary: $${min.toLocaleString()} - $${max.toLocaleString()}` })
    }
    if (filter.id === 'experience' && Array.isArray(filter.value)) {
      const [min, max] = filter.value as number[]
      filters.push({ key: 'experience', label: `Experience: ${min} - ${max} years` })
    }
  })
  
  return filters
})

function clearFilter(filterKey: string) {
  if (filterKey === 'global') {
    globalFilter.value = ""
  } else if (filterKey === 'salary') {
    salaryRange.value = [40000, 140000]
    table.getColumn('salary')?.setFilterValue(undefined)
  } else if (filterKey === 'experience') {
    experienceRange.value = [1, 15]
    table.getColumn('experience')?.setFilterValue(undefined)
  } else {
    table.getColumn(filterKey)?.setFilterValue(undefined)
  }
}

function clearAllFilters() {
  globalFilter.value = ""
  salaryRange.value = [40000, 140000]
  experienceRange.value = [1, 15]
  table.resetColumnFilters()
}

// Apply range filters
function applySalaryFilter() {
  table.getColumn('salary')?.setFilterValue(salaryRange.value)
}

function applyExperienceFilter() {
  table.getColumn('experience')?.setFilterValue(experienceRange.value)
}
</script>

<template>
  <div class="w-full space-y-4">
    <div>
      <h3 class="text-lg font-medium">Advanced Filtering Example</h3>
      <p class="text-sm text-muted-foreground">
        Comprehensive filtering with global search, faceted filters, range filters, and multi-select options.
      </p>
    </div>

    <!-- Search and Filter Controls -->
    <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <!-- Global Search -->
      <div class="flex flex-1 gap-2">
        <Input
          class="max-w-xs"
          placeholder="Search all columns..."
          :model-value="globalFilter"
          @update:model-value="globalFilter = $event"
        />
      </div>

      <!-- Filter Controls -->
      <div class="flex items-center gap-2">
        <!-- Role Filter -->
        <Popover>
          <PopoverTrigger as-child>
            <Button variant="outline" size="sm" class="border-dashed">
              <Filter class="mr-2 h-4 w-4" />
              Role
              <Badge
                v-if="(table.getColumn('role')?.getFilterValue() as string[] | undefined)?.length"
                variant="secondary"
                class="ml-2 rounded-sm px-1 font-normal"
              >
                {{ (table.getColumn('role')?.getFilterValue() as string[] | undefined)?.length }}
              </Badge>
            </Button>
          </PopoverTrigger>
          <PopoverContent class="w-56 p-0" align="start">
            <div class="p-3">
              <div class="space-y-2">
                <div class="font-medium text-sm">Select Roles</div>
                <div class="max-h-48 overflow-auto">
                  <div v-for="role in uniqueRoles" :key="role" class="flex items-center space-x-2">
                    <Checkbox
                      :id="`role-${role}`"
                      :model-value="(table.getColumn('role')?.getFilterValue() as string[] | undefined)?.includes(role) || false"
                      @update:model-value="(checked: boolean) => {
                        const currentValue = (table.getColumn('role')?.getFilterValue() as string[]) || []
                        const newValue = checked
                          ? [...currentValue, role]
                          : currentValue.filter((v: string) => v !== role)
                        table.getColumn('role')?.setFilterValue(newValue.length ? newValue : undefined)
                      }"
                    />
                    <Label :for="`role-${role}`" class="text-sm font-normal">
                      {{ role }}
                    </Label>
                  </div>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        <!-- Department Filter -->
        <Popover>
          <PopoverTrigger as-child>
            <Button variant="outline" size="sm" class="border-dashed">
              <Filter class="mr-2 h-4 w-4" />
              Department
              <Badge
                v-if="(table.getColumn('department')?.getFilterValue() as string[] | undefined)?.length"
                variant="secondary"
                class="ml-2 rounded-sm px-1 font-normal"
              >
                {{ (table.getColumn('department')?.getFilterValue() as string[] | undefined)?.length }}
              </Badge>
            </Button>
          </PopoverTrigger>
          <PopoverContent class="w-56 p-0" align="start">
            <div class="p-3">
              <div class="space-y-2">
                <div class="font-medium text-sm">Select Departments</div>
                <div class="max-h-48 overflow-auto">
                  <div v-for="dept in uniqueDepartments" :key="dept" class="flex items-center space-x-2">
                    <Checkbox
                      :id="`dept-${dept}`"
                      :model-value="(table.getColumn('department')?.getFilterValue() as string[] | undefined)?.includes(dept) || false"
                      @update:model-value="(checked: boolean) => {
                        const currentValue = (table.getColumn('department')?.getFilterValue() as string[]) || []
                        const newValue = checked
                          ? [...currentValue, dept]
                          : currentValue.filter((v: string) => v !== dept)
                        table.getColumn('department')?.setFilterValue(newValue.length ? newValue : undefined)
                      }"
                    />
                    <Label :for="`dept-${dept}`" class="text-sm font-normal">
                      {{ dept }}
                    </Label>
                  </div>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        <!-- Status Filter -->
        <Select
          :model-value="(table.getColumn('status')?.getFilterValue() as string[] | undefined)?.[0] || ''"
          @update:model-value="(value: string) => {
            table.getColumn('status')?.setFilterValue(value ? [value] : undefined)
          }"
        >
          <SelectTrigger class="w-32">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Status</SelectItem>
            <SelectItem v-for="status in uniqueStatuses" :key="status" :value="status">
              {{ status.replace('-', ' ') }}
            </SelectItem>
          </SelectContent>
        </Select>

        <!-- Salary Range Filter -->
        <Popover>
          <PopoverTrigger as-child>
            <Button variant="outline" size="sm" class="border-dashed">
              <Filter class="mr-2 h-4 w-4" />
              Salary
              <Badge
                v-if="table.getColumn('salary')?.getFilterValue()"
                variant="secondary"
                class="ml-2 rounded-sm px-1 font-normal"
              >
                Range
              </Badge>
            </Button>
          </PopoverTrigger>
          <PopoverContent class="w-80 p-4" align="start">
            <div class="space-y-4">
              <div class="font-medium text-sm">Salary Range</div>
              <div class="px-3">
                <Slider
                  :model-value="salaryRange"
                  @update:model-value="salaryRange = $event"
                  :min="40000"
                  :max="140000"
                  :step="5000"
                  class="w-full"
                />
              </div>
              <div class="flex items-center justify-between text-sm text-muted-foreground">
                <span>${{ salaryRange[0].toLocaleString() }}</span>
                <span>${{ salaryRange[1].toLocaleString() }}</span>
              </div>
              <Button @click="applySalaryFilter" size="sm" class="w-full">
                Apply Filter
              </Button>
            </div>
          </PopoverContent>
        </Popover>

        <!-- Experience Range Filter -->
        <Popover>
          <PopoverTrigger as-child>
            <Button variant="outline" size="sm" class="border-dashed">
              <Filter class="mr-2 h-4 w-4" />
              Experience
              <Badge
                v-if="table.getColumn('experience')?.getFilterValue()"
                variant="secondary"
                class="ml-2 rounded-sm px-1 font-normal"
              >
                Range
              </Badge>
            </Button>
          </PopoverTrigger>
          <PopoverContent class="w-80 p-4" align="start">
            <div class="space-y-4">
              <div class="font-medium text-sm">Experience Range (Years)</div>
              <div class="px-3">
                <Slider
                  :model-value="experienceRange"
                  @update:model-value="experienceRange = $event"
                  :min="1"
                  :max="15"
                  :step="1"
                  class="w-full"
                />
              </div>
              <div class="flex items-center justify-between text-sm text-muted-foreground">
                <span>{{ experienceRange[0] }} years</span>
                <span>{{ experienceRange[1] }} years</span>
              </div>
              <Button @click="applyExperienceFilter" size="sm" class="w-full">
                Apply Filter
              </Button>
            </div>
          </PopoverContent>
        </Popover>

        <!-- Column Visibility -->
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button variant="outline" size="sm">
              Columns <ChevronDown class="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" class="w-48">
            <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
            <DropdownMenuSeparator />
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

    <!-- Active Filters Display -->
    <div v-if="activeFilters.length > 0" class="flex items-center gap-2 flex-wrap">
      <span class="text-sm font-medium">Active filters:</span>
      <Badge
        v-for="filter in activeFilters"
        :key="filter.key"
        variant="secondary"
        class="cursor-pointer"
        @click="clearFilter(filter.key)"
      >
        {{ filter.label }}
        <X class="ml-1 h-3 w-3" />
      </Badge>
      <Button
        variant="ghost"
        size="sm"
        class="h-6 px-2 py-0 text-xs"
        @click="clearAllFilters"
      >
        Clear all
      </Button>
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
              No results found.
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>

    <!-- Pagination -->
    <div class="flex items-center justify-between space-x-2 py-4">
      <div class="flex-1 text-sm text-muted-foreground">
        {{ table.getFilteredSelectedRowModel().rows.length }} of
        {{ table.getFilteredRowModel().rows.length }} row(s) selected
        <span v-if="activeFilters.length > 0" class="ml-2">
          (filtered from {{ data.length }} total)
        </span>
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