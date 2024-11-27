<script lang="ts" setup>
import { Icon } from "@iconify/vue";
import { buttonVariants } from "~/components/ui/button";
import { Tooltip } from "~/components/ui/tooltip";
import { cn } from "~/lib/utils";

export interface LinkProp {
  title: string;
  label?: string;
  icon?: string;
  imgIcon?: string;
  to?: string;
  isAdmin?: boolean;
}

const { role } = useRole();

interface NavProps {
  isCollapsed: boolean;
  links: LinkProp[];
}

const { links } = defineProps<NavProps>();

const isAdmin = computed(() => role.value === "admin");

const filteredLinks = computed(() => {
  return links.filter((link) => !link.isAdmin || isAdmin.value);
});
</script>

<template>
  <div :data-collapsed="isCollapsed" class="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2">
    <nav class="grid gap-2 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
      <template v-for="(link, index) of filteredLinks">
        <Tooltip v-if="isCollapsed" :key="`1-${index}`" :delay-duration="0">
          <TooltipTrigger as-child>
            <NuxtLink :to="link.to || '#'">
              <Avatar v-if="link.imgIcon" shape="square" size="icon">
                <AvatarImage :src="link.imgIcon" />
              </Avatar>
              <Icon v-else-if="link.icon" :icon="link.icon" class="size-4" />
              <span class="sr-only">{{ link.title }}</span>
            </NuxtLink>
          </TooltipTrigger>
          <TooltipContent side="right" class="flex items-center gap-4">
            {{ link.title }}
            <span v-if="link.label" class="ml-auto text-muted-foreground">
              {{ link.label }}
            </span>
          </TooltipContent>
        </Tooltip>
        <NuxtLink
          v-else
          :key="`2-${index}`"
          :to="link.to || ''"
          active-class="text-primary dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white"
          :class="cn(buttonVariants({ variant: 'ghost', size: 'sm' }), 'justify-start')"
        >
          <Avatar v-if="link.imgIcon" shape="square" size="icon" class="mr-1">
            <AvatarImage :src="link.imgIcon" />
          </Avatar>
          <Icon v-else-if="link.icon" :icon="link.icon" class="size-4 mr-1" />
          {{ link.title }}
          <span
            v-if="link.label"
            :class="cn('ml-auto', link.variant === 'default' && 'text-background dark:text-white')"
          >
            {{ link.label }}
          </span>
        </NuxtLink>
      </template>
    </nav>
  </div>
</template>
