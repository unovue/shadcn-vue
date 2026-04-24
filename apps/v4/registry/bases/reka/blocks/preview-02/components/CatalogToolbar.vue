<script setup lang="ts">
import IconPlaceholder from "@/components/IconPlaceholder.vue"
import { Button } from "@/registry/bases/reka/ui/button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/registry/bases/reka/ui/input-group"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/registry/bases/reka/ui/toggle-group"
</script>

<template>
  <div class="flex items-center gap-3">
    <InputGroup class="flex-1">
      <InputGroupAddon>
        <IconPlaceholder
          lucide="SearchIcon"
          tabler="IconSearch"
          hugeicons="Search01Icon"
          phosphor="MagnifyingGlassIcon"
          remixicon="RiSearchLine"
        />
      </InputGroupAddon>
      <InputGroupInput placeholder="Search releases or catalog..." />
    </InputGroup>
    <Button>
      <IconPlaceholder
        lucide="PlusIcon"
        tabler="IconPlus"
        hugeicons="Add01Icon"
        phosphor="PlusIcon"
        remixicon="RiAddLine"
      />
      Upload New Release
    </Button>
    <ToggleGroup :default-value="['releases']" variant="outline">
      <ToggleGroupItem value="all-tracks">
        All Tracks
      </ToggleGroupItem>
      <ToggleGroupItem value="releases">
        Releases
      </ToggleGroupItem>
      <ToggleGroupItem value="top-earners">
        Top Earners
      </ToggleGroupItem>
    </ToggleGroup>
  </div>
</template>
