<script setup lang="ts">
import { Example, ExampleWrapper } from "@/registry/bases/vase/components/example"
import SliderBasic from "~/registry/bases/vase/examples/slider/SliderBasic.vue"
import SliderControlled from "~/registry/bases/vase/examples/slider/SliderControlled.vue"
import SliderDisabled from "~/registry/bases/vase/examples/slider/SliderDisabled.vue"
import SliderMultiple from "~/registry/bases/vase/examples/slider/SliderMultiple.vue"
import SliderRange from "~/registry/bases/vase/examples/slider/SliderRange.vue"
import SliderVertical from "~/registry/bases/vase/examples/slider/SliderVertical.vue"
</script>

<template>
  <ExampleWrapper>
    <Example title="Basic">
      <SliderBasic />
    </Example>
    <Example title="Range">
      <SliderRange />
    </Example>
    <Example title="Multiple Thumbs">
      <SliderMultiple />
    </Example>
    <Example title="Vertical">
      <SliderVertical />
    </Example>
    <Example title="Controlled">
      <SliderControlled />
    </Example>
    <Example title="Disabled">
      <SliderDisabled />
    </Example>
  </ExampleWrapper>
</template>
