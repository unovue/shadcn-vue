<script setup lang="ts">
import { Button } from "@/registry/bases/vase/ui/button"
import { ButtonGroup, ButtonGroupText } from "@/registry/bases/vase/ui/button-group"
import { Input } from "@/registry/bases/vase/ui/input"
import { Example } from "~/registry/bases/vase/components/example"
</script>

<template>
  <Example title="With Text">
    <div class="flex flex-col gap-4">
      <ButtonGroup>
        <ButtonGroupText>Text</ButtonGroupText>
        <Button variant="outline">
          Another Button
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <ButtonGroupText as="label" for="input-text">
          GPU Size
        </ButtonGroupText>
        <Input id="input-text" placeholder="Type something here..." />
      </ButtonGroup>
    </div>
  </Example>
</template>
