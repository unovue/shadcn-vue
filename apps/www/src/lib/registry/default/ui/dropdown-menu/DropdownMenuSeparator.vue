<script setup lang="ts">
  import { computed, useAttrs } from 'vue';
import { DropdownMenuSeparator as DropdownMenuSeparatorPrimitive, type DropdownMenuSeparatorProps } from 'radix-vue';
import { cn } from '@/utils';

const props = defineProps<DropdownMenuSeparatorProps>();

defineOptions({
  name: 'DropdownMenuSeparator',
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
  <DropdownMenuSeparatorPrimitive
    :class="cn(
      'mx-1 my-1 h-px bg-muted',
      attrs.className ?? '',
    )"
    v-bind="{ ...attrs.rest, ...props }">
    <slot />
  </DropdownMenuSeparatorPrimitive>
</template>
