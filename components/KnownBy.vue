<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { Tooltip } from "~/components/ui/tooltip";
import formatRealm from "../utils/formatRealm";

type KnownByProps = {
  toons: {
    toon: {
      name: string;
      realm: string;
    };
  }[];
};

const props = withDefaults(defineProps<KnownByProps>(), {
  toons: [],
});

const isKnown = computed(() => props.toons.length > 0);
</script>

<template>
  <Tooltip :delay-duration="0">
    <TooltipTrigger as-child>
      <div>
        <Icon
          :icon="isKnown ? 'lucide:badge-check' : 'lucide:badge-x'"
          :color="isKnown ? '#22c55e' : '#e11d48'"
        />
      </div>
    </TooltipTrigger>
    <TooltipContent side="right" class="flex items-center gap-4 max-w-sm">
      {{ isKnown ? "Known by:" : "Unknown by anyone" }}
      <span v-if="isKnown" class="ml-auto flex flex-wrap gap-x-2">
        <span v-for="toon in props.toons">
          <span> {{ toon.toon.name }} - </span>
          <span class="text-muted-foreground">
            {{ formatRealm(toon.toon.realm) }}
          </span>
        </span>
      </span>
    </TooltipContent>
  </Tooltip>
</template>
