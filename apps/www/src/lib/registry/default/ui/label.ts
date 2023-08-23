import { defineComponent, h } from 'vue'
import { type VariantProps, cva } from 'class-variance-authority'
import { type LabelProps } from 'radix-vue'
import { cn } from '@/utils'

export const labelVariants = cva(
  'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
)

interface Props extends LabelProps, VariantProps<typeof labelVariants> {}

export const Label = defineComponent<Props>(
  (props, { attrs, slots }) => {
    return () => h('label', { class: cn(labelVariants(), attrs.class ?? ''), ...props }, slots)
  },
  { name: 'Label' },
)
