<script setup lang="ts">
import { ExampleWrapper } from "@/registry/bases/reka/components/example"
import LabelDisabled from "~/registry/bases/reka/examples/label/LabelDisabled.vue"
import LabelWithCheckbox from "~/registry/bases/reka/examples/label/LabelWithCheckbox.vue"
import LabelWithInput from "~/registry/bases/reka/examples/label/LabelWithInput.vue"
import LabelWithTextarea from "~/registry/bases/reka/examples/label/LabelWithTextarea.vue"
</script>

<template>
  <ExampleWrapper>
    <LabelWithCheckbox />
    <LabelWithInput />
    <LabelDisabled />
    <LabelWithTextarea />
  </ExampleWrapper>
</template>
