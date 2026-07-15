<script setup lang="ts">
import { ExampleWrapper } from "@/registry/bases/reka/components/example"
import ContextMenuBasic from "~/registry/bases/reka/examples/context-menu/ContextMenuBasic.vue"
import ContextMenuInDialog from "~/registry/bases/reka/examples/context-menu/ContextMenuInDialog.vue"
import ContextMenuWithCheckboxes from "~/registry/bases/reka/examples/context-menu/ContextMenuWithCheckboxes.vue"
import ContextMenuWithDestructive from "~/registry/bases/reka/examples/context-menu/ContextMenuWithDestructive.vue"
import ContextMenuWithGroups from "~/registry/bases/reka/examples/context-menu/ContextMenuWithGroups.vue"
import ContextMenuWithIcons from "~/registry/bases/reka/examples/context-menu/ContextMenuWithIcons.vue"
import ContextMenuWithRadio from "~/registry/bases/reka/examples/context-menu/ContextMenuWithRadio.vue"
import ContextMenuWithShortcuts from "~/registry/bases/reka/examples/context-menu/ContextMenuWithShortcuts.vue"
import ContextMenuWithSides from "~/registry/bases/reka/examples/context-menu/ContextMenuWithSides.vue"
import ContextMenuWithSubmenu from "~/registry/bases/reka/examples/context-menu/ContextMenuWithSubmenu.vue"
</script>

<template>
  <ExampleWrapper>
    <ContextMenuBasic />
    <ContextMenuWithSides />
    <ContextMenuWithIcons />
    <ContextMenuWithShortcuts />
    <ContextMenuWithSubmenu />
    <ContextMenuWithGroups />
    <ContextMenuWithCheckboxes />
    <ContextMenuWithRadio />
    <ContextMenuWithDestructive />
    <ContextMenuInDialog />
  </ExampleWrapper>
</template>
