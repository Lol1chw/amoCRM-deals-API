<script setup lang="ts" generic="TData">
import type { ColumnDef, ExpandedState } from '@tanstack/vue-table'
import { FlexRender, getCoreRowModel, getExpandedRowModel, useVueTable } from '@tanstack/vue-table'
import { Loader } from 'lucide-vue-next'
import { ref } from 'vue'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import type { ExpandedState as ExpandedStateProps } from '@/types/table'

const props = defineProps<{
  columns: ColumnDef<TData, any>[]
  data: TData[]
  expandedRowContent: ExpandedStateProps[]
  loader: boolean
}>()

const expanded = ref<ExpandedState>({})
const table = useVueTable({
  get data() { return props.data },
  get columns() { return props.columns },
  getRowCanExpand: () => true,
  state: {
    get expanded() {
      return expanded.value
    },
  },
  onExpandedChange: (updaterOrValue) => {
    expanded.value = typeof updaterOrValue === 'function'
      ? updaterOrValue(expanded.value)
      : updaterOrValue
  },
  getCoreRowModel: getCoreRowModel(),
  getExpandedRowModel: getExpandedRowModel(),
})
</script>

<template>
  <div class="border rounded-md">
    <Table>
      <TableHeader>
        <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
          <TableHead v-for="header in headerGroup.headers" :key="header.id" :style="{ width: header.getSize() }">
            <FlexRender
              v-if="!header.isPlaceholder" :render="header.column.columnDef.header"
              :props="header.getContext()"
            />
          </TableHead>
        </TableRow>
      </TableHeader>
      <template v-if="table.getRowModel().rows?.length">
        <TableBody v-for="row in table.getRowModel().rows" :key="row.id">
          <TableRow
            :data-state="row.getIsSelected() ? 'selected' : undefined"
          >
            <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
              <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
            </TableCell>
          </TableRow>

          <TableRow v-show="row.getIsExpanded()">
            <TableCell class="bg-expanded" :colspan="row.getAllCells().length">
              <component :is="expandedRowContent[parseInt(row.id)].content" v-if="expandedRowContent[parseInt(row.id)]" />
              <span v-else>Контакты отсутствуют</span>
            </TableCell>
          </TableRow>
        </TableBody>
      </template>

      <template v-else>
        <TableBody>
          <TableRow>
            <TableCell :colspan="columns.length" class="h-24 text-center">
              <Loader v-if="loader" class="animate-spin relative left-1/2" />
              <template v-else>
                No results.
              </template>
            </TableCell>
          </TableRow>
        </TableBody>
      </template>
    </Table>
  </div>
</template>
