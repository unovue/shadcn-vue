<script setup lang="ts">
import { Example } from "@/registry/bases/reka/components/example"
import { Field, FieldLabel } from "@/registry/bases/reka/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/registry/bases/reka/ui/input-group"
import { Spinner } from "@/registry/bases/reka/ui/spinner"
</script>

<template>
  <Example title="In Input Group">
    <Field>
      <FieldLabel html-for="input-group-spinner">
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
