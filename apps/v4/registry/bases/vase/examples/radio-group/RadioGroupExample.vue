<script setup lang="ts">
import { Example, ExampleWrapper } from "@/registry/bases/vase/components/example"
import RadioGroupBasic from "~/registry/bases/vase/examples/radio-group/RadioGroupBasic.vue"
import RadioGroupDisabled from "~/registry/bases/vase/examples/radio-group/RadioGroupDisabled.vue"
import RadioGroupGrid from "~/registry/bases/vase/examples/radio-group/RadioGroupGrid.vue"
import RadioGroupInvalid from "~/registry/bases/vase/examples/radio-group/RadioGroupInvalid.vue"
import RadioGroupWithDescriptions from "~/registry/bases/vase/examples/radio-group/RadioGroupWithDescriptions.vue"
import RadioGroupWithFieldSet from "~/registry/bases/vase/examples/radio-group/RadioGroupWithFieldSet.vue"
</script>

<template>
  <ExampleWrapper>
    <Example title="Basic">
      <RadioGroupBasic />
    </Example>
    <Example title="With Descriptions">
      <RadioGroupWithDescriptions />
    </Example>
    <Example title="With FieldSet">
      <RadioGroupWithFieldSet />
    </Example>
    <Example title="Grid Layout">
      <RadioGroupGrid />
    </Example>
    <Example title="Disabled">
      <RadioGroupDisabled />
    </Example>
    <Example title="Invalid">
      <RadioGroupInvalid />
    </Example>
  </ExampleWrapper>
</template>
