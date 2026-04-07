import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"

export { default as Item } from "./Item.vue"
export { default as ItemActions } from "./ItemActions.vue"
export { default as ItemContent } from "./ItemContent.vue"
export { default as ItemDescription } from "./ItemDescription.vue"
export { default as ItemFooter } from "./ItemFooter.vue"
export { default as ItemGroup } from "./ItemGroup.vue"
export { default as ItemHeader } from "./ItemHeader.vue"
export { default as ItemMedia } from "./ItemMedia.vue"
export { default as ItemSeparator } from "./ItemSeparator.vue"
export { default as ItemTitle } from "./ItemTitle.vue"

export const itemVariants = cva(
  "cn-item w-full group/item focus-visible:border-ring focus-visible:ring-ring/50 flex items-center flex-wrap outline-none transition-colors duration-100 focus-visible:ring-[3px] [a]:transition-colors",
  {
    variants: {
      variant: {
        default: "cn-item-variant-default",
        outline: "cn-item-variant-outline",
        muted: "cn-item-variant-muted",
      },
      size: {
        default: "cn-item-size-default",
        sm: "cn-item-size-sm",
        xs: "cn-item-size-xs",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export const itemMediaVariants = cva(
  "cn-item-media flex shrink-0 items-center justify-center [&_svg]:pointer-events-none",
  {
    variants: {
      variant: {
        default: "cn-item-media-variant-default",
        icon: "cn-item-media-variant-icon",
        image: "cn-item-media-variant-image",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

export type ItemVariants = VariantProps<typeof itemVariants>
export type ItemMediaVariants = VariantProps<typeof itemMediaVariants>
