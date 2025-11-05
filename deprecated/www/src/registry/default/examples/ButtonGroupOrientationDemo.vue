<script setup lang="ts">
import { MinusIcon, PlusIcon } from "lucide-vue-next"
import { Button } from "@/registry/default/ui/button"
import { ButtonGroup } from "@/registry/default/ui/button-group"
</script>

<template>
  <ButtonGroup
    orientation="vertical"
    aria-label="Media controls"
    class="h-fit"
  >
    <Button variant="outline" size="icon">
      <PlusIcon />
    </Button>
    <Button variant="outline" size="icon">
      <MinusIcon />
    </Button>
  </ButtonGroup>
</template>
