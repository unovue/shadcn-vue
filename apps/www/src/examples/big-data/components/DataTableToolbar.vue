<script setup lang="ts">
import type { Table } from '@tanstack/vue-table'
import { computed } from 'vue'
import type { Task } from '../data/schema'

import { priorities, statuses } from '../data/data'
import DataTableFacetedFilter from './DataTableFacetedFilter.vue'
import DataTableViewOptions from './DataTableViewOptions.vue'
import Cross2Icon from '~icons/radix-icons/cross-2'
import { Button } from '@/lib/registry/new-york/ui/button'
import { Input } from '@/lib/registry/new-york/ui/input'

interface DataTableToolbarProps {
  table: Table<Task>
}

const props = defineProps<DataTableToolbarProps>()

const isFiltered = computed(() => props.table.getState().columnFilters.length > 0)
</script>

<template>
  <div class="flex items-start justify-between flex-wrap">
    <div class="flex flex-1 items-center gap-2 flex-wrap">
      <Input
        placeholder="Filter tasks..."
        :model-value="(table.getColumn('title')?.getFilterValue() as string) ?? ''"
        class="h-8 w-[150px] lg:w-[250px]"
        @input="table.getColumn('title')?.setFilterValue($event.target.value)"
      />
      <DataTableFacetedFilter
        v-if="table.getColumn('status')"
        :column="table.getColumn('status')"
        title="Status"
        :options="statuses"
      />
      <DataTableFacetedFilter
        v-if="table.getColumn('priority')"
        :column="table.getColumn('priority')"
        title="Priority"
        :options="priorities"
      />

      <Button
        v-if="isFiltered"
        variant="ghost"
        class="h-8 px-2 lg:px-3"
        @click="table.resetColumnFilters()"
      >
        Reset
        <Cross2Icon class="ml-2 h-4 w-4" />
      </Button>
    </div>
    <DataTableViewOptions :table="table" />
  </div>
</template>
