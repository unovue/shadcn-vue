import { defineComponent, h } from 'vue'
import {
  DialogClose, type DialogContentEmits, DialogContent as DialogContentPrimitive, type DialogContentProps,
  DialogDescription as DialogDescriptionPrimitive, type DialogDescriptionProps,
  DialogOverlay as DialogOverlayPrimitive, type DialogOverlayProps,
  DialogPortal as DialogPortalPrimitive, DialogRoot,
  DialogTitle as DialogTitlePrimitive, type DialogTitleProps,
  DialogTrigger as DialogTriggerPrimitive,
} from 'radix-vue'
import { X } from 'lucide-vue-next'
import type { ParseEmits } from '@/utils'
import { cn, useEmitAsProps } from '@/utils'

export const Dialog = DialogRoot
export const DialogTrigger = DialogTriggerPrimitive
export const DialogPortal = DialogPortalPrimitive

export const DialogOverlay = defineComponent<DialogOverlayProps>(
  (props, { attrs, slots }) => {
    return () => h(DialogOverlayPrimitive,
      { class: cn('fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0', attrs.class), ...props },
      slots,
    )
  }, { name: 'DialogOverlay' },
)

export const DialogContent = defineComponent<DialogContentProps, ParseEmits<DialogContentEmits>>(
  (props, { emit, attrs, slots }) => {
    const emitsAsProps = useEmitAsProps(emit)

    return () => h(DialogPortal, () => [
      h(DialogOverlay),
      h(DialogContentPrimitive, {
        class: cn('fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg md:w-full', attrs.class ?? ''),
        ...props,
        ...emitsAsProps,
      }, () => [
        slots.default(),
        h(DialogClose,
          { class: 'absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground' },
          () => [h(X, { class: 'h-4 w-4' }), h('span', { class: 'sr-only' }, 'Close')],
        ),
      ]),
    ])
  }, { name: 'DialogContent', emits: DialogContentPrimitive.emits },
)

export const DialogHeader = defineComponent(
  (_props, { attrs, slots }) => {
    return () => h('div',
      { class: cn('flex flex-col space-y-1.5 text-center sm:text-left', attrs.class) },
      slots,
    )
  }, { name: 'DialogHeader' },
)

export const DialogFooter = defineComponent(
  (_props, { attrs, slots }) => {
    return () => h('div',
      { class: cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', attrs.class) },
      slots,
    )
  }, { name: 'DialogFooter' },
)

export const DialogTitle = defineComponent<DialogTitleProps>(
  (props, { attrs, slots }) => {
    return () => h(DialogTitlePrimitive,
      { class: cn('text-lg font-semibold leading-none tracking-tight', attrs.class), ...props },
      slots,
    )
  }, { name: 'DialogTitle' },
)

export const DialogDescription = defineComponent<DialogDescriptionProps>(
  (props, { attrs, slots }) => {
    return () => h(DialogDescriptionPrimitive,
      { class: cn('text-lg font-semibold leading-none tracking-tight', attrs.class), ...props },
      slots,
    )
  }, { name: 'DialogDescription' },
)
