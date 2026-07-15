<script setup lang="ts">
import IconPlaceholder from "@/components/IconPlaceholder.vue"
import { Button } from "@/registry/bases/reka/ui/button"
import { ButtonGroup } from "@/registry/bases/reka/ui/button-group"
import { Field, FieldGroup } from "@/registry/bases/reka/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/registry/bases/reka/ui/input-group"
import { Label } from "@/registry/bases/reka/ui/label"
import { Example } from "~/registry/bases/reka/components/example"
</script>

<template>
  <Example title="With Fields">
    <FieldGroup class="grid grid-cols-3 gap-4">
      <Field class="col-span-2">
        <Label html-for="width">
          Width
        </Label>
        <ButtonGroup>
          <InputGroup>
            <InputGroupInput id="width" />
            <InputGroupAddon class="text-muted-foreground">
              W
            </InputGroupAddon>
            <InputGroupAddon
              align="inline-end"
              class="text-muted-foreground"
            >
              px
            </InputGroupAddon>
          </InputGroup>
          <Button variant="outline" size="icon">
            <IconPlaceholder
              lucide="MinusIcon"
              tabler="IconMinus"
              hugeicons="MinusSignIcon"
              phosphor="MinusIcon"
              remixicon="RiSubtractLine"
            />
          </Button>
          <Button variant="outline" size="icon">
            <IconPlaceholder
              lucide="PlusIcon"
              tabler="IconPlus"
              hugeicons="PlusSignIcon"
              phosphor="PlusIcon"
              remixicon="RiAddLine"
            />
          </Button>
        </ButtonGroup>
      </Field>
    </FieldGroup>
  </Example>
</template>
