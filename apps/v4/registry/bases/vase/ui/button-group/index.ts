import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"

export { default as ButtonGroup } from "./ButtonGroup.vue"
export { default as ButtonGroupSeparator } from "./ButtonGroupSeparator.vue"
export { default as ButtonGroupText } from "./ButtonGroupText.vue"

export const buttonGroupVariants = cva(
  "cn-button-group flex w-fit items-stretch *:focus-visible:relative *:focus-visible:z-10 [&>[data-slot=select]>[data-slot=select-trigger]:focus-visible]:relative [&>[data-slot=select]>[data-slot=select-trigger]:focus-visible]:z-10 [&>[data-slot=select-trigger]:not([class*='w-'])]:w-fit [&>input]:flex-1",
  {
    variants: {
      orientation: {
        horizontal:
          "cn-button-group-orientation-horizontal [&>*:not(:first-child)]:rounded-l-none [&>*:not(:first-child)]:border-l-0 [&>*:not(:last-child)]:rounded-r-none [&>[data-slot=select]:not(:first-child)>[data-slot=select-trigger]]:rounded-l-none [&>[data-slot=select]:not(:first-child)>[data-slot=select-trigger]]:border-l-0 [&>[data-slot=select]:not(:last-child)>[data-slot=select-trigger]]:rounded-r-none",
        vertical:
          "cn-button-group-orientation-vertical flex-col [&>*:not(:first-child)]:rounded-t-none [&>*:not(:first-child)]:border-t-0 [&>*:not(:last-child)]:rounded-b-none [&>[data-slot=select]:not(:first-child)>[data-slot=select-trigger]]:rounded-t-none [&>[data-slot=select]:not(:first-child)>[data-slot=select-trigger]]:border-t-0 [&>[data-slot=select]:not(:last-child)>[data-slot=select-trigger]]:rounded-b-none",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
    },
  },
)

export type ButtonGroupVariants = VariantProps<typeof buttonGroupVariants>
