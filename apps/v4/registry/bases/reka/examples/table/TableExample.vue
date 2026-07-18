<script setup lang="ts">
import { Example, ExampleWrapper } from "@/registry/bases/reka/components/example"
import TableBasic from "~/registry/bases/reka/examples/table/TableBasic.vue"
import TableSimple from "~/registry/bases/reka/examples/table/TableSimple.vue"
import TableWithActions from "~/registry/bases/reka/examples/table/TableWithActions.vue"
import TableWithBadges from "~/registry/bases/reka/examples/table/TableWithBadges.vue"
import TableWithFooter from "~/registry/bases/reka/examples/table/TableWithFooter.vue"
import TableWithInput from "~/registry/bases/reka/examples/table/TableWithInput.vue"
import TableWithSelect from "~/registry/bases/reka/examples/table/TableWithSelect.vue"
</script>

<template>
  <ExampleWrapper>
    <Example title="Basic">
      <TableBasic />
    </Example>
    <Example title="With Footer">
      <TableWithFooter />
    </Example>
    <Example title="Simple">
      <TableSimple />
    </Example>
    <Example title="With Badges">
      <TableWithBadges />
    </Example>
    <Example title="With Actions">
      <TableWithActions />
    </Example>
    <Example title="With Select">
      <TableWithSelect />
    </Example>
    <Example title="With Input">
      <TableWithInput />
    </Example>
  </ExampleWrapper>
</template>
