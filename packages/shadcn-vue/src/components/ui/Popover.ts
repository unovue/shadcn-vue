import { defineComponent, h } from 'vue'
import {
  type PopoverContentEmits, PopoverContent as PopoverContentPrimitive, type PopoverContentProps,
  PopoverPortal,
  PopoverRoot,
  PopoverTrigger as PopoverTriggerPrimitive,
} from 'radix-vue'
import { type ParseEmits, cn } from '@/utils'

export const Popover = PopoverRoot
export const PopoverTrigger = PopoverTriggerPrimitive

export const PopoverContent = defineComponent<PopoverContentProps, ParseEmits<PopoverContentEmits>>(
  (props, { attrs, slots }) => {
    return () => h(PopoverPortal,
      () => h(PopoverContentPrimitive,
        {
          align: 'center',
          sideOffset: 20, // set default value

          ...attrs,
          ...props,
          class: cn('z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2', attrs.class),
        }, slots),
    )
  }, {
    name: 'PopoverContent',
  },
)
