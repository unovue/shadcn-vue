<script setup lang="ts">
import { ExampleWrapper } from "@/registry/bases/vase/components/example"
import SeparatorHorizontal from "~/registry/bases/vase/examples/separator/SeparatorHorizontal.vue"
import SeparatorInList from "~/registry/bases/vase/examples/separator/SeparatorInList.vue"
import SeparatorVertical from "~/registry/bases/vase/examples/separator/SeparatorVertical.vue"
import SeparatorVerticalMenu from "~/registry/bases/vase/examples/separator/SeparatorVerticalMenu.vue"
</script>

<template>
  <ExampleWrapper>
    <SeparatorHorizontal />
    <SeparatorVertical />
    <SeparatorVerticalMenu />
    <SeparatorInList />
  </ExampleWrapper>
</template>
