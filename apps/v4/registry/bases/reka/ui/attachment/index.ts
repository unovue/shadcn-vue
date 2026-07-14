import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"

export { default as Attachment } from "./Attachment.vue"
export { default as AttachmentAction } from "./AttachmentAction.vue"
export { default as AttachmentActions } from "./AttachmentActions.vue"
export { default as AttachmentContent } from "./AttachmentContent.vue"
export { default as AttachmentDescription } from "./AttachmentDescription.vue"
export { default as AttachmentGroup } from "./AttachmentGroup.vue"
export { default as AttachmentMedia } from "./AttachmentMedia.vue"
export { default as AttachmentTitle } from "./AttachmentTitle.vue"
export { default as AttachmentTrigger } from "./AttachmentTrigger.vue"

export const attachmentVariants = cva(
  "cn-attachment group/attachment relative flex max-w-full min-w-0 shrink-0 flex-wrap border bg-card text-card-foreground transition-colors has-[>a,>button]:hover:bg-muted/50 data-[state=error]:border-destructive/30 data-[state=idle]:border-dashed",
  {
    variants: {
      size: {
        default: "cn-attachment-size-default",
        sm: "cn-attachment-size-sm",
        xs: "cn-attachment-size-xs",
      },
      orientation: {
        horizontal: "cn-attachment-orientation-horizontal items-center",
        vertical: "cn-attachment-orientation-vertical flex-col",
      },
    },
  },
)

export type AttachmentVariants = VariantProps<typeof attachmentVariants>

export const attachmentMediaVariants = cva(
  "cn-attachment-media relative flex aspect-square shrink-0 items-center justify-center overflow-hidden group-data-[state=error]/attachment:bg-destructive/10 group-data-[state=error]/attachment:text-destructive [&_svg]:pointer-events-none",
  {
    variants: {
      variant: {
        icon: "cn-attachment-media-variant-icon",
        image:
          "cn-attachment-media-variant-image *:[img]:aspect-square *:[img]:w-full *:[img]:object-cover",
      },
    },
    defaultVariants: {
      variant: "icon",
    },
  },
)

export type AttachmentMediaVariants = VariantProps<typeof attachmentMediaVariants>
