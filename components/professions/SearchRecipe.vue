<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";
import { useDebounceFn, watchDebounced } from "@vueuse/core";
import { Dialog, DialogHeader } from "~/components/ui/dialog";

const searchQuery = ref("");
const searchQueryDebounced = ref("");

const totalResults = ref(0);

watchDebounced(
  searchQuery,
  (value) => {
    searchQueryDebounced.value = value;
  },
  { debounce: 500 },
);

const refreshTooltips = useDebounceFn(() => {
  if (window.$WowheadPower) {
    window.$WowheadPower.refreshLinks();
  }
}, 500);

const { isPending, isFetching, isError, data, error } = useQuery({
  queryKey: ["recipes", searchQueryDebounced],
  queryFn: async ({ queryKey }) => {
    const [key, search] = queryKey;
    if (!search || search.length < 3) return [];
    // const response = await fetch(`/api/recipes/search?q=${search}`);
    return {};
  },
  select: (data) => {
    if (!data) return [];

    // Group by profession
    totalResults.value = data.length;
    const grouped = data.reduce((acc, recipe) => {
      const professionName = recipe.profession.name;
      if (!acc[professionName]) {
        acc[professionName] = [];
      }
      acc[professionName].push(recipe);
      return acc;
    }, {});
    return Object.keys(grouped).map((profession) => {
      return {
        name: profession,
        recipes: grouped[profession],
      };
    });
  },
});

watch(data, (value) => {
  if (value) {
    refreshTooltips();
  }
});

const clearResults = () => {
  searchQuery.value = "";
  searchQueryDebounced.value = "";
};
</script>

<template>
  <Dialog @update:open="clearResults">
    <DialogTrigger as-child>
      <Button size="sm">Find recipe</Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-2xl">
      <DialogHeader>
        <DialogTitle>Find recipe</DialogTitle>
        <DialogDescription
          >Search through all recipes by name</DialogDescription
        >
      </DialogHeader>
      <div class="flex flex-col space-x-2">
        <div class="flex flex-1 gap-2">
          <Input
            v-model="searchQuery"
            placeholder="Search for recipe"
            class="flex-1"
          />
        </div>
        <div class="flex flex-row justify-center py-2">
          <Icon
            v-if="isPending || isFetching"
            name="lucide:loader-circle"
            class="w-8 h-8 text-gray-500 animate-spin"
          />
          <div v-else-if="data?.length > 0" class="flex flex-col w-full">
            <div class="flex flex-1">Total Results: {{ totalResults }}</div>
            <ScrollArea class="max-h-[50vh] w-full rounded-md border">
              <div
                class="flex flex-col gap-2 divide-y divide-accent-foreground"
              >
                <div v-for="profession in data">
                  <div
                    class="border-b border-accent-foreground text-center bg-white dark:bg-slate-600 sticky top-0"
                  >
                    {{ profession.name }}
                  </div>
                  <div class="divide-y divide-accent">
                    <div
                      v-for="recipe in profession.recipes"
                      class="odd:bg-accent p-1 flex flex-row items-center gap-2"
                    >
                      <RecipeName :id="recipe.id" :name="recipe.name" />
                      <KnownBy :toons="recipe.toons" />
                    </div>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </div>
          <div v-else>
            <div class="flex flex-1 justify-center">
              <span class="text-gray-500">No results found</span>
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  </Dialog>
</template>

<style scoped></style>
