<script setup lang="ts">
import { Checkbox } from "@/registry/bases/vase/ui/checkbox"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "@/registry/bases/vase/ui/field"
import { Example } from "~/registry/bases/vase/components/example"
</script>

<template>
  <Example title="With Title">
    <FieldGroup>
      <FieldLabel for="toggle-2">
        <Field orientation="horizontal">
          <Checkbox id="toggle-2" :default-checked="true" />
          <FieldContent>
            <FieldTitle>Enable notifications</FieldTitle>
            <FieldDescription>
              You can enable or disable notifications at any time.
            </FieldDescription>
          </FieldContent>
        </Field>
      </FieldLabel>
      <FieldLabel for="toggle-4">
        <Field orientation="horizontal" data-disabled>
          <Checkbox id="toggle-4" disabled />
          <FieldContent>
            <FieldTitle>Enable notifications</FieldTitle>
            <FieldDescription>
              You can enable or disable notifications at any time.
            </FieldDescription>
          </FieldContent>
        </Field>
      </FieldLabel>
    </FieldGroup>
  </Example>
</template>
