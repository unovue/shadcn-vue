<script setup lang="ts">
import { Example, ExampleWrapper } from "@/registry/bases/reka/components/example"
import SelectBasic from "~/registry/bases/reka/examples/select/SelectBasic.vue"
import SelectDisabled from "~/registry/bases/reka/examples/select/SelectDisabled.vue"
import SelectInDialog from "~/registry/bases/reka/examples/select/SelectInDialog.vue"
import SelectInline from "~/registry/bases/reka/examples/select/SelectInline.vue"
import SelectInvalid from "~/registry/bases/reka/examples/select/SelectInvalid.vue"
import SelectLargeList from "~/registry/bases/reka/examples/select/SelectLargeList.vue"
import SelectPlan from "~/registry/bases/reka/examples/select/SelectPlan.vue"
import SelectPopper from "~/registry/bases/reka/examples/select/SelectPopper.vue"
import SelectSizes from "~/registry/bases/reka/examples/select/SelectSizes.vue"
import SelectWithButton from "~/registry/bases/reka/examples/select/SelectWithButton.vue"
import SelectWithField from "~/registry/bases/reka/examples/select/SelectWithField.vue"
import SelectWithGroups from "~/registry/bases/reka/examples/select/SelectWithGroups.vue"
import SelectWithIcons from "~/registry/bases/reka/examples/select/SelectWithIcons.vue"
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
