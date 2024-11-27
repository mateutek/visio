<script setup lang="ts" generic="TData, TValue">
import type {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
} from "@tanstack/vue-table";


import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDebounceFn } from "@vueuse/core";
import { ref } from "vue";

import {
  FlexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useVueTable,
} from "@tanstack/vue-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Label } from "~/components/ui/label";
import { Switch } from "~/components/ui/switch";

const props = defineProps<{
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}>();

const sorting = ref<SortingState>([]);
const columnFilters = ref<ColumnFiltersState>([]);
const globalFilter = ref("");

const refreshTooltips = useDebounceFn(() => {
  if (window.$WowheadPower) {
    window.$WowheadPower.refreshLinks();
  }
}, 500);

const table = useVueTable({
  get data() {
    return props.data;
  },
  get columns() {
    return props.columns;
  },
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  onSortingChange: (updaterOrValue) => {
    return valueUpdater(updaterOrValue, sorting);
  },
  onColumnFiltersChange: (updaterOrValue) => {
    return valueUpdater(updaterOrValue, columnFilters);
  },
  onGlobalFilterChange: (updaterOrValue) => {
    return valueUpdater(updaterOrValue, globalFilter);
  },
  onStateChange: (state) => {
    refreshTooltips();
  },
  state: {
    get sorting() {
      return sorting.value;
    },
    get columnFilters() {
      return columnFilters.value;
    },
    get globalFilter() {
      return globalFilter.value;
    },
  },
});

// const state = ref({
//   ...table.initialState,
//   pagination: {
//     pageIndex: 0,
//     pageSize: 15
//   }
// })

// watch(state, () => {
//   if(window.$WowheadPower) {
//     window.$WowheadPower.refreshLinks()
//   }
// }, { deep: true, flush: 'post', once: true });

// //Use the table.setOptions API to merge our fully controlled state onto the table instance
// table.setOptions(prev => ({
//   ...prev, //preserve any other options that we have set up above
//   get state() {
//     return state.value
//   },
//   onStateChange: setState //any state changes will be pushed up to our own state management
// }))
</script>

<template>
  <div>
    <div class="flex items-center mt-4 gap-2">
      <div class="relative w-full max-w-sm items-center mr-2">
        <Input
          class="pr-10"
          placeholder="Filter by name..."
          :model-valuealue="globalFilter ?? ''"
          @update:model-value="(value) => (globalFilter = String(value))"
        />
        <Button
          v-if="globalFilter"
          variant="link"
          size="icon"
          class="absolute right-0 top-0"
        >
          <Icon name="lucide:x" class="h-4 w-4" @click="globalFilter = ''" />
        </Button>
      </div>
      <div class="flex items-center py-2">
        <Switch
          id="known-filter"
          class="mr-2"
          :checked="table.getColumn('known')?.getFilterValue() as string"
          @update:checked="table.getColumn('known')?.setFilterValue($event)"
        />
        <Label for="known-filter">Show Known only</Label>
      </div>
    </div>
    <div class="border rounded-md mt-5">
      <Table>
        <TableHeader>
          <TableRow
            v-for="headerGroup in table.getHeaderGroups()"
            :key="headerGroup.id"
          >
            <TableHead v-for="header in headerGroup.headers" :key="header.id">
              <FlexRender
                v-if="!header.isPlaceholder"
                :render="header.column.columnDef.header"
                :props="header.getContext()"
              />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <template v-if="table.getRowModel().rows?.length">
            <TableRow
              v-for="row in table.getRowModel().rows"
              :key="row.id"
              :data-state="row.getIsSelected() ? 'selected' : undefined"
            >
              <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                <FlexRender
                  :render="cell.column.columnDef.cell"
                  :props="cell.getContext()"
                />
              </TableCell>
            </TableRow>
          </template>
          <template v-else>
            <TableRow>
              <TableCell :colspan="columns.length" class="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          </template>
        </TableBody>
      </Table>
    </div>
    <div class="flex items-center justify-end py-2 space-x-2">
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
</template>
