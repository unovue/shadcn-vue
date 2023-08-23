<script setup lang="ts">
import AccordionDemo from './components/ui/AccordionDemo.vue'
import PopoverDemo from './components/ui/PopoverDemo.vue'
</script>

<template>
  <div class="p-8 grid gap-8 grid-cols-3 place-items-center">
    <AccordionDemo class="max-w-[20rem]" />

    <PopoverDemo />
  </div>
</template>
