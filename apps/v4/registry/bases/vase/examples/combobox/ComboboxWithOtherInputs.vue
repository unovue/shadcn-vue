<script setup lang="ts">
import IconPlaceholder from "@/components/IconPlaceholder.vue"
import { Example } from "@/registry/bases/vase/components/example"
import { Button } from "@/registry/bases/vase/ui/button"
import {
  Combobox,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxViewport,
} from "@/registry/bases/vase/ui/combobox"
import { Input } from "@/registry/bases/vase/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/registry/bases/vase/ui/input-group"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/bases/vase/ui/select"

const frameworks = [
  "Next.js",
  "SvelteKit",
  "Nuxt.js",
  "Remix",
  "Astro",
]
</script>

<template>
  <Example title="With Other Inputs">
    <Combobox :items="frameworks">
      <ComboboxInput placeholder="Select a framework" class="w-52" />
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
    <Select>
      <SelectTrigger class="w-52">
        <SelectValue placeholder="Select a framework" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem
            v-for="framework in frameworks"
            :key="framework"
            :value="framework"
          >
            {{ framework }}
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
    <Button
      variant="outline"
      class="w-52 justify-between font-normal text-muted-foreground"
    >
      Select a framework
      <IconPlaceholder
        lucide="ChevronDownIcon"
        tabler="IconSelector"
        hugeicons="UnfoldMoreIcon"
        phosphor="CaretUpDownIcon"
        remixicon="RiExpandUpDownLine"
      />
    </Button>
    <Input placeholder="Select a framework" class="w-52" />
    <InputGroup class="w-52">
      <InputGroupInput placeholder="Select a framework" />
      <InputGroupAddon align="inline-end">
        <IconPlaceholder
          lucide="ChevronDownIcon"
          tabler="IconSelector"
          hugeicons="UnfoldMoreIcon"
          phosphor="CaretUpDownIcon"
          remixicon="RiExpandUpDownLine"
        />
      </InputGroupAddon>
    </InputGroup>
  </Example>
</template>
