<script setup lang="ts">
import { Field, FieldLabel } from "@/registry/bases/vase/ui/field"
import { RadioGroup, RadioGroupItem } from "@/registry/bases/vase/ui/radio-group"
</script>

<template>
  <RadioGroup default-value="medium" class="grid grid-cols-2 gap-2">
    <FieldLabel for="size-small">
      <Field orientation="horizontal">
        <RadioGroupItem id="size-small" value="small" />
        <div class="font-medium">
          Small
        </div>
      </Field>
    </FieldLabel>
    <FieldLabel for="size-medium">
      <Field orientation="horizontal">
        <RadioGroupItem id="size-medium" value="medium" />
        <div class="font-medium">
          Medium
        </div>
      </Field>
    </FieldLabel>
    <FieldLabel for="size-large">
      <Field orientation="horizontal">
        <RadioGroupItem id="size-large" value="large" />
        <div class="font-medium">
          Large
        </div>
      </Field>
    </FieldLabel>
    <FieldLabel for="size-xlarge">
      <Field orientation="horizontal">
        <RadioGroupItem id="size-xlarge" value="xlarge" />
        <div class="font-medium">
          X-Large
        </div>
      </Field>
    </FieldLabel>
  </RadioGroup>
</template>
