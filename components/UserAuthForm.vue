<script lang="ts">
  import { GoogleAuthProvider } from 'firebase/auth'
  export const googleAuthProvider = new GoogleAuthProvider()
</script>

<script setup lang="ts">
import { ref } from "vue";
import { signInWithPopup } from '@firebase/auth';
import { cn } from '~/lib/utils';

const isLoading = ref(false);
const auth = useFirebaseAuth()!;

const handleLogin = async () => {
  try {
    isLoading.value = true;
    const { user } = await signInWithPopup(auth, googleAuthProvider);
    console.log(user);
    // const { data, error } = await supabase.auth.signInWithOAuth({
    //   provider: "discord",
    // });
    // console.log(data);
    //
    // if (error) throw error;
    navigateTo("/");
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="flex flex-col space-y-2 text-center">
    <h1 class="text-2xl font-semibold tracking-tight">Logowanie</h1>
    <p class="text-sm text-muted-foreground">zaloguj do aplikacji</p>
  </div>
  <div :class="cn('grid gap-6', $attrs.class ?? '')">
    <form @submit.prevent="handleLogin">
      <div class="grid gap-2">
        <Button :disabled="isLoading">
          <Icon name="mdi:google" class="w-6 h-6 mr-2" />
          {{ isLoading ? "Ładowanie" : "Zaloguj" }}
        </Button>
      </div>
    </form>
  </div>
</template>
