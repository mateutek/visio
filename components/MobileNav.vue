<script lang="ts" setup>
import { Icon } from "@iconify/vue";
import { buttonVariants } from "~/components/ui/button";
import { Tooltip } from "~/components/ui/tooltip";
import { cn } from '~/lib/utils';

export interface LinkProp {
  title: string;
  label?: string;
  icon?: string;
  imgIcon?: string;
  to?: string;
}

interface NavProps {
  links: LinkProp[];
}

defineProps<NavProps>();
</script>

<template>
  <nav
    class="flex flex-row gap-8 px-2 justify-center w-full"
  >
    <template v-for="(link, index) of links" :key="`1-${index}`">
      <Tooltip  :delay-duration="0">
        <TooltipTrigger as-child>
          <NuxtLink :to="link.to || '#'">
            <Avatar v-if="link.imgIcon" shape="square" size="icon">
              <AvatarImage :src="link.imgIcon" />
            </Avatar>
            <Icon v-else-if="link.icon" :icon="link.icon" class="size-8" />
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
    </template>
  </nav>
</template>
