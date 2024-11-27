<script setup lang="ts">
</script>

<template>
  <div class="md:hidden"></div>
  <div
    class="container relative h-dvh bg-muted dark:bg-blue-950 flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0"
  >
    <slot name="header" />
    <div
      class="relative hidden h-full flex-col p-10 text-white dark:border-r lg:flex bg-gradient-to-t from-indigo-900 from-0% to-indigo-600 to-100%"
    >
      <div class="absolute inset-0 login-bg" />
      <div
        class="absolute z-20 p-5 drop-shadow-2xl flex items-center text-2xl font-medium backdrop-blur-sm bg-white/10"
      >
        Visio
      </div>
    </div>
    <div class="lg:p-8 h-full">
      <div
        class="mx-auto flex w-full h-dvh flex-col justify-center align-middle space-y-6 sm:w-[350px]"
      >
        <slot />
      </div>
    </div>
  </div>
</template>
