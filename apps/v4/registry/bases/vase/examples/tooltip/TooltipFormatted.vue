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
  <Example title="Formatted Content">
    <Tooltip>
      <TooltipTrigger>
        <template #element="{ props, elementRef }">
          <Button v-bind="props" :ref="elementRef" variant="outline" class="w-fit">
            Status
          </Button>
        </template>
      </TooltipTrigger>
      <TooltipContent>
        <div class="flex flex-col gap-1">
          <p class="font-semibold">
            Active
          </p>
          <p class="text-xs opacity-80">
            Last updated 2 hours ago
          </p>
        </div>
      </TooltipContent>
    </Tooltip>
  </Example>
</template>
