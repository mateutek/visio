<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { Tooltip } from "~/components/ui/tooltip";
import { cn } from "~/lib/utils";

type RoleIconProps = {
  role: "TANK" | "HEALER" | "DPS";
};

const props = withDefaults(defineProps<RoleIconProps>(), {
  role: "DPS",
});

const icon = computed(() => {
  switch (props.role) {
    case "TANK":
      return "lucide:shield-check";
    case "HEALER":
      return "lucide:circle-plus";
    case "DPS":
      return "lucide:sword";
  }
});

const bgColor = computed(() => {
  return `bg-role-${props.role.toLowerCase()}-bg`;
});

const roleText = computed(() => {
  switch (props.role) {
    case "TANK":
      return "Tank";
    case "HEALER":
      return "Healer";
    case "DPS":
      return "Damage Dealer";
  }
});
</script>

<template>
  <Tooltip :delay-duration="0">
    <TooltipTrigger as-child>
      <div
        :class="
          cn(
            `p-1 rounded-full border-[1px] border-slate-700 drop-shadow-md ${bgColor}`,
          )
        "
      >
        <Icon :icon="icon" />
      </div>
    </TooltipTrigger>
    <TooltipContent side="right" class="flex items-center gap-4">
      {{ roleText }}
    </TooltipContent>
  </Tooltip>
</template>
