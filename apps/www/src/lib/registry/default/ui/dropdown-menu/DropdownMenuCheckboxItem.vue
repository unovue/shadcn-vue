<script setup lang="ts">
  import { computed, useAttrs } from 'vue';
import { DropdownMenuCheckboxItem as DropdownMenuCheckboxItemPrimitive, type DropdownMenuCheckboxItemProps, type DropdownMenuCheckboxItemEmits,
DropdownMenuItemIndicator as DropdownMenuItemIndicatorPrimitive } from 'radix-vue';
import { cn, useEmitAsProps } from '@/utils';
import { CheckIcon } from 'lucide-vue-next';

const props = defineProps<DropdownMenuCheckboxItemProps>();
const emits = defineEmits<DropdownMenuCheckboxItemEmits>();
const emitsAsProps = useEmitAsProps(emits);

defineOptions({
  name: 'DropdownMenuCheckboxItem',
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
  <DropdownMenuCheckboxItemPrimitive
    :class="cn(
      'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      attrs.className ?? '',
    )"
    :checked="checked"
    v-bind="{ ...attrs.rest, ...props, ...emitsAsProps }">
    <span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
          <DropdownMenuItemIndicatorPrimitive>
            <CheckIcon class="h-4 w-4" />
          </DropdownMenuItemIndicatorPrimitive>
        </span>
    <slot />
  </DropdownMenuCheckboxItemPrimitive>
</template>
