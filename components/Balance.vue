<script setup lang="ts">
import useUserBalance from "~/composables/useBalance";

const { balance, pending } = useUserBalance();
</script>

<template>
  <div class="balance-container card-border">
    <div class="balance-header">Twój stan konta</div>
    <div class="balance">
      <div class="balance-amount">
        {{ balance.toFixed(0) }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="css">
.balance-container {
  @apply min-h-60 rounded-3xl relative overflow-hidden px-4 bg-card;
}

.balance-header {
  @apply text-white text-2xl font-bold p-4 opacity-75;
}

.balance {
  @apply rounded-2xl p-4;
}

.balance-amount {
  @apply text-white text-7xl text-center font-number;
}
</style>
