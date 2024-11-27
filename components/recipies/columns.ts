import { KnownBy } from "#components";
import type { ColumnDef } from "@tanstack/vue-table";
import { h } from "vue";
import RecipeName from "~/components/RecipeName.vue";
import RecipesTableDropdown from "~/components/recipies/RecipesTableDropdown.vue";

export const columns: ColumnDef<Prisma.Recipe>[] = [
  {
    accessorKey: "name",
    header: () => h("div", {}, "Name"),
    cell: ({ row }) => {
      const name = row.getValue("name");
      const id = row.original.id;
      return h(
        "div",
        { class: "text-right font-medium" },
        h(RecipeName, {
          name,
          id,
        }),
      );
    },
  },
  {
    accessorKey: "category",
    header: () => h("div", { class: "text-right" }, "Category"),
    enableHiding: false,
    cell: ({ row }) => {
      const category = row.getValue("category");
      return h("div", { class: "relative text-right" }, category.name);
    },
  },
  {
    id: "known",
    accessorKey: "toons",
    header: () => h("div", { class: "text-center" }, "Known by guild"),
    enableHiding: false,
    accessorFn: (row) => row.toons,
    cell: ({ row }) => {
      return h(
        "div",
        { class: "flex justify-center" },
        h(KnownBy, {
          toons: row.getValue("known"),
        }),
      );
    },
    filterFn: (row, id, filterValue) => {
      if (filterValue) {
        return row.getValue(id).length > 0;
      }
      return true;
    },
  },
  {
    id: "actions",
    header: () => h("div", { class: "text-right" }, "Actions"),
    enableHiding: false,
    cell: ({ row }) => {
      const recipe = row.original;
      return h(
        "div",
        { class: "relative text-right" },
        h(RecipesTableDropdown, {
          recipe,
        }),
      );
    },
  },
];
