<script setup lang="ts">
import { ref } from "vue"
import IconPlaceholder from "@/components/IconPlaceholder.vue"
import { Button } from "@/registry/bases/reka/ui/button"
import { ButtonGroup } from "@/registry/bases/reka/ui/button-group"
import { Field } from "@/registry/bases/reka/ui/field"
import { Input } from "@/registry/bases/reka/ui/input"
import { Label } from "@/registry/bases/reka/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/bases/reka/ui/select"
import { Example } from "~/registry/bases/reka/components/example"

const currency = ref("$")
</script>

<template>
  <Example title="With Select">
    <Field>
      <Label html-for="amount">
        Amount
      </Label>
      <ButtonGroup>
        <Select v-model="currency">
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent align="start">
            <SelectItem value="$">
              $
            </SelectItem>
            <SelectItem value="€">
              €
            </SelectItem>
            <SelectItem value="£">
              £
            </SelectItem>
          </SelectContent>
        </Select>
        <Input placeholder="Enter amount to send" />
        <Button variant="outline">
          <IconPlaceholder
            lucide="ArrowRightIcon"
            tabler="IconArrowRight"
            hugeicons="ArrowRight01Icon"
            phosphor="ArrowRightIcon"
            remixicon="RiArrowRightLine"
          />
        </Button>
      </ButtonGroup>
    </Field>
  </Example>
</template>
