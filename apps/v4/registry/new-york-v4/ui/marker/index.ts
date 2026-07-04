import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"

export { default as Marker } from "./Marker.vue"
export { default as MarkerContent } from "./MarkerContent.vue"
export { default as MarkerIcon } from "./MarkerIcon.vue"

export const markerVariants = cva(
  "gap-2 text-sm text-muted-foreground [a]:hover:text-foreground [a]:underline-offset-3 [a]:underline [&_svg:not([class*='size-'])]:size-4 min-h-4 text-left group/marker relative flex w-full items-center",
  {
    variants: {
      variant: {
        default: "",
        separator: "before:h-px before:min-w-0 before:flex-1 before:bg-border after:h-px after:min-w-0 after:flex-1 after:bg-border before:mr-1 after:ml-1",
        border: "border-b border-border pb-2",
      },
    },
  },
)
export type MarkerVariants = VariantProps<typeof markerVariants>
