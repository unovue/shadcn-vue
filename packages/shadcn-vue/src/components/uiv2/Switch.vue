<script setup lang="ts">
import { SwitchRoot, SwitchThumb } from 'radix-vue'
import { SwitchClass, type SwitchClassProps } from "./cva"
import { useVModel } from "@vueuse/core";

interface SwitchProps {
  variant?: SwitchClassProps["variant"];
  size?: SwitchClassProps["size"];
  defaultOpen?: string;
  open: boolean;
}

const props = withDefaults(defineProps<SwitchProps>(), {
  variant: 'default',
  size: 1,
  open: undefined,
});

const emit = defineEmits(["update:open"]);

const open = useVModel(props, "open", emit, {
  defaultValue: props.defaultOpen,
  passive: true,
});
</script>

<template>
  <SwitchRoot
    v-model:open="open"
    :class="SwitchClass({ variant, size, component: 'root' })"
  >
    <SwitchThumb :class="SwitchClass({ variant, size, component: 'thumb' })" />
  </SwitchRoot>
</template>
