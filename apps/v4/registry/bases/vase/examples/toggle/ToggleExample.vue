<script setup lang="ts">
import { Example, ExampleWrapper } from "@/registry/bases/vase/components/example"
import ToggleBasic from "~/registry/bases/vase/examples/toggle/ToggleBasic.vue"
import ToggleDisabled from "~/registry/bases/vase/examples/toggle/ToggleDisabled.vue"
import ToggleOutline from "~/registry/bases/vase/examples/toggle/ToggleOutline.vue"
import ToggleSizes from "~/registry/bases/vase/examples/toggle/ToggleSizes.vue"
import ToggleWithButtonIcon from "~/registry/bases/vase/examples/toggle/ToggleWithButtonIcon.vue"
import ToggleWithButtonIconText from "~/registry/bases/vase/examples/toggle/ToggleWithButtonIconText.vue"
import ToggleWithButtonText from "~/registry/bases/vase/examples/toggle/ToggleWithButtonText.vue"
import ToggleWithIcon from "~/registry/bases/vase/examples/toggle/ToggleWithIcon.vue"
</script>

<template>
  <ExampleWrapper>
    <Example title="Basic">
      <ToggleBasic />
    </Example>
    <Example title="Outline">
      <ToggleOutline />
    </Example>
    <Example title="Sizes">
      <ToggleSizes />
    </Example>
    <Example title="With Button Text">
      <ToggleWithButtonText />
    </Example>
    <Example title="With Button Icon">
      <ToggleWithButtonIcon />
    </Example>
    <Example title="With Button Icon + Text">
      <ToggleWithButtonIconText />
    </Example>
    <Example title="Disabled">
      <ToggleDisabled />
    </Example>
    <Example title="With Icon">
      <ToggleWithIcon />
    </Example>
  </ExampleWrapper>
</template>
