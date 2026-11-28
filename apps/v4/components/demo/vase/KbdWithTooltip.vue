<script setup lang="ts">
import { Button } from '@/styles/vase-vega/ui/button'
import { ButtonGroup } from '@/styles/vase-vega/ui/button-group'
import { Kbd, KbdGroup } from '@/styles/vase-vega/ui/kbd'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/styles/vase-vega/ui/tooltip'
</script>

<template>
  <div class="flex flex-wrap gap-4">
    <ButtonGroup>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <template #element="{ props, elementRef }">
              <Button v-bind="props" :ref="elementRef" size="sm" variant="outline">
                Save
              </Button>
            </template>
          </TooltipTrigger>
          <TooltipContent>
            <div class="flex items-center gap-2">
              Save Changes <Kbd>S</Kbd>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <template #element="{ props, elementRef }">
              <Button v-bind="props" :ref="elementRef" size="sm" variant="outline">
                Print
              </Button>
            </template>
          </TooltipTrigger>
          <TooltipContent>
            <div class="flex items-center gap-2">
              Print Document
              <KbdGroup>
                <Kbd>Ctrl</Kbd>
                <Kbd>P</Kbd>
              </KbdGroup>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </ButtonGroup>
  </div>
</template>
