<script setup lang="ts">
import IconPlaceholder from "@/components/IconPlaceholder.vue"
import { Button } from "@/registry/bases/reka/ui/button"
import { ButtonGroup } from "@/registry/bases/reka/ui/button-group"
import { Example } from "~/registry/bases/reka/components/example"
</script>

<template>
  <Example title="Vertical">
    <div class="flex gap-6">
      <ButtonGroup
        orientation="vertical"
        aria-label="Media controls"
        class="h-fit"
      >
        <Button variant="outline" size="icon">
          <IconPlaceholder
            lucide="PlusIcon"
            tabler="IconPlus"
            hugeicons="PlusSignIcon"
            phosphor="PlusIcon"
            remixicon="RiAddLine"
          />
        </Button>
        <Button variant="outline" size="icon">
          <IconPlaceholder
            lucide="MinusIcon"
            tabler="IconMinus"
            hugeicons="MinusSignIcon"
            phosphor="MinusIcon"
            remixicon="RiSubtractLine"
          />
        </Button>
      </ButtonGroup>
    </div>
  </Example>
</template>
