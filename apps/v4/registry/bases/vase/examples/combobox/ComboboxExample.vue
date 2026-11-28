<script setup lang="ts">
import { ExampleWrapper } from "@/registry/bases/vase/components/example"
import ComboboxAutoHighlight from "~/registry/bases/vase/examples/combobox/ComboboxAutoHighlight.vue"
import ComboboxBasic from "~/registry/bases/vase/examples/combobox/ComboboxBasic.vue"
import ComboboxDisabled from "~/registry/bases/vase/examples/combobox/ComboboxDisabled.vue"
import ComboboxInDialog from "~/registry/bases/vase/examples/combobox/ComboboxInDialog.vue"
import ComboboxInPopup from "~/registry/bases/vase/examples/combobox/ComboboxInPopup.vue"
import ComboboxInputAddon from "~/registry/bases/vase/examples/combobox/ComboboxInputAddon.vue"
import ComboboxInvalid from "~/registry/bases/vase/examples/combobox/ComboboxInvalid.vue"
import ComboboxLargeList from "~/registry/bases/vase/examples/combobox/ComboboxLargeList.vue"
import ComboboxWithClear from "~/registry/bases/vase/examples/combobox/ComboboxWithClear.vue"
import ComboboxWithForm from "~/registry/bases/vase/examples/combobox/ComboboxWithForm.vue"
import ComboboxWithGroups from "~/registry/bases/vase/examples/combobox/ComboboxWithGroups.vue"
import ComboboxWithGroupsAndSeparator from "~/registry/bases/vase/examples/combobox/ComboboxWithGroupsAndSeparator.vue"
import ComboboxWithOtherInputs from "~/registry/bases/vase/examples/combobox/ComboboxWithOtherInputs.vue"
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
