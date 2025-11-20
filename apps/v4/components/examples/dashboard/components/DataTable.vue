<script lang="ts">
import { toast } from 'vue-sonner'
import { z } from 'zod'
import { Input } from '~/registry/new-york-v4/ui/input'
import DraggableRow from './DraggableRow.vue'
import DragHandle from './DragHandle.vue'

export const schema = z.object({
  id: z.number(),
  header: z.string(),
  type: z.string(),
  status: z.string(),
  target: z.string(),
  limit: z.string(),
  reviewer: z.string(),
})
</script>

<script setup lang="ts">
import type {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
} from '@tanstack/vue-table'
import { RestrictToVerticalAxis } from '@dnd-kit/abstract/modifiers'
import {
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
  IconCircleCheckFilled,
  IconDotsVertical,
  IconLayoutColumns,
  IconLoader,
  IconPlus,
} from '@tabler/icons-vue'
import {
  FlexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useVueTable,
} from '@tanstack/vue-table'
import { DragDropProvider } from 'dnd-kit-vue'
import { Badge } from '@/registry/new-york-v4/ui/badge'

import { Button } from '@/registry/new-york-v4/ui/button'
import { Checkbox } from '@/registry/new-york-v4/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/registry/new-york-v4/ui/dropdown-menu'

import { Label } from '@/registry/new-york-v4/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/registry/new-york-v4/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/registry/new-york-v4/ui/table'

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/registry/new-york-v4/ui/tabs'

const props = defineProps<{
  data: TableData[]
}>()

interface TableData {
  id: number
  header: string
  type: string
  status: string
  target: string
  limit: string
  reviewer: string
}

const sorting = ref<SortingState>([])
const columnFilters = ref<ColumnFiltersState>([])
const columnVisibility = ref<VisibilityState>({})
const rowSelection = ref({})

const columns: ColumnDef<TableData>[] = [
  {
    id: 'drag',
    header: () => null,
    cell: ({ row }) => h(DragHandle),
  },
  {
    id: 'select',
    header: ({ table }) => h(Checkbox, {
      'modelValue': table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate'),
      'onUpdate:modelValue': value => table.toggleAllPageRowsSelected(!!value),
      'aria-label': 'Select all',
    }),
    cell: ({ row }) => h(Checkbox, {
      'modelValue': row.getIsSelected(),
      'onUpdate:modelValue': value => row.toggleSelected(!!value),
      'aria-label': 'Select row',
    }),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'header',
    header: 'Header',
    cell: ({ row }) => h('div', String(row.getValue('header'))),
    enableHiding: false,
  },
  {
    accessorKey: 'type',
    header: 'Section Type',
    cell: ({ row }) => h(Badge, {
      variant: 'outline',
      class: 'text-muted-foreground px-1.5',
    }, () => String(row.getValue('type'))),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      return h(Badge, { variant: 'outline', class: 'text-muted-foreground px-1.5' }, () => [
        row.original.status === 'Done'
          ? h(IconCircleCheckFilled, { class: 'fill-green-500 dark:fill-green-400' })
          : h(IconLoader),
        h('span', {}, row.original.status),
      ])
    },
  },
  {
    accessorKey: 'target',
    header: () => h('div', { class: 'w-full text-right' }, ['Target']),
    cell: ({ row }) => h('form', {
      onSubmit: (e) => {
        e.preventDefault()
        toast.promise(new Promise(resolve => setTimeout(resolve, 1000)), {
          loading: `Saving ${row.original.header}`,
          success: 'Done',
          error: 'Error',
        })
      },
    }, [
      h(Label, { for: `${row.original.id}-target`, class: 'sr-only' }, 'Target'),
      h(Input, { class: 'hover:bg-input/30 focus-visible:bg-background dark:hover:bg-input/30 dark:focus-visible:bg-input/30 h-8 w-16 border-transparent bg-transparent text-right shadow-none focus-visible:border dark:bg-transparent', defaultValue: row.original.target, id: `${row.original.id}-target`,
      }),
    ]),
  },
  {
    accessorKey: 'limit',
    header: () => h('div', { class: 'w-full text-right' }, ['Limit']),
    cell: ({ row }) => h('form', {
      onSubmit: (e) => {
        e.preventDefault()
        toast.promise(new Promise(resolve => setTimeout(resolve, 1000)), {
          loading: `Saving ${row.original.header}`,
          success: 'Done',
          error: 'Error',
        })
      },
    }, [
      h(Label, { for: `${row.original.id}-limit`, class: 'sr-only' }, 'Limit'),
      h(Input, { class: 'hover:bg-input/30 focus-visible:bg-background dark:hover:bg-input/30 dark:focus-visible:bg-input/30 h-8 w-16 border-transparent bg-transparent text-right shadow-none focus-visible:border dark:bg-transparent', defaultValue: row.original.target, id: `${row.original.id}-limit`,
      }),
    ]),
  },
  {
    accessorKey: 'reviewer',
    header: 'Reviewer',
    cell: ({ row }) => {
      const reviewer = row.getValue('reviewer') as string
      const isAssigned = reviewer !== 'Assign reviewer'

      if (isAssigned) {
        return h('span', {}, reviewer)
      }

      return h(Select, {}, {
        default: () => [
          h(SelectTrigger, { class: 'w-full' }, {
            default: () => h(SelectValue, { placeholder: 'Assign reviewer' }),
          }),
          h(SelectContent, {}, {
            default: () => [
              h(SelectItem, { value: 'eddie' }, () => 'Eddie Lake'),
              h(SelectItem, { value: 'jamik' }, () => 'Jamik Tashpulatov'),
            ],
          }),
        ],
      })
    },
  },
  {
    id: 'actions',
    cell: () => h(DropdownMenu, {}, {
      default: () => [
        h(DropdownMenuTrigger, { asChild: true }, {
          default: () => h(Button, {
            variant: 'ghost',
            class: 'h-8 w-8 p-0',
          }, {
            default: () => [
              h('span', { class: 'sr-only' }, 'Open menu'),
              h(IconDotsVertical, { class: 'h-4 w-4' }),
            ],
          }),
        }),
        h(DropdownMenuContent, { align: 'end' }, {
          default: () => [
            h(DropdownMenuItem, {}, () => 'Edit'),
            h(DropdownMenuItem, {}, () => 'Make a copy'),
            h(DropdownMenuItem, {}, () => 'Favorite'),
            h(DropdownMenuSeparator, {}),
            h(DropdownMenuItem, { variant: 'destructive' }, () => 'Delete'),
          ],
        }),
      ],
    }),
  },
]

