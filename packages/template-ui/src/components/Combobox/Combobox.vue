<template>
  <Listbox v-model="isOpen" v-slot="{ open }">
    <Float
      portal
      placement="bottom"
      flip
      strategy="fixed"
	  adaptive-width
      enter="transition duration-200 ease-out"
      enter-from="scale-95 opacity-0"
      enter-to="scale-100 opacity-100"
      leave="transition duration-150 ease-in"
      leave-from="scale-100 opacity-100"
      leave-to="scale-95 opacity-0"
      tailwindcss-origin-class
      :offset="4"
      as="div"
      class="relative mt-1"
    >
      <slot :open="open"></slot>
    </Float>
  </Listbox>
</template>

<script setup>
import { ref, computed } from "vue";
import { Listbox } from "@headlessui/vue";
import { Float } from "@headlessui-float/vue";

const props = defineProps({
  modelValue: Boolean,
});

const emit = defineEmits(["update:modelValue", "close"]);

const isOpen = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});
</script>
