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
  <Example title="Disabled">
    <Tooltip>
      <TooltipTrigger>
        <template #element="{ props, elementRef }">
          <span v-bind="props" :ref="elementRef" class="inline-block w-fit">
            <Button variant="outline" disabled>
              Disabled
            </Button>
          </span>
        </template>
      </TooltipTrigger>
      <TooltipContent>
        <p>This feature is currently unavailable</p>
      </TooltipContent>
    </Tooltip>
  </Example>
</template>
