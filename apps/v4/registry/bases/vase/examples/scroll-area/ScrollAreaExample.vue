<script setup lang="ts">
import { Example, ExampleWrapper } from "@/registry/bases/vase/components/example"
import ScrollAreaHorizontal from "~/registry/bases/vase/examples/scroll-area/ScrollAreaHorizontal.vue"
import ScrollAreaVertical from "~/registry/bases/vase/examples/scroll-area/ScrollAreaVertical.vue"
</script>

<template>
  <ExampleWrapper>
    <Example title="Vertical">
      <ScrollAreaVertical />
    </Example>
    <Example title="Horizontal">
      <ScrollAreaHorizontal />
    </Example>
  </ExampleWrapper>
</template>
