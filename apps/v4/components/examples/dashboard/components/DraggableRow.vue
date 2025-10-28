<script setup lang="ts">
import type { Row } from '@tanstack/vue-table'
import type { z } from 'zod'
import type { schema } from './DataTable.vue'
import { FlexRender } from '@tanstack/vue-table'
import { useSortable } from 'dnd-kit-vue'
import {
  TableCell,
  TableRow,
} from '@/registry/new-york-v4/ui/table'

const props = defineProps<{ row: Row<z.infer<typeof schema>>, index: number }>()

const { elementRef, isDragging } = useSortable({
  id: props.row.original.id,
  index: props.index,
})
</script>

<template>
  <TableRow
    :ref="elementRef"
    :data-state="row.getIsSelected() && 'selected'"
    :data-dragging="isDragging"
    class="relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80"
  >
    <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
      <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
    </TableCell>
  </TableRow>
</template>
