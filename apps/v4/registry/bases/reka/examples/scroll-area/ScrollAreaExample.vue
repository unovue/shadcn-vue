<script setup lang="ts">
import { Example, ExampleWrapper } from "@/registry/bases/reka/components/example"
import ScrollAreaHorizontal from "~/registry/bases/reka/examples/scroll-area/ScrollAreaHorizontal.vue"
import ScrollAreaVertical from "~/registry/bases/reka/examples/scroll-area/ScrollAreaVertical.vue"
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
