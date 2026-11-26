<script setup lang="ts">
import { ExampleWrapper } from "@/registry/bases/vase/components/example"
import CheckboxFields from "~/registry/bases/vase/examples/field/CheckboxFields.vue"
import InputFields from "~/registry/bases/vase/examples/field/InputFields.vue"
import InputOTPFields from "~/registry/bases/vase/examples/field/InputOTPFields.vue"
import NativeSelectFields from "~/registry/bases/vase/examples/field/NativeSelectFields.vue"
import RadioFields from "~/registry/bases/vase/examples/field/RadioFields.vue"
import SelectFields from "~/registry/bases/vase/examples/field/SelectFields.vue"
import SliderFields from "~/registry/bases/vase/examples/field/SliderFields.vue"
import SwitchFields from "~/registry/bases/vase/examples/field/SwitchFields.vue"
import TextareaFields from "~/registry/bases/vase/examples/field/TextareaFields.vue"
</script>

<template>
  <ExampleWrapper>
    <InputFields />
    <TextareaFields />
    <SelectFields />
    <CheckboxFields />
    <RadioFields />
    <SwitchFields />
    <SliderFields />
    <NativeSelectFields />
    <InputOTPFields />
  </ExampleWrapper>
</template>
