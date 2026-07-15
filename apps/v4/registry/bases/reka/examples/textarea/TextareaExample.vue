<script setup lang="ts">
import { Example, ExampleWrapper } from "@/registry/bases/reka/components/example"
import TextareaBasic from "~/registry/bases/reka/examples/textarea/TextareaBasic.vue"
import TextareaDisabled from "~/registry/bases/reka/examples/textarea/TextareaDisabled.vue"
import TextareaInvalid from "~/registry/bases/reka/examples/textarea/TextareaInvalid.vue"
import TextareaWithDescription from "~/registry/bases/reka/examples/textarea/TextareaWithDescription.vue"
import TextareaWithLabel from "~/registry/bases/reka/examples/textarea/TextareaWithLabel.vue"
</script>

<template>
  <ExampleWrapper>
    <Example title="Basic">
      <TextareaBasic />
    </Example>
    <Example title="Invalid">
      <TextareaInvalid />
    </Example>
    <Example title="With Label">
      <TextareaWithLabel />
    </Example>
    <Example title="With Description">
      <TextareaWithDescription />
    </Example>
    <Example title="Disabled">
      <TextareaDisabled />
    </Example>
  </ExampleWrapper>
</template>
