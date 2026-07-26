<script setup lang="ts">
import {
  PinInput,
  PinInputGroup,
  PinInputSeparator,
  PinInputSlot,
} from "@/registry/bases/reka/ui/pin-input"
import { Example } from "~/registry/bases/reka/components/example"
</script>

<template>
  <Example title="Pin Input with Separator">
    <PinInput>
      <PinInputGroup>
        <PinInputSlot v-for="(id, index) in 3" :key="id" :index="index" />
      </PinInputGroup>
      <PinInputSeparator />
      <PinInputGroup>
        <PinInputSlot v-for="(id, index) in 3" :key="id" :index="index + 3" />
      </PinInputGroup>
    </PinInput>
  </Example>
</template>
