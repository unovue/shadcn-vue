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
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/registry/bases/vase/ui/field"

const frameworks = [
  "Next.js",
  "SvelteKit",
  "Nuxt.js",
  "Remix",
  "Astro",
]
</script>

<template>
  <Example title="Invalid">
    <div class="flex flex-col gap-4">
      <Combobox :items="frameworks">
        <ComboboxInput
          placeholder="Select a framework"
          :aria-invalid="true"
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
      <Field data-invalid>
        <FieldLabel for="combobox-framework-invalid">
          Framework
        </FieldLabel>
        <Combobox :items="frameworks">
          <ComboboxInput
            id="combobox-framework-invalid"
            placeholder="Select a framework"
            :aria-invalid="true"
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
        <FieldDescription>Please select a valid framework.</FieldDescription>
        <FieldError :errors="[{ message: 'This field is required.' }]" />
      </Field>
    </div>
  </Example>
</template>
