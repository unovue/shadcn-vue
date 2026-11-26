<script setup lang="ts">
import { Example } from "@/registry/bases/vase/components/example"
import {
  Combobox,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxViewport,
} from "@/registry/bases/vase/ui/combobox"

const largeListItems = Array.from({ length: 100 }, (_, i) => `Item ${i + 1}`)
</script>

<template>
  <Example title="Large List (100 items)">
    <Combobox :items="largeListItems">
      <ComboboxInput placeholder="Search from 100 items" />
      <ComboboxList>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxViewport>
          <template #item="{ item }">
            <ComboboxItem :value="item">
              {{ item }}
            </ComboboxItem>
          </template>
        </ComboboxViewport>
      </ComboboxList>
    </Combobox>
  </Example>
</template>
