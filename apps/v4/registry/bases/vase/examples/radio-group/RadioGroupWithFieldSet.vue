<script setup lang="ts">
import {
  Field,
  FieldDescription,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/registry/bases/vase/ui/field"
import { RadioGroup, RadioGroupItem } from "@/registry/bases/vase/ui/radio-group"
</script>

<template>
  <FieldSet>
    <FieldLegend>Battery Level</FieldLegend>
    <FieldDescription>
      Choose your preferred battery level.
    </FieldDescription>
    <RadioGroup default-value="medium">
      <Field orientation="horizontal">
        <RadioGroupItem id="battery-high" value="high" />
        <FieldLabel for="battery-high" class="font-normal">
          High
        </FieldLabel>
      </Field>
      <Field orientation="horizontal">
        <RadioGroupItem id="battery-medium" value="medium" />
        <FieldLabel for="battery-medium" class="font-normal">
          Medium
        </FieldLabel>
      </Field>
      <Field orientation="horizontal">
        <RadioGroupItem id="battery-low" value="low" />
        <FieldLabel for="battery-low" class="font-normal">
          Low
        </FieldLabel>
      </Field>
    </RadioGroup>
  </FieldSet>
</template>
