<script setup lang="ts">
import { Example, ExampleWrapper } from "@/registry/bases/vase/components/example"
import PaginationBasic from "~/registry/bases/vase/examples/pagination/PaginationBasic.vue"
import PaginationSimple from "~/registry/bases/vase/examples/pagination/PaginationSimple.vue"
import PaginationWithSelect from "~/registry/bases/vase/examples/pagination/PaginationWithSelect.vue"
</script>

<template>
  <ExampleWrapper>
    <Example title="Basic">
      <PaginationBasic />
    </Example>
    <Example title="Simple">
      <PaginationSimple />
    </Example>
    <Example title="With Select">
      <PaginationWithSelect />
    </Example>
  </ExampleWrapper>
</template>
