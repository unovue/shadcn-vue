<script setup lang="ts">
import { ExampleWrapper } from "@/registry/bases/vase/components/example"
import LabelDisabled from "~/registry/bases/vase/examples/label/LabelDisabled.vue"
import LabelWithCheckbox from "~/registry/bases/vase/examples/label/LabelWithCheckbox.vue"
import LabelWithInput from "~/registry/bases/vase/examples/label/LabelWithInput.vue"
import LabelWithTextarea from "~/registry/bases/vase/examples/label/LabelWithTextarea.vue"
</script>

<template>
  <ExampleWrapper>
    <LabelWithCheckbox />
    <LabelWithInput />
    <LabelDisabled />
    <LabelWithTextarea />
  </ExampleWrapper>
</template>
