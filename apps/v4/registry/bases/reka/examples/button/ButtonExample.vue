<script setup lang="ts">
import { ExampleWrapper } from "@/registry/bases/reka/components/example"
import ButtonExamples from "~/registry/bases/reka/examples/button/ButtonExamples.vue"
import ButtonIconLeft from "~/registry/bases/reka/examples/button/ButtonIconLeft.vue"
import ButtonIconOnly from "~/registry/bases/reka/examples/button/ButtonIconOnly.vue"
import ButtonIconRight from "~/registry/bases/reka/examples/button/ButtonIconRight.vue"
import ButtonInvalidStates from "~/registry/bases/reka/examples/button/ButtonInvalidStates.vue"
import ButtonVariantsAndSizes from "~/registry/bases/reka/examples/button/ButtonVariantsAndSizes.vue"
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
