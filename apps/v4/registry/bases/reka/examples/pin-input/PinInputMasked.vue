<script setup lang="ts">
import {
  PinInput,
  PinInputGroup,
  PinInputSlot,
} from "@/registry/bases/reka/ui/pin-input"
import { Example } from "~/registry/bases/reka/components/example"
</script>

<template>
  <Example title="Masked Pin Input">
    <PinInput :mask="true" type="text">
      <PinInputGroup>
        <PinInputSlot v-for="(id, index) in 6" :key="id" :index="index" />
      </PinInputGroup>
    </PinInput>
  </Example>
</template>
