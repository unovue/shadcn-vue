<script setup lang="ts">
import { Example, ExampleWrapper } from "@/registry/bases/vase/components/example"
import PopoverAlignments from "~/registry/bases/vase/examples/popover/PopoverAlignments.vue"
import PopoverBasic from "~/registry/bases/vase/examples/popover/PopoverBasic.vue"
import PopoverInDialog from "~/registry/bases/vase/examples/popover/PopoverInDialog.vue"
import PopoverWithForm from "~/registry/bases/vase/examples/popover/PopoverWithForm.vue"
</script>

<template>
  <ExampleWrapper>
    <Example title="Basic">
      <PopoverBasic />
    </Example>
    <Example title="With Form">
      <PopoverWithForm />
    </Example>
    <Example title="Alignments">
      <PopoverAlignments />
    </Example>
    <Example title="In Dialog">
      <PopoverInDialog />
    </Example>
  </ExampleWrapper>
</template>
