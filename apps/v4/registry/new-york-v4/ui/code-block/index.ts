import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"

export { default as CodeBlock } from "./CodeBlock.vue"
export { default as CodeBlockActions } from "./CodeBlockActions.vue"
export { default as CodeBlockContent } from "./CodeBlockContent.vue"
export { default as CodeBlockCopyButton } from "./CodeBlockCopyButton.vue"
export { default as CodeBlockFooter } from "./CodeBlockFooter.vue"
export { default as CodeBlockHeader } from "./CodeBlockHeader.vue"
export { default as CodeBlockLine } from "./CodeBlockLine.vue"
export { default as CodeBlockTitle } from "./CodeBlockTitle.vue"
export { default as CodeBlockToken } from "./CodeBlockToken.vue"
export { highlightCode, loadHighlighter } from "./highlighter"
export type { HighlightedToken } from "./highlighter"
export { useHighlightedCode } from "./useHighlightedCode"

export const codeBlockVariants = cva(
  "rounded-lg text-sm data-[size=sm]:text-xs has-[>[data-slot=code-block-content]:focus-visible]:ring-3 has-[>[data-slot=code-block-content]:focus-visible]:ring-ring/50 group/code-block relative flex w-full min-w-0 flex-col overflow-hidden",
  {
    variants: {
      variant: {
        default: "border border-input text-foreground dark:bg-input/30 has-[>[data-slot=code-block-content]:focus-visible]:border-ring",
        destructive: "border border-destructive/30 text-destructive dark:border-destructive/40",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)
export type CodeBlockVariants = VariantProps<typeof codeBlockVariants>

export const codeBlockLineVariants = cva(
  "-mx-3 px-3 in-data-numbered:gap-x-3 before:min-w-6 before:text-end before:text-muted-foreground after:start-1 after:text-muted-foreground group-data-[size=sm]/code-block:-mx-2.5 group-data-[size=sm]/code-block:px-2.5 relative block min-h-lh after:absolute after:top-0 after:select-none in-data-numbered:col-span-2 in-data-numbered:grid in-data-numbered:grid-cols-subgrid in-data-numbered:[counter-increment:line] in-data-numbered:before:content-[counter(line)] in-data-numbered:before:select-none in-data-numbered:supports-[content:counter(line)_/_'']:before:content-[counter(line)_/_'']",
  {
    variants: {
      variant: {
        default: "",
        added: "bg-muted after:content-['+']",
        removed: "bg-destructive/10 after:text-destructive after:content-['−']",
        highlighted: "bg-muted",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)
export type CodeBlockLineVariants = VariantProps<typeof codeBlockLineVariants>
