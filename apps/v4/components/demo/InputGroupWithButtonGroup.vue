<script setup lang="ts">
import { Link2Icon } from 'lucide-vue-next'
import { ButtonGroup, ButtonGroupText } from '@/registry/new-york-v4/ui/button-group'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/registry/new-york-v4/ui/input-group'
import { Label } from '@/registry/new-york-v4/ui/label'
</script>

<template>
  <div class="grid w-full max-w-sm">
    <ButtonGroup class="!gap-0">
      <ButtonGroupText as-child>
        <Label for="url">https://</Label>
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
