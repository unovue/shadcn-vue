<script setup lang="ts">
import { Example, ExampleWrapper } from "@/registry/bases/reka/components/example"
import MenubarBasic from "~/registry/bases/reka/examples/menubar/MenubarBasic.vue"
import MenubarWithCheckboxes from "~/registry/bases/reka/examples/menubar/MenubarWithCheckboxes.vue"
import MenubarWithRadio from "~/registry/bases/reka/examples/menubar/MenubarWithRadio.vue"
import MenubarWithSubmenu from "~/registry/bases/reka/examples/menubar/MenubarWithSubmenu.vue"
</script>

<template>
  <ExampleWrapper>
    <Example title="Basic">
      <MenubarBasic />
    </Example>
    <Example title="With Submenu">
      <MenubarWithSubmenu />
    </Example>
    <Example title="With Checkboxes">
      <MenubarWithCheckboxes />
    </Example>
    <Example title="With Radio">
      <MenubarWithRadio />
    </Example>
  </ExampleWrapper>
</template>
