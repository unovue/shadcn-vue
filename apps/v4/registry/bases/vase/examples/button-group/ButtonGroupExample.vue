<script setup lang="ts">
import { ExampleWrapper } from "@/registry/bases/vase/components/example"
import ButtonGroupBasic from "~/registry/bases/vase/examples/button-group/ButtonGroupBasic.vue"
import ButtonGroupNavigation from "~/registry/bases/vase/examples/button-group/ButtonGroupNavigation.vue"
import ButtonGroupNested from "~/registry/bases/vase/examples/button-group/ButtonGroupNested.vue"
import ButtonGroupPagination from "~/registry/bases/vase/examples/button-group/ButtonGroupPagination.vue"
import ButtonGroupPaginationSplit from "~/registry/bases/vase/examples/button-group/ButtonGroupPaginationSplit.vue"
import ButtonGroupTextAlignment from "~/registry/bases/vase/examples/button-group/ButtonGroupTextAlignment.vue"
import ButtonGroupVertical from "~/registry/bases/vase/examples/button-group/ButtonGroupVertical.vue"
import ButtonGroupVerticalNested from "~/registry/bases/vase/examples/button-group/ButtonGroupVerticalNested.vue"
import ButtonGroupWithDropdown from "~/registry/bases/vase/examples/button-group/ButtonGroupWithDropdown.vue"
import ButtonGroupWithFields from "~/registry/bases/vase/examples/button-group/ButtonGroupWithFields.vue"
import ButtonGroupWithIcons from "~/registry/bases/vase/examples/button-group/ButtonGroupWithIcons.vue"
import ButtonGroupWithInput from "~/registry/bases/vase/examples/button-group/ButtonGroupWithInput.vue"
import ButtonGroupWithInputGroup from "~/registry/bases/vase/examples/button-group/ButtonGroupWithInputGroup.vue"
import ButtonGroupWithLike from "~/registry/bases/vase/examples/button-group/ButtonGroupWithLike.vue"
import ButtonGroupWithSelect from "~/registry/bases/vase/examples/button-group/ButtonGroupWithSelect.vue"
import ButtonGroupWithSelectAndInput from "~/registry/bases/vase/examples/button-group/ButtonGroupWithSelectAndInput.vue"
import ButtonGroupWithText from "~/registry/bases/vase/examples/button-group/ButtonGroupWithText.vue"
</script>

<template>
  <ExampleWrapper>
    <ButtonGroupBasic />
    <ButtonGroupWithInput />
    <ButtonGroupWithText />
    <ButtonGroupWithDropdown />
    <ButtonGroupWithSelect />
    <ButtonGroupWithIcons />
    <ButtonGroupWithInputGroup />
    <ButtonGroupWithFields />
    <ButtonGroupWithLike />
    <ButtonGroupWithSelectAndInput />
    <ButtonGroupNested />
    <ButtonGroupPagination />
    <ButtonGroupPaginationSplit />
    <ButtonGroupNavigation />
    <ButtonGroupTextAlignment />
    <ButtonGroupVertical />
    <ButtonGroupVerticalNested />
  </ExampleWrapper>
</template>
