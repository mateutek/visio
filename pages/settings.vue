<script setup lang="ts">
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const settings = useSettings();

console.log(settings);
</script>

<template>
  <div class="container py-4">
    <h1 class="text-2xl font-bold mb-5">Settings</h1>
    <div class="flex flex-col gap-4">
      <p class="mb-2">
        Here you can configure the settings for the app. These settings are
        saved in your browser and will be remembered the next time you visit the
        site.
      </p>
      <div class="flex items-center space-x-2">
        <Switch
          id="raid-default-view-list"
          v-model:checked="settings.raidDefaultListView"
        />
        <Label for="raid-default-view-list">Show raid roster as list</Label>
      </div>
      <div class="flex items-center space-x-2">
        <Switch
          id="raid-default-view-list"
          v-model:checked="settings.charactersDefaultListView"
        />
        <Label for="raid-default-view-list">Show characters as list</Label>
      </div>
      <div class="flex items-center space-x-2">
        <Switch
          id="raid-default-view-list"
          v-model:checked="settings.charactersImageBg"
        />
        <Label for="raid-default-view-list"
          >Show character class with image</Label
        >
      </div>
    </div>
  </div>
</template>

<style scoped></style>
