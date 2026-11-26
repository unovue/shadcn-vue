<script setup lang="ts">
import {
  PinInput,
  PinInputGroup,
  PinInputSlot,
} from "@/registry/bases/vase/ui/pin-input"
import { Example } from "~/registry/bases/vase/components/example"
</script>

<template>
  <Example title="Basic Pin Input">
    <PinInput :length="4">
      <PinInputGroup>
        <PinInputSlot v-for="id in 4" :key="id" />
      </PinInputGroup>
    </PinInput>
  </Example>
</template>
