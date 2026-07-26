<script setup lang="ts">
import { ExampleWrapper } from "@/registry/bases/reka/components/example"
import ComboboxAutoHighlight from "~/registry/bases/reka/examples/combobox/ComboboxAutoHighlight.vue"
import ComboboxBasic from "~/registry/bases/reka/examples/combobox/ComboboxBasic.vue"
import ComboboxDisabled from "~/registry/bases/reka/examples/combobox/ComboboxDisabled.vue"
import ComboboxInDialog from "~/registry/bases/reka/examples/combobox/ComboboxInDialog.vue"
import ComboboxInPopup from "~/registry/bases/reka/examples/combobox/ComboboxInPopup.vue"
import ComboboxInputAddon from "~/registry/bases/reka/examples/combobox/ComboboxInputAddon.vue"
import ComboboxInvalid from "~/registry/bases/reka/examples/combobox/ComboboxInvalid.vue"
import ComboboxLargeList from "~/registry/bases/reka/examples/combobox/ComboboxLargeList.vue"
import ComboboxWithClear from "~/registry/bases/reka/examples/combobox/ComboboxWithClear.vue"
import ComboboxWithForm from "~/registry/bases/reka/examples/combobox/ComboboxWithForm.vue"
import ComboboxWithGroups from "~/registry/bases/reka/examples/combobox/ComboboxWithGroups.vue"
import ComboboxWithGroupsAndSeparator from "~/registry/bases/reka/examples/combobox/ComboboxWithGroupsAndSeparator.vue"
import ComboboxWithOtherInputs from "~/registry/bases/reka/examples/combobox/ComboboxWithOtherInputs.vue"
</script>

<template>
  <ExampleWrapper>
    <ComboboxBasic />
    <ComboboxDisabled />
    <ComboboxInvalid />
    <ComboboxWithClear />
    <ComboboxAutoHighlight />
    <ComboboxWithGroups />
    <ComboboxWithGroupsAndSeparator />
    <ComboboxLargeList />
    <ComboboxInputAddon />
    <ComboboxInPopup />
    <ComboboxWithForm />
    <ComboboxInDialog />
    <ComboboxWithOtherInputs />
  </ExampleWrapper>
</template>
