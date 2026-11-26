<script setup lang="ts">
import { ExampleWrapper } from "@/registry/bases/vase/components/example"
import ContextMenuBasic from "~/registry/bases/vase/examples/context-menu/ContextMenuBasic.vue"
import ContextMenuInDialog from "~/registry/bases/vase/examples/context-menu/ContextMenuInDialog.vue"
import ContextMenuWithCheckboxes from "~/registry/bases/vase/examples/context-menu/ContextMenuWithCheckboxes.vue"
import ContextMenuWithDestructive from "~/registry/bases/vase/examples/context-menu/ContextMenuWithDestructive.vue"
import ContextMenuWithGroups from "~/registry/bases/vase/examples/context-menu/ContextMenuWithGroups.vue"
import ContextMenuWithIcons from "~/registry/bases/vase/examples/context-menu/ContextMenuWithIcons.vue"
import ContextMenuWithRadio from "~/registry/bases/vase/examples/context-menu/ContextMenuWithRadio.vue"
import ContextMenuWithShortcuts from "~/registry/bases/vase/examples/context-menu/ContextMenuWithShortcuts.vue"
import ContextMenuWithSides from "~/registry/bases/vase/examples/context-menu/ContextMenuWithSides.vue"
import ContextMenuWithSubmenu from "~/registry/bases/vase/examples/context-menu/ContextMenuWithSubmenu.vue"
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
