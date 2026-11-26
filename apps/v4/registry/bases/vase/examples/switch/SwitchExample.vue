<script setup lang="ts">
import { Example, ExampleWrapper } from "@/registry/bases/vase/components/example"
import SwitchBasic from "~/registry/bases/vase/examples/switch/SwitchBasic.vue"
import SwitchDisabled from "~/registry/bases/vase/examples/switch/SwitchDisabled.vue"
import SwitchSizes from "~/registry/bases/vase/examples/switch/SwitchSizes.vue"
import SwitchWithDescription from "~/registry/bases/vase/examples/switch/SwitchWithDescription.vue"
</script>

<template>
  <ExampleWrapper>
    <Example title="Basic">
      <SwitchBasic />
    </Example>
    <Example title="With Description">
      <SwitchWithDescription />
    </Example>
    <Example title="Disabled">
      <SwitchDisabled />
    </Example>
    <Example title="Sizes">
      <SwitchSizes />
    </Example>
  </ExampleWrapper>
</template>
