<script setup lang="ts">
import { Button } from "@/registry/bases/reka/ui/button"
import { ButtonGroup, ButtonGroupText } from "@/registry/bases/reka/ui/button-group"
import { Input } from "@/registry/bases/reka/ui/input"
import { Label } from "@/registry/bases/reka/ui/label"
import { Example } from "~/registry/bases/reka/components/example"
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
        <ButtonGroupText :as-child="true">
          <Label html-for="input-text">
            GPU Size
          </Label>
        </ButtonGroupText>
        <Input id="input-text" placeholder="Type something here..." />
      </ButtonGroup>
    </div>
  </Example>
</template>
