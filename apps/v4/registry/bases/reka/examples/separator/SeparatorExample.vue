<script setup lang="ts">
import { ExampleWrapper } from "@/registry/bases/reka/components/example"
import SeparatorHorizontal from "~/registry/bases/reka/examples/separator/SeparatorHorizontal.vue"
import SeparatorInList from "~/registry/bases/reka/examples/separator/SeparatorInList.vue"
import SeparatorVertical from "~/registry/bases/reka/examples/separator/SeparatorVertical.vue"
import SeparatorVerticalMenu from "~/registry/bases/reka/examples/separator/SeparatorVerticalMenu.vue"
</script>

<template>
  <ExampleWrapper>
    <SeparatorHorizontal />
    <SeparatorVertical />
    <SeparatorVerticalMenu />
    <SeparatorInList />
  </ExampleWrapper>
</template>
