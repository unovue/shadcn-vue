<script setup lang="ts">
import { Button } from "@/registry/bases/vase/ui/button"
import { ButtonGroup } from "@/registry/bases/vase/ui/button-group"
import { Field } from "@/registry/bases/vase/ui/field"
import { Label } from "@/registry/bases/vase/ui/label"
import { Example } from "~/registry/bases/vase/components/example"
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
