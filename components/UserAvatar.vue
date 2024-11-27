<script setup lang="ts">
  const user = useCurrentUser();
  const userInitials = computed(() => {
    if (!user.value?.displayName) return "";
    return user.value.displayName
        .split(" ")
        .map((name) => name[0].toUpperCase())
        .join("")
        .replace(/[^A-Z]/g, "");
  });
</script>


<template>
  <Avatar>
    <AvatarImage :src="user?.photoURL" alt="@radix-vue" />
    <AvatarFallback v-if="!user?.photoURL">{{user?.userInitials}}</AvatarFallback>
  </Avatar>
</template>

<style scoped>

</style>