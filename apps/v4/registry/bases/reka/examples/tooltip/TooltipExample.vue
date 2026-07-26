<script setup lang="ts">
import { ExampleWrapper } from "@/registry/bases/reka/components/example"
import TooltipBasic from "~/registry/bases/reka/examples/tooltip/TooltipBasic.vue"
import TooltipDisabled from "~/registry/bases/reka/examples/tooltip/TooltipDisabled.vue"
import TooltipFormatted from "~/registry/bases/reka/examples/tooltip/TooltipFormatted.vue"
import TooltipLongContent from "~/registry/bases/reka/examples/tooltip/TooltipLongContent.vue"
import TooltipOnLink from "~/registry/bases/reka/examples/tooltip/TooltipOnLink.vue"
import TooltipSides from "~/registry/bases/reka/examples/tooltip/TooltipSides.vue"
import TooltipWithIcon from "~/registry/bases/reka/examples/tooltip/TooltipWithIcon.vue"
import TooltipWithKeyboard from "~/registry/bases/reka/examples/tooltip/TooltipWithKeyboard.vue"
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
