<script setup lang="ts">
import { ExampleWrapper } from "~/registry/bases/vase/components/example"
import InputGroupBasic from "./InputGroupBasic.vue"
import InputGroupWithButton from "./InputGroupWithButton.vue"
import InputGroupWithTextarea from "./InputGroupWithTextarea.vue"
</script>

<template>
  <ExampleWrapper>
    <InputGroupBasic />
    <InputGroupWithButton />
    <InputGroupWithTextarea />
  </ExampleWrapper>
</template>
