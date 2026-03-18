<script setup lang="ts">
import { Field, FieldLabel } from "@/registry/bases/reka/ui/field"
import { RadioGroup, RadioGroupItem } from "@/registry/bases/reka/ui/radio-group"
</script>

<template>
  <RadioGroup default-value="comfortable">
    <Field orientation="horizontal">
      <RadioGroupItem id="r1" value="default" />
      <FieldLabel html-for="r1" class="font-normal">
        Default
      </FieldLabel>
    </Field>
    <Field orientation="horizontal">
      <RadioGroupItem id="r2" value="comfortable" />
      <FieldLabel html-for="r2" class="font-normal">
        Comfortable
      </FieldLabel>
    </Field>
    <Field orientation="horizontal">
      <RadioGroupItem id="r3" value="compact" />
      <FieldLabel html-for="r3" class="font-normal">
        Compact
      </FieldLabel>
    </Field>
  </RadioGroup>
</template>
