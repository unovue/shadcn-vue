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

const frameworks = [
  "Next.js",
  "SvelteKit",
  "Nuxt.js",
  "Remix",
  "Astro",
]
</script>

<template>
  <Example title="With Clear Button">
    <Combobox
      :items="frameworks"
      :default-value="frameworks[0]"
    >
      <ComboboxInput
        placeholder="Select a framework"
        :show-clear="true"
      />
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
