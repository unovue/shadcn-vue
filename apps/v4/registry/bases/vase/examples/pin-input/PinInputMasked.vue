<script setup lang="ts">
import {
  PinInput,
  PinInputGroup,
  PinInputSlot,
} from "@/registry/bases/vase/ui/pin-input"
import { Example } from "~/registry/bases/vase/components/example"
</script>

<template>
  <Example title="Masked Pin Input">
    <PinInput :length="6" validation-type="none">
      <PinInputGroup>
        <PinInputSlot v-for="id in 6" :key="id" type="password" />
      </PinInputGroup>
    </PinInput>
  </Example>
</template>
