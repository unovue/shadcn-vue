<script setup lang="ts">
import { Label } from '@/registry/new-york-v4/ui/label'
import {
  PinInput,
  PinInputGroup,
  PinInputSeparator,
  PinInputSlot,
} from '@/registry/new-york-v4/ui/pin-input'

const value = ref(['1', '2', '3', '4', '5', '6'])
</script>

<template>
  <div class="flex flex-col flex-wrap gap-6 md:flex-row">
    <div class="grid gap-2">
      <Label for="simple">Simple</Label>
      <PinInput id="simple" :max-length="6">
        <PinInputGroup>
          <PinInputSlot :index="0" />
          <PinInputSlot :index="1" />
          <PinInputSlot :index="2" />
        </PinInputGroup>
        <PinInputSeparator />
        <PinInputGroup>
          <PinInputSlot :index="3" />
          <PinInputSlot :index="4" />
          <PinInputSlot :index="5" />
        </PinInputGroup>
      </PinInput>
    </div>

    <div class="grid gap-2">
      <Label for="digits-only">Digits Only</Label>
      <PinInput id="digits-only" :max-length="6" :type="'number'">
        <PinInputGroup>
          <PinInputSlot :index="0" />
          <PinInputSlot :index="1" />
          <PinInputSlot :index="2" />
          <PinInputSlot :index="3" />
          <PinInputSlot :index="4" />
          <PinInputSlot :index="5" />
        </PinInputGroup>
      </PinInput>
    </div>

    <div class="grid gap-2">
      <Label for="with-separator">With Separator</Label>
      <PinInput
        id="with-separator"
        v-model="value"
        :max-length="6"
      >
        <PinInputGroup>
          <PinInputSlot :index="0" />
          <PinInputSlot :index="1" />
        </PinInputGroup>
        <PinInputSeparator />
        <PinInputGroup>
          <PinInputSlot :index="2" />
          <PinInputSlot :index="3" />
        </PinInputGroup>
        <PinInputSeparator />
        <PinInputGroup>
          <PinInputSlot :index="4" />
          <PinInputSlot :index="5" />
        </PinInputGroup>
      </PinInput>
    </div>

    <div class="grid gap-2">
      <Label for="with-spacing">With Spacing</Label>
      <PinInput id="with-spacing" :max-length="6">
        <PinInputGroup class="gap-2 *:data-[slot=pin-input-slot]:rounded-md *:data-[slot=pin-input-slot]:border">
          <PinInputSlot :index="0" aria-invalid="true" />
          <PinInputSlot :index="1" aria-invalid="true" />
          <PinInputSlot :index="2" aria-invalid="true" />
          <PinInputSlot :index="3" aria-invalid="true" />
        </PinInputGroup>
      </PinInput>
    </div>
  </div>
</template>
