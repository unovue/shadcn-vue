<script setup lang="ts">
import { ExampleWrapper } from "@/registry/bases/reka/components/example"
import SpinnerBasic from "~/registry/bases/reka/examples/spinner/SpinnerBasic.vue"
import SpinnerInBadges from "~/registry/bases/reka/examples/spinner/SpinnerInBadges.vue"
import SpinnerInButtons from "~/registry/bases/reka/examples/spinner/SpinnerInButtons.vue"
import SpinnerInEmpty from "~/registry/bases/reka/examples/spinner/SpinnerInEmpty.vue"
import SpinnerInInputGroup from "~/registry/bases/reka/examples/spinner/SpinnerInInputGroup.vue"
</script>

<template>
  <ExampleWrapper>
    <SpinnerBasic />
    <SpinnerInButtons />
    <SpinnerInBadges />
    <SpinnerInInputGroup />
    <SpinnerInEmpty />
  </ExampleWrapper>
</template>
