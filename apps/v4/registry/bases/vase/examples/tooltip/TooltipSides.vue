<script setup lang="ts">
import { Example } from "@/registry/bases/vase/components/example"
import { Button } from "@/registry/bases/vase/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/registry/bases/vase/ui/tooltip"

const sides = ["top", "right", "bottom", "left"] as const
</script>

<template>
  <Example title="Sides">
    <div class="flex flex-wrap gap-2">
      <Tooltip
        v-for="side in sides"
        :key="side"
      >
        <TooltipTrigger>
          <template #element="{ props, elementRef }">
            <Button v-bind="props" :ref="elementRef" variant="outline" class="w-fit capitalize">
              {{ side }}
            </Button>
          </template>
        </TooltipTrigger>
        <TooltipContent :side="side">
          <p>Add to library</p>
        </TooltipContent>
      </Tooltip>
    </div>
  </Example>
</template>
