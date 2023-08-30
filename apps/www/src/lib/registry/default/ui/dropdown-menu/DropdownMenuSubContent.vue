<script setup lang="ts">
import {
  DropdownMenuPortal,
  DropdownMenuSubContent,
  type DropdownMenuSubContentEmits,
  type DropdownMenuSubContentProps,
} from 'radix-vue'

const props = defineProps<DropdownMenuSubContentProps>()

const emits = defineEmits<DropdownMenuSubContentEmits>()
</script>

<template>
  <DropdownMenuPortal force-mount>
    <DropdownMenuSubContent
      :loop="props.loop"
      :as-child="props.asChild"
      :side-offset="props.sideOffset"
      :side="props.side"
      :align="props.align"
      :align-offset="props.alignOffset"
      class="bg-background focus:outline-none outline-none text-foreground border border-border p-1 z-50 min-w-[10rem] rounded-md shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
    >
      <slot />
    </DropdownMenuSubContent>
  </DropdownMenuPortal>
</template>
