<script setup lang="ts">
import { cn } from "~/lib/utils";

type WidgetProps = {
  size: string;
  url: string;
  widgetClass?: string;
  title?: string;
};

const props = withDefaults(defineProps<WidgetProps>(), {
  size: "w-full",
  url: "",
});
</script>

<template>
  <div :class="cn(`widget`, widgetClass)">
    <div v-if="props.title" class="title">
      <h3>{{ props.title }}</h3>
    </div>
    <div class="content">
      <iframe
        v-if="url"
        :class="size || 'w-full h-full'"
        :src="props.url"
      ></iframe>
    </div>
  </div>
</template>

<style scoped></style>
