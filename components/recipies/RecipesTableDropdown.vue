<script setup lang="ts">
import { MoreHorizontal } from "lucide-vue-next";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

defineProps<{
  recipe: {
    id: string;
    name: string;
  };
}>();

function copy(field: string) {
  navigator.clipboard.writeText(field);
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" class="w-8 h-8 p-0">
        <span class="sr-only">Open menu</span>
        <MoreHorizontal class="w-4 h-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuLabel>Actions</DropdownMenuLabel>
      <DropdownMenuItem @click="copy(recipe.id)">
        Copy recipe ID
      </DropdownMenuItem>
      <DropdownMenuItem @click="copy(recipe.name)">
        Copy recipe name
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <NuxtLink
          :to="`https://www.wowhead.com/search?q=${encodeURIComponent(recipe.name)}`"
          target="_blank"
          rel="noopener noreferrer"
        >
          Search on Wowhead
        </NuxtLink>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
