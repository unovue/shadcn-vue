<script setup lang="ts">
import AccordionDemo from '@/registry/default/examples/AccordionDemo.vue'
import PopoverDemo from '@/registry/default/examples/PopoverDemo.vue'
import DialogDemo from '@/registry/default/examples/DialogDemo.vue'
import AlertDialogDemo from '@/registry/default/examples/AlertDialogDemo.vue'
import SelectDemo from '@/registry/default/examples/SelectDemo.vue'
import DropdownMenuDemo from '@/registry/default/examples/DropdownMenuDemo.vue'
</script>

<template>
  <div class="p-8 grid gap-12 grid-cols-3 place-items-center">
    <AccordionDemo class="max-w-[20rem]" />

    <PopoverDemo />

    <DialogDemo />

    <AlertDialogDemo />

    <SelectDemo />

    <DropdownMenuDemo />
  </div>
</template>
