<script setup lang="ts">
import { Example, ExampleWrapper } from "@/registry/bases/reka/components/example"
import SwitchBasic from "~/registry/bases/reka/examples/switch/SwitchBasic.vue"
import SwitchDisabled from "~/registry/bases/reka/examples/switch/SwitchDisabled.vue"
import SwitchSizes from "~/registry/bases/reka/examples/switch/SwitchSizes.vue"
import SwitchWithDescription from "~/registry/bases/reka/examples/switch/SwitchWithDescription.vue"
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
