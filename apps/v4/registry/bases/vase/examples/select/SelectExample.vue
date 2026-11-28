<script setup lang="ts">
import { Example, ExampleWrapper } from "@/registry/bases/vase/components/example"
import SelectBasic from "~/registry/bases/vase/examples/select/SelectBasic.vue"
import SelectDisabled from "~/registry/bases/vase/examples/select/SelectDisabled.vue"
import SelectInDialog from "~/registry/bases/vase/examples/select/SelectInDialog.vue"
import SelectInline from "~/registry/bases/vase/examples/select/SelectInline.vue"
import SelectInvalid from "~/registry/bases/vase/examples/select/SelectInvalid.vue"
import SelectLargeList from "~/registry/bases/vase/examples/select/SelectLargeList.vue"
import SelectPlan from "~/registry/bases/vase/examples/select/SelectPlan.vue"
import SelectPopper from "~/registry/bases/vase/examples/select/SelectPopper.vue"
import SelectSizes from "~/registry/bases/vase/examples/select/SelectSizes.vue"
import SelectWithButton from "~/registry/bases/vase/examples/select/SelectWithButton.vue"
import SelectWithField from "~/registry/bases/vase/examples/select/SelectWithField.vue"
import SelectWithGroups from "~/registry/bases/vase/examples/select/SelectWithGroups.vue"
import SelectWithIcons from "~/registry/bases/vase/examples/select/SelectWithIcons.vue"
</script>

<template>
  <ExampleWrapper>
    <Example title="Basic">
      <SelectBasic />
    </Example>
    <Example title="With Icons">
      <SelectWithIcons />
    </Example>
    <Example title="With Groups & Labels">
      <SelectWithGroups />
    </Example>
    <Example title="Large List">
      <SelectLargeList />
    </Example>
    <Example title="Sizes">
      <SelectSizes />
    </Example>
    <Example title="With Button">
      <SelectWithButton />
    </Example>
    <Example title="Popper">
      <SelectPopper />
    </Example>
    <Example title="With Field">
      <SelectWithField />
    </Example>
    <Example title="Invalid">
      <SelectInvalid />
    </Example>
    <Example title="Inline with Input & NativeSelect">
      <SelectInline />
    </Example>
    <Example title="Disabled">
      <SelectDisabled />
    </Example>
    <Example title="Subscription Plan">
      <SelectPlan />
    </Example>
    <Example title="In Dialog">
      <SelectInDialog />
    </Example>
  </ExampleWrapper>
</template>
