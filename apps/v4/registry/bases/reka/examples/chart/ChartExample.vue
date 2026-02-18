<script setup lang="ts">
import { ExampleWrapper } from "@/registry/bases/reka/components/example"
import ChartAreaExample from "~/registry/bases/reka/examples/chart/ChartAreaExample.vue"
import ChartBarExample from "~/registry/bases/reka/examples/chart/ChartBarExample.vue"
import ChartLineExample from "~/registry/bases/reka/examples/chart/ChartLineExample.vue"
import ChartRadialExample from "~/registry/bases/reka/examples/chart/ChartRadialExample.vue"
</script>

<template>
  <ExampleWrapper>
    <ChartAreaExample />
    <ChartBarExample />
    <ChartLineExample />
    <ChartRadialExample />
  </ExampleWrapper>
</template>
