<script setup lang="ts">
import { ExampleWrapper } from "@/registry/bases/reka/components/example"
import CheckboxBasic from "~/registry/bases/reka/examples/checkbox/CheckboxBasic.vue"
import CheckboxDisabled from "~/registry/bases/reka/examples/checkbox/CheckboxDisabled.vue"
import CheckboxGroup from "~/registry/bases/reka/examples/checkbox/CheckboxGroup.vue"
import CheckboxInTable from "~/registry/bases/reka/examples/checkbox/CheckboxInTable.vue"
import CheckboxInvalid from "~/registry/bases/reka/examples/checkbox/CheckboxInvalid.vue"
import CheckboxWithDescription from "~/registry/bases/reka/examples/checkbox/CheckboxWithDescription.vue"
import CheckboxWithTitle from "~/registry/bases/reka/examples/checkbox/CheckboxWithTitle.vue"
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
