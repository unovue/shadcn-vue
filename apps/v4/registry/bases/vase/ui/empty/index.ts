import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"

export { default as Empty } from "./Empty.vue"
export { default as EmptyContent } from "./EmptyContent.vue"
export { default as EmptyDescription } from "./EmptyDescription.vue"
export { default as EmptyHeader } from "./EmptyHeader.vue"
export { default as EmptyMedia } from "./EmptyMedia.vue"
export { default as EmptyTitle } from "./EmptyTitle.vue"

export const emptyMediaVariants = cva(
  "cn-empty-media flex shrink-0 items-center justify-center [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "cn-empty-media-default",
        icon: "cn-empty-media-icon",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

export type EmptyMediaVariants = VariantProps<typeof emptyMediaVariants>
