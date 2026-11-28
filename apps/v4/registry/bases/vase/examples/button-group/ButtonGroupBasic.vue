<script setup lang="ts">
import { Button } from "@/registry/bases/vase/ui/button"
import { ButtonGroup } from "@/registry/bases/vase/ui/button-group"
import { Example } from "~/registry/bases/vase/components/example"
</script>

<template>
  <Example title="Basic">
    <div class="flex flex-col gap-4">
      <ButtonGroup>
        <Button variant="outline">
          Button
        </Button>
        <Button variant="outline">
          Another Button
        </Button>
      </ButtonGroup>
    </div>
  </Example>
</template>
