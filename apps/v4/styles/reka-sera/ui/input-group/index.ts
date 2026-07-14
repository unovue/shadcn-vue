import type { VariantProps } from 'class-variance-authority'
import type { HTMLAttributes } from 'vue'
import type { ButtonVariants } from '@/styles/reka-sera/ui/button'
import { cva } from 'class-variance-authority'

export { default as InputGroup } from './InputGroup.vue'
export { default as InputGroupAddon } from './InputGroupAddon.vue'
export { default as InputGroupButton } from './InputGroupButton.vue'
export { default as InputGroupInput } from './InputGroupInput.vue'
export { default as InputGroupText } from './InputGroupText.vue'
export { default as InputGroupTextarea } from './InputGroupTextarea.vue'

export const inputGroupAddonVariants = cva(
  'text-muted-foreground **:data-[slot=kbd]:bg-muted-foreground/10 h-auto gap-2 py-2 text-sm font-medium group-data-[disabled=true]/input-group:opacity-50 **:data-[slot=kbd]:rounded-none **:data-[slot=kbd]:px-1.5 [&>svg:not([class*=size-])]:size-3.5 flex cursor-text items-center justify-center select-none',
  {
    variants: {
      align: {
        'inline-start': 'has-[>button]:-ml-1 has-[>kbd]:-ml-1 order-first',
        'inline-end': 'has-[>button]:-mr-1 has-[>kbd]:-mr-1 order-last',
        'block-start': 'pt-3 group-has-[>input]/input-group:pt-3.5 [.border-b]:pb-3.5 order-first w-full justify-start',
        'block-end': 'pb-3 group-has-[>input]/input-group:pb-3.5 [.border-t]:pt-3.5 order-last w-full justify-start',
      },
    },
    defaultVariants: {
      align: 'inline-start',
    },
  },
)

export type InputGroupVariants = VariantProps<typeof inputGroupAddonVariants>

export const inputGroupButtonVariants = cva(
  'gap-2 rounded-none text-sm flex items-center shadow-none',
  {
    variants: {
      size: {
        'xs': 'h-6 gap-1 rounded-none px-1.5 [&>svg:not([class*=size-])]:size-3.5 text-xs',
        'sm': '',
        'icon-xs': 'size-6 p-0 has-[>svg]:p-0 text-xs',
        'icon-sm': 'size-8 p-0 has-[>svg]:p-0',
      },
    },
    defaultVariants: {
      size: 'xs',
    },
  },
)

export type InputGroupButtonVariants = VariantProps<typeof inputGroupButtonVariants>

export interface InputGroupButtonProps {
  variant?: ButtonVariants['variant']
  size?: InputGroupButtonVariants['size']
  class?: HTMLAttributes['class']
}
