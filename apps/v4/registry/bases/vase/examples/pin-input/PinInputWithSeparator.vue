<script setup lang="ts">
import {
  PinInput,
  PinInputGroup,
  PinInputSeparator,
  PinInputSlot,
} from "@/registry/bases/vase/ui/pin-input"
import { Example } from "~/registry/bases/vase/components/example"
</script>

<template>
  <Example title="Pin Input with Separator">
    <PinInput :length="6">
      <PinInputGroup>
        <PinInputSlot v-for="id in 3" :key="id" />
      </PinInputGroup>
      <PinInputSeparator />
      <PinInputGroup>
        <PinInputSlot v-for="id in 3" :key="id" />
      </PinInputGroup>
    </PinInput>
  </Example>
</template>
