<script setup lang="ts">
import { type Table } from '@tanstack/vue-table'
import { type Task } from '../data/schema'
import ChevronLeftIcon from '~icons/radix-icons/chevron-left'
import ChevronRightIcon from '~icons/radix-icons/chevron-right'
import DoubleArrowLeftIcon from '~icons/radix-icons/double-arrow-left'
import DoubleArrowRightIcon from '~icons/radix-icons/double-arrow-right'

import { Button } from '@/lib/registry/default/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/lib/registry/default/ui/select'

interface DataTablePaginationProps {
  table: Table<Task>
}
defineProps<DataTablePaginationProps>()
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
          :model-value="`${table.getState().pagination.pageSize}`"
          @update:model-value="table.setPageSize"
        >
          <SelectTrigger class="h-8 w-[70px]">
            <SelectValue :placeholder="`${table.getState().pagination.pageSize}`" />
          </SelectTrigger>
          <SelectContent side="top">
            <SelectItem v-for="pageSize in [10, 20, 30, 40, 50]" :key="pageSize" :value="`${pageSize}`">
              {{ pageSize }}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div class="flex w-[100px] items-center justify-center text-sm font-medium">
        Page {{ table.getState().pagination.pageIndex + 1 }} of
        {{ table.getPageCount() }}
      </div>
      <div class="flex items-center space-x-2">
        <Button
          variant="outline"
          class="hidden h-8 w-8 p-0 lg:flex"
          :disabled="!table.getCanPreviousPage()"
          @click="table.setPageIndex(0)"
        >
          <span class="sr-only">Go to first page</span>
          <DoubleArrowLeftIcon class="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          class="h-8 w-8 p-0"
          :disabled="!table.getCanPreviousPage()"
          @click="table.previousPage()"
        >
          <span class="sr-only">Go to previous page</span>
          <ChevronLeftIcon class="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          class="h-8 w-8 p-0"
          :disabled="!table.getCanNextPage()"
          @click="table.nextPage()"
        >
          <span class="sr-only">Go to next page</span>
          <ChevronRightIcon class="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          class="hidden h-8 w-8 p-0 lg:flex"
          :disabled="!table.getCanNextPage()"
          @click="table.setPageIndex(table.getPageCount() - 1)"
        >
          <span class="sr-only">Go to last page</span>
          <DoubleArrowRightIcon class="h-4 w-4" />
        </Button>
      </div>
    </div>
  </div>
</template>
