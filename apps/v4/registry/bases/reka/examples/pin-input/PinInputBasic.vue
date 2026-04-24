<script setup lang="ts">
import {
  PinInput,
  PinInputGroup,
  PinInputSlot,
} from "@/registry/bases/reka/ui/pin-input"
import { Example } from "~/registry/bases/reka/components/example"
</script>

<template>
  <Example title="Basic Pin Input">
    <PinInput>
      <PinInputGroup>
        <PinInputSlot v-for="(id, index) in 4" :key="id" :index="index" />
      </PinInputGroup>
    </PinInput>
  </Example>
</template>
