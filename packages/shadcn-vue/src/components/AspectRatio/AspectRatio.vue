<template>
  <div :class="`relative w-full`" :style="`padding-bottom: ${aspect}%`">
    <div class="absolute inset-0">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
const props = defineProps({
  ratio: Number,
});

const aspect = computed(() => {
  return 1/props.ratio*100;
});
</script>
