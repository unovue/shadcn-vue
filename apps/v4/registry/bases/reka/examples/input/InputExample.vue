<script setup lang="ts">
import { Example, ExampleWrapper } from "@/registry/bases/reka/components/example"
import InputBasic from "~/registry/bases/reka/examples/input/InputBasic.vue"
import InputDisabled from "~/registry/bases/reka/examples/input/InputDisabled.vue"
import InputForm from "~/registry/bases/reka/examples/input/InputForm.vue"
import InputInvalid from "~/registry/bases/reka/examples/input/InputInvalid.vue"
import InputTypes from "~/registry/bases/reka/examples/input/InputTypes.vue"
import InputWithButton from "~/registry/bases/reka/examples/input/InputWithButton.vue"
import InputWithDescription from "~/registry/bases/reka/examples/input/InputWithDescription.vue"
import InputWithLabel from "~/registry/bases/reka/examples/input/InputWithLabel.vue"
import InputWithNativeSelect from "~/registry/bases/reka/examples/input/InputWithNativeSelect.vue"
import InputWithSelect from "~/registry/bases/reka/examples/input/InputWithSelect.vue"
</script>

<template>
  <ExampleWrapper>
    <Example title="Basic">
      <InputBasic />
    </Example>
    <Example title="Invalid">
      <InputInvalid />
    </Example>
    <Example title="With Label">
      <InputWithLabel />
    </Example>
    <Example title="With Description">
      <InputWithDescription />
    </Example>
    <Example title="Disabled">
      <InputDisabled />
    </Example>
    <Example title="Input Types">
      <InputTypes />
    </Example>
    <Example title="With Select">
      <InputWithSelect />
    </Example>
    <Example title="With Button">
      <InputWithButton />
    </Example>
    <Example title="With Native Select">
      <InputWithNativeSelect />
    </Example>
    <Example title="Form">
      <InputForm />
    </Example>
  </ExampleWrapper>
</template>
