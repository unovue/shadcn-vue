<script setup>
const props = defineProps({
  title: String,
})
</script>

<template>
  <div class="flex items-center justify-center bg-white border border-neutral-200 shadow-sm rounded-xl h-[280px] overflow-hidden relative px-6">
    <p class="text-xl font-semibold absolute left-4 top-3 rounded-lg bg-neutral-100 px-2 py-1 text-neutral-600">
      {{ props.title }}
    </p>
    <div class="overflow-y-scroll flex-grow h-full max-h-full flex items-center justify-center pb-4 pt-12">
      <slot />
    </div>
  </div>
</template>
