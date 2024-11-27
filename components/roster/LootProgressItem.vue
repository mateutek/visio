<script setup lang="ts">
import type { ToonGear } from "~/generated/client";

const props = withDefaults(
  defineProps<{
    item: ToonGear | null;
  }>(),
  {
    item: null,
  },
);

const shortDescription = computed(() => {
  if (props.item === null) return "-";
  // Split the description by space and get the first letters of each word
  // If the description is empty, return 'N'
  // If the description is 'Mythic+' return 'M+'

  if (!props.item.description) return "N";

  if (props.item?.description === "Mythic+") return "M+";
  const sd = props.item.description
    .split(" ")
    .map((word) => word[0])
    .join("");

  return sd || "N";
});

const wowheadData = computed(() => {
  if (props.item === null) return "";
  const ilvl = props.item.level || 0;
  const bonusIds = props.item.bonusIds.join(":") || "";

  // Return the wowhead link with the item id, ilvl and bonus ids if they exist

  const additionalData = [
    ...(ilvl ? [`ilvl=${ilvl}`] : []),
    ...(bonusIds ? [`bonus=${bonusIds}`] : []),
  ].join("&");

  return `/item=${props.item.itemId}?${additionalData}`;
});

const textColor = computed(() => {
  let color = "text-white";

  switch (shortDescription.value) {
    case "H":
      color = "text-green-400";
      break;
    case "M":
      color = "text-purple-400";
      break;
    case "OC":
      color = "text-blue-400";
      break;
    case "M+":
      color = "text-yellow-400";
      break;
    case "N":
      color = "text-slate-400";
      break;
    default:
      color = "text-white";
      break;
  }
  return color;
});
</script>

<template>
  <div class="flex justify-center">
    <div v-if="props.item === null">-</div>
    <NuxtLink
      v-else
      :to="`https://www.wowhead.com/${wowheadData}`"
      :data-wowhead="wowheadData"
      target="_blank"
      rel="noopener noreferrer"
    >
      <span :class="`${textColor} font-bold text-center`">
        {{ shortDescription || "Normal" }} <br />
        ({{ props.item.level }})
      </span>
    </NuxtLink>
  </div>
</template>
