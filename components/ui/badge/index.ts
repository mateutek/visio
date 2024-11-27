import { type VariantProps, cva } from "class-variance-authority";

export { default as Badge } from "./Badge.vue";

export const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        deathknight: "bg-class-deathknight-bg text-class-deathknight-fg",
        demonhunter: "bg-class-demonhunter-bg text-class-demonhunter",
        druid: "bg-class-druid-bg text-class-druid-fg",
        hunter: "bg-class-hunter-bg text-class-hunter-fg",
        mage: "bg-class-mage-bg text-class-mage-fg",
        monk: "bg-class-monk-bg text-class-monk-fg",
        paladin: "bg-class-paladin-bg text-class-paladin-fg",
        priest: "bg-class-priest-bg text-class-priest-fg",
        rogue: "bg-class-rogue-bg text-class-rogue-fg",
        shaman: "bg-class-shaman-bg text-class-shaman-fg",
        warlock: "bg-class-warlock-bg text-class-warlock-fg",
        warrior: "bg-class-warrior-bg text-class-warrior-fg",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export type BadgeVariants = VariantProps<typeof badgeVariants>;
