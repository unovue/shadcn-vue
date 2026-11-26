<script setup lang="ts">
import { ExampleWrapper } from "@/registry/bases/vase/components/example"
import ChartAreaExample from "~/registry/bases/vase/examples/chart/ChartAreaExample.vue"
import ChartBarExample from "~/registry/bases/vase/examples/chart/ChartBarExample.vue"
import ChartLineExample from "~/registry/bases/vase/examples/chart/ChartLineExample.vue"
import ChartRadialExample from "~/registry/bases/vase/examples/chart/ChartRadialExample.vue"
</script>

<template>
  <ExampleWrapper>
    <ChartAreaExample />
    <ChartBarExample />
    <ChartLineExample />
    <ChartRadialExample />
  </ExampleWrapper>
</template>
