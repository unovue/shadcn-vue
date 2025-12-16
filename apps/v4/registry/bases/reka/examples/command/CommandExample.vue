<script setup lang="ts">
import { ExampleWrapper } from "@/registry/bases/reka/components/example"
import CommandBasic from "~/registry/bases/reka/examples/command/CommandBasic.vue"
import CommandManyItems from "~/registry/bases/reka/examples/command/CommandManyItems.vue"
import CommandWithGroups from "~/registry/bases/reka/examples/command/CommandWithGroups.vue"
import CommandWithShortcuts from "~/registry/bases/reka/examples/command/CommandWithShortcuts.vue"
</script>

<template>
  <ExampleWrapper>
    <CommandBasic />
    <CommandWithShortcuts />
    <CommandWithGroups />
    <CommandManyItems />
  </ExampleWrapper>
</template>
