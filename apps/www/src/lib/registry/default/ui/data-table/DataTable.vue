<script setup lang="ts">
import {
  type ColumnDef,
  FlexRender,
  type SortingState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useVueTable,
} from '@tanstack/vue-table'
import { computed, ref } from 'vue'
import {
  ArrowDownNarrowWide,
  ArrowUpDown,
  ArrowUpNarrowWide,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  X,
} from 'lucide-vue-next'
import {
  Table,
  TableBody,
  TableCell,
  TableEmpty,
  TableHead,
  TableHeader,
  TableRow,
} from '../table'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../dropdown-menu'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from '../select'
import { Input } from '../input'
import { Button } from '../button'
import RadixIconsMixerHorizontal from '~icons/radix-icons/mixer-horizontal'

interface tableProps {
  data: any[]
  columns: ColumnDef<any>[]
}

const props = defineProps<tableProps>()

const sorting = ref<SortingState>([])
const globalFilter = ref('')
const columnVisibility = ref({})
const rowSelection = ref({})
const pageSizes = computed(() => [10, 20, 30, 40, 50])

const table = useVueTable({
  data: props.data,
  columns: props.columns,
  state: {
    get sorting() {
      return sorting.value
    },
    get globalFilter() {
      return globalFilter.value
    },
    get columnVisibility() {
      return columnVisibility.value
    },
    get rowSelection() {
      return rowSelection.value
    },
  },
  onSortingChange: (updaterOrValue) => {
    sorting.value
      = typeof updaterOrValue === 'function'
        ? updaterOrValue(sorting.value)
        : updaterOrValue
  },
  onGlobalFilterChange: (updaterOrValue) => {
    globalFilter.value
      = typeof updaterOrValue === 'function'
        ? updaterOrValue(globalFilter.value)
        : updaterOrValue
  },
  onRowSelectionChange: (updaterOrValue) => {
    rowSelection.value
      = typeof updaterOrValue === 'function'
        ? updaterOrValue(rowSelection.value)
        : updaterOrValue
  },
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
})

function toggleColumnVisibility(column: any) {
  columnVisibility.value = {
    ...columnVisibility.value,
    [column.id]: !column.getIsVisible(),
  }
}

const pageSize = computed({
  get() {
    return table.getState().pagination.pageSize.toString()
  },
  set(value) {
    table.setPageSize(Number(value))
  },
})
</script>

