import {AvatarRoot as AvatarRootPrimitive,
  AvatarImage as AvatarImagePrimitive,
  AvatarFallback as AvatarFallbackPrimitive,
  type AvatarRootProps,
  type AvatarImageProps,
  type AvatarFallbackProps,

} from 'radix-vue';
import { cn, useEmitAsProps } from "@/utils"
import { defineComponent } from 'vue';

const Avatar = defineComponent<AvatarRootProps>((props, {attrs, slots}) => {
  return () => (
  <AvatarRootPrimitive
    class={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      attrs.class ?? ""
    )}
    {...props}
  >
    {slots.default?.()}
  </AvatarRootPrimitive>
)}, {name: "Avatar"})

const AvatarImage = defineComponent<AvatarImageProps>((props, {attrs, slots, emit}) => {
  const emitsAsProps = useEmitAsProps(emit)
  return () => (
  <AvatarImagePrimitive
    class={cn("aspect-square h-full w-full", attrs.class ?? "")}
    {...props}
    {...emitsAsProps}
  >
    {slots.default?.()}
  </AvatarImagePrimitive>
  )
}, {name: "AvatarImage", emits: AvatarImagePrimitive.emits});

const AvatarFallback = defineComponent<AvatarFallbackProps>((props, {attrs, slots, emit}) => {
  const emitsAsProps = useEmitAsProps(emit)
  return () => (
  <AvatarFallbackPrimitive
    class={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      attrs.class ?? ""
    )}
    {...props}
    {...emitsAsProps}
  >
    {slots.default?.()}
  </AvatarFallbackPrimitive>
  )
}, {
  name: "AvatarFallback",
})

export { Avatar, AvatarImage, AvatarFallback }
