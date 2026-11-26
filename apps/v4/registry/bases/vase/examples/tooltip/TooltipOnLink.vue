<script setup lang="ts">
import { Example } from "@/registry/bases/vase/components/example"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/registry/bases/vase/ui/tooltip"
</script>

<template>
  <Example title="On Link">
    <Tooltip>
      <TooltipTrigger>
        <template #element="{ props, elementRef }">
          <a
            v-bind="props" :ref="elementRef"
            href="#"
            class="w-fit text-sm text-primary underline-offset-4 hover:underline"
            @click.prevent
          >
            Learn more
          </a>
        </template>
      </TooltipTrigger>
      <TooltipContent>
        <p>Click to read the documentation</p>
      </TooltipContent>
    </Tooltip>
  </Example>
</template>
