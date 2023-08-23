import { defineComponent } from 'vue'
import {
  type SelectContentEmits, SelectContent as SelectContentPrimitive, type SelectContentProps,
  SelectGroup as SelectGroupPrimitive,
  SelectIcon, SelectItemIndicator,
  SelectItem as SelectItemPrimitive, type SelectItemProps,
  SelectItemText,
  SelectLabel as SelectLabelPrimitive, type SelectLabelProps,
  SelectPortal, SelectRoot,
  SelectSeparator as SelectSeparatorPrimitive, type SelectSeparatorProps,
  SelectTrigger as SelectTriggerPrimitive, type SelectTriggerProps,
  SelectValue as SelectValuePrimitive, SelectViewport,
} from 'radix-vue'
import { Check, ChevronDown } from 'lucide-vue-next'
import type { ParseEmits } from '@/utils'
import { cn, convertToComponent, useEmitAsProps } from '@/utils'

export const Select = SelectRoot
export const SelectGroup = SelectGroupPrimitive
export const SelectValue = SelectValuePrimitive

// Convert Functional component to valid VNode to be use in JSX
const IChevrondown = convertToComponent(ChevronDown)
const ICheck = convertToComponent(Check)

export const SelectTrigger = defineComponent<SelectTriggerProps>(
  (props, { attrs, slots }) => {
    return () => (
     <SelectTriggerPrimitive {...props} class={cn('flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50', attrs.class ?? '')}>
        { slots.default?.() }

        <SelectIcon asChild>
          <IChevrondown class={'h-4 w-4 opacity-50'} />
        </SelectIcon>
     </SelectTriggerPrimitive>
    )
  }, {
    name: 'SelectTrigger',
  },
)

export const SelectContent = defineComponent<SelectContentProps, ParseEmits<SelectContentEmits>>(
  (props, { emit, attrs, slots }) => {
    const position = props.position ?? 'popper'
    const emitsAsProps = useEmitAsProps(emit)
    return () => (
      <SelectPortal>
        <SelectContentPrimitive
          class={cn(
            'relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
            position === 'popper'
              && 'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
            attrs.class ?? '',
          )}
          position='popper'
          {...props}
          {...emitsAsProps}
        >
          <SelectViewport class={cn(
            'p-1',
            position === 'popper'
              && 'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]',
          )}
          >
            { slots.default?.()}
          </SelectViewport>
        </SelectContentPrimitive>
      </SelectPortal>
    )
  }, { name: 'SelectContent', emits: SelectContentPrimitive.emits },
)

export const SelectLabel = defineComponent<SelectLabelProps>(
  (props, { attrs, slots }) => {
    return () => (
      <SelectLabelPrimitive class={cn('py-1.5 pl-8 pr-2 text-sm font-semibold', attrs.class)} {...props}>
        { slots.default?.() }
      </SelectLabelPrimitive>
    )
  }, { name: 'SelectLabel' },
)

export const SelectItem = defineComponent<SelectItemProps>(
  (props, { attrs, slots }) => {
    return () => (
      <SelectItemPrimitive
        class={cn('relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50', attrs.class)}
        {...props}
      >
        <span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
          <SelectItemIndicator>
            <ICheck class={'w-4 h-4'}></ICheck>
          </SelectItemIndicator>
        </span>

        <SelectItemText>
          { slots.default?.() }
        </SelectItemText>
      </SelectItemPrimitive>
    )
  }, { name: 'SelectItem' },
)

export const SelectSeparator = defineComponent<SelectSeparatorProps>(
  (props, { attrs, slots }) => {
    return () => (
      <SelectSeparatorPrimitive class={cn('py-1.5 pl-8 pr-2 text-sm font-semibold', attrs.class)} {...props}>
        { slots.default?.() }
      </SelectSeparatorPrimitive>
    )
  }, { name: 'SelectSeparator' },
)
