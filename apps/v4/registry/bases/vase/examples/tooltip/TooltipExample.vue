<script setup lang="ts">
import { ExampleWrapper } from "@/registry/bases/vase/components/example"
import TooltipBasic from "~/registry/bases/vase/examples/tooltip/TooltipBasic.vue"
import TooltipDisabled from "~/registry/bases/vase/examples/tooltip/TooltipDisabled.vue"
import TooltipFormatted from "~/registry/bases/vase/examples/tooltip/TooltipFormatted.vue"
import TooltipLongContent from "~/registry/bases/vase/examples/tooltip/TooltipLongContent.vue"
import TooltipOnLink from "~/registry/bases/vase/examples/tooltip/TooltipOnLink.vue"
import TooltipSides from "~/registry/bases/vase/examples/tooltip/TooltipSides.vue"
import TooltipWithIcon from "~/registry/bases/vase/examples/tooltip/TooltipWithIcon.vue"
import TooltipWithKeyboard from "~/registry/bases/vase/examples/tooltip/TooltipWithKeyboard.vue"
</script>

<template>
  <ExampleWrapper>
    <TooltipBasic />
    <TooltipSides />
    <TooltipWithIcon />
    <TooltipLongContent />
    <TooltipDisabled />
    <TooltipWithKeyboard />
    <TooltipOnLink />
    <TooltipFormatted />
  </ExampleWrapper>
</template>
