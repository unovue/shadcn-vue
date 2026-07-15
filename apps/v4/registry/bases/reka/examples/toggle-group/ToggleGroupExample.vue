<script setup lang="ts">
import { Example, ExampleWrapper } from "@/registry/bases/reka/components/example"
import ToggleGroupBasic from "~/registry/bases/reka/examples/toggle-group/ToggleGroupBasic.vue"
import ToggleGroupDateRange from "~/registry/bases/reka/examples/toggle-group/ToggleGroupDateRange.vue"
import ToggleGroupFilter from "~/registry/bases/reka/examples/toggle-group/ToggleGroupFilter.vue"
import ToggleGroupOutline from "~/registry/bases/reka/examples/toggle-group/ToggleGroupOutline.vue"
import ToggleGroupOutlineWithIcons from "~/registry/bases/reka/examples/toggle-group/ToggleGroupOutlineWithIcons.vue"
import ToggleGroupSizes from "~/registry/bases/reka/examples/toggle-group/ToggleGroupSizes.vue"
import ToggleGroupSort from "~/registry/bases/reka/examples/toggle-group/ToggleGroupSort.vue"
import ToggleGroupSpacing from "~/registry/bases/reka/examples/toggle-group/ToggleGroupSpacing.vue"
import ToggleGroupVertical from "~/registry/bases/reka/examples/toggle-group/ToggleGroupVertical.vue"
import ToggleGroupVerticalOutline from "~/registry/bases/reka/examples/toggle-group/ToggleGroupVerticalOutline.vue"
import ToggleGroupVerticalOutlineWithIcons from "~/registry/bases/reka/examples/toggle-group/ToggleGroupVerticalOutlineWithIcons.vue"
import ToggleGroupVerticalWithSpacing from "~/registry/bases/reka/examples/toggle-group/ToggleGroupVerticalWithSpacing.vue"
import ToggleGroupWithIcons from "~/registry/bases/reka/examples/toggle-group/ToggleGroupWithIcons.vue"
import ToggleGroupWithInputAndSelect from "~/registry/bases/reka/examples/toggle-group/ToggleGroupWithInputAndSelect.vue"
</script>

<template>
  <ExampleWrapper>
    <Example title="Basic">
      <ToggleGroupBasic />
    </Example>
    <Example title="Outline">
      <ToggleGroupOutline />
    </Example>
    <Example title="Outline With Icons">
      <ToggleGroupOutlineWithIcons />
    </Example>
    <Example title="Sizes">
      <ToggleGroupSizes />
    </Example>
    <Example title="With Spacing">
      <ToggleGroupSpacing />
    </Example>
    <Example title="With Icons">
      <ToggleGroupWithIcons />
    </Example>
    <Example title="Filter">
      <ToggleGroupFilter />
    </Example>
    <Example title="Date Range">
      <ToggleGroupDateRange />
    </Example>
    <Example title="Sort">
      <ToggleGroupSort />
    </Example>
    <Example title="With Input and Select">
      <ToggleGroupWithInputAndSelect />
    </Example>
    <Example title="Vertical">
      <ToggleGroupVertical />
    </Example>
    <Example title="Vertical Outline">
      <ToggleGroupVerticalOutline />
    </Example>
    <Example title="Vertical Outline With Icons">
      <ToggleGroupVerticalOutlineWithIcons />
    </Example>
    <Example title="Vertical With Spacing">
      <ToggleGroupVerticalWithSpacing />
    </Example>
  </ExampleWrapper>
</template>
