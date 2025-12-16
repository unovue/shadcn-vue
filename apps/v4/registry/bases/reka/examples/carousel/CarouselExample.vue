<script setup lang="ts">
import { ExampleWrapper } from "@/registry/bases/reka/components/example"
import CarouselBasic from "~/registry/bases/reka/examples/carousel/CarouselBasic.vue"
import CarouselMultiple from "~/registry/bases/reka/examples/carousel/CarouselMultiple.vue"
import CarouselWithGap from "~/registry/bases/reka/examples/carousel/CarouselWithGap.vue"
</script>

<template>
  <ExampleWrapper class="lg:grid-cols-1">
    <CarouselBasic />
    <CarouselMultiple />
    <CarouselWithGap />
  </ExampleWrapper>
</template>
