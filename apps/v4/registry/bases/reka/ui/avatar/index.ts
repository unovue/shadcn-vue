import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"

export { default as Avatar } from "./Avatar.vue"
export { default as AvatarBadge } from "./AvatarBadge.vue"
export { default as AvatarFallback } from "./AvatarFallback.vue"
export { default as AvatarGroup } from "./AvatarGroup.vue"
export { default as AvatarGroupCount } from "./AvatarGroupCount.vue"
export { default as AvatarImage } from "./AvatarImage.vue"

export const avatarVariants = cva(
  "relative flex shrink-0 overflow-hidden rounded-full",
  {
    variants: {
      size: {
        sm: "size-8",
        md: "size-10",
        lg: "size-12",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
)

export type AvatarVariants = VariantProps<typeof avatarVariants>
