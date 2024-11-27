<script setup lang="ts">
import Balance from '~/components/Balance.vue';
</script>

<template>
  <div class="panel-content container py-4">
    <div class="section flex flex-col">
      <h1 class="text-3xl font-bold"></h1>
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-2 grid-flow-dense mt-10">
        <Balance />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
