<script setup lang="ts">
import { ExampleWrapper } from "@/registry/bases/vase/components/example"
import SpinnerBasic from "~/registry/bases/vase/examples/spinner/SpinnerBasic.vue"
import SpinnerInBadges from "~/registry/bases/vase/examples/spinner/SpinnerInBadges.vue"
import SpinnerInButtons from "~/registry/bases/vase/examples/spinner/SpinnerInButtons.vue"
import SpinnerInEmpty from "~/registry/bases/vase/examples/spinner/SpinnerInEmpty.vue"
import SpinnerInInputGroup from "~/registry/bases/vase/examples/spinner/SpinnerInInputGroup.vue"
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
