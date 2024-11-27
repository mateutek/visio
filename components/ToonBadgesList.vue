<script setup lang="ts">
import { Tooltip } from "~/components/ui/tooltip";
import type { Toon } from "~/generated/client";
import formatRealm from "~/utils/formatRealm";

type ProfessionCardProps = {
  toons: Toon[];
  limit?: number;
};
const props = withDefaults(defineProps<ProfessionCardProps>(), {
  toons: [],
  limit: 10,
});

const sortedToons = computed(() =>
  props.toons.sort((a, b) => a.name.localeCompare(b.name)),
);
const visibleToons = computed(() => sortedToons.value.slice(0, props.limit));
const hiddenToons = computed(() => sortedToons.value.slice(props.limit));
</script>

<template>
  <div class="flex flex-grow-1 w-full items-start gap-2 flex-wrap">
    <Badge
      v-for="toon in visibleToons"
      :key="toon.id"
      :variant="toon.class.slug"
    >
      {{ toon.name }}
    </Badge>
    <Tooltip :delay-duration="0">
      <TooltipTrigger as-child>
        <Badge v-if="hiddenToons.length > 0" variant="default">
          +{{ hiddenToons.length }}
        </Badge>
      </TooltipTrigger>
      <TooltipContent side="right" class="flex items-center gap-4 max-w-sm">
        <span class="ml-auto flex flex-col flex-wrap gap-2">
          <span>More with this profession: </span>
          <span v-for="toon in hiddenToons">
            <span> {{ toon.name }} - </span>
            <span class="text-muted-foreground">
              {{ formatRealm(toon.realm) }}
            </span>
          </span>
        </span>
      </TooltipContent>
    </Tooltip>
  </div>
</template>

<style scoped></style>
