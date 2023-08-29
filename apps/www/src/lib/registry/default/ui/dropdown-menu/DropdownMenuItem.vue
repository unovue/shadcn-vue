<script setup lang="ts">
import { computed, useAttrs } from 'vue';
import { DropdownMenuItem as DropdownMenuItemPrimitive, type DropdownMenuItemProps, type DropdownMenuItemEmits } from 'radix-vue';
import { cn, useEmitAsProps } from '@/utils';

const props = defineProps<DropdownMenuItemProps & {
  inset?: boolean
}>();
const emits = defineEmits<DropdownMenuItemEmits>();
const emitsAsProps = useEmitAsProps(emits);

defineOptions({
  name: 'DropdownMenuItem',
  inheritAttrs: false,
});

const allAttrs = useAttrs()
const attrs = computed(() => {
  const { class: className, ...rest } = allAttrs
  return {
    className,
    rest: rest
  }
})
</script>

<template>
  <DropdownMenuItemPrimitive
    :class="cn(
      'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      inset && 'pl-8',
      attrs.className ?? '',
    )"
    v-bind="{ ...attrs.rest, ...props, ...emitsAsProps }">
    <slot />
  </DropdownMenuItemPrimitive>
</template>
