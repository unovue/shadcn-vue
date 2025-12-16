<script setup lang="ts">
import { ExampleWrapper } from "@/registry/bases/reka/components/example"
import CheckboxFields from "~/registry/bases/reka/examples/field/CheckboxFields.vue"
import InputFields from "~/registry/bases/reka/examples/field/InputFields.vue"
import InputOTPFields from "~/registry/bases/reka/examples/field/InputOTPFields.vue"
import NativeSelectFields from "~/registry/bases/reka/examples/field/NativeSelectFields.vue"
import RadioFields from "~/registry/bases/reka/examples/field/RadioFields.vue"
import SelectFields from "~/registry/bases/reka/examples/field/SelectFields.vue"
import SliderFields from "~/registry/bases/reka/examples/field/SliderFields.vue"
import SwitchFields from "~/registry/bases/reka/examples/field/SwitchFields.vue"
import TextareaFields from "~/registry/bases/reka/examples/field/TextareaFields.vue"
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
