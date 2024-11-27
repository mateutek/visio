<script setup lang="ts">
import { defineProps } from "vue";
import { cn } from "~/lib/utils";

type RaidCardProps = {
  boss: {
    name: string;
    slug: string;
    url: string;
  };
  bg: string;
};

const props = withDefaults(defineProps<RaidCardProps>(), {
  boss: {
    name: "",
    slug: "",
    url: "",
  },
  bg: "nerubarPalace",
});

const route = useRoute();

const raid = computed(() => {
  return route.params.raid || "nerubar-palace";
});

const bossImg = computed(() => {
  return `/raid/${raid.value}/${props.boss.slug}.png`;
});
</script>

<template>
  <NuxtLink
    :to="`/tactics/${route.params.raid}/${props.boss.slug}`"
    :class="cn('card', `bg-raid-${route.params.raid}`)"
  >
    <div class="content bg">
      <div class="absolute bottom-0 left-0 mx-auto-px1">
        <img :src="`${bossImg}`" class="boss-img" alt="{{ props.boss.name }}" />
      </div>
      <p class="text-2xl font-semibold text-white text-center z-10">
        {{ props.boss.name }}
      </p>
    </div>
  </NuxtLink>
</template>

<style scoped>
.card {
  @apply shadow-md rounded-lg
    border-2 border-slate-700
    bg-cover bg-center
    backdrop-blur-sm
    min-h-[380px]
    relative;
}

.content {
  @apply flex flex-col justify-end
    rounded-lg
    h-full
    p-4
    backdrop-blur-sm hover:backdrop-blur-0
    bg-gradient-to-t from-black to-20% to-transparent
    transition-all duration-300
    relative;
}

.boss-img {
  @apply max-w-[100%] h-auto
    object-cover
    z-0;
}
</style>