const table = useVueTable({
  get data() {
    return props.data
  },
  columns,
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  onSortingChange: (updaterOrValue) => {
    sorting.value = typeof updaterOrValue === 'function'
      ? updaterOrValue(sorting.value)
      : updaterOrValue
  },
  onColumnFiltersChange: (updaterOrValue) => {
    columnFilters.value = typeof updaterOrValue === 'function'
      ? updaterOrValue(columnFilters.value)
      : updaterOrValue
  },
  onColumnVisibilityChange: (updaterOrValue) => {
    columnVisibility.value = typeof updaterOrValue === 'function'
      ? updaterOrValue(columnVisibility.value)
      : updaterOrValue
  },
  onRowSelectionChange: (updaterOrValue) => {
    rowSelection.value = typeof updaterOrValue === 'function'
      ? updaterOrValue(rowSelection.value)
      : updaterOrValue
  },
  state: {
    get sorting() { return sorting.value },
    get columnFilters() { return columnFilters.value },
    get columnVisibility() { return columnVisibility.value },
    get rowSelection() { return rowSelection.value },
  },
})
</script>

<template>
  <Tabs
    default-value="outline"
    class="w-full flex-col justify-start gap-6"
  >
    <div class="flex items-center justify-between px-4 lg:px-6">
      <Label for="view-selector" class="sr-only">
        View
      </Label>
      <Select default-value="outline">
        <SelectTrigger
          id="view-selector"
          class="flex w-fit @4xl/main:hidden"
          size="sm"
        >
          <SelectValue placeholder="Select a view" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="outline">
            Outline
          </SelectItem>
          <SelectItem value="past-performance">
            Past Performance
          </SelectItem>
          <SelectItem value="key-personnel">
            Key Personnel
          </SelectItem>
          <SelectItem value="focus-documents">
            Focus Documents
          </SelectItem>
        </SelectContent>
      </Select>
      <TabsList class="**:data-[slot=badge]:bg-muted-foreground/30 hidden **:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:px-1 @4xl/main:flex">
        <TabsTrigger value="outline">
          Outline
        </TabsTrigger>
        <TabsTrigger value="past-performance">
          Past Performance <Badge variant="secondary">
            3
          </Badge>
        </TabsTrigger>
        <TabsTrigger value="key-personnel">
          Key Personnel <Badge variant="secondary">
            2
          </Badge>
        </TabsTrigger>
        <TabsTrigger value="focus-documents">
          Focus Documents
        </TabsTrigger>
      </TabsList>
      <div class="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button variant="outline" size="sm">
              <IconLayoutColumns />
              <span class="hidden lg:inline">Customize Columns</span>
              <span class="lg:hidden">Columns</span>
              <IconChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" class="w-56">
            <template v-for="column in table.getAllColumns().filter((column) => typeof column.accessorFn !== 'undefined' && column.getCanHide())" :key="column.id">
              <DropdownMenuCheckboxItem
                class="capitalize"
                :model-value="column.getIsVisible()"
                @update:model-value="(value) => {

                  column.toggleVisibility(!!value)
                }"
              >
                {{ column.id }}
              </DropdownMenuCheckboxItem>
            </template>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button variant="outline" size="sm">
          <IconPlus />
          <span class="hidden lg:inline">Add Section</span>
        </Button>
      </div>
    </div>
    <TabsContent
      value="outline"
      class="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6"
    >
      <div class="overflow-hidden rounded-lg border">
        <DragDropProvider :modifiers="[RestrictToVerticalAxis]">
          <Table>
            <TableHeader class="bg-muted sticky top-0 z-10">
              <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
                <TableHead v-for="header in headerGroup.headers" :key="header.id" :col-span="header.colSpan">
                  <FlexRender v-if="!header.isPlaceholder" :render="header.column.columnDef.header" :props="header.getContext()" />
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody class="**:data-[slot=table-cell]:first:w-8">
              <template v-if="table.getRowModel().rows.length">
                <DraggableRow v-for="row in table.getRowModel().rows" :key="row.id" :row="row" :index="row.index" />
              </template>
              <TableRow v-else>
                <TableCell
                  :col-span="columns.length"
                  class="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </DragDropProvider>
        <!-- <DndContext
            collisionDetection={closestCenter}
            modifiers={[restrictToVerticalAxis]}
            onDragEnd={handleDragEnd}
            sensors={sensors}
            id={sortableId}
          > -->
        <!-- </DndContext> -->
      </div>
      <div class="flex items-center justify-between px-4">
        <div class="text-muted-foreground hidden flex-1 text-sm lg:flex">
          {{ table.getFilteredSelectedRowModel().rows.length }} of
          {{ table.getFilteredRowModel().rows.length }} row(s) selected.
        </div>
        <div class="flex w-full items-center gap-8 lg:w-fit">
          <div class="hidden items-center gap-2 lg:flex">
            <Label for="rows-per-page" class="text-sm font-medium">
              Rows per page
            </Label>
            <Select
              :model-value="table.getState().pagination.pageSize"
              @update:model-value="(value) => {
                table.setPageSize(Number(value))
              }"
            >
              <SelectTrigger id="rows-per-page" size="sm" class="w-20">
                <SelectValue :placeholder="`${table.getState().pagination.pageSize}`" />
              </SelectTrigger>
              <SelectContent side="top">
                <SelectItem v-for="pageSize in [10, 20, 30, 40, 50]" :key="pageSize" :value="`${pageSize}`">
                  {{ pageSize }}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div class="flex w-fit items-center justify-center text-sm font-medium">
            Page {{ table.getState().pagination.pageIndex + 1 }} of
            {{ table.getPageCount() }}
          </div>
          <div class="ml-auto flex items-center gap-2 lg:ml-0">
            <Button
              variant="outline"
              class="hidden h-8 w-8 p-0 lg:flex"
              :disabled="!table.getCanPreviousPage()"
              @click="table.setPageIndex(0)"
            >
              <span class="sr-only">Go to first page</span>
              <IconChevronsLeft />
            </Button>
            <Button
              variant="outline"
              class="size-8"
              size="icon"
              :disabled="!table.getCanPreviousPage()"
              @click="table.previousPage()"
            >
              <span class="sr-only">Go to previous page</span>
              <IconChevronLeft />
            </Button>
            <Button
              variant="outline"
              class="size-8"
              size="icon"
              :disabled="!table.getCanNextPage()"
              @click="table.nextPage()"
            >
              <span class="sr-only">Go to next page</span>
              <IconChevronRight />
            </Button>
            <Button
              variant="outline"
              class="hidden size-8 lg:flex"
              size="icon"
              :disabled="!table.getCanNextPage()"
              @click="table.setPageIndex(table.getPageCount() - 1)"
            >
              <span class="sr-only">Go to last page</span>
              <IconChevronsRight />
            </Button>
          </div>
        </div>
      </div>
    </TabsContent>
    <TabsContent
      value="past-performance"
      class="flex flex-col px-4 lg:px-6"
    >
      <div class="aspect-video w-full flex-1 rounded-lg border border-dashed" />
    </TabsContent>
    <TabsContent value="key-personnel" class="flex flex-col px-4 lg:px-6">
      <div class="aspect-video w-full flex-1 rounded-lg border border-dashed" />
    </TabsContent>
    <TabsContent
      value="focus-documents"
      class="flex flex-col px-4 lg:px-6"
    >
      <div class="aspect-video w-full flex-1 rounded-lg border border-dashed" />
    </TabsContent>
  </Tabs>
</template>
