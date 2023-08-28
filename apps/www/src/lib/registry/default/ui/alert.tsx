import { type VariantProps, cva } from 'class-variance-authority'
import { HTMLAttributes, defineComponent } from 'vue'
import { cn } from '@/utils'

const alertVariants = cva(
  'relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground',
  {
    variants: {
      variant: {
        default: 'bg-background text-foreground',
        destructive:
          'border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

const Alert = defineComponent<VariantProps<typeof alertVariants> & HTMLAttributes>((props, { slots, attrs }) => {
  const variant = props.variant ?? 'default'
  return () => (
    <div
      role="alert"
      class={cn(alertVariants({ variant }), attrs.class ?? '')}
      {...props}
    >
      {slots.default?.()}
    </div>
  )
}, {name: "Alert"})

const AlertTitle = defineComponent<HTMLAttributes>((props, {slots, attrs}) => {
  return () =>(
  <h5
    class={cn('mb-1 font-medium leading-none tracking-tight', attrs.class ?? '')}
    {...props}
  >
    {slots.default?.()}
  </h5>
)}, {name: "AlertTitle"})

const AlertDescription = defineComponent<HTMLAttributes>((props, {slots, attrs}) => { return () => (
  <div
    class={cn('text-sm [&_p]:leading-relaxed', attrs.class ?? '')}
    {...props}
  >
    {slots.default?.()}
  </div>
)}, {name: "AlertDescription"})

export { Alert, AlertTitle, AlertDescription }
