<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { Tooltip } from "~/components/ui/tooltip";

type RoleIconProps = {
  raidMain: boolean;
};

const props = withDefaults(defineProps<RoleIconProps>(), {
  raidMain: false,
});

const isMain = computed(() => {
  return props.raidMain;
});
</script>

<template>
  <Tooltip :delay-duration="0">
    <TooltipTrigger as-child>
      <div class="text-amber-500">
        <Icon :icon="isMain ? 'ic:round-star' : 'ic:round-star-half'" />
      </div>
    </TooltipTrigger>
    <TooltipContent side="right" class="flex items-center gap-4">
      {{ isMain ? "Main" : "Alt" }}
    </TooltipContent>
  </Tooltip>
</template>
