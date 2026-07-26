<script setup lang="ts">
import { ExampleWrapper } from "@/registry/bases/reka/components/example"
import ButtonGroupBasic from "~/registry/bases/reka/examples/button-group/ButtonGroupBasic.vue"
import ButtonGroupNavigation from "~/registry/bases/reka/examples/button-group/ButtonGroupNavigation.vue"
import ButtonGroupNested from "~/registry/bases/reka/examples/button-group/ButtonGroupNested.vue"
import ButtonGroupPagination from "~/registry/bases/reka/examples/button-group/ButtonGroupPagination.vue"
import ButtonGroupPaginationSplit from "~/registry/bases/reka/examples/button-group/ButtonGroupPaginationSplit.vue"
import ButtonGroupTextAlignment from "~/registry/bases/reka/examples/button-group/ButtonGroupTextAlignment.vue"
import ButtonGroupVertical from "~/registry/bases/reka/examples/button-group/ButtonGroupVertical.vue"
import ButtonGroupVerticalNested from "~/registry/bases/reka/examples/button-group/ButtonGroupVerticalNested.vue"
import ButtonGroupWithDropdown from "~/registry/bases/reka/examples/button-group/ButtonGroupWithDropdown.vue"
import ButtonGroupWithFields from "~/registry/bases/reka/examples/button-group/ButtonGroupWithFields.vue"
import ButtonGroupWithIcons from "~/registry/bases/reka/examples/button-group/ButtonGroupWithIcons.vue"
import ButtonGroupWithInput from "~/registry/bases/reka/examples/button-group/ButtonGroupWithInput.vue"
import ButtonGroupWithInputGroup from "~/registry/bases/reka/examples/button-group/ButtonGroupWithInputGroup.vue"
import ButtonGroupWithLike from "~/registry/bases/reka/examples/button-group/ButtonGroupWithLike.vue"
import ButtonGroupWithSelect from "~/registry/bases/reka/examples/button-group/ButtonGroupWithSelect.vue"
import ButtonGroupWithSelectAndInput from "~/registry/bases/reka/examples/button-group/ButtonGroupWithSelectAndInput.vue"
import ButtonGroupWithText from "~/registry/bases/reka/examples/button-group/ButtonGroupWithText.vue"
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
