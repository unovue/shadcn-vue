<script setup lang="ts">
import { Example } from "@/registry/bases/vase/components/example"
import { Field, FieldLabel } from "@/registry/bases/vase/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/registry/bases/vase/ui/input-group"
import { Spinner } from "@/registry/bases/vase/ui/spinner"
</script>

<template>
  <Example title="In Input Group">
    <Field>
      <FieldLabel for="input-group-spinner">
        Input Group
      </FieldLabel>
      <InputGroup>
        <InputGroupInput id="input-group-spinner" />
        <InputGroupAddon>
          <Spinner />
        </InputGroupAddon>
      </InputGroup>
    </Field>
  </Example>
</template>
