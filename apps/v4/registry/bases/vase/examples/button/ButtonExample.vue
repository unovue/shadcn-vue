<script setup lang="ts">
import { ExampleWrapper } from "@/registry/bases/vase/components/example"
import ButtonExamples from "~/registry/bases/vase/examples/button/ButtonExamples.vue"
import ButtonIconLeft from "~/registry/bases/vase/examples/button/ButtonIconLeft.vue"
import ButtonIconOnly from "~/registry/bases/vase/examples/button/ButtonIconOnly.vue"
import ButtonIconRight from "~/registry/bases/vase/examples/button/ButtonIconRight.vue"
import ButtonInvalidStates from "~/registry/bases/vase/examples/button/ButtonInvalidStates.vue"
import ButtonVariantsAndSizes from "~/registry/bases/vase/examples/button/ButtonVariantsAndSizes.vue"
</script>

<template>
  <ExampleWrapper class="lg:grid-cols-1 2xl:grid-cols-1">
    <ButtonVariantsAndSizes />
    <ButtonIconRight />
    <ButtonIconLeft />
    <ButtonIconOnly />
    <ButtonInvalidStates />
    <ButtonExamples />
  </ExampleWrapper>
</template>
