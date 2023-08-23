import { defineComponent, h } from 'vue'
import {
  AlertDialogAction as AlertDialogActionPrimitive, type AlertDialogActionProps,
  AlertDialogCancel as AlertDialogCancelPrimitive, type AlertDialogCancelProps,
  AlertDialogContent as AlertDialogContentPrimitive, type AlertDialogContentProps,
  AlertDialogDescription as AlertDialogDescriptionPrimitive, type AlertDialogDescriptionProps,
  AlertDialogOverlay as AlertDialogOverlayPrimitive, type AlertDialogOverlayProps,
  AlertDialogPortal as AlertDialogPortalPrimitive,
  AlertDialogRoot, AlertDialogTitle as AlertDialogTitlePrimitive,
  type AlertDialogTitleProps, AlertDialogTrigger as AlertDialogTriggerPrimitive,
} from 'radix-vue'
import { cn } from '@/utils'
import { buttonVariants } from '@/registry/default/ui/button'

export const AlertDialog = AlertDialogRoot
export const AlertDialogTrigger = AlertDialogTriggerPrimitive
export const AlertDialogPortal = AlertDialogPortalPrimitive

export const AlertDialogOverlay = defineComponent<AlertDialogOverlayProps>(
  (props, { attrs, slots }) => {
    return () => h(AlertDialogOverlayPrimitive,
      { class: cn('fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0', attrs.class), ...props },
      slots,
    )
  }, { name: 'AlertDialogOverlay' },
)

export const AlertDialogContent = defineComponent<AlertDialogContentProps>(
  (props, { attrs, slots }) => {
    return () => h(AlertDialogPortal, () => [
      h(AlertDialogOverlay),
      h(AlertDialogContentPrimitive, {
        class: cn('fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg md:w-full', attrs.class ?? ''),
        ...props,
      }, slots),
    ])
  }, { name: 'AlertDialogContent' },
)

export const AlertDialogHeader = defineComponent(
  (_props, { attrs, slots }) => {
    return () => h('div',
      { class: cn('flex flex-col space-y-2 text-center sm:text-left', attrs.class) },
      slots,
    )
  }, { name: 'AlertDialogHeader' },
)

export const AlertDialogFooter = defineComponent(
  (_props, { attrs, slots }) => {
    return () => h('div',
      { class: cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', attrs.class) },
      slots,
    )
  }, { name: 'AlertDialogFooter' },
)

export const AlertDialogTitle = defineComponent<AlertDialogTitleProps>(
  (props, { attrs, slots }) => {
    return () => h(AlertDialogTitlePrimitive,
      { class: cn('text-lg font-semibold', attrs.class), ...props },
      slots,
    )
  }, { name: 'AlertDialogTitle' },
)

export const AlertDialogDescription = defineComponent<AlertDialogDescriptionProps>(
  (props, { attrs, slots }) => {
    return () => h(AlertDialogDescriptionPrimitive,
      { class: cn('text-sm text-muted-foreground', attrs.class), ...props },
      slots,
    )
  }, { name: 'AlertDialogDescription' },
)

export const AlertDialogAction = defineComponent<AlertDialogActionProps>(
  (props, { attrs, slots }) => {
    return () => h(AlertDialogActionPrimitive,
      { class: cn(buttonVariants(), attrs.class), ...props },
      slots,
    )
  }, { name: 'AlertDialogAction' },
)

export const AlertDialogCancel = defineComponent<AlertDialogCancelProps>(
  (props, { attrs, slots }) => {
    return () => h(AlertDialogCancelPrimitive,
      { class: cn(buttonVariants({ variant: 'outline' }), 'mt-2 sm:mt-0', attrs.class), ...props },
      slots,
    )
  }, { name: 'AlertDialogCancel' },
)
