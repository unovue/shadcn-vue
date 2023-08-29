<script setup lang="ts">
  import { computed, useAttrs } from 'vue';
import { DropdownMenuRadioItem as DropdownMenuRadioItemPrimitive, type DropdownMenuRadioItemProps, type DropdownMenuRadioItemEmits,
DropdownMenuItemIndicator as DropdownMenuItemIndicatorPrimitive } from 'radix-vue';
import { cn, useEmitAsProps } from '@/utils';
import { CircleIcon } from 'lucide-vue-next';

const props = defineProps<DropdownMenuRadioItemProps>();
const emits = defineEmits<DropdownMenuRadioItemEmits>();
const emitsAsProps = useEmitAsProps(emits);

defineOptions({
  name: 'DropdownMenuRadioItem',
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
  <DropdownMenuRadioItemPrimitive
    :class="cn(
      'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      attrs.className ?? '',
    )"
    v-bind="{ ...attrs.rest, ...props, ...emitsAsProps }">
    <span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
          <DropdownMenuItemIndicatorPrimitive>
            <CircleIcon class="h-4 w-4 fill-current" />
          </DropdownMenuItemIndicatorPrimitive>
        </span>
    <slot />
  </DropdownMenuRadioItemPrimitive>
</template>
