<script setup lang="ts">
import { buttonVariants } from "~/components/ui/button";
import { cn } from '~/lib/utils';
definePageMeta({
  layout: false,
});
</script>

<template>
  <NuxtLayout name="login">
    <template #header>
      <NuxtLink
        to="/login"
        :class="
          cn(
            buttonVariants({ variant: 'ghost' }),
            'absolute right-4 top-4 md:right-8 md:top-8',
          )
        "
      >
        Login
      </NuxtLink>
    </template>
    <UserRegisterForm />
  </NuxtLayout>
</template>
