import {
  DropdownMenuCheckboxItem as DropdownMenuCheckboxItemPrimitive, type DropdownMenuCheckboxItemProps,
  DropdownMenuContent as DropdownMenuContentPrimitive, type DropdownMenuContentProps,
  DropdownMenuGroup as DropdownMenuGroupPrimitive,
  DropdownMenuItemIndicator as DropdownMenuItemIndicatorPrimitive,
  DropdownMenuItem as DropdownMenuItemPrimitive, type DropdownMenuItemProps,
  DropdownMenuLabel as DropdownMenuLabelPrimitive, type DropdownMenuLabelProps,
  DropdownMenuPortal as DropdownMenuPortalPrimitive,
  DropdownMenuRadioGroup as DropdownMenuRadioGroupPrimitive,
  DropdownMenuRadioItem as DropdownMenuRadioItemPrimitive, type DropdownMenuRadioItemProps,
  DropdownMenuRoot as DropdownMenuRootPrimitive,
  DropdownMenuSeparator as DropdownMenuSeparatorPrimitive, type DropdownMenuSeparatorProps,
  DropdownMenuSubContent as DropdownMenuSubContentPrimitive, type DropdownMenuSubContentProps,
  DropdownMenuSub as DropdownMenuSubPrimitive,
  DropdownMenuSubTrigger as DropdownMenuSubTriggerPrimitive, type DropdownMenuSubTriggerProps,
  DropdownMenuTrigger as DropdownMenuTriggerPrimitive,
} from 'radix-vue'
import { defineComponent } from 'vue'
import { Check, ChevronRight, Circle } from 'lucide-vue-next'
import { cn, convertToComponent, useEmitAsProps } from '@/utils'

const ChevronRightIcon = convertToComponent(ChevronRight)
const CheckIcon = convertToComponent(Check)
const CircleIcon = convertToComponent(Circle)

const DropdownMenu = DropdownMenuRootPrimitive
const DropdownMenuTrigger = DropdownMenuTriggerPrimitive
const DropdownMenuGroup = DropdownMenuGroupPrimitive
const DropdownMenuPortal = DropdownMenuPortalPrimitive
const DropdownMenuSub = DropdownMenuSubPrimitive
const DropdownMenuRadioGroup = DropdownMenuRadioGroupPrimitive

const DropdownMenuSubTrigger = defineComponent<
  DropdownMenuSubTriggerProps & {
    inset?: boolean
  }
>(
  (props, { attrs, slots }) => {
    return () => (
      <DropdownMenuSubTriggerPrimitive
        class={cn(
          'flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent',
          props.inset && 'pl-8',
          attrs.class ?? '',
        )}
        {...props}
      >
        {slots.default?.()}
        <ChevronRightIcon class="ml-auto w-4 h-4" />
      </DropdownMenuSubTriggerPrimitive>
    )
  },
  {
    name: 'DropdownMenuSubTrigger',
  },
)

const DropdownMenuSubContent = defineComponent<DropdownMenuSubContentProps>(
  (props, { attrs, emit, slots }) => {
    const emitsAsProps = useEmitAsProps(emit)
    return () => (
      <DropdownMenuSubContentPrimitive
        class={cn(
          'z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
          attrs.class ?? '',
        )}
        {...props}
        {...emitsAsProps}
      >
        {slots.default?.()}
      </DropdownMenuSubContentPrimitive>
    )
  },
  {
    name: 'DropdownMenuSubContent',
    emits: DropdownMenuSubContentPrimitive.emits,
  },
)

const DropdownMenuContent = defineComponent<DropdownMenuContentProps>(
  (props, { attrs, emit, slots }) => {
    const emitsAsProps = useEmitAsProps(emit)
    return () => (
      <DropdownMenuPortalPrimitive>
        <DropdownMenuContentPrimitive
        sideOffset={props.sideOffset ?? 4}
          class={cn(
            'z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md',
            'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
            attrs.class ?? '',
          )}
          {...props}
          {...emitsAsProps}
        >
          {slots.default?.()}
        </DropdownMenuContentPrimitive>
      </DropdownMenuPortalPrimitive>
    )
  },
  {
    name: 'DropdownMenuContent',
    emits: DropdownMenuContentPrimitive.emits,
  },
)

