<script setup lang="ts">
import { ref } from "vue"
import { Example } from "@/registry/bases/vase/components/example"
import { Button } from "@/registry/bases/vase/ui/button"
import {
  Combobox,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger,
  ComboboxViewport,
} from "@/registry/bases/vase/ui/combobox"

const countries = [
  { code: "us", value: "united-states", label: "United States" },
  { code: "gb", value: "united-kingdom", label: "United Kingdom" },
  { code: "ca", value: "canada", label: "Canada" },
  { code: "au", value: "australia", label: "Australia" },
  { code: "de", value: "germany", label: "Germany" },
  { code: "fr", value: "france", label: "France" },
  { code: "jp", value: "japan", label: "Japan" },
  { code: "cn", value: "china", label: "China" },
]

const selectedValue = ref(countries[0])
</script>

<template>
  <Example title="Combobox in Popup">
    <Combobox v-model="selectedValue" :items="countries">
      <ComboboxTrigger>
        <template #element="{ props, elementRef }">
          <Button
            v-bind="props" :ref="elementRef"
            variant="outline"
            class="w-64 justify-between font-normal"
          >
            {{ selectedValue?.label || 'Select country' }}
          </Button>
        </template>
      </ComboboxTrigger>
      <ComboboxList>
        <ComboboxInput :show-trigger="false" placeholder="Search" />
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxViewport>
          <template #item="{ item }">
            <ComboboxItem :value="item">
              {{ item.label }}
            </ComboboxItem>
          </template>
        </ComboboxViewport>
      </ComboboxList>
    </Combobox>
  </Example>
</template>
