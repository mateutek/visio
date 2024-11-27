<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    name: string;
    id: number;
  }>(),
  {
    name: "ProfessionName",
    id: 0,
  },
);

// Parse the tier from the name
// Refine Leather - |A:Professions-ChatIcon-Quality-Tier2:20:20|a -> Refine Leather - Tier2

const recipeName = computed(() => props.name.split(" |A")[0]);

const iconImage = computed(() => {
  const splittedName = props.name.split(" |A");
  if (!splittedName[1]) return null;
  const [_, tier] = splittedName[1].split(":");
  const [, , , tierNumber] = tier.split("-");
  return `/wow-icons/quality/${tierNumber.toLowerCase()}.png`;
});
</script>

<template>
  <div class="flex">
    <NuxtLink
      :to="`https://www.wowhead.com/recipe/${props.id}`"
      :data-wowhead="`/recipe/${props.id}`"
      target="_blank"
      rel="noopener noreferrer"
    >
      <span class="font-bold">{{ recipeName }}</span>
      <img v-if="iconImage" :src="iconImage" class="h-5" />
    </NuxtLink>
  </div>
</template>