<template>
  <div class="flex items-center justify-between">
    <div class="flex flex-1 items-center space-x-2">
      <div class="w-full max-w-[18rem]">
        <Input
          v-model:value="globalFilter"
          placeholder="Filter tasks..."
          class="h-8"
        />
      </div>
      <Button
        v-if="globalFilter"
        variant="ghost"
        class="h-8"
        @click="globalFilter = ''"
      >
        <span class="text-xs">Reset</span>
        <X class="w-4 h-4 ml-1" />
      </Button>
    </div>
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="outline" class="h-8">
          <RadixIconsMixerHorizontal class="w-3.5 h-3.5 mr-2" />
          <span class="text-xs">View</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" class="w-40">
        <DropdownMenuLabel> Toggle Columns </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuCheckboxItem
            v-for="column in table
              .getAllColumns()
              .filter((column) => !column.getCanHide())"
            :key="column.id"
            :checked="column.getIsVisible()"
            @update:checked="toggleColumnVisibility(column)"
          >
            <span class="text-sm">{{ column.columnDef.header }}</span>
          </DropdownMenuCheckboxItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>

  <Table class="mt-4 rounded-md border border-border">
    <TableHeader>
      <TableRow
        v-for="headerGroup in table.getHeaderGroups()"
        :key="headerGroup.id"
      >
        <TableHead
          v-for="header in headerGroup.headers"
          :key="header.id"
          class="h-10 px-2.5"
          :col-span="header.colSpan"
        >
          <template v-if="!header.isPlaceholder">
            <div class="flex items-center space-x-2">
              <Button
                v-if="header.column.getCanSort()"
                variant="ghost"
                class="h-8 -translate-x-3"
                @click="header.column.getToggleSortingHandler()?.($event)"
              >
                <FlexRender
                  :render="header.column.columnDef.header"
                  :props="header.getContext()"
                />
                <ArrowUpDown
                  v-if="
                    header.column.getCanSort() && !header.column.getIsSorted()
                  "
                  class="w-3.5 h-3.5 ml-1.5 text-muted"
                />
                <ArrowUpNarrowWide
                  v-if="header.column.getIsSorted() === 'asc'"
                  class="w-3.5 h-3.5 ml-1.5 text-muted"
                />
                <ArrowDownNarrowWide
                  v-if="header.column.getIsSorted() === 'desc'"
                  class="w-3.5 h-3.5 ml-1.5 text-muted"
                />
              </Button>
              <span
                v-else
                class="flex items-center justify-center h-8 text-foreground"
              >
                <FlexRender
                  :render="header.column.columnDef.header"
                  :props="header.getContext()"
                />
              </span>
            </div>
          </template>
        </TableHead>
      </TableRow>
    </TableHeader>

    <TableBody>
      <TableRow
        v-for="row in table.getRowModel().rows"
        :key="row.id"
        :class="row.getIsSelected() ? 'bg-outline-hover' : ''"
      >
        <TableCell
          v-for="cell in row.getVisibleCells()"
          :key="cell.id"
          class="p-2.5"
        >
          <FlexRender
            :render="cell.column.columnDef.cell"
            :props="cell.getContext()"
          />
        </TableCell>
      </TableRow>

      <TableEmpty
        v-if="table.getRowModel().rows.length === 0"
        :colspan="table.getAllLeafColumns().length"
      >
        No data available.
      </TableEmpty>
    </TableBody>
  </Table>

  <div class="flex items-center justify-end px-2 my-6">
    <div class="flex-1 text-sm text-muted">
      <span>
        {{ table.getFilteredSelectedRowModel().rows.length }} of {{ " " }}
        {{ table.getFilteredRowModel().rows.length }} row(s) selected
      </span>
    </div>
    <div class="flex items-center space-x-6 lg:space-x-8">
      <div class="md:flex items-center space-x-2 hidden">
        <p class="text-sm font-medium text-foreground">
          Rows per page:
        </p>
        <Select v-model="pageSize">
          <SelectTrigger class="h-8 w-[70px]">
            {{ table.getState().pagination.pageSize }}
          </SelectTrigger>
          <SelectContent side="top" align="start">
            <SelectGroup>
              <SelectItem
                v-for="pageSize in pageSizes"
                :key="pageSize"
                :value="`${pageSize}`"
              >
                {{ pageSize }}
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div
        class="flex text-foreground items-center justify-center text-sm font-medium"
      >
        Page {{ table.getState().pagination.pageIndex + 1 }} of
        {{ table.getPageCount() }}
      </div>

      <div class="flex items-center space-x-2">
        <Button
          variant="outline"
          title="First page"
          class="h-8 w-8 p-0"
          :disabled="!table.getCanPreviousPage()"
          @click="table.setPageIndex(0)"
        >
          <ChevronsLeft class="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          title="Previous page"
          class="h-8 w-8 p-0"
          :disabled="!table.getCanPreviousPage()"
          @click="table.previousPage()"
        >
          <ChevronLeft class="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          title="Next page"
          class="h-8 w-8 p-0"
          :disabled="!table.getCanNextPage()"
          @click="table.nextPage()"
        >
          <ChevronRight class="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          title="Last page"
          class="h-8 w-8 p-0"
          :disabled="!table.getCanNextPage()"
          @click="table.setPageIndex(table.getPageCount() - 1)"
        >
          <ChevronsRight class="w-4 h-4" />
        </Button>
      </div>
    </div>
  </div>
</template>
