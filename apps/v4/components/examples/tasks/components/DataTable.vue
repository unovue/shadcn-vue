<script setup lang="ts">
import type { ColumnDef, RowSelectionState } from '@tanstack/vue-table'
import type { Task } from '../data/schema'
import type { TasksTableFeatures } from './features'

import { FlexRender, useTable } from '@tanstack/vue-table'
import { ref } from 'vue'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/styles/reka-nova/ui/table'
import DataTablePagination from './DataTablePagination.vue'
import DataTableToolbar from './DataTableToolbar.vue'
import { features } from './features'

interface DataTableProps {
  columns: ColumnDef<TasksTableFeatures, Task, any>[]
  data: Task[]
}
const props = defineProps<DataTableProps>()

// Keep row selection outside the table so the rest of the app can read or update it.
const rowSelection = ref<RowSelectionState>({})

const table = useTable({
  features,
  get data() { return props.data },
  get columns() { return props.columns },
  state: {
    get rowSelection() { return rowSelection.value },
  },
  enableRowSelection: true,
  onRowSelectionChange: (updater) => {
    rowSelection.value = typeof updater === 'function' ? updater(rowSelection.value) : updater
  },
})
</script>

<template>
  <div class="space-y-4">
    <DataTableToolbar :table="table" />
    <div class="rounded-md border">
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
              v-for="row in table.getRowModel().rows"
              :key="row.id"
              :data-state="row.getIsSelected() && 'selected'"
            >
              <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                <FlexRender :cell="cell" />
              </TableCell>
            </TableRow>
          </template>

          <TableRow v-else>
            <TableCell
              :colspan="columns.length"
              class="h-24 text-center"
            >
              No results.
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>

    <DataTablePagination :table="table" />
  </div>
</template>
