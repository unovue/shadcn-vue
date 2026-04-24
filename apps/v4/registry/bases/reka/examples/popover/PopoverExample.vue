<script setup lang="ts">
import { Example, ExampleWrapper } from "@/registry/bases/reka/components/example"
import PopoverAlignments from "~/registry/bases/reka/examples/popover/PopoverAlignments.vue"
import PopoverBasic from "~/registry/bases/reka/examples/popover/PopoverBasic.vue"
import PopoverInDialog from "~/registry/bases/reka/examples/popover/PopoverInDialog.vue"
import PopoverWithForm from "~/registry/bases/reka/examples/popover/PopoverWithForm.vue"
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
