import { defineComponent, h } from 'vue'
import {
  AccordionContent as AccordionContentPrimitive,
  type AccordionContentProps, AccordionHeader as AccordionHeaderPrimitive,
  type AccordionHeaderProps, AccordionItem as AccordionItemPrimitive,
  type AccordionItemProps, AccordionRoot as AccordionRootPrimitive,
  AccordionTrigger as AccordionTriggerPrimitive, type AccordionTriggerProps,
} from 'radix-vue'
import { cn } from '@/utils'

export const Accordion = AccordionRootPrimitive

export const AccordionContent = defineComponent<AccordionContentProps>(
  (props, { attrs, slots }) => {
    return () => h(AccordionContentPrimitive,
      { class: cn('overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down', attrs.class), ...props },
      () => h('div', { class: 'pb-4 pt-0' }, slots),
    )
  },
)

export const AccordionTrigger = defineComponent<AccordionTriggerProps>(
  (props, { attrs, slots }) => {
    return () => h(AccordionHeaderPrimitive, { class: 'flex' },
      () => h(AccordionTriggerPrimitive,
        { class: cn('flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180', attrs.class) },
        slots,
      ),
    )
  },
)

export const AccordionItem = defineComponent<AccordionItemProps>(
  (props, { attrs, slots }) => {
    return () => h(AccordionItemPrimitive,
      { class: cn('border-b', attrs.class), ...props }, slots)
  },
)

export const AccordionHeader = defineComponent<AccordionHeaderProps>(
  (props, { attrs, slots }) => {
    return () => h(AccordionHeaderPrimitive, { class: cn('flex', attrs.class), ...props }, slots)
  },
)
