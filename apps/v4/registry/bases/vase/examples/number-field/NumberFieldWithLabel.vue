<script setup lang="ts">
import IconPlaceholder from "@/components/IconPlaceholder.vue"
import { Label } from "@/registry/bases/vase/ui/label"
import {
  NumberField,
  NumberFieldContent,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
} from "@/registry/bases/vase/ui/number-field"
import { Example } from "~/registry/bases/vase/components/example"
</script>

<template>
  <Example title="Number Field with Label">
    <div class="grid w-full max-w-sm items-center gap-1.5">
      <Label for="quantity">Quantity</Label>
      <NumberField :default-value="5" :min="1" :max="50">
        <NumberFieldContent>
          <NumberFieldDecrement>
            <IconPlaceholder
              lucide="MinusIcon"
              tabler="IconMinus"
              hugeicons="RemoveCircleIcon"
              phosphor="MinusIcon"
              remixicon="RiSubtractLine"
            />
          </NumberFieldDecrement>
          <NumberFieldInput id="quantity" />
          <NumberFieldIncrement>
            <IconPlaceholder
              lucide="PlusIcon"
              tabler="IconPlus"
              hugeicons="AddCircleIcon"
              phosphor="PlusIcon"
              remixicon="RiAddLine"
            />
          </NumberFieldIncrement>
        </NumberFieldContent>
      </NumberField>
    </div>
  </Example>
</template>