const DropdownMenuItem = defineComponent<
  DropdownMenuItemProps & {
    inset?: boolean
  }
>(
  (props, { attrs, emit, slots }) => {
    const emitsAsProps = useEmitAsProps(emit)
    return () => (
      <DropdownMenuItemPrimitive
        class={cn(
          'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
          props.inset && 'pl-8',
          attrs.class ?? '',
        )}
        {...props}
        {...emitsAsProps}
      >
        {slots.default?.()}
      </DropdownMenuItemPrimitive>
    )
  },
  {
    name: 'DropdownMenuItem',
    emits: DropdownMenuItemPrimitive.emits,
  },
)

const DropdownMenuCheckboxItem = defineComponent<DropdownMenuCheckboxItemProps>(
  (props, { attrs, slots, emit }) => {
    const emitsAsProps = useEmitAsProps(emit)
    return () => (
      <DropdownMenuCheckboxItemPrimitive
        class={cn(
          'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
          attrs.class ?? '',
        )}
        checked={props.checked}
        {...props}
        {...emitsAsProps}
      >
        <span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
          <DropdownMenuItemIndicatorPrimitive>
            <CheckIcon class="h-4 w-4" />
          </DropdownMenuItemIndicatorPrimitive>
        </span>
        {slots.default?.()}
      </DropdownMenuCheckboxItemPrimitive>
    )
  },
  { name: 'DropdownMenuCheckboxItem', emits: DropdownMenuItemPrimitive.emits },
)

const DropdownMenuRadioItem = defineComponent<DropdownMenuRadioItemProps>(
  (props, { attrs, slots, emit }) => {
    const emitsAsProps = useEmitAsProps(emit)
    return () => (
      <DropdownMenuRadioItemPrimitive
        class={cn(
          'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
          attrs.class ?? '',
        )}
        {...props}
        {...emitsAsProps}
      >
        <span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
          <DropdownMenuItemIndicatorPrimitive>
            <CircleIcon class="h-4 w-4 fill-current" />
          </DropdownMenuItemIndicatorPrimitive>
        </span>
        {slots.default?.()}
      </DropdownMenuRadioItemPrimitive>
    )
  },
  {
    name: 'DropdownMenuRadioItem',
    emits: DropdownMenuRadioItemPrimitive.emits,
  },
)

const DropdownMenuLabel = defineComponent<
  DropdownMenuLabelProps & {
    inset?: boolean
  }
>(
  (props, { attrs, slots }) => {
    return () => (
      <DropdownMenuLabelPrimitive
        class={cn(
          'px-2 py-1.5 text-sm font-semibold',
          props.inset && 'pl-8',
          attrs.class ?? '',
        )}
        {...props}
      >
        {slots.default?.()}
      </DropdownMenuLabelPrimitive>
    )
  },
  {
    name: 'DropdownMenuLabel',
  },
)

const DropdownMenuSeparator = defineComponent<DropdownMenuSeparatorProps>(
  (props, { attrs }) => {
    return () => (
      <DropdownMenuSeparatorPrimitive
        class={cn('mx-1 my-1 h-px bg-muted', attrs.class)}
        {...props}
      />
    )
  },
  {
    name: 'DropdownMenuSeparator',
  },
)

const DropdownMenuShortcut = defineComponent(
  (props, { attrs }) => {
    return () => (
      <span
        class={cn(
          'ml-auto text-xs tracking-widest opacity-60',
          attrs.class ?? '',
        )}
        {...props}
      />
    )
  },
  {
    name: 'DropdownMenuShortcut',
  },
)

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
}
