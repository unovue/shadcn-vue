<script setup lang="ts">
import { Example } from "@/registry/bases/vase/components/example"
import { Button } from "@/registry/bases/vase/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/registry/bases/vase/ui/tooltip"
</script>

<template>
  <Example title="Long Content">
    <Tooltip>
      <TooltipTrigger>
        <template #element="{ props, elementRef }">
          <Button v-bind="props" :ref="elementRef" variant="outline" class="w-fit">
            Show Tooltip
          </Button>
        </template>
      </TooltipTrigger>
      <TooltipContent>
        To learn more about how this works, check out the docs. If you have
        any questions, please reach out to us.
      </TooltipContent>
    </Tooltip>
  </Example>
</template>
