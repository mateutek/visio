<script lang="ts" setup>
import { useMediaQuery } from "@vueuse/core";
import { ref } from "vue";
import MobileNav from "~/components/MobileNav.vue";

import Nav, { type LinkProp } from "~/components/Nav.vue";

import { Tooltip } from "~/components/ui/tooltip";

import { signOut } from "firebase/auth";
import UserAvatar from "~/components/UserAvatar.vue";
import { cn } from "~/lib/utils";

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - Visio` : "Visio";
  },
});
interface MailProps {
  defaultLayout?: number[];
}

const props = withDefaults(defineProps<MailProps>(), {
  defaultLayout: () => [265, 440, 655],
});

const isSmallScreen = useMediaQuery("(max-width: 1024px)");
const isCollapsed = ref(isSmallScreen.value);

const links: LinkProp[] = [
  {
    title: "Panel główny",
    label: "",
    to: "/",
    icon: "lucide:home",
  },
  {
    title: "Tranzakcje",
    label: "",
    to: "/transactions",
    icon: "lucide:coins",
  },
  {
    title: "Ustawienia",
    label: "",
    to: "/settings",
    icon: "lucide:settings",
  },
  {
    title: "Admin",
    label: "",
    to: "/admin",
    icon: "lucide:square-user-round",
    isAdmin: true,
  },
];

function toggleCollapse() {
  isCollapsed.value = !isCollapsed.value;
}

const handleSignOut = async () => {
  await signOut();
};
</script>

<template>
  <TooltipProvider :delay-duration="0">
    <NuxtLoadingIndicator />
    <div class="flex min-h-screen">
      <div
        :class="
          cn(
            'hidden md:flex flex-col h-full max-h-screen min-h-screen sticky top-0 sidebar',
            isCollapsed ? 'collapsed' : 'extended',
          )
        "
      >
        <div :class="cn('flex items-center justify-center gap-2', isCollapsed ? 'flex-col py-2' : 'p-2')">
          <Button variant="ghost" size="sm" class="hidden md:flex" @click="toggleCollapse">
            <Icon :name="isCollapsed ? 'lucide:chevron-right' : 'lucide:chevron-left'" />
          </Button>
          <ThemeSwitcher />
        </div>
        <Separator />
        <ScrollArea>
          <Nav :is-collapsed="isCollapsed" :links="links" />
        </ScrollArea>
        <Separator v-if="$slots.nav" />
        <ScrollArea class="">
          <slot name="nav" :is-collapsed="isCollapsed"></slot>
        </ScrollArea>
        <div class="flex grow"></div>
        <Separator />
        <div class="flex flex-col items-center justify-center py-5">
          <UserAvatar />
          <Tooltip v-if="isCollapsed" :key="`1-${index}`" :delay-duration="0">
            <TooltipTrigger as-child>
              <Button @click="handleSignOut">
                <Icon name="lucide:log-out" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" class="flex items-center gap-4">
              <span>Sign out</span>
            </TooltipContent>
          </Tooltip>

          <Button v-else @click="handleSignOut">
            <Icon name="lucide:log-out" />
            <span class="ml-2">Wyloguj</span>
          </Button>
        </div>
      </div>
      <div class="md:border-l w-full">
        <slot></slot>
      </div>
      <div class="app-bar">
        <MobileNav :links="links" />
      </div>
    </div>
  </TooltipProvider>
</template>

<style scoped>
.sidebar {
  container: sidebar / inline-size;
  transition: width 0.3s;
}

.sidebar.collapsed {
  width: 82px;
}

.sidebar.extended {
  width: 256px;
}

.sidebar > * {
  width: 100cqw;
}

.app-bar {
  @apply fixed bottom-0 left-0 right-0 h-16 w-full shadow-md flex flex-row items-center justify-between p-4 border-t;
  @apply bg-slate-300 dark:bg-slate-800;

  @screen md {
    display: none;
  }
}
</style>
