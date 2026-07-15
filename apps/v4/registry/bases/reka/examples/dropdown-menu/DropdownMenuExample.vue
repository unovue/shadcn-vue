<script setup lang="ts">
import { ExampleWrapper } from "@/registry/bases/reka/components/example"
import DropdownMenuBasic from "~/registry/bases/reka/examples/dropdown-menu/DropdownMenuBasic.vue"
import DropdownMenuComplex from "~/registry/bases/reka/examples/dropdown-menu/DropdownMenuComplex.vue"
import DropdownMenuInDialog from "~/registry/bases/reka/examples/dropdown-menu/DropdownMenuInDialog.vue"
import DropdownMenuWithAvatar from "~/registry/bases/reka/examples/dropdown-menu/DropdownMenuWithAvatar.vue"
import DropdownMenuWithCheckboxes from "~/registry/bases/reka/examples/dropdown-menu/DropdownMenuWithCheckboxes.vue"
import DropdownMenuWithCheckboxesIcons from "~/registry/bases/reka/examples/dropdown-menu/DropdownMenuWithCheckboxesIcons.vue"
import DropdownMenuWithDestructive from "~/registry/bases/reka/examples/dropdown-menu/DropdownMenuWithDestructive.vue"
import DropdownMenuWithIcons from "~/registry/bases/reka/examples/dropdown-menu/DropdownMenuWithIcons.vue"
import DropdownMenuWithRadio from "~/registry/bases/reka/examples/dropdown-menu/DropdownMenuWithRadio.vue"
import DropdownMenuWithRadioIcons from "~/registry/bases/reka/examples/dropdown-menu/DropdownMenuWithRadioIcons.vue"
import DropdownMenuWithShortcuts from "~/registry/bases/reka/examples/dropdown-menu/DropdownMenuWithShortcuts.vue"
import DropdownMenuWithSubmenu from "~/registry/bases/reka/examples/dropdown-menu/DropdownMenuWithSubmenu.vue"
</script>

<template>
  <ExampleWrapper>
    <DropdownMenuBasic />
    <DropdownMenuComplex />
    <DropdownMenuWithIcons />
    <DropdownMenuWithShortcuts />
    <DropdownMenuWithSubmenu />
    <DropdownMenuWithCheckboxes />
    <DropdownMenuWithCheckboxesIcons />
    <DropdownMenuWithRadio />
    <DropdownMenuWithRadioIcons />
    <DropdownMenuWithDestructive />
    <DropdownMenuWithAvatar />
    <DropdownMenuInDialog />
  </ExampleWrapper>
</template>
