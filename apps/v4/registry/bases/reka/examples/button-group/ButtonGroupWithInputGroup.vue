<script setup lang="ts">
import IconPlaceholder from "@/components/IconPlaceholder.vue"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/registry/bases/reka/ui/input-group"
import { Example } from "~/registry/bases/reka/components/example"
</script>

<template>
  <Example title="With Input Group">
    <div class="flex flex-col gap-4">
      <InputGroup>
        <InputGroupInput placeholder="Type to search..." />
        <InputGroupAddon
          align="inline-start"
          class="text-muted-foreground"
        >
          <IconPlaceholder
            lucide="SearchIcon"
            tabler="IconSearch"
            hugeicons="Search01Icon"
            phosphor="MagnifyingGlassIcon"
            remixicon="RiSearchLine"
          />
        </InputGroupAddon>
      </InputGroup>
    </div>
  </Example>
</template>
