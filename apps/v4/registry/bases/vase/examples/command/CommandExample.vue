<script setup lang="ts">
import { ExampleWrapper } from "@/registry/bases/vase/components/example"
import CommandBasic from "~/registry/bases/vase/examples/command/CommandBasic.vue"
import CommandManyItems from "~/registry/bases/vase/examples/command/CommandManyItems.vue"
import CommandWithGroups from "~/registry/bases/vase/examples/command/CommandWithGroups.vue"
import CommandWithShortcuts from "~/registry/bases/vase/examples/command/CommandWithShortcuts.vue"
</script>

<template>
  <ExampleWrapper>
    <CommandBasic />
    <CommandWithShortcuts />
    <CommandWithGroups />
    <CommandManyItems />
  </ExampleWrapper>
</template>
