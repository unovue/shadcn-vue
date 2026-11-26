<script setup lang="ts">
import { Link2Icon } from '@lucide/vue'
import { ButtonGroup, ButtonGroupText } from '@/styles/vase-vega/ui/button-group'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/styles/vase-vega/ui/input-group'
import { Label } from '@/styles/vase-vega/ui/label'
</script>

<template>
  <div class="grid w-full max-w-sm">
    <ButtonGroup class="!gap-0">
      <ButtonGroupText :as="Label" for="url">
        https://
      </ButtonGroupText>
      <InputGroup>
        <InputGroupInput id="url" />
        <InputGroupAddon align="inline-end">
          <Link2Icon />
        </InputGroupAddon>
      </InputGroup>
      <ButtonGroupText>.com</ButtonGroupText>
    </ButtonGroup>
  </div>
</template>
