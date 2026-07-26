<script setup lang="ts">
import { Button } from "@/registry/bases/reka/ui/button"
import { ButtonGroup } from "@/registry/bases/reka/ui/button-group"
import { Input } from "@/registry/bases/reka/ui/input"
import { Example } from "~/registry/bases/reka/components/example"
</script>

<template>
  <Example title="With Input">
    <div class="flex flex-col gap-4">
      <ButtonGroup>
        <Button variant="outline">
          Button
        </Button>
        <Input placeholder="Type something here..." />
      </ButtonGroup>
      <ButtonGroup>
        <Input placeholder="Type something here..." />
        <Button variant="outline">
          Button
        </Button>
      </ButtonGroup>
    </div>
  </Example>
</template>
