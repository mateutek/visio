<script setup lang="ts">
import type { Profession } from "~/generated/client";
import { cn } from "~/lib/utils";

type ProfessionCardProps = {
  profession: Profession;
};

const props = withDefaults(defineProps<ProfessionCardProps>(), {
  profession: [],
});
</script>

<template>
  <div class="card-container group">
    <NuxtLink :to="profession.to" class="flex w-full">
      <div
        :class="
          cn(
            `card-bg group-hover:opacity-90`,
            `bg-profession${profession.title}`,
          )
        "
      ></div>
      <div :class="`card bg-profession${profession.title}`">
        <div class="font-thin">{{ profession.title }}</div>
        <div>{{ profession.label }}</div>
        <Separator class="my-2 dark:bg-white bg-black" />
        <div class="mb-2">
          {{ profession.toons.length === 0 ? "No characters" : "Characters" }}
          with this profession
        </div>
        <ToonBadgesList :toons="profession.toons" />
      </div>
    </NuxtLink>
  </div>
</template>

<style scoped>
.card-container {
  @apply flex
    relative
    rounded-lg;
}

.card-bg {
  @apply absolute
    bg-cover bg-center
    bg-no-repeat
    rounded-lg
    w-full h-full
    top-0 left-0
    z-0
    opacity-50;
}

.card {
  @apply flex w-full flex-col items-center
    p-4 rounded-lg
    bg-cover bg-center
    bg-gradient-to-t from-gray-800
    shadow-md hover:shadow-xl
    transition-shadow
    z-10;
}
</style>
