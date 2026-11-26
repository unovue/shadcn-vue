import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"

export { default as Bubble } from "./Bubble.vue"
export { default as BubbleContent } from "./BubbleContent.vue"
export { default as BubbleGroup } from "./BubbleGroup.vue"
export { default as BubbleReactions } from "./BubbleReactions.vue"

export const bubbleVariants = cva(
  "cn-bubble group/bubble relative flex w-fit min-w-0 flex-col",
  {
    variants: {
      variant: {
        default: "cn-bubble-variant-default",
        secondary: "cn-bubble-variant-secondary",
        muted: "cn-bubble-variant-muted",
        tinted: "cn-bubble-variant-tinted",
        outline: "cn-bubble-variant-outline",
        ghost: "cn-bubble-variant-ghost",
        destructive: "cn-bubble-variant-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)
export type BubbleVariants = VariantProps<typeof bubbleVariants>

export const bubbleReactionsVariants = cva(
  "cn-bubble-reactions absolute z-10 flex w-fit items-center justify-center",
  {
    variants: {
      side: {
        top: "cn-bubble-reactions-side-top",
        bottom: "cn-bubble-reactions-side-bottom",
      },
      align: {
        start: "cn-bubble-reactions-align-start",
        end: "cn-bubble-reactions-align-end",
      },
    },
    defaultVariants: {
      side: "bottom",
      align: "end",
    },
  },
)
export type BubbleReactionsVariants = VariantProps<typeof bubbleReactionsVariants>
