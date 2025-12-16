<script setup lang="ts">
import { Button } from "@/registry/bases/reka/ui/button"
import { ButtonGroup } from "@/registry/bases/reka/ui/button-group"
import { Field } from "@/registry/bases/reka/ui/field"
import { Label } from "@/registry/bases/reka/ui/label"
import { Example } from "~/registry/bases/reka/components/example"
</script>

<template>
  <Example title="Text Alignment">
    <Field>
      <Label id="alignment-label">
        Text Alignment
      </Label>
      <ButtonGroup aria-labelledby="alignment-label">
        <Button variant="outline" size="sm">
          Left
        </Button>
        <Button variant="outline" size="sm">
          Center
        </Button>
        <Button variant="outline" size="sm">
          Right
        </Button>
        <Button variant="outline" size="sm">
          Justify
        </Button>
      </ButtonGroup>
    </Field>
  </Example>
</template>
