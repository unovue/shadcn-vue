<script setup lang="ts">
import { Checkbox } from "@/registry/bases/reka/ui/checkbox"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "@/registry/bases/reka/ui/field"
import { Example } from "~/registry/bases/reka/components/example"
</script>

<template>
  <Example title="With Title">
    <FieldGroup>
      <FieldLabel html-for="toggle-2">
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
      <FieldLabel html-for="toggle-4">
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
