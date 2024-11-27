<script setup lang="ts">
import { defineProps } from "vue";
import { cn } from "~/lib/utils";

type RaidCardProps = {
  raid: {
    name: string;
    slug: string;
  };
};

const props = withDefaults(defineProps<RaidCardProps>(), {
  raid: {
    name: "",
    slug: "",
  },
});
</script>

<template>
  <NuxtLink
    :to="`/tactics/${props.raid.slug}`"
    :class="cn('card', `bg-raid-${props.raid.slug}`)"
  >
    <div class="content">
      <p class="text-2xl font-semibold text-white text-center">
        {{ props.raid.name }}
      </p>
    </div>
  </NuxtLink>
</template>

<style scoped>
.card {
  @apply shadow-md rounded-lg
    border-2 border-slate-700
    min-h-[380px]
    bg-cover bg-center
    backdrop-blur-sm
    relative;
}

.content {
  @apply flex flex-col justify-end
    rounded-lg
    h-full
    p-4
    backdrop-blur-0 hover:backdrop-blur-sm
    bg-gradient-to-t from-black to-20% to-transparent
    transition-all duration-300;
}
</style>
