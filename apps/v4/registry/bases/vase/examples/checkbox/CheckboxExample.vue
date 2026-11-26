<script setup lang="ts">
import { ExampleWrapper } from "@/registry/bases/vase/components/example"
import CheckboxBasic from "~/registry/bases/vase/examples/checkbox/CheckboxBasic.vue"
import CheckboxDisabled from "~/registry/bases/vase/examples/checkbox/CheckboxDisabled.vue"
import CheckboxGroup from "~/registry/bases/vase/examples/checkbox/CheckboxGroup.vue"
import CheckboxInTable from "~/registry/bases/vase/examples/checkbox/CheckboxInTable.vue"
import CheckboxInvalid from "~/registry/bases/vase/examples/checkbox/CheckboxInvalid.vue"
import CheckboxWithDescription from "~/registry/bases/vase/examples/checkbox/CheckboxWithDescription.vue"
import CheckboxWithTitle from "~/registry/bases/vase/examples/checkbox/CheckboxWithTitle.vue"
</script>

<template>
  <ExampleWrapper>
    <CheckboxBasic />
    <CheckboxWithDescription />
    <CheckboxInvalid />
    <CheckboxDisabled />
    <CheckboxWithTitle />
    <CheckboxInTable />
    <CheckboxGroup />
  </ExampleWrapper>
</template>
